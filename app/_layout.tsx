import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DeckProvider } from "../components/DeckContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DeckProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="auth" options={{ animation: "fade" }} />
          <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
        </Stack>
      </DeckProvider>
    </GestureHandlerRootView>
  );
}
