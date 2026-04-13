import { initializeApp, getApps } from "firebase/app";
import Constants from "expo-constants";

const firebaseConfig = Constants.expoConfig?.extra?.firebase;

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export { app };