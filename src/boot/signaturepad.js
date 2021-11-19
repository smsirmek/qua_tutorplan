import { boot } from 'quasar/wrappers'
import SignaturePad from 'vue-signature-pad'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default boot(async ( { app }) => {
app.use(VueSweetalert2)  
app.use(SignaturePad)
  // something to do
})
