import { db } from "@/api/services/firebase";
import { auth } from "@/api/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, setDoc, type Unsubscribe } from "firebase/firestore";

export type UserRole = "student" | "instructor";

const normalizeRole = (role: unknown): UserRole | null => {
    const value = String(role ?? "").toLowerCase();

    if (value === "student" || value === "instructor") return value;
    return null;
};

export const setUserRole = async (
    uid: string,
    role: UserRole
) => {
    await Promise.all([
        setDoc(doc(db, "roles", uid), { role }),
        setDoc(doc(db, "users", uid), { role }, { merge: true }),
    ]);
};

export const subscribeToCurrentUserRole = (
    onNext: (role: UserRole | null) => void,
    onError?: (error: Error) => void
): Unsubscribe => {
    let unsubscribeUserDoc: Unsubscribe | null = null;
    let unsubscribeRoleDoc: Unsubscribe | null = null;
    let userDocRole: UserRole | null = null;
    let roleDocRole: UserRole | null = null;

    const emitRole = () => {
        onNext(userDocRole ?? roleDocRole);
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        unsubscribeUserDoc?.();
        unsubscribeRoleDoc?.();
        unsubscribeUserDoc = null;
        unsubscribeRoleDoc = null;
        userDocRole = null;
        roleDocRole = null;

        if (!user) {
            onNext(null);
            return;
        }

        unsubscribeUserDoc = onSnapshot(
            doc(db, "users", user.uid),
            (snapshot) => {
                userDocRole = normalizeRole(snapshot.data()?.role);
                emitRole();
            },
            (error) => onError?.(error)
        );

        unsubscribeRoleDoc = onSnapshot(
            doc(db, "roles", user.uid),
            (snapshot) => {
                roleDocRole = normalizeRole(snapshot.data()?.role);
                emitRole();
            },
            (error) => onError?.(error)
        );
    });

    return () => {
        unsubscribeUserDoc?.();
        unsubscribeRoleDoc?.();
        unsubscribeAuth();
    };
};
