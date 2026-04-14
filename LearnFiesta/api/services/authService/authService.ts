import { auth, db } from "@/api/services/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";

export type UserRole = "student" | "instructor";

export type AuthUser = {
    uid: string;
    email: string;
    role: UserRole;
    token: string;
};

export const storeToken = async (token: string) => {
    await SecureStore.setItemAsync("firebaseIdToken", token);
};

export const getStoredToken = async () => {
    return await SecureStore.getItemAsync("firebaseIdToken");
};

export const getIdToken = async (): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
};

export const clearToken = async () => {
    await SecureStore.deleteItemAsync("firebaseIdToken");
};

export const scheduleTokenRefresh = () => {
    const user = auth.currentUser;
    if (!user) return;

    const interval = setInterval(async () => {
        const freshToken = await user.getIdToken(true);
        await storeToken(freshToken);
    }, 50 * 60 * 1000);

    return interval;
};

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthUser> => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    const token = await userCred.user.getIdToken();
    await storeToken(token);
    scheduleTokenRefresh();

    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore");
    }

    const data = userDoc.data();
    const role = data.role as UserRole;

    return {
        uid,
        email: userCred.user.email!,
        role,
        token,
    };
};

export const logoutUser = async () => {
    await clearToken();
    return signOut(auth);
};