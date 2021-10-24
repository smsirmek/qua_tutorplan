<template>
  <div>
    <q-layout>
      <q-list bordered class="rounded-borders">

      <q-item clickable v-ripple  v-for="newStudent in newStudents"
         :key="newStudent">

        <q-item-section>
       <q-item-label lines="1">{{newStudent.StudentName}}</q-item-label>
          <q-item-label caption lines="2">
            Studentcontact: {{newStudent.StudentContact}}
          </q-item-label>
          <q-item-label caption lines="3">
            Parentname: {{newStudent.ParentName}}
          </q-item-label>
          <q-item-label caption lines="4">
            Parentcontact: {{newStudent.ParentContact}}
          </q-item-label>
          <q-item-label caption lines="5">
            Address: {{newStudent.Address}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-pa-md">
      <q-page-sticky position="bottom-right" :offset="[23, 23]">
      <q-btn fab icon="add" color="primary" @click="goToAddStudentData"/>
      </q-page-sticky>
    </div>
    </q-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()

export default {
  data () {
    return {
      newStudents: []
    }
  },
  methods: {
    goToAddStudentData () {
      this.$router.push('/Add')
    },
    async importStudentData () {
      const User = await firebase.getCurrentUser()
      await db.collection('StudentList').where('userId', '==', User.uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.newStudents.push({
              StudentName: doc.data().studentName,
              StudentContact: doc.data().studentContact,
              ParentName: doc.data().parentName,
              ParentContact: doc.data().parentContact,
              Address: doc.data().address
            })
          })
        })
    }
  },
  async created  () {
    await this.importStudentData()
  }
}
</script>

<style scoped>

</style>
