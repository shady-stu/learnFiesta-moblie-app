import { getIdToken } from "./services/authService/authService";

interface FetchOptions extends RequestInit {
    requireAuth?: boolean;
}

export const apiFetch = async <T = any>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    const { requireAuth = true, headers, ...restOptions } = options;

    let token: string | null = null;
    if (requireAuth) {
        token = await getIdToken();
        if (!token) {
            throw new Error("Authentication required but no token found");
        }
    }

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
    };

    const response = await fetch(url, {
        ...restOptions,
        headers: defaultHeaders,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }
    return (await response.text()) as T;
};

// Convenience methods
export const apiGet = <T>(url: string, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "GET" });

export const apiPost = <T>(url: string, body: any, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "POST", body: JSON.stringify(body) });

export const apiPut = <T>(url: string, body: any, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "PUT", body: JSON.stringify(body) });

export const apiDelete = <T>(url: string, options?: FetchOptions) =>
    apiFetch<T>(url, { ...options, method: "DELETE" });