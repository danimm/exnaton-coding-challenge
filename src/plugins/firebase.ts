import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const fb = firebase.initializeApp({
  apiKey: "AIzaSyAmFRWnvY3RLdxBTf-LE66fSxl88p5Fm00",
  authDomain: "exnaton-code-challenge.firebaseapp.com",
  projectId: "exnaton-code-challenge",
  storageBucket: "exnaton-code-challenge.appspot.com",
  messagingSenderId: "826963065669",
  appId: "1:826963065669:web:aaf80e02bd4f3ea985dc2c",
});

export default {
  firestore: fb.firestore(),
  auth: fb.auth(),
};
