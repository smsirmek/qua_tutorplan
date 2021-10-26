/* eslint-disable vue/no-parsing-error */
<template>
  <div>
      <q-card class="flex q-pa-md">
    <q-layout class="full-width">
      <p class="text-center"> Student Data</p>
      <div class="q-ml-xl q-mr-xl">
      <q-form @submit="submitForm">
      <q-input
        v-model="studentName "
        outlined
        class="q-mb-md"
        type="title"
        label="Student name"/>
      <q-input
        v-model="studentContact"
        outlined
        class="q-mb-md"
        type="title"
        label="Student contact"/>
        <q-input
        v-model="parentName"
        outlined
        class="q-mb-md"
        type="title"
        label="Parent name"/>
        <q-input
        v-model="parentContact"
        outlined
        class="q-mb-md"
        type="title"
        label="Parent contact"/>
        <q-input
        v-model="address"
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
          label="Edit"
          @click="editStudentData()"
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
import { useQuasar } from 'quasar'
//  const db = firebase.firestore()

export default {
/* eslint-disable */
components: { ListpageComponent },
  data () {
    return {
      studentName: null,
      studentContact: null,
      parentName: null,
      parentContact: null,
      address: null,
      not: useQuasar(),
    }
  },
  methods: {
    submitForm () {
      console.log(this.formData)
    },
  async editStudentData () {
      if(this.studentName && this.parentName && this.studentContact && this.parentContact && this.address) {
       await firebase.firestore().collection('StudentList').doc(this.$route.params.Key)
       .update({
            studentName: this.studentName,
            studentContact: this.studentContact,
            parentName: this.parentName,
            parentContact: this.parentContact,
            address: this.address
       }).then(() => {
           console.log('Update success')
           this.not.notify({message:'Update success', color:'red'})
           this.$router.back()
       }).catch((err) => {console.log(err)})
      }

    },
    async getStudentData () {
      this.showLoading(true)
        this.formData = []
        await firebase.firestore().collection('StudentList').doc(this.$route.params.Key)
        .get()
        .then((doc) => {
             this.studentName = doc.data().studentName
             this.studentContact = doc.data().studentContact
             this.parentName = doc.data().parentName
             this.parentContact = doc.data().parentContact
             this.address = doc.data().address
        })
      this.showLoading(false)
    },
    showLoading (isLoading) {
      if(isLoading){
        this.not.loading.show()
      }
      else if(!isLoading){
        this.not.loading.hide()
      }
    }
  },
  async created () {
      await this.getStudentData()
  }

}
</script>

<style scoped>
.text-center {
  color: crimson;
  font-weight: 700;
}
</style>
