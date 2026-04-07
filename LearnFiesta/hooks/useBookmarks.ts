import { useState } from "react";

export const useBookmarks = () => {
    const [bookmarked, setBookmarked] = useState<string[]>([]);
    const toggleBookmark = (id: string) => {
        setBookmarked((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id) // remove
                : [...prev, id] // add
        );
    };

    const isBookmarked = (id: string) => {
        return bookmarked.includes(id);
    };

    return {
        bookmarked,
        toggleBookmark,
        isBookmarked,
    };
};