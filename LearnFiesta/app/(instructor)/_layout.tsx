import { Stack } from "expo-router";

export default function InstructorLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="create-course"
                options={{ title: "Create Course" }}
            />
        </Stack>
    );
}