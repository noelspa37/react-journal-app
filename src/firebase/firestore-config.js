import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCbKcw-281-IF3zHeIqGZXZlSIf9cIMiqo",
    authDomain: "react-journal-80da1.firebaseapp.com",
    projectId: "react-journal-80da1",
    storageBucket: "react-journal-80da1.appspot.com",
    messagingSenderId: "815864255956",
    appId: "1:815864255956:web:8ae87057eb351c4da47241"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Para acceder a la bd
const db = firebase.firestore();
//Para acceder al proveedor de autenticacion Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, googleAuthProvider, firebase,
}
