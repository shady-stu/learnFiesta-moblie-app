import { db } from "@/api/services/firebase";
import { doc, setDoc } from "firebase/firestore";

export const setUserRole = async (
    uid: string,
    role: "student" | "instructor"
) => {
    await setDoc(doc(db, "roles", uid), {
        role,
    });
};