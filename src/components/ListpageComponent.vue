<template>
  <div>
    <q-layout>
      <q-pull-to-refresh @refresh="refresh">
      <q-list bordered class="rounded-borders">

      <q-item clickable v-ripple  v-for="newStudent in newStudents"
         :key="newStudent">

        <q-item-section>
          <q-slide-item  @right="deleteStudentData(newStudent.docID)">
        <template v-slot:right>
          <q-icon name="delete" />
        </template>
        <q-slide-item @left="editStudentData(newStudent.docID)">
        <template v-slot:left>
          <q-icon name="edit" />
        </template>
          <q-banner class="bg-grey-3">
          <q-item-section >
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
          </q-banner>
        </q-slide-item>
          </q-slide-item>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-pa-md">
      <q-page-sticky position="bottom-right" :offset="[23, 23]">
      <q-btn fab icon="add" color="primary" @click="goToAddStudentData"/>
      </q-page-sticky>
    </div>
    </q-pull-to-refresh>
    </q-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'
const db = firebase.firestore()

export default {
  data () {
    return {
      newStudents: [],
      addOn: useQuasar()
    }
  },
  methods: {
    goToAddStudentData () {
      this.$router.push('/Add')
    },
    async importStudentData () {
      this.showLoading(true)
      this.newStudents = []
      const User = await firebase.getCurrentUser()
      await db.collection('StudentList').where('userId', '==', User.uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.newStudents.push({
              docID: doc.id,
              StudentName: doc.data().studentName,
              StudentContact: doc.data().studentContact,
              ParentName: doc.data().parentName,
              ParentContact: doc.data().parentContact,
              Address: doc.data().address
            })
          })
        }).catch((err) => { console.log(err) })
      this.showLoading(false)
    },
    async deleteStudentData (docId) {
      await db.collection('StudentList').doc(docId).delete()
        .then(this.importStudentData, this.addOn.notify({ message: 'Update success', color: 'red' }))
        .catch((error) => { console.log(error) }, this.addOn.notify({ message: this.error, color: 'red' }))
    },
    async editStudentData (docId) {
      this.$router.push('/edit/studentdata/' + docId)
    },
    showLoading (isLoading) {
      if (isLoading) {
        this.addOn.loading.show()
      } else if (!isLoading) {
        this.addOn.loading.hide()
      }
    },
    refresh (done) {
      setTimeout(async () => {
        await this.importStudentData()
        done()
      }, 1500)
    }

  },
  async created  () {
    await this.importStudentData()
  },
  setup () {
    const $q = useQuasar()
    let timer

    function finalize (reset) {
      timer = setTimeout(() => {
        reset()
      }, 1000)
    }

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    return {
      onLeft ({ reset }) {
        $q.notify('Left action triggered. Resetting in 1 second.')
        finalize(reset)
      },
      onRight ({ reset }) {
        $q.notify('Delete success')
        console.log(reset)
        finalize(reset)
      }
    }
  }
}

</script>

<style scoped>

</style>
