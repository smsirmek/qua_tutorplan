<template>
<q-card class="full-width">
  <div>
      <br>
      <q-btn
      class="glossy"
      round
      color="primary"
      icon="arrow_back"
      @click="backToHome"
    />
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
 <q-separator/>
 
    <div class="q-mt-md">
      <div class="row q-gutter-md justify-center" v-for="(img, key) in imgs" :key="key">
        <img style="border: thin silver solid;" :src="img">
      </div>
    </div>
  </div>

</q-card>
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()
export default {
  name: 'MySignaturePad',
  computed: {
  },
  data () {
    return {
      imgs: [],
      docID: this.$route.params.id,
      refID: null
    }
  },
    async created () {
    await this.querySignature()
  },
  methods: {
    undo () {
      this.$refs.signaturePad.undoSignature()
    },
    async save () {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      this.$refs.signaturePad.clearSignature()
      console.log(data)
      await db.collection('Signature').doc(this.refID).update({
        ImgsBase64: data
      }).catch((err) => { console.log(err) })

    },
    backToHome () {
      this.$router.push('/home')
    },
    async querySignature () {
      await db.collection('Signature')
        .where('workListID' , '==' , this.docID)
        .get()
        .then((snapshot) =>{
          snapshot.forEach((doc) =>{
            console.log("asdasd")
            if(doc.data().ImgsBase64 === null){
              this.imgs = []
              this.refID = doc.id
            }else {
              console.log(doc.data().ImgsBase64)
              this.imgs.push(doc.data().ImgsBase64)
              this.refID = doc.id
            }
          })
        })
    },
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
img {
  max-width: 100%;
  height: auto;
}
</style>
