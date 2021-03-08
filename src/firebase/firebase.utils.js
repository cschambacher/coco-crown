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
        
        console.log('set', displayName)
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef)
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        console.log(newDocRef);
        batch.set(newDocRef, obj)
    });

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections)=>{
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollection.reduce( (accumulator, collection)=> {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    },{})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject)=> {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase

