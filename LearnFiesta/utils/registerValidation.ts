import { validatePassword, type RegisterFormData } from './validators';

export type { RegisterFormData };

export const validateFullName = (value: string) => {
    if (!value.trim()) return "Full name is required";
    if (value.trim().length < 3) return "Name must be at least 3 characters";
    return true;
};

export const validateEmailField = (value: string) => {
    if (!value) return "Email is required";
    const email = value.trim().toLowerCase();
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return "Email must contain @";
    const localPart = email.substring(0, atIndex);
    const domainPart = email.substring(atIndex + 1);
    if (localPart.length < 3) return "Email local part is too short (minimum 3 characters)";
    const dotIndex = domainPart.lastIndexOf('.');
    if (dotIndex === -1) return "Email domain must contain a dot (e.g., domain.com)";
    const domainName = domainPart.substring(0, dotIndex);
    const tld = domainPart.substring(dotIndex + 1);
    if (domainName.length < 3) return "Email domain name is too short (minimum 3 characters)";
    if (tld.length < 2) return "Email TLD is too short (e.g., .com, .org)";
    return true;
};

export const validatePasswordField = (value: string) => {
    if (!value) return "Password is required";
    const pwdError = validatePassword(value);
    if (pwdError) return pwdError;
    return true;
};

export const validateConfirmPassword = (password: string) => (value: string) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return true;
};