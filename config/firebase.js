import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDcCFL26sAaLAbpI3fqo6tgMM5c_kZxaXs",
  authDomain: "local-fe5bc.firebaseapp.com",
  projectId: "local-fe5bc",
  storageBucket: "local-fe5bc.appspot.com",
  messagingSenderId: "85055262174",
  appId: "1:85055262174:web:1b8042aa2c4631994f614f",
  measurementId: "G-PV72FM6B51",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
