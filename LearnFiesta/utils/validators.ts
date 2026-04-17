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

export type RegisterFormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
};

export type RegisterFormErrors = {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
};

export const validateRegisterForm = (
    data: RegisterFormData
): RegisterFormErrors => {
    const errors: RegisterFormErrors = {};

    if (!data.fullName.trim()) {
        errors.fullName = "Full name is required";
    }

    const emailError = validateEmail(data.email);
    if (emailError) {
        errors.email = emailError;
    }

    const passwordError = validatePassword(data.password);
    if (passwordError) {
        errors.password = passwordError;
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    if (!data.agreeTerms) {
        errors.agreeTerms = "You must agree to the Terms & Conditions";
    }

    return errors;
};