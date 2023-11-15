import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Initialize Firebase
const app = initializeApp({
  apiKey: 'AIzaSyBKt5zU9_-fzg0GbhMbgUY8wnuJw0qxT-g',
  authDomain: 'bkconnect-f0697.firebaseapp.com',
  projectId: 'bkconnect-f0697',
  storageBucket: 'bkconnect-f0697.appspot.com',
  messagingSenderId: '1008055282179',
  appId: '1:1008055282179:web:36e77d4ab01bb12ed9fc36',
  measurementId: 'G-3M95B5GKLE'
})

// Firebase storage reference
const storage = getStorage(app)
export default storage

// firebase.js
// import firebase from 'firebase/app'
// import 'firebase/storage'

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID'
// }

// firebase.initializeApp(firebaseConfig)

// const storage = firebase.storage()

// export { storage, firebase as default }
