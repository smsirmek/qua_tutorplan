import { boot } from 'quasar/wrappers'
import SignaturePad from 'vue-signature-pad'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ( { app }) => {
  

app.use(SignaturePad)
  // something to do
})
