import { Redirect, Stack } from "expo-router";
import { useCurrentUserRole } from "@/hooks/useCurrentUserRole";

export default function InstructorLayout() {
    const { isInstructor, isLoading } = useCurrentUserRole();

    if (isLoading) return null;

    if (!isInstructor) {
        return <Redirect href="/(tabs)" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="InstructorCourses"
                options={{ title: "Instructor Courses" }}
            />
            <Stack.Screen
                name="dashboard"
                options={{ title: "Instructor Dashboard" }}
            />
            <Stack.Screen
                name="create-course"
                options={{ title: "Create Course" }}
            />
        </Stack>
    );
}
