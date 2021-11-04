<template>
  <q-page class="flex q-pa-md">
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-date v-model="selectedDate" :events="eventsFn" mask="YYYY/MM/DD" />
      </div>
      <br />
      <q-separator />
      <span >TODO : LIST</span>
      <div>
        <q-tab-panels
          v-model="selectedDate"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel :name="showEvent" class="bg-white-1 rounded-borders">
            <q-list bordered class="rounded-borders">
                <q-item clickable v-ripple v-for="(item, index) in showEvetTitle" :key="index">
                  <q-item-section>
                    <q-slide-item @right="deleteStudentData(item.docID)">
                      <template v-slot:right>
                        <q-icon name="delete" />
                      </template>
                      <q-slide-item @left="editStudentData(item.docID)">
                        <template v-slot:left>
                          <q-icon name="edit" />
                        </template>
                        <q-banner class="bg-grey-3 rounded-borders">
                          <q-item-section outlined>
                            <q-item-label lines="1"
                              >Student name :
                              {{ item.studentName }}</q-item-label
                            >
                            <q-item-label lines="2"
                              >Title : {{ item.title }}</q-item-label
                            >
                            <q-item-label lines="3"
                              >Start time : {{ item.startTime }}</q-item-label
                            >
                            <q-item-label lines="4"
                              >End time : {{ item.endTime }}</q-item-label
                            >
                            <q-item-label lines="5"
                              >Details : {{ item.details }}</q-item-label
                            >
                          </q-item-section>
                        </q-banner>
                    </q-slide-item>
                    </q-slide-item>
                  </q-item-section>
                </q-item>
            </q-list>
            <br />
          </q-tab-panel>
        </q-tab-panels>
        <q-page-sticky position="bottom-right" :offset="[23, 23]">
          <q-btn fab icon="add" color="primary" @click="goToAddToDoList" />
        </q-page-sticky>
      </div>
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import { useQuasar } from 'quasar'
const db = firebase.firestore()
export default {
  name: 'Home',
  data () {
    return {
      user: null,
      email: null,
      selectedDate: moment().locale('th').format('YYYY/MM/DD'),
      Date: [],
      quasarPlugin: useQuasar()
    }
  },
  async created () {
    await this.queryTodolist()
  },
  methods: {
    goToAddToDoList () {
      this.$router.push('/add/work')
    },
    async queryTodolist () {
      this.showLoading(true)
      this.Date = []
      const User = await firebase.getCurrentUser()
      await db
        .collection('Todolist')
        .where('userId', '==', User.uid)
        .get()
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
        })
        .catch((err) => console.log(err))
      this.showLoading(false)
    },
    async deleteStudentData (docID) {
      await db
        .collection('Todolist')
        .doc(docID)
        .delete()
        .then(
          this.queryTodolist(),
          this.quasarPlugin.notify({ message: 'Delete success', color: 'red' })
        )
        .catch((error) => {
          console.log(error)
          this.quasar.notify({
            type: 'negative',
            message: `Error Code : ${error}`
          })
        })
    },
    async editStudentData (docID) {
      this.$router.push('/edit/work/' + docID)
    },
    showLoading (isLoading) {
      if (isLoading) {
        this.quasarPlugin.loading.show()
      } else if (!isLoading) {
        this.quasarPlugin.loading.hide()
      }
    },
    async refresh (done) {
      setTimeout(async () => {
        await this.importStudentData()
        done()
      }, 1000000)
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
      if (this.Date.some((e) => e.eventDate === this.selectedDate)) {
        return this.selectedDate
      }
      return null
    },
    showEvetTitle () {
      const test = []
      if (this.Date.some((e) => e.eventDate === this.selectedDate)) {
        this.Date.forEach((item) => {
          if (item.eventDate === this.selectedDate) {
            const x = {}
            x.eventDate = item.eventDate
            x.title = item.title
            x.startTime = item.startTime
            x.endTime = item.endTime
            x.studentName = item.studentName
            x.details = item.details
            x.docID = item.docID
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
