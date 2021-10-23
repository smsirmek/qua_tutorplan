<template>

  <q-page class="flex q-pa-md">
      <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar size="100px" font-size="52px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label><div class="text-h5">  Hi!! {{ user }}</div> </q-item-label>
          <q-item-label caption><div class="text-h6">{{ email }}</div> </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <div  class="absolute-bottom-right q-ma-xl q-pa-md">
    <q-btn
        class="flex-center"
        size="md"
        label="Logout"
        @click="logout"
        color="primary"
      />
      </div>
  </q-page>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Profile',
  data () {
    return {
      user: '',
      email: ''
    }
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
  methods: {
    logout () {
      firebase.auth().signOut()
      this.$router.push('/')
        .then(() => {
          this.$q.notify({ message: 'Sign Out Success.' })
        })
        .catch(error => console.log('error', error))
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 720px
  height: 100%
  max-height: 360px
</style>
