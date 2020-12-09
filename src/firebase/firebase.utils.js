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
 export const createUserProfileDocument = async (userAuth, additionalData)=>{
    // only do a save if someone is signed in so if we get back a valid object
    if(!userAuth) return;

    // if it exists we query Firestore to see if the document already exists
    // Firestore always returns an object: a reference or a snapshot even if nothing exists
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
           console.log('error creating user', error.message) 
        }
    }
    return userRef
 }
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase

