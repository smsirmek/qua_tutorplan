<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="studentlist" label="Student list" />
      </q-tabs>

      <q-tab-panels v-model="tab">
        <q-tab-panel name="studentlist">

         <ListpageComponent :tab="tab"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import ListpageComponent from 'src/components/ListpageComponent.vue'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { ListpageComponent },
  data () {
    return {
      tab: 'studentlist'
    }
  }
}
</script>

<style scoped>

</style>
