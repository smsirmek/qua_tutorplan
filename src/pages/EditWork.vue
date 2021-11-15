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
      <div class="q-px-md q-pt-sm">
      <q-date v-model="date" filled type="date" hint="Native date"/>
      </div>
    </div>
    <div class="row q-pt-md">
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
          label="Edit"
          @click="setUpLogic"
        />
    </div>
    </q-banner>
  </div>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase'
import { useQuasar } from 'quasar'
const db = firebase.firestore()
let User
export default {
  data () {
    return {
      title: null,
      date: [],
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
      ],
      quasarPlugin: useQuasar(),
      Check: []
    }
  },
  methods: {
    backToHome () {
      this.$router.push('/home')
    },
    async queryWork () {
      this.showLoading(true)
      await db.collection('WorkList').doc(this.$route.params.Key).get()
        .then((doc) => {
          this.title = doc.data().Title
          this.date = doc.data().Date
          this.beginingTime = doc.data().BeginingTime
          this.endingTime = doc.data().EndingTime
          this.serviceCharge = doc.data().Amountperhour
          this.details = doc.data().Details
          this.name = doc.data().Name
          this.timeCalculator = doc.data().Timeinminutes
        }).catch((err) => { console.log(err) })
      console.log(this.name)
      this.showLoading(false)
    },
    async editWork () {
      const User = await firebase.getCurrentUser()
        await db.collection('WorkList').doc(this.$route.params.Key).update({
          Title: this.title,
          Name: this.name,
          Date: this.date,
          Timeinminutes: this.timeCalculator,
          Details: this.details,
          Amountperhour: this.serviceCharge,
          Totalservicecharge: this.totalServicecharge,
          BeginingTime: this.beginingTime,
          EndingTime: this.endingTime,
          userId: User.uid
        }).catch((err) => { console.log(err) })
    },
    async queryDate () {
      await db.collection('WorkList').where('userId', '==', User.uid).get()
      .then((doc) => {
        doc.forEach((doc) => {
          const obj = {}
        obj.beginTime  = moment(doc.data().Date).format('YYYY-MM-DD').concat(' '+ doc.data().BeginingTime)
        obj.endTime = moment(doc.data().Date).format('YYYY-MM-DD').concat(' '+ doc.data().EndingTime)
          this.Check.push(obj)
        })
      })
    }, 
    async checkDateTime () {
      {
      for(let i=0; i<this.Check.length; i++){
          for(let j=0; j<this.date.length; j++){
            const timeAddBegin = moment(this.date[j]).format('YYYY-MM-DD').concat(' '+this.beginingTime)
            const timeAddEnd = moment(this.date[j]).format('YYYY-MM-DD').concat(' '+this.endingTime)
            const checkTimeBetween = moment(timeAddBegin).isBetween(this.Check[i].beginTime, this.Check[i].endTime)
            const checkTimeBetweenEnd = moment(timeAddEnd).isBetween(this.Check[i].beginTime, this.Check[i].endTime)
            const checkBeginTime = moment(timeAddBegin).isSame(moment(this.Check[i].beginTime))
            const checkEndTime = moment(timeAddEnd).isSame(moment(this.Check[i].endTime))
            const checkQueryTimeBetween = moment(this.Check[i].beginTime).isBetween(timeAddBegin, timeAddEnd)
            const log = console.log
            
            if(checkTimeBetween || checkBeginTime || checkEndTime || checkTimeBetweenEnd || checkQueryTimeBetween){
              this.quasarPlugin.notify({message: `Schedule conflict`, color: 'red'})
              return true
            }else{
              }
          }          
      }
      return false
      }
    },
    async setUpLogic () {
      const checkDateTime = await this.checkDateTime()
      const checkValidate = await this.inputValidate()
      const log = console.log
      if(checkValidate && !checkDateTime || checkDateTime === undefined){
      // log(checkDateTime)
      // log(checkValidate)
         await  this.editWork()
         await this.updateStudentDebt()
        await this.createStudentBill()
       this.$router.push('/home')
      }
    },
    async inputValidate (){
      if (this.title && this.name && this.date && this.timeCalculator  && this.details && this.serviceCharge && this.totalServicecharge && this.beginingTime && this.endingTime){
        return true
      }else{
        return false
      }
    },
    async updateStudentDebt () {
      await db.collection('StudentList').doc(this.name.value).update({
        debt: this.name.Debt + this.totalServicecharge
      }).catch((err) => { console.log(err) }).then(() => { console.log('update success') })
    },
    async createStudentBill () {
      const m = moment(this.endingTime, 'h:mm').diff(moment(this.beginingTime, 'h:mm'), 'minutes')
      const hours = Math.floor(m / 60)
      const minutes = m % 60
      let prepare
      if (minutes !== 0) {
        let x = + minutes * 0.01
        prepare = hours + x
      } else {
        prepare = hours
      }
      await db.collection('Bill').add({
        Date: moment(this.date).format('DD/MM/YYYY'),
        Hour: prepare,
        Total: this.totalServicecharge,
        paid: false,
        studentName: this.name.label,
        userId: User.uid
      })

    },
    showLoading (isLoading) {
      if (isLoading) {
        this.quasarPlugin.loading.show()
      } else if (!isLoading) {
        this.quasarPlugin.loading.hide()
      }
    },
  },
  computed: {
    totalServicecharge () {
      let sum = 0
      let excessTime = 0
      let finalTime = 0
      if(moment(this.beginingTime, 'h:mm').isBefore(moment(this.endingTime,'h:mm'))){
      const totalTime = moment(this.endingTime, 'h:mm').diff(moment(this.beginingTime, 'h:mm'), 'minutes')
      if (totalTime % 60 !== 0) {
        excessTime = totalTime % 60
        finalTime = (((totalTime - excessTime) + 60) / 60)
        sum = finalTime * this.serviceCharge
      } else {
        sum = (totalTime / 60) * this.serviceCharge
      }
      return sum
    }
    },
    timeCalculator () {
      let excessTime = 0
      let finalTime = 0
      if(moment(this.beginingTime, 'h:mm').isBefore(moment(this.endingTime, 'h:mm'))){
      const totalTime = moment(this.endingTime, 'h:mm').diff(moment(this.beginingTime, 'h:mm'), 'minutes')
      if (totalTime % 60 !== 0) {
        excessTime = totalTime % 60
        finalTime = (((totalTime - excessTime) + 60) / 60)
      } else {
        finalTime = totalTime
      }
      return finalTime
      }else{
        this.quasarPlugin.notify(
          {message: 'Please select new time', color: 'red'}
          )
       }
    }

  },
  async created () {
    User = await firebase.getCurrentUser()
    await this.queryWork()
    await this.queryDate()
  }
}
</script>

<style></style>
