export type Role = "instructor" | "student";

export interface User {
    uid: string;
    email: string;
    role: Role;
}