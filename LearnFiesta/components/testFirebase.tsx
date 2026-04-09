import { collection, addDoc } from "firebase/firestore";
import { db } from "@/api/services/firebase";

export const testFirebase = async (): Promise<void> => {
  try {
    await addDoc(collection(db, "test"), {
      name: "TSX Working",
      createdAt: new Date(),
    });

    console.log("🔥 Firebase شغال 100%");
  } catch (error) {
    console.log("❌ error:", error);
  }
};