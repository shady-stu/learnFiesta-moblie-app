import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCPY0xTaWhhPiFjo4DErNORiAwdhg1clE",
  authDomain: "learnfiesta-82598.firebaseapp.com",
  projectId: "learnfiesta-82598",
  storageBucket: "learnfiesta-82598.appspot.com",
  messagingSenderId: "923434476518",
  appId: "1:923434476518:web:bb6f5b157c5f7905076c27",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
