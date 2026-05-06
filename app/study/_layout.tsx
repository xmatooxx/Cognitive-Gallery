import { Stack } from "expo-router";

export default function StudyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
