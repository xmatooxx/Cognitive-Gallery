import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { DeckContext } from "../../components/DeckContext";

export default function NewDeckScreen() {
  const router = useRouter();
  const context = useContext(DeckContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  if (!context) {
    return null;
  }

  const { draftDeck, setDraftDeck, addDeck, clearDraftDeck } = context;

  useEffect(() => {
    if (draftDeck) {
      setTitle(draftDeck.title);
      setDescription(draftDeck.description);
      setIsPublic(draftDeck.isPublic);
    }
  }, [draftDeck]);

  const isFormValid = title.trim().length > 0;
  const canSave = Boolean(draftDeck?.cards.length && isFormValid);

  const handleContinue = () => {
    if (!isFormValid) {
      return;
    }

    const nextDraft = {
      id: draftDeck?.id ?? Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      isPublic,
      cards: draftDeck?.cards ?? [],
      color: draftDeck?.color ?? "#d1c4e9",
      status: draftDeck?.status ?? "ongoing",
      proficiency: draftDeck?.proficiency ?? 0,
    };

    setDraftDeck(nextDraft);
    router.push("/library/new/add-cards");
  };

  const handleSave = () => {
    if (!canSave || !draftDeck) {
      return;
    }

    addDeck({
      ...draftDeck,
      proficiency: draftDeck.proficiency,
      status: draftDeck.status,
    });
    clearDraftDeck();
    router.push("/(tabs)/library");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cognitive Gallery</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.badge}>NEW DECK</Text>
          <Text style={styles.title}>Add to your collection.</Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter deck title..."
                placeholderTextColor="#ccc"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Describe this collection in detail..."
                placeholderTextColor="#ccc"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Public/Private Toggle */}
            <View style={styles.toggleContainer}>
              <View style={styles.toggleText}>
                <Text style={styles.toggleLabel}>Public / Private</Text>
                <Text style={styles.toggleDescription}>
                  Share this deck with the gallery community.
                </Text>
              </View>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
                trackColor={{ false: "#ddd", true: "#4caf50" }}
                thumbColor="#fff"
              />
            </View>

            {/* Add Terms Button */}
            <TouchableOpacity
              style={styles.addTermsButton}
              onPress={handleContinue}
              disabled={!isFormValid}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={20} color="#000" />
              <Text style={styles.addTermsText}>Add Terms & Definitions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !canSave && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={!canSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
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
  scrollContent: {
    flexGrow: 1,
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 32,
  },
  form: {
    gap: 24,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },
  descriptionInput: {
    minHeight: 100,
    paddingTop: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
  },
  toggleText: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 12,
    color: "#999",
  },
  addTermsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: "#f0f0f0",
    gap: 8,
    marginTop: 16,
  },
  addTermsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 24,
    paddingVertical: 14,
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
