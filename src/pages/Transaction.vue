<template>
<div class="q-pa-md doc-container">
  <q-input v-model="search" filled type="search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <br>
   <div class="row">
  <div class="col-3 text-center text-bold">Name</div>
  <div class="col-6 text-center text-bold">GranTotal</div>
  <div class="col-3 text-center text-bold">Pay</div>
</div><br>
<div class="row">
  <div class="col-3 text-center ">Suttipong</div>
  <div class="col-6 text-center ">200</div>
  <div class="col-3 text-center "><q-btn @click= "billpage"
      size="xs"
      color="primary"
      label="Bill"
    /></div>
</div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup () {
    return {
      search: ref('')
    }
  },
  name: 'Transaction',
  methods: {
    billpage () {
      this.$router.push('/bill')
    }
  }
}
</script>

<style>

</style>
