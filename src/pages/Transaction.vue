<template>
<div class="q-pa-md doc-container">
  <q-saparetor />
  <br><br>
  <q-table
    title="Transection"
    :rows="rows"
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
      rows: [
        {
          name: 'student1',
          TotalSum: 159,
          bill: 6.0
        },
        {
          name: 'student2',
          TotalSum: 237,
          bill: 9.0
        },
        {
          name: 'student3',
          TotalSum: 262,
          bill: 16.0
        },
        {
          name: 'student4',
          TotalSum: 305,
          bill: 3.7
        },
        {
          name: 'student5',
          TotalSum: 356,
          bill: 16.0
        }
      ]
    }
  }
}
</script>

<style>

</style>
