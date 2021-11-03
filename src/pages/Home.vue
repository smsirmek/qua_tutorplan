<template>
  <q-page class="flex q-pa-md">
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-date
          v-model="selectedDate"
          :events="eventsFn"
          mask="YYYY/MM/DD"
        />
      </div>
      <br>
      <q-separator/>
      <span>TODO : LIST</span>
      <div class="Inn-block">
        <q-tab-panels
          v-model="selectedDate"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
            <q-tab-panel   :name="showEvent">
                <div v-for="(item,index) in showEvetTitle" :key="index"  >
                  <span >Student name : {{item.studentName}}</span>
                  <br/>
                  <span >Title : {{item.title}}</span>
                  <br/>
                  <span >Start time : {{item.startTime}}</span>
                  <br/>
                  <span >End time : {{item.endTime}}</span>
                  <br/>
                  <span >Details : {{item.details}}</span>
                </div>
              <br/>
            </q-tab-panel>
        </q-tab-panels>
        <q-page-sticky position="bottom-right" :offset="[23, 23]">
      <q-btn fab icon="add" color="primary" @click="goToAddToDoList"/>
      </q-page-sticky>
      </div>
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
const db = firebase.firestore()
export default {
  name: 'Home',
  data () {
    return {
      user: null,
      email: null,
      selectedDate: moment().locale('th').format('YYYY/MM/DD'),
      Date: [],
      dummy: '2021/10/15'
    }
  },
  async created () {
    await this.queryTodolist()
  },
  methods: {
    goToAddToDoList () {
      this.$router.push('/Add/todolist')
    },
    async queryTodolist () {
      const User = await firebase.getCurrentUser()
      await db.collection('Todolist').where('userId', '==', User.uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.Date.push({
              eventDate: moment(doc.data().Date).format('YYYY/MM/DD'),
              title: doc.data().Title,
              startTime: doc.data().BeginingTime,
              endTime: doc.data().EndingTime,
              studentName: doc.data().Name,
              details: doc.data().Details,
              docID: doc.id
            })
          })
        }).catch((err) => console.log(err)).finally(() => console.log(this.Date))
    }
  },
  computed: {
    eventsFn () {
      const arr = []
      this.Date.forEach((item) => {
        arr.push(item.eventDate)
      })
      return arr
    },
    showEvent () {
      if (this.Date.some(e => e.eventDate === this.selectedDate)) {
        return this.selectedDate
      }
      return null
    },
    showEvetTitle () {
      const test = []
      if (this.Date.some(e => e.eventDate === this.selectedDate)) {
        this.Date.forEach((item) => {
          if (item.eventDate === this.selectedDate) {
            const x = {}
            x.eventDate = item.eventDate
            x.title = item.title
            x.startTime = item.startTime
            x.endTime = item.endTime
            x.studentName = item.studentName
            x.details = item.details
            test.push(x)
          }
        })
      }
      return test
    }
  }

}
</script>

<style scoped>
.Inn-block {
  background-color: #f2f4f7;
  width: 300px;
  height: auto;
  border: 0.5px solid black;
  padding: 15px;
}
</style>
