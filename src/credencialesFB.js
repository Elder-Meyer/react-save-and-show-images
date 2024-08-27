import firebase from 'firebase/compat/app'
import "firebase/compat/storage"
import "firebase/compat/firestore"


export const app = firebase.initializeApp({
    "projectId": import.meta.env.REA_PROJECT_ID,
    "appId": import.meta.env.REA_APP_ID,
    "storageBucket": import.meta.env.REA_STORAGE_BUCKET,
    "locationId": import.meta.env.REA_LOCATION_ID,
    "apiKey": import.meta.env.REA_API_KEY,
    "authDomain": import.meta.env.REA_AUTH_DOMAIN,
    "messagingSenderId": import.meta.env.REA_MESSAGING_SENDER_ID
  });
  