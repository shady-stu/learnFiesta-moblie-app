import { useState, useCallback } from "react";

type ToastType = "success" | "error" | "info";

type ToastState = {
    visible: boolean;
    message: string;
    type: ToastType;
};

export function useToast() {
    const [toast, setToast] = useState<ToastState>({
        visible: false,
        message: "",
        type: "info",
    });

    const showToast = useCallback(
        (message: string, type: ToastType = "success") => {
            setToast({
                visible: true,
                message,
                type,
            });

            setTimeout(() => {
                setToast((prev) => ({ ...prev, visible: false }));
            }, 2000);
        },
        []
    );

    return {
        toast,
        showToast,
    };
}