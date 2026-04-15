import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { storeToken, scheduleTokenRefresh } from "./authService";

export const registerUser = async (
    email: string,
    password: string,
    fullName: string
): Promise<void> => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    await setDoc(doc(db, "users", uid), {
        name: fullName,
        email,
        role: "student",
        coursesCompleted: 0,
        hoursLearned: 0,
        createdAt: serverTimestamp(),
    });

    await setDoc(doc(db, "roles", uid), { role: "student" });

    const token = await userCred.user.getIdToken();
    await storeToken(token);
    scheduleTokenRefresh();
};

export const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case "auth/email-already-in-use":
            return "This email is already registered. Please log in.";
        case "auth/weak-password":
            return "Password is too weak. Use at least 6 characters.";
        default:
            return "Registration failed. Please try again.";
    }
};