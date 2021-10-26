<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated >
        <!-- บัคauthไม่เครีย-->
        <q-toolbar>
          <q-btn v-show="this.user===null" flat @click="drawer = !drawer" round dense icon="menu" />
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
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple @click="nextPage('home')">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                Home
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="nextPage('List')">
              <q-item-section avatar>
                <q-icon name="article" />
              </q-item-section>
              <q-item-section>
                Listpage
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="nextPage('transaction')">
              <q-item-section avatar >
                <q-icon name="paid" />
              </q-item-section>
              <q-item-section>
                Transaction
              </q-item-section>

            </q-item>
            <q-item clickable v-ripple @click="nextPage('income')">
              <q-item-section avatar>
                <q-icon name="paid" />
              </q-item-section>
                <q-item-section>
                  Income
                </q-item-section>

            </q-item>

            <q-separator />

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section @click="logout">
                Logout
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
        <q-img class="absolute-top" src="https://image.freepik.com/free-vector/royal-watercolor-valentine-red-background_1340-4028.jpg" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://scontent.furt1-1.fna.fbcdn.net/v/t1.6435-9/198719011_1827885777385740_3001516384755195917_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=_2070sAhdO4AX9_8yd3&tn=Qr04Y8kpsZ_HGDfp&_nc_ht=scontent.furt1-1.fna&oh=87581080eb87e04b98f498d2de0a0839&oe=619CF792">
            </q-avatar>
            <div class="text-weight-bold">{{user}}</div>
            <div>{{email}}</div>
          </div>
        </q-img>
      </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'
import firebase from 'firebase'
export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      user: '',
      email: ''
    }
  },
  components: {
  },
  created () {
    firebase.auth().onAuthStateChanged((auth) => {
      if (auth) {
        this.user = auth.displayName
        this.email = auth.email
      } else {
        console.log('user name is null')
      }
    })
  },
  setup () {
    return {
      drawer: ref(false),
      miniState: ref(true)
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut()
      this.$router
        .push('/')
        .then(() => {
          this.$q.notify({ message: 'Sign Out Success.' })
        })
        .catch((error) => console.log('error', error))
    },
    nextPage (pg) {
      this.$router.push(`/${pg}`)
    }
  }
})
</script>
