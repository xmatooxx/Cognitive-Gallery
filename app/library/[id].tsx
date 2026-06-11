import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DeckContext } from "../../components/DeckContext";

export default function DeckDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const context = useContext(DeckContext);

  if (!context) {
    return null;
  }

  const { decks, removeDeck } = context;
  const deck = decks.find((item) => item.id === id);

  if (!deck) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.badgeText}>Deck not found</Text>
          <View style={{ width: 24 }} />
        </View>
      </SafeAreaView>
    );
  }

  const handleDeleteDeck = () => {
    Alert.alert(
      "Delete Deck",
      `Are you sure you want to delete "${deck.title}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeDeck(deck.id);
            router.replace("/(tabs)/library");
          },
        },
      ],
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "#4caf50";
      case "medium":
        return "#ff9800";
      case "hard":
        return "#f44336";
      default:
        return "#999";
    }
  };

  const CardItem = ({ item }: { item: (typeof deck.cards)[number] }) => (
    <TouchableOpacity style={styles.cardItem} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <Text style={styles.term}>{item.term}</Text>
        <Text style={styles.definition} numberOfLines={2}>
          {item.definition}
        </Text>
      </View>
      <View
        style={[
          styles.difficultyDot,
          { backgroundColor: getDifficultyColor(item.difficulty) },
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.badgeText}>INTERMEDIATE LEVEL</Text>
        </View>
        <TouchableOpacity
          onPress={handleDeleteDeck}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Deck Info */}
      <View style={styles.deckInfo}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.description}>{deck.description}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{deck.proficiency}%</Text>
            <Text style={styles.statLabel}>CURRENT MASTERY</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{deck.cards.length}</Text>
            <Text style={styles.statLabel}>ITEMS STUDIED</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${deck.proficiency}%` }]}
            />
          </View>
        </View>
      </View>

      {/* Deck Contents */}
      <View style={styles.contentsHeader}>
        <Text style={styles.contentsTitle}>Deck Contents</Text>
        <TouchableOpacity>
          <Text style={styles.sortText}>Sort: Newest First</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={deck.cards}
        renderItem={CardItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={styles.cardsList}
        ListFooterComponent={<View style={{ height: 100 }} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No cards yet. Add definitions to begin.
            </Text>
          </View>
        }
      />

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/library/${id}/edit`)}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle-outline" size={20} color="#000" />
          <Text style={styles.buttonText}>Add Terms & Definitions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.studyButton]}
          onPress={() => router.push(`/study/${id}`)}
          activeOpacity={0.8}
        >
          <Text style={styles.studyButtonText}>Start Study Session</Text>
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
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4caf50",
    letterSpacing: 0.5,
  },
  deckInfo: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e0e0e0",
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#4caf50",
  },
  contentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  contentsTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  sortText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  cardsList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  cardItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  term: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  definition: {
    fontSize: 13,
    color: "#666",
    lineHeight: 16,
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
  emptyState: {
    marginTop: 32,
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
  },
  actionButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 24,
    paddingVertical: 12,
    gap: 8,
  },
  studyButton: {
    backgroundColor: "#000",
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  studyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
