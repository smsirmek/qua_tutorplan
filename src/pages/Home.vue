<template>

  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="$options"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="work" label="Work" />
        <q-tab name="listPage" label="Student Data" />
        <q-tab name="map" label="Map" />
        <q-tab name="transaction" label="Transaction" />
        <q-tab name="profile" label="Profile"/>
      </q-tabs>
    </q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Home',
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

<style scoped>

</style>
