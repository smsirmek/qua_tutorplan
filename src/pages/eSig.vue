<template>
<q-card class="full-width">
  <div>
      <br>
    <div class="row justify-center">
    <span>Signature</span>
      <div class="col-12 q-mt-md row justify-center">
        <VueSignaturePad
          id="signature"
          width="90%"
          height="300px"
          ref="signaturePad"
          :images="imgs"
        />
      </div>
    </div>
    <div class="q-mt-md">
      <div class="row q-gutter-md justify-center">
        <q-btn class="col-2" outline icon="restore" @click="undo"/>
        <q-btn class="col-2" outline icon="save_alt" @click="save" />
        <q-btn
          class="col-2"
          text-color="red"
          unelevated
          icon="delete"
          label="Delete all"
          @click="imgs = []"
        />
      </div>
    </div>

    <div class="q-mt-md">
      <div class="row q-gutter-md justify-center" v-for="(img, key) in imgs" :key="key">
        <img style="border: thin silver solid;" :src="img">
      </div>
    </div>
  </div>

</q-card>
</template>

<script>
export default {
  name: 'MySignaturePad',
  computed: {
  },
  data () {
    return {
      imgs: [],
    }
  },
  methods: {
    undo () {
      this.$refs.signaturePad.undoSignature()
    },
    save () {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      this.$refs.signaturePad.clearSignature()
      console.log(isEmpty)
      console.log(data)
      this.imgs.push(data)
    }
  }
}
</script>

<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
.Inn-block {
  width: 300px;
  height: auto;
  padding: 15px;
}
</style>