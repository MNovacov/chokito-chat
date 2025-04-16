import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyC26PXpRj7IoiR6iHkRqYcUiTD9EUR1vt4",
  authDomain: "chokitochat.firebaseapp.com",
  databaseURL: "https://chokitochat-default-rtdb.firebaseio.com",
  projectId: "chokitochat",
  storageBucket: "chokitochat.appspot.com",
  messagingSenderId: "393186701247",
  appId: "1:393186701247:web:939dbb5e1546a043863b0a",
  measurementId: "G-QDPD2TMXHF"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { db }
