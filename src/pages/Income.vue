<template>
  <div class="q-pa-md doc-container">
    <q-pull-to-refresh
      @refresh="refresh"
      color="orange-2"
      bg-color="black"
      icon="autorenew"
    >
    <div style="  background-color: lightgrey;
  width: 300px;
  border: 1px solid black;
  padding: 15px;
  margin: 20px;
  text-align: center;" >
      <span style="
      display: block;
      font-size: 2em;
      margin: 0.67em 0;
      font-weight: bold;">
        BALANCE</span>
      <div>
        <span style=" font-size: 3em">{{totalIncome}}</span>
        <span> Bath</span>
      </div>
    </div>
    <q-separator/>
    <div class="Inn-block" v-for="(item,index) in IncomeData" :key="index">
      <div id="photo" >
        <q-avatar style="vertical-align:middle">
          <img src="https://scontent.furt2-1.fna.fbcdn.net/v/t1.6435-9/131120282_1698174107023575_704994861676205759_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_ohc=3dcQwcb8mTAAX8_AKFX&_nc_ht=scontent.furt2-1.fna&oh=ff5f570a604d72ee63269cf7d754c388&oe=619971AE">
        </q-avatar>
        <span style="vertical-align:middle"> {{item.studentName}}</span>
        <span style="vertical-align:middle; margin-left: 100px" > + {{item.income}} ฿</span>
      </div>
    </div>
    </q-pull-to-refresh>
  </div>

</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Income',
  async created () {
    await this.fecthData()
  },
  data () {
    return {
      IncomeData: []
    }
  },
  methods: {
    async fecthData () {
      this.IncomeData = []
      const user = await firebase.getCurrentUser()
      await firebase.firestore().collection('Income')
        .where('userID', '==', user.uid)
        .orderBy('confrimTime', 'desc')
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              const obj = {}
              obj.income = doc.data().income
              obj.studentName = doc.data().studentName
              this.IncomeData.push(obj)
            })
          }
        })
    },
    refresh (done) {
      setTimeout(async () => {
        await this.fecthData()
        done()
      }, 1000)
    }
  },
  computed: {
    totalIncome () {
      let sum = 0
      this.IncomeData.forEach((item) => {
        sum += item.income
      })
      return sum
    }
  }
}

</script>

<style scoped>
.Inn-block {
  background-color: lightgrey;
  width: 300px;
  height: auto;
  border: 0.5px solid black;
  padding: 15px;
  margin: 20px;
}
</style>
