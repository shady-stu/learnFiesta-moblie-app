import { db } from "@/api/services/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const createUser = async (uid: string, email: string, name?: string) => {
    await setDoc(doc(db, "users", uid), {
        email,
        name: name || "",
        createdAt: serverTimestamp(),
    });
};