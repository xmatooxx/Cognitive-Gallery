import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DeckContext, DraftDeck } from "../../../components/DeckContext";

export default function EditDeckRedirect() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const context = useContext(DeckContext);

  useEffect(() => {
    if (!context) return;

    const { decks, setDraftDeck } = context;
    const deck = decks.find((d) => d.id === id);

    if (!deck) {
      router.back();
      return;
    }

    const draft: DraftDeck = {
      id: deck.id,
      title: deck.title,
      description: deck.description,
      isPublic: deck.isPublic,
      cards: deck.cards,
      color: deck.color ?? "#d1c4e9",
      status: deck.status ?? "ongoing",
      proficiency: deck.proficiency ?? 0,
    };

    setDraftDeck(draft);
    router.replace("/library/new/add-cards");
  }, [context, id, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Preparing editor…</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 12,
    color: "#666",
  },
});
