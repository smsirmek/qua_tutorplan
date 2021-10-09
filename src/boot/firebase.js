// eslint-disable-next-line import/default
import firebase from 'firebase/app'
import 'firebase/auth'

// set vars for process.env
const firebaseConfig = {
  apiKey: 'AIzaSyC-111Nm0R7-d2dwEVeE7IGueXqKF0MpsM',
  authDomain: 'quatutorplan.firebaseapp.com',
  projectId: 'quatutorplan',
  storageBucket: 'quatutorplan.appspot.com',
  messagingSenderId: '253676652545',
  appId: '1:253676652545:web:6a2bfb1521a5ada5005800',
  measurementId: 'G-DT9WVS8EWV'
}

// if firebase isn't already initialize, initialize using the above credentials
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export default firebase
