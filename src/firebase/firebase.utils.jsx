import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCR6YymPBobqL5mu1MUpS95RVssAEMp-e8",
    authDomain: "pauz-db.firebaseapp.com",
    databaseURL: "https://pauz-db.firebaseio.com",
    projectId: "pauz-db",
    storageBucket: "pauz-db.appspot.com",
    messagingSenderId: "246061100968",
    appId: "1:246061100968:web:4561eaf2cf69868c3bb79d",
    measurementId: "G-CYCNBDWNGN"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Get a reference to the place in the database where the user is stored
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return getUserDocumentRef(userAuth.uid);
};

export const getUserDocumentRef = async uid => {
  if (!uid) return null;

  try {
    return firestore.doc(`users/${uid}`);
  } catch (error) {
    console.error('error fetching user', error.message);
  }
};

export default firebase;
