<template>
  <div>

    <template v-if="tab === 'adddStudentData'">
      <p class="text-center" >Add Student Data</p>
      <div class="q-ml-xl q-mr-xl">
      <q-form @submit="submitForm">
      <q-input
        v-model="formData.studentName"
        outlined
        class="q-mb-md"
        type="title"
        label="Studentname"/>
      <q-input
        v-model="formData.studentContact"
        outlined
        class="q-mb-md"
        type="title"
        label="Studentcontact"/>
        <q-input
        v-model="formData.parentName"
        outlined
        class="q-mb-md"
        type="title"
        label="Parentname"/>
        <q-input
        v-model="formData.parentContact"
        outlined
        class="q-mb-md"
        type="title"
        label="Parentcontact"/>
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
    </template>
    <template v-else>
      <p class="text-center">StudentList</p>
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
    </template>

  </div>
</template>

<script>
export default {

  props: ['tab'],

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
    submitForm () {
      console.log(this.formData)
    },
    addNewStudent () {
/* eslint-disable */     
      let newStudent = {
        content: this.sname,
        addr: this.address
      }
      this.newStudent.push(newStudent)
    }
    
  }
}
</script>

<style scoped>

</style>
