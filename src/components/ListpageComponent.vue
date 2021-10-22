<template>
  <div>
    <q-layout>
      <q-list bordered class="rounded-borders">

      <q-item clickable v-ripple  v-for="newStudent in newStudents"
         :key="newStudent">

        <q-item-section>
       <q-item-label lines="1">{{newStudent.content}}</q-item-label>
          <q-item-label caption lines="2">
              {{newStudent.addr}}
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
export default {
  data () {
    return {
      formData: {
        studentName: '',
        parentName: '',
        studentContact: '',
        parentContact: '',
        address: ''
      },
      newStudents: [{
        content: 'LOREM',
        addr: 'Rolong'
      }]

    }
  },
  methods: {
    goToAddStudentData () {
      this.$router.push('/Add')
    }
  }
}
</script>

<style scoped>

</style>
