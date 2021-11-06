<template>
  <div class="q-pa-md doc-container">
    <q-banner class="bg-grey-3 rounded-borders">
    <q-btn
      class="glossy"
      round
      color="primary"
      icon="arrow_back"
      @click="backToHome"
    />
    <p class="q-px-md q-pt-md flex flex-center " >Add Work</p>
    <p class="q-px-sm q-pt-sm">Title</p>
    <q-input v-model="title" outlined type="title" class="q-px-md q-pd-md" />
    <p class="q-px-sm q-pt-md">Name</p>
    <q-select class="q-px-md q-mt-md" outlined v-model="name" :options="studentNames" />
    <div class="row q-pt-md q-pb-md">
      <div>
        <p class="q-px-sm q-pt-md">Date</p>
      </div>
      <q-input v-model="date" filled type="date" hint="Native date" />
    </div>
    <div class="row">
      <div class="q-px-sm q-pt-md">Time</div>
      <div>
        <q-input
          filled
          v-model="beginingTime"
          mask="time"
          :rules="['time']"
          style="max-width: 105px"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer" >
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="beginingTime" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="q-px-md q-pt-md">-</div>
      <div>
        <q-input
          filled
          v-model="endingTime"
          mask="time"
          :rules="['time']"
          style="max-width: 105px"
          format24h
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="endingTime" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <p class="q-px-sm q-pt-sm">Alert</p>
          <q-select class="q-px-md q-mt-md" outlined v-model="alert" :options="options" />
    <p class="q-px-sm q-pt-md">Details</p>
          <q-input v-model="details" outlined type="textarea" class="q-px-md q-pd-md" />
    <div class="row q-pt-md">
        <p class="q-px-md q-pt-md">Amount</p>
        <div>
        <q-input v-model.number="serviceCharge" outlined type="title" class="q-px-sm q-pd-md" style="max-width: 140px"/>
        </div>
        <div class="q-pt-md ">Baht/hour
        </div>
    </div>
    <div class="row q-pt-md">
        <p class="q-px-md q-pt-md">Total</p>
        <div>
        <q-input v-model="totalServicecharge" outlined type="title" class="q-px-sm q-pd-md" style="max-width: 180px"/>
        </div>
        <div class="q-pt-md ">Baht
        </div>
    </div>
    <div class="flex flex-center q-pt-md">
        <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md q-pt-"
        size="md"
          type="submit"
          color="primary"
          label="Add"
          @click="addNewtodolist"
        />
    </div>
    </q-banner>
  </div>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase'
const db = firebase.firestore()
export default {
  data () {
    return {
      title: null,
      date: null,
      beginingTime: null,
      endingTime: null,
      serviceCharge: null,
      details: null,
      studentNames: [],
      documentid: [],
      name: null,
      alert: null,
      options: [
        'On', 'Off'
      ]
    }
  },
  methods: {
    backToHome () {
      this.$router.push('/home')
    },
    async importName () {
      const User = await firebase.getCurrentUser()
      await db.collection('StudentList').where('userId', '==', User.uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const obj = {}
            obj.label = doc.data().studentName
            obj.value = doc.id
            this.studentNames.push(obj)
          })
        })
    },
    async queryDebt () {
      await db.collection('StudentList').doc(this.name.value).get().then((doc) => { this.Debt = doc.data().debt })
    },
    async addNewtodolist () {
      console.log(this.name.value)
      await this.queryDebt()
      console.log(this.Debt)
      const User = await firebase.getCurrentUser()
      if (this.title && this.name && this.date && this.timeCalculator && this.alert && this.details && this.serviceCharge && this.totalServicecharge && this.beginingTime && this.endingTime) {
        await db.collection('Todolist').add({
          Title: this.title,
          Name: this.name,
          Date: this.date,
          Timeinminutes: this.timeCalculator,
          Alert: this.alert,
          Details: this.details,
          Amountperhour: this.serviceCharge,
          Totalservicecharge: this.totalServicecharge,
          BeginingTime: this.beginingTime,
          EndingTime: this.endingTime,
          userId: User.uid
        }).catch((err) => { console.log(err) })
        await this.updateStudentDebt()
        this.$router.push('/home')
      }
    },
    async updateStudentDebt () {
      await db.collection('StudentList').doc(this.name.value).update({
        debt: this.Debt + this.totalServicecharge
      }).catch((err) => { console.log(err) }).then(() => { console.log('update success') })
    }
  },
  computed: {
    totalServicecharge () {
      let sum = 0
      let excessTime = 0
      let finalTime = 0
      const totalTime = moment(this.endingTime, 'h:mm').diff(moment(this.beginingTime, 'h:mm'), 'minutes')
      if (totalTime % 60 !== 0) {
        excessTime = totalTime % 60
        finalTime = (((totalTime - excessTime) + 60) / 60)
        sum = finalTime * this.serviceCharge
      } else {
        sum = (totalTime / 60) * this.serviceCharge
      }
      return sum
    },
    timeCalculator () {
      let excessTime = 0
      let finalTime = 0
      const totalTime = moment(this.endingTime, 'h:mm').diff(moment(this.beginingTime, 'h:mm'), 'minutes')
      if (totalTime % 60 !== 0) {
        excessTime = totalTime % 60
        finalTime = (((totalTime - excessTime) + 60) / 60)
      } else {
        finalTime = totalTime
      }
      return finalTime
    }

  },
  async created () {
    await this.importName()
  }
}
</script>

<style></style>
