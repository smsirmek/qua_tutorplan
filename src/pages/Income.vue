<template>
  <div class="q-pa-md doc-container">
    <q-pull-to-refresh
      @refresh="refresh"
      color="orange-2"
      bg-color="black"
      icon="autorenew"
    >
    <q-card class="Inn-block item-center text-center">
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
    </q-card>

    <div style=" margin:10px;
    text-align: center;">
    <q-btn label="select date" icon="date_range" color="primary" @click="showDatePicker = true" />
    </div>
    <q-separator/>
    <q-card class="Date-card item-center" v-if="selectedRange.from != null">
      <div class="text-5 text-center text-weight-bold">{{selectedRange.from}} - {{selectedRange.to}}</div>
    </q-card>

     <q-card class="Inn-card" v-for="(item,index) in IncomeData" :key="index">
      <div id="photo" >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle2">{{item.studentName}}</q-item-label>
          <q-item-label caption> date {{item.confirmTime}}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label style="vertical-align:middle; margin-left: 50px" >+ {{item.income}} ฿</q-item-label>
        </q-item-section>
      </q-item>
      </div>
  </q-card>
      <q-dialog v-model="showDatePicker">
        <q-card>
          <div>
          <q-card-section class="item-center">
            <div class="text-h6 text-center">Please select range of date </div>
            <!-- <q-space />
            <q-btn icon="close" flat round dense v-close-popup /> -->
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <q-date v-model="selectedRange" range mask="YYYY-MM-DD"/>
          </q-card-section>
            <q-btn style="float: right; margin:10px;" color="primary" label="select" v-close-popup v-on:click="fecthData()" />
          </div>
        </q-card>
      </q-dialog>

    <q-card class="Inn-card item-center" v-if="selectedRange.from === null">
      <div class="text-5 text-center text-weight-bold">Please select date</div>
    </q-card>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h4 text-weight-bold text-center">Alert</div>
        </q-card-section>

        <q-card-section class="flex-center q-pt-none">
         <span class="text-h5">Data Not found</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    </q-pull-to-refresh>
  </div>

</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
export default {
  name: 'Income',
  async created () {
  },
  data () {
    return {
      IncomeData: [],
      showDatePicker: false,
      alert: false,
      // ? setting defaul valuse
      selectedRange: { from: null, to: null }
    }
  },
  methods: {
    async fecthData () {
      this.IncomeData = []
      const user = await firebase.getCurrentUser()
      await firebase.firestore().collection('Income')
        .where('userID', '==', user.uid)
        .where('confrimTime', '>=', moment(this.selectedRange.from).unix())
        .where('confrimTime', '<=', moment(this.selectedRange.to).unix())
        .orderBy('confrimTime', 'desc')
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              const obj = {}
              console.log(doc.data().confrimTime)
              obj.confirmTime = moment(doc.data().confirmTime).format('L')
              obj.income = doc.data().income
              obj.studentName = doc.data().studentName
              this.IncomeData.push(obj)
            })
          } else {
            this.alert = true
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
.Date-card {
  background-color: rgb(243, 239, 239);
  width: 300px;
  height: auto;
  border: 0.5px solid rgb(139, 136, 136);
  padding: 15px;
  margin: 20px;
}
.Inn-card {
  background-color: rgb(243, 239, 239);
  border: 0.5px solid rgb(0, 27, 3);
  padding: 5px;
  margin: 10px;
}
</style>
