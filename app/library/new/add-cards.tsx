import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, DeckContext } from "../../../components/DeckContext";

export default function AddCardsScreen() {
  const router = useRouter();
  const context = useContext(DeckContext);
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  if (!context) {
    return null;
  }

  const { draftDeck, updateDraftDeck, addDeck, clearDraftDeck } = context;
  const cards = draftDeck?.cards ?? [];

  const canAddCard = term.trim().length > 0 && definition.trim().length > 0;

  const handleAddCard = () => {
    if (!draftDeck || !canAddCard) {
      return;
    }

    const newCard: Card = {
      id: Date.now().toString(),
      term: term.trim(),
      definition: definition.trim(),
      difficulty: "medium",
    };

    updateDraftDeck({
      cards: [...cards, newCard],
    });
    setTerm("");
    setDefinition("");
  };

  const handleRemoveCard = (id: string) => {
    if (!draftDeck) {
      return;
    }

    updateDraftDeck({
      cards: cards.filter((card) => card.id !== id),
    });
  };

  const handleDone = () => {
    if (!draftDeck) {
      router.back();
      return;
    }

    const isEditingExistingDeck = context.decks.some(
      (d) => d.id === draftDeck.id,
    );

    if (isEditingExistingDeck) {
      // --- TRYB EDYCJI ---
      addDeck({
        ...draftDeck,
        proficiency: draftDeck.proficiency,
        status: draftDeck.status,
      });
      clearDraftDeck();
      router.back();
    } else {
      // --- TRYB TWORZENIA NOWEGO ---
      router.back();
    }
  };

  const CardPreview = ({ item }: { item: Card }) => (
    <View style={styles.cardPreview}>
      <View style={styles.cardPreviewContent}>
        <Text style={styles.cardTerm}>{item.term}</Text>
        <Text style={styles.cardDefinition} numberOfLines={2}>
          {item.definition}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveCard(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Cards</Text>
        <Text style={styles.cardCount}>{cards.length} / 20</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>NEW ENTRY</Text>
          <Text style={styles.sectionSubtitle}>Capture Knowledge.</Text>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Term</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Neuroplasticity"
                placeholderTextColor="#ccc"
                value={term}
                onChangeText={setTerm}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Definition</Text>
              <TextInput
                style={[styles.input, styles.definitionInput]}
                placeholder="The brain's ability to reorganize itself by forming new neural connections throughout life."
                placeholderTextColor="#ccc"
                value={definition}
                onChangeText={setDefinition}
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.addButton,
                !canAddCard && styles.addButtonDisabled,
              ]}
              onPress={handleAddCard}
              disabled={!canAddCard}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={20} color="#000" />
              <Text style={styles.addButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preview Section */}
        <View style={styles.previewSection}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewTitle}>Added this session</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={cards}
            renderItem={CardPreview}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.cardsList}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No cards added yet.</Text>
              </View>
            }
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
          activeOpacity={0.8}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => {}}
          activeOpacity={0.8}
        >
          <Ionicons name="grid" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  cardCount: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4caf50",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  inputSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  form: {
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
  },
  definitionInput: {
    minHeight: 80,
    paddingTop: 12,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: "#000",
    gap: 8,
    marginTop: 12,
  },
  addButtonDisabled: {
    backgroundColor: "#ddd",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  previewSection: {
    paddingHorizontal: 20,
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4caf50",
  },
  cardsList: {
    gap: 12,
  },
  cardPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  cardPreviewContent: {
    flex: 1,
  },
  cardTerm: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  cardDefinition: {
    fontSize: 12,
    color: "#999",
    lineHeight: 16,
  },
  emptyState: {
    marginTop: 32,
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 12,
  },
  doneButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  doneButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  gridButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
