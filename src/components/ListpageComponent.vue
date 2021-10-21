<template>
  <div>

    <template v-if="tab === 'adddatastudent'">
      <p class="text-center" >Add Student Data</p>
      <div class="q-ml-xl q-mr-xl">
      <q-form @submit="submitForm">
      <q-input
        v-model="formData.sname"
        outlined
        class="q-mb-md"
        type="title"
        label="Studentname"/>
      <q-input
        v-model="formData.scont"
        outlined
        class="q-mb-md"
        type="title"
        label="Studentcontact"/>
        <q-input
        v-model="formData.pname"
        outlined
        class="q-mb-md"
        type="title"
        label="Parentname"/>
        <q-input
        v-model="formData.pcont"
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
        />
    </div>
    </q-form>
      </div>
    </template>
    <template v-else>
      <p class="text-center">show student data</p>
    </template>

  </div>
</template>

<script>
export default {

  props: ['tab'],

  data () {
    return {
      formData: {
        sname: '',
        pname: '',
        scont: '',
        pcont: '',
        address: ''
      },
      resetPwdDialog: false
    }
  },
  methods: {
    submitForm () {
      console.log(this.formData)
    }
  }
}
</script>

<style scoped>

</style>
