import firebase from "firebase";
import { firebaseConfig } from "./firebase-config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
