import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "projectgroove-2a49e.firebaseapp.com",
    databaseURL: "https://projectgroove-2a49e.firebaseio.com",
    projectId: "projectgroove-2a49e",
    storageBucket: "projectgroove-2a49e.appspot.com",
    messagingSenderId: ""
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
