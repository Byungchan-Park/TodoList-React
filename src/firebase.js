import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC0ClCE5VpKuPbGqCttRsxsn6oM6KU6nwI",
  authDomain: "to-do-list-with-react-42ec5.firebaseapp.com",
  databaseURL: "https://to-do-list-with-react-42ec5.firebaseio.com",
  projectId: "to-do-list-with-react-42ec5",
  storageBucket: "to-do-list-with-react-42ec5.appspot.com",
  messagingSenderId: "394980693047",
  appId: "1:394980693047:web:63d28f214df313eb8e5bb2",
  measurementId: "G-HRWYM2124P",
});

const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

export { db };
