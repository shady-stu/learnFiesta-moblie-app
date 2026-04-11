import { useEffect, useState } from "react";
import { auth, db } from "@/api/services/firebase";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

type User = {
    uid: string;
    email: string;
    role: string;
};

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (firebaseUser: FirebaseUser | null) => {
                try {
                    setLoading(true);

                    if (!firebaseUser) {
                        setUser(null);
                        setLoading(false);
                        return;
                    }

                    const userDoc = await getDoc(
                        doc(db, "users", firebaseUser.uid)
                    );

                    const userData = userDoc.data();

                    if (!userData) {
                        setError("User not found in Firestore");
                        setUser(null);
                        setLoading(false);
                        return;
                    }

                    const fullUser: User = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email!,
                        role: userData.role,
                    };

                    setUser(fullUser);
                } catch (e: any) {
                    setError(e.message);
                } finally {
                    setLoading(false);
                }
            }
        );

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const userCred = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            return userCred.user;
        } catch (err: any) {
            setError(err.message || "Login failed");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            setError(null);

            await signOut(auth);
            setUser(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        login,
        logout,
        loading,
        error,
    };
};