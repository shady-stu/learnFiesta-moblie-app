import { auth, db } from "@/api/services/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export type UserRole = "student" | "instructor";

export type AuthUser = {
    uid: string;
    email: string;
    role: UserRole;
};

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthUser> => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    const uid = userCred.user.uid;

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
    };
};

export const logoutUser = async () => {
    return signOut(auth);
};