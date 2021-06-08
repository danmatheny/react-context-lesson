import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAkKdWN30cStXbiwZ6UnNqPlCq4Nk7kVkI',
  authDomain: 'react-ztm-crwn-db-b2324.firebaseapp.com',
  projectId: 'react-ztm-crwn-db-b2324',
  storageBucket: 'react-ztm-crwn-db-b2324.appspot.com',
  messagingSenderId: '160864230493',
  appId: '1:160864230493:web:1c19bf45bb80eaf234c1b4',
  measurementId: 'G-09RRF71PEK',
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
