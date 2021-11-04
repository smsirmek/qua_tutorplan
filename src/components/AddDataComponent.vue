<template>
  <div>
      <q-card class="flex q-pa-md">
    <q-layout class="full-width">
      <p class="text-center">Add Student Data</p>
      <div class="q-ml-xl q-mr-xl">
      <q-form @submit="submitForm">
      <q-input
        v-model="formData.studentName"
        outlined
        class="q-mb-md"
        type="title"
        label="Student name"/>
      <q-input
        v-model="formData.studentContact"
        outlined
        class="q-mb-md"
        type="title"
        label="Student contact"/>
        <q-input
        v-model="formData.parentName"
        outlined
        class="q-mb-md"
        type="title"
        label="Parent name"/>
        <q-input
        v-model="formData.parentContact"
        outlined
        class="q-mb-md"
        type="title"
        label="Parent contact"/>
        <q-input
        v-model="formData.address"
        outlined
        class="q-mb-md"
        type="title"
        label="Address"/>
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
import ListpageComponent from 'src/components/ListpageComponent.vue'

import firebase from 'firebase'
const db = firebase.firestore()

export default {
/* eslint-disable */
components: { ListpageComponent },
  data () {
    return {
      formData: {
        studentName: null,
        parentName: null,
        studentContact: null,
        parentContact: null,
        address: null
      },
      tab: ''
    }
  },
  methods: {
    submitForm () {
      console.log(this.formData)
    },
  async addNewStudent () {
/* eslint-disable */ 
     // this.newStudent.push(newStudent)
      
      if(this.formData.studentName && this.formData.parentName && this.formData.studentContact && this.formData.parentContact && this.formData.address) {
          const User = await firebase.getCurrentUser()
          await db.collection('StudentList').add({ 
            studentName: this.formData.studentName,
            parentName: this.formData.parentName,
            studentContact: this.formData.studentContact,
            parentContact: this.formData.parentContact,
            address: this.formData.address,
            userId: User.uid,
            debt: 0
          }).catch((err)=>{alert('Error code',err)})
  this.$router.push('/list')
      }
      
    },
  }
}
</script>

<style scoped>
.text-center {
  color: crimson;
  font-weight: 700;
}
</style>
