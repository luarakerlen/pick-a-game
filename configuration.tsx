// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF_GH4WF-J-25rU6dXIH9Kt4XVoHyormE",
  authDomain: "pick-a-game-84844.firebaseapp.com",
  projectId: "pick-a-game-84844",
  storageBucket: "pick-a-game-84844.appspot.com",
  messagingSenderId: "728658603313",
  appId: "1:728658603313:web:d81e89a3d9fc5283c85410",
  measurementId: "G-7QZWX8W3Y3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
