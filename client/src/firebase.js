// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nextstepnest-b2024.firebaseapp.com",
  projectId: "nextstepnest-b2024",
  storageBucket: "nextstepnest-b2024.appspot.com",
  messagingSenderId: "71564136365",
  appId: "1:71564136365:web:a55363694a475b8f84db24"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);