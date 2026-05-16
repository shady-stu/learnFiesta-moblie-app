import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKMARK_KEY = "bookmarked_courses";

export const useBookmarks = () => {
    const [bookmarked, setBookmarked] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        try {
            const saved = await AsyncStorage.getItem(BOOKMARK_KEY);

            if (saved) {
                setBookmarked(JSON.parse(saved));
            }
        } catch (error) {
            console.log("Load bookmarks error:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleBookmark = async (id: string) => {
        try {
            let updated: string[] = [];

            if (bookmarked.includes(id)) {
                updated = bookmarked.filter((item) => item !== id);
            } else {
                updated = [...bookmarked, id];
            }

            setBookmarked(updated);

            await AsyncStorage.setItem(
                BOOKMARK_KEY,
                JSON.stringify(updated)
            );
        } catch (error) {
            console.log("Toggle bookmark error:", error);
        }
    };

    const isBookmarked = (id: string) => {
        return bookmarked.includes(id);
    };

    return {
        bookmarked,
        toggleBookmark,
        isBookmarked,
        loading,
    };
};