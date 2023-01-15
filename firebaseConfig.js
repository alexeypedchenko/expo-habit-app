// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBx6xVwtanu-ml3C5sBeHfrNNZaisfw-Yg',
  authDomain: 'habitapp-99391.firebaseapp.com',
  projectId: 'habitapp-99391',
  storageBucket: 'habitapp-99391.appspot.com',
  messagingSenderId: '631506246732',
  appId: '1:631506246732:web:a76bdd2fc1cb6cc37568e9'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export const signInEmailPassword = ({ email, password }) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
