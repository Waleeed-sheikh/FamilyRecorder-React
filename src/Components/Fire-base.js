











// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb2-457mRuLLXh50IsSpDZsZfamM_55OM",
  authDomain: "records-369f1.firebaseapp.com",
  projectId: "records-369f1",
  storageBucket: "records-369f1.appspot.com",
  messagingSenderId: "425865472038",
  appId: "1:425865472038:web:09f186e90502a6b5dc1ee7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app)

export{db}