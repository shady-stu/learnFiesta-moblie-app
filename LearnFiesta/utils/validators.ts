export const validateEmail = (email: string): string | null => {
    if (!email) return "Email is required";

    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) return "Invalid email format";

    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Minimum 6 characters";

    return null;
};