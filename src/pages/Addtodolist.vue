<template>
  <div class="q-pa-md doc-container">
    <q-btn
      class="glossy"
      round
      color="primary"
      icon="arrow_back"
      @click="backToHome"
    />
    <p class="q-px-md q-pt-md">Title</p>
    <q-input v-model="Title" outlined type="title" class="q-px-md q-pd-md" />
    <p class="q-px-md q-pt-md">Name</p>
    <q-select class="q-px-md q-mt-md" outlined v-model="name" :options="names" />
    <div class="row q-pt-md q-pb-md">
      <div>
        <p class="q-px-md q-pt-md">Date</p>
      </div>
      <q-input v-model="date" filled type="date" hint="Native date" />
    </div>
    <div class="row">
      <div class="q-px-md q-pt-md">Time</div>
      <div>
        <q-input
          filled
          v-model="beginingTime"
          mask="time"
          :rules="['time']"
          style="max-width: 112px"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="beginingTime">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="q-px-md q-pt-md">-</div>
      <div>
        <q-input
          filled
          v-model="endingTime"
          mask="time"
          :rules="['time']"
          style="max-width: 112px"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="endingTime">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <p class="q-px-md q-pt-sm">Alert</p>
          <q-select class="q-px-md q-mt-md" outlined v-model="model" :options="options" />
    <p class="q-px-md q-pt-md">Details</p>
          <q-input v-model="Title" outlined type="textarea" class="q-px-md q-pd-md" />
    <div class="row q-pt-md">
        <p class="q-px-md q-pt-md">Amount</p>
        <div>
        <q-input v-model="serviceCharge" outlined type="title" class="q-px-sm q-pd-md" style="max-width: 180px"/>
        </div>
        <div class="q-pt-md ">Baht/hour
        </div>
    </div>
    <div class="row q-pt-md">
        <p class="q-px-md q-pt-md">Total</p>
        <div>
        <q-input v-model="total" outlined type="title" class="q-px-sm q-pd-md" style="max-width: 220px"/>
        </div>
        <div class="q-pt-md ">Baht
        </div>
    </div>
    <div class="flex flex-center q-pt-md">
        <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md q-pt-"
        size="md"
          type="submit"
          color="primary"
          label="Add"
          @click="backToHome"
        />
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import moment from 'moment'
export default {
  data () {
    return {
      Title: null,
      date: null,
      beginingTime: null,
      endingTime: null,
      serviceCharge: null
    }
  },
  setup () {
    return {
      model: ref(null),
      options: [
        'On', 'Off'
      ],
      name: ref(null),
      names: [
        'Ezw', 'Ktr'
      ]
    }
  },
  methods: {
    backToHome () {
      this.$router.push('/home')
    }
  },
  computed: {
    total () {
      let sum = 0
      let b
      const a = moment(this.endingTime, 'h:mm').diff(moment(this.beginingTime, 'h:mm'), 'minutes')
      //  console.log(a)
      if (a % 60 !== 0) {
        b = a % 60
        sum = [(a - b) + 60] / 60 * this.serviceCharge
      } else {
        sum = (a / 60) * this.serviceCharge
      }
      return sum
    }

  }
}
</script>

<style></style>
