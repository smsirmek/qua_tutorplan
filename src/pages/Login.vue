<template>
  <q-page>
    <div class="column q-pa-lg">
        <q-card square style="max-width:100%;height:auto;">
          <q-card-section class="bg-red">
            <h4 class="text-h5 text-white q-my-md">Tuterplan</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="red-5" class="full-width text-white" label="Sign In" />
          </q-card-actions>
           <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="red-7" class="full-width text-white" @click="google" label="Sign In With Google" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Create account <router-link to="/register">Register </router-link> </p>
          </q-card-section>
        </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    google () {
    }
  }
}
</script>

<style>
</style>
