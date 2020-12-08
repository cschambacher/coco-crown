import firebase from 'firebase/app';

import'firebase/firestore';

import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCnaCmAlGI1KKNGMHQY4jtuh_VJqarPLtE",
    authDomain: "coco-crown-db.firebaseapp.com",
    projectId: "coco-crown-db",
    storageBucket: "coco-crown-db.appspot.com",
    messagingSenderId: "899561976380",
    appId: "1:899561976380:web:f664b0478a9d01edaa8939",
    measurementId: "G-DLX8X4PE76"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


