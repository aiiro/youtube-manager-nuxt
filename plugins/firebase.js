import firebase from "firebase/app";
import "firebase/auth"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxx-xxxxxx.firebaseapp.com",
    databaseURL: "https://xxxxxxx-xxxxxx.firebaseio.com",
    projectId: "xxxxxxx-xxxxxxx-xxxxxx",
    storageBucket: "",
    messagingSenderId: "xxxxxxxxxxxx",
    appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxx"
  })
}

export default firebase;
