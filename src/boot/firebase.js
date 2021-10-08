/* eslint-disable no-unused-vars */
import { boot } from 'quasar/wrappers'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC-111Nm0R7-d2dwEVeE7IGueXqKF0MpsM',
  authDomain: 'quatutorplan.firebaseapp.com',
  projectId: 'quatutorplan',
  storageBucket: 'quatutorplan.appspot.com',
  messagingSenderId: '253676652545',
  appId: '1:253676652545:web:fb27ebd04921e8fa005800',
  measurementId: 'G-HH5CL5BLYR'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const provider = new GoogleAuthProvider(app)
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
