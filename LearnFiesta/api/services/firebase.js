import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// config
const firebaseConfig = {
  apiKey: "AIzaSyBCPY0xTaWhhPiFjo4DErNORiAwdhg1clE",
  authDomain: "learnfiesta-82598.firebaseapp.com",
  projectId: "learnfiesta-82598",
  storageBucket: "learnfiesta-82598.appspot.com",
  messagingSenderId: "923434476518",
  appId: "1:923434476518:web:bb6f5b157c5f7905076c27",
};

// init
const app = initializeApp(firebaseConfig);

// ✅ هذا المهم
export const db = getFirestore(app);