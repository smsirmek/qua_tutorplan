<template>
  <div class="q-pa-md doc-container">
    <q-btn
      class="glossy"
      round
      color="primary"
      icon="home"
      @click="backToHome"
    />
    <p class="q-px-md q-pt-md">Title</p>
    <q-input v-model="Title" outlined type="title" class="q-px-md q-pd-md" />
    <p class="q-px-md q-pt-md">Name</p>
    <q-select class="q-px-md q-mt-md" outlined v-model="name" :options="names" />
    <div class="row">
      <div>
        <p class="q-px-md q-pt-md">Date</p>
      </div>
      <div>
        <div class="q-pa-md" style="max-width: 280px">
          <q-input filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
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
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  data () {
    return {
      Title: null,
      date: null,
      beginingTime: null,
      endingTime: null
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
  }
}
</script>

<style></style>
