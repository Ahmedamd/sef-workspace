// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDuXzadYgawi17cyEfuTrzPcdQwKgYcZOg",
  authDomain: "workspace-ex.firebaseapp.com",
  databaseURL: "https://workspace-ex.firebaseio.com",
  projectId: "workspace-ex",
  storageBucket: "workspace-ex.appspot.com",
  messagingSenderId: "820221947375",
  appId: "1:820221947375:web:589653ff16741b2c039a1a",
  measurementId: "G-EDYB3JB39Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth,provider,storage};
export default db;


