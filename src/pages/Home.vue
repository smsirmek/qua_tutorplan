<template>
  <q-page class="flex q-pa-md">
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-date
          v-model="selectedDate"
          :events="eventsFn"
          mask="YYYY/MM/DD"
        />
      </div>
      <br>
      <q-separator/>
      <span>TODO : LIST</span>
      <div class="Inn-block">
        <q-tab-panels
          v-model="selectedDate"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
            <q-tab-panel   :name="showEvent">
                <div v-for="(item,index) in showEvetTitle" :key="index"  >
                  <span >Title : {{item}}</span>
                </div>
              <br/>
              <span> NOTE : this still just a dummy Data</span>
            </q-tab-panel>
        </q-tab-panels>
        <q-page-sticky position="bottom-right" :offset="[23, 23]">
      <q-btn fab icon="add" color="primary" @click="goToAddToDoList"/>
      </q-page-sticky>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Home',
  data () {
    return {
      user: null,
      email: null,
      selectedDate: moment().locale('th').format('YYYY/MM/DD'),
      Date: [
        { eventDate: '2021/10/11', title: 'create by Plaithep', startTime: '10:30', endTime: '12:30' },
        { eventDate: '2021/10/01', title: 'น้องปลายเทพเป็นคนทำให้เองเเหละ', startTime: '10:30', endTime: '12:30' },
        { eventDate: '2021/10/05', title: 'น้องปลายเทพเป็นคนทำให้เองเเหละ', startTime: '10:30', endTime: '12:30' },
        { eventDate: '2021/10/05', title: 'อย่าลืมให้ credit ปลายเทพ ด้วยนะครับ', startTime: '10:30', endTime: '12:30' },
        { eventDate: '2021/10/26', title: 'ปลายเทพคนทำให้เองค้าบบ', startTime: '10:30', endTime: '12:30' },
        { eventDate: '2021/10/15', title: 'ปลายเทพมันเองค้าบ', startTime: '10:30', endTime: '12:30' }
      ],
      dummy: '2021/10/15'
    }
  },
  created () {

  },
  methods: {
    goToAddToDoList () {
      this.$router.push('/Add/todolist')
    }
  },
  computed: {
    eventsFn () {
      const arr = []
      this.Date.forEach((item) => {
        arr.push(item.eventDate)
      })
      return arr
    },
    showEvent () {
      if (this.Date.some(e => e.eventDate === this.selectedDate)) {
        return this.selectedDate
      }
      return null
    },
    showEvetTitle () {
      const test = []
      if (this.Date.some(e => e.eventDate === this.selectedDate)) {
        this.Date.forEach((item) => {
          if (item.eventDate === this.selectedDate) {
            test.push(item.title)
          }
        })
      }
      return test
    }
  }

}
</script>

<style scoped>
.Inn-block {
  background-color: #f2f4f7;
  width: 300px;
  height: auto;
  border: 0.5px solid black;
  padding: 15px;
}
</style>
