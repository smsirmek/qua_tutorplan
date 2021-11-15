<template>
  <div class="q-pa-md doc-container">
    <p> Name : {{ studentName }}</p>
    <div>
      <q-table
        title="Bill payments"
        :rows="BillData"
        :key="reRender"
        :columns="columns"
        row-key="docID"
        selection="multiple"
        :loading="isLoading"
        v-model:selected="selected"
      />
    </div>
    <q-separator/>
    <div style="
    width: 300px;
    border: 1px solid black;
    padding: 10px;
    margin: 5px;"
    >
      <p>HourTotal : {{totalHour}}</p>
      <p>GrantTotal : {{grantTotal}}</p>
      <q-btn style="background: #FF0080; color: white" label="Confirm pay" v-on:click="confirm = true" />
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">ยืนยันการชำระเงิน เมื่อยืนยันแล้วจะไม่สามารถเเก้ไขได้</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Confirm" color="primary" v-on:click="confirmPayment" />
            <q-btn flat label="Cancel" color="primary" v-on:click="confirm = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import firebase from 'firebase'
import moment from 'moment'
const columns = [
  {
    name: 'Date',
    align: 'center',
    label: 'Date',
    field: 'Date',
    sortable: true
  },
  {
    name: 'Hour',
    label: 'Hour',
    field: 'Hour',
    sortable: true
  },
  {
    name: 'Total',
    label: 'Total',
    field: 'Total',
    sortable: true
  }
]
export default {
  setup () {
    const selected = ref([])
    return {
      selected,
      columns
    }
  },
  data () {
    return {
      reRender: 0,
      studentName: this.$route.params.id,
      BillData: [],
      isLoading: false,
      confirm: false,
      uid: null,
      quasar: useQuasar()
    }
  },
  methods: {
    async fetchData () {
      this.selected = []
      this.BillData = []
      this.isLoading = true
      await firebase.firestore().collection('Bill')
        .where('studentName', '==', this.$route.params.id)
        .where('paid', '==', false)
        .orderBy('Date' ,'desc')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const obj = {}
            obj.docID = doc.id
            obj.Date = doc.data().Date
            obj.Hour = doc.data().Hour
            obj.Total = doc.data().Total
            this.BillData.push(obj)
          })
        })
      this.isLoading = false
    },

    async confirmPayment () {
      this.quasar.loading.show()
      let sum = 0
      for (let x = 0; x < this.selected.length; x++) {
        sum += this.selected[x].Total
        await firebase.firestore().collection('Bill').doc(this.selected[x].docID).update({
          paid: true
        }).catch((err) => {
          this.forceRerender()
          this.confirm = false
          this.quasar.notify({
            type: 'negative',
            message: `Error Code : ${err}`
          })
        })
      }
      await firebase.firestore().collection('Income').add({
        confrimTime: moment().locale('th').unix(),
        userID: this.uid,
        income: sum,
        studentName: this.studentName
      })
      this.confirm = false
      this.quasar.loading.hide()
      this.forceRerender()
    },
    forceRerender () {
      this.fetchData()
      this.reRender += 1
    }
  },
  computed: {
    totalHour () {
      let sum = 0
      for (let x = 0; x < this.selected.length; x++) {
        // eslint-disable-next-line no-unused-vars
        sum += this.selected[x].Hour
      }
      return sum
    },
    grantTotal () {
      let sum = 0
      for (let x = 0; x < this.selected.length; x++) {
        sum += this.selected[x].Total
      }
      return sum
    }
  },
  async created () {
    console.log(moment().locale('th').toDate())
    const user = await firebase.getCurrentUser()
    this.uid = user.uid
    await this.fetchData()
  }

}
</script>

<style>

</style>
