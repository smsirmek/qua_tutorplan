<template>
  <q-layout view="lHh Lpr lFf">
<q-header elevated >
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>
            <div class="text-center">Tutorplan</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
    <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"

        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
            <router-link to = "/home">
              <q-item-section>
                Home
              </q-item-section>
            </router-link>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="explore" />
              </q-item-section>
            <router-link to = " ">
              <q-item-section>
                Map
              </q-item-section>
            </router-link>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="article" />
              </q-item-section>
            <router-link to = " ">
              <q-item-section>
                Listpage
              </q-item-section>
            </router-link>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="paid" />
              </q-item-section>
            <router-link to = "/transaction">
              <q-item-section>
                Transaction
              </q-item-section>
            </router-link>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="paid" />
              </q-item-section>
              <router-link to = "/income">
                <q-item-section>
                  Bill
                </q-item-section>
              </router-link>
            </q-item>

            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
            <router-link to = "/profile">
              <q-item-section>
                Profile
              </q-item-section>
            </router-link>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    return {
      drawer: ref(false),
      miniState: ref(true)
    }
  }
})
</script>
