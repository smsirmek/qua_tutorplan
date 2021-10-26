<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-item
          style="
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;
          "
        >
          <q-item-section avatar>
            <q-avatar size="100px" font-size="52px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item-label
          ><div class="text-h5 text-center">Hi!! {{ user }}</div>
        </q-item-label>
        <q-item-label
          ><div class="text-h6 text-center">{{ email }}</div>
        </q-item-label>
        <q-separator />
        <q-card-actions align="right" >
          <q-btn
            class="flex-center "
            size="md"
            label="Logout"
            @click="logout"
            color="primary"
          />
        </q-card-actions>
      </q-card>
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
      this.$router
        .push('/')
        .then(() => {
          this.$q.notify({ message: 'Sign Out Success.' })
        })
        .catch((error) => console.log('error', error))
    }
  }
}
</script>

<style lang="sass" scoped></style>
