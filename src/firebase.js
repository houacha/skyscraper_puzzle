import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9FQ5-G3fI_R8FdXiik8XYa7KLxWsN6-U",
  authDomain: "skyscraper-puzzle.firebaseapp.com",
  projectId: "skyscraper-puzzle",
  storageBucket: "skyscraper-puzzle.appspot.com",
  messagingSenderId: "954605369225",
  appId: "1:954605369225:web:9a6ef20630a0cd8486d358",
  measurementId: "G-LCP4SQFQ6S",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
// const auth = firebase.auth();

export { db };
