<template>
  <div>
      <q-card class="flex q-pa-md">
    <q-layout class="full-width">
      <p class="text-center">Add to do list</p>
      <div class="q-ml-xl q-mr-xl">
      <q-form @submit="submitForm">
    <q-select outlined   class="q-mb-md" :options='options'  label="Student name" />
      <q-input
        v-model="formData.studentContact"
        outlined
        class="q-mb-md"
        type="title"
        label="Title"/>
        <q-date
        v-model="date"
        minimal
        class="q-mb-md"
      />
       <q-input filled v-model="btime" mask="time" :rules="['time']" label="beginning time">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="btime">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input filled v-model="etime" mask="time" :rules="['time']" label="ending time">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="etime">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        v-model="formData.studentName"
        outlined
        class="q-mb-md"
        type="textarea"
        label="details"/>
      <div class="flex flex-center">
        <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
          type="submit"
          color="primary"
          label="Add"
          @click="addNewStudent"
        />
    </div>
    </q-form>
      </div>
    </q-layout>
      </q-card>
  </div>
</template>

<script>
import Home from 'src/pages/Home.vue'
import firebase from 'firebase'
const db = firebase.firestore()

export default {
/* eslint-disable */
pages: { Home },
  data () {
    return {
      formData: {
        studentName: null,
        parentName: null,
        studentContact: null,
        parentContact: null,
        address: null
      },
      options: [],
      btime: null,
      etime: null,
      date: null
    }
  },
  methods: {
    submitForm () {
      console.log(this.formData)
    },
  async addNewStudent () {
      if(this.formData.studentName && this.formData.parentName && this.formData.studentContact && this.formData.parentContact && this.formData.address) {
          const User = await firebase.getCurrentUser()
          await db.collection('StudentList').add({ 
            studentName: this.formData.studentName,
            parentName: this.formData.parentName,
            studentContact: this.formData.studentContact,
            parentContact: this.formData.parentContact,
            address: this.formData.address,
            userId: User.uid
          }).catch((err)=>{alert('Error code',err)})
  this.$router.push('/list')
      }
      
    },
    async importStudentData () {
      this.showLoading(true)
      this.options = []
      const User = await firebase.getCurrentUser()
      await db.collection('StudentList').where('userId', '==', User.uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.newStudents.push({
              docID: doc.id,
              options: doc.data().studentName,
              
            },
            console.log(options))
          })
        }).catch((error) => {
          console.log(error)
          this.quasar.notify({
            type: 'negative',
            message: `Error Code : ${error}`
          })
        })
      this.showLoading(false)
    },
    showLoading (isLoading) {
      if (isLoading) {
        this.quasarPlugin.loading.show()
      } else if (!isLoading) {
        this.quasarPlugin.loading.hide()
      }
    },
  },
  async created () {
      await this.importStudentData
  }
}
</script>

<style scoped>
.text-center {
  color: crimson;
  font-weight: 700;
}
</style>
