<template>
  <div>

    <template v-if="tab === 'register'">
      <p class="text-center">Sign up with credentials</p>
    </template>
    <template v-else>
      <p class="text-center">Sign in with credentials</p>
    </template>

    <q-form @submit="submitForm">
      <q-input
        v-model="formData.email"
        outlined
        class="q-mb-md"
        type="email"
        label="Email"/>
      <q-input
        v-model="formData.password"
        outlined
        class="q-mb-md"
        type="password"
        label="Password" />
      <div class="flex flex-center">
        <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
          type="submit"
          color="primary"
          :label="tab"
        />
    </div>
    </q-form>

    <div class="flex flex-center">
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Google"
        @click="google"
        color="red"
      />
    </div>
    <div class="text-center q-my-md">
      <q-btn
        v-if="tab !== 'register'"
        flat
        @click="forgotPassword"
        label="Forgot Password?"
        color="green"
        class="text-capitalize rounded-borders"
      />
    </div>
    <q-dialog v-model="resetPwdDialog">
      <ForgotPassword />
    </q-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'
import ForgotPassword from 'components/ForgotPassword'
export default {
  name: 'AuthComponent',
  props: ['tab'],
  components: { ForgotPassword },
  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      resetPwdDialog: false
    }
  },
  methods: {
    submitForm () {
      if (this.tab === 'login') {
        this.signInExistingUser(this.formData.email, this.formData.password)
      } else {
        this.createUser(this.formData.email, this.formData.password)
      }
    },
    google () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          this.$q.notify({ message: 'Sign In Success.' })
          this.$router.push('/home')
        })
        .catch(error => console.log('error', error))
    },
    signInExistingUser (email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          this.$q.notify({ message: 'Sign In Success.' })
          this.$router.push('/home')
        })
        .catch(error => {
          this.$q.notify({ message: `${error}` })
        })
    },
    createUser (email, password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(auth => {
          this.$q.notify({ message: 'Sign In Success.' })
          this.$router.push('/home')
        })
        .catch(error => {
          console.log('error', error)
          this.$q.notify({ message: `${error}` })
        })
    },
    forgotPassword () {
      this.resetPwdDialog = true
    }
  }
}
</script>

<style scoped>

</style>
