<template>
<div class="q-pa-md doc-container">
  <q-saparetor />
  <br><br>
  <q-table
    title="Transection"
    :rows="studentList"
    :columns="columns"
    row-key="name"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="TotalSum" :props="props">
          <q-badge color="green">
            {{ props.row.TotalSum }}
          </q-badge>
        </q-td>
        <q-td key="bill" :props="props">
          <q-btn push color="primary" label="Bill" v-on:click="billPage(props.row.name)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import firebase from 'firebase'
const db = firebase.firestore()
let User
export default {
  setup () {
    return {
      search: ref(''),
      $q: useQuasar()
    }
  },
  name: 'Transaction',
  methods: {
    billPage (studentName) {
      this.$router.push('/bill/' + studentName)
    },
    async queryTransactionData () {
      let prepareArray = []
      const snapshot = await db.collection('Bill').where('userId' ,'==', User.uid).where('paid' ,'==', false).get()
      snapshot.forEach((doc) =>{
        let obj = {}
        obj.studentName = doc.data().studentName
        obj.TotalSum = doc.data().Total
        prepareArray.push(obj)
      })

      const res = Array.from(prepareArray.reduce(
        (m, {studentName, TotalSum}) => m.set(studentName, (m.get(studentName) || 0) + TotalSum), new Map
      ), ([name, TotalSum]) => ({name, TotalSum}));
      this.studentList = res
    }
  },
  data () {
    return {
      columns: [{
        name: 'name',
        required: true,
        label: 'Student Name',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'TotalSum', align: 'center', label: 'TotalSum', field: 'TotalSum', sortable: true },
      { name: 'bill', label: 'Bill', field: 'Bill', sortable: true, align: 'center' }
      ],
      studentList: []
    }
  },
  async created () {
    User = await firebase.getCurrentUser()
    await this.queryTransactionData()
  }
}
</script>

<style>

</style>
