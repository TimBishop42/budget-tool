
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";
import TransactionService from "./Rest/TransactionService";

const firebaseConfig = {
  apiKey: "AIzaSyB4KZkGIXussltji_ruFR-dSsRIy7SZNyQ",
  authDomain: "budget-tool-311f2.firebaseapp.com",
  databaseURL: "https://budget-tool-311f2.firebaseio.com",
  projectId: "budget-tool-311f2",
  storageBucket: "budget-tool-311f2.appspot.com",
  messagingSenderId: "288013794732",
  appId: "1:288013794732:web:033f3737fc6df85a998e09",
  measurementId: "G-XJHJW1XXH2"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData, roles) => {
  console.log("Generatuing User Document")
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    //User roles would be better served out of the firebase store - this gets messy controlling them through Spring Auth + DB
    const roles = await TransactionService.getUserRoles()
      .catch((error) => {
        console.log(error);
      })
      .then(response => {
        if (response.data[0]) {
          console.log("Use Role set to: " + response.data[0].authority);
          return response.data[0].authority
        }
        else {
          return null
        }
      })


    return {
      uid,
      ...userDocument.data(),
      roles
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};