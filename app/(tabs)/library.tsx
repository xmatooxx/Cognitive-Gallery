import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Deck, DeckContext } from "../../components/DeckContext";

export default function LibraryScreen() {
  const router = useRouter();
  const context = useContext(DeckContext);

  if (!context) {
    return null;
  }

  const { decks, weeklyMastery } = context;

  const getStatusColor = (status: Deck["status"]) => {
    switch (status) {
      case "ongoing":
        return "#4caf50";
      case "hard":
        return "#f44336";
      case "mastered":
        return "#4caf50";
      case "paused":
        return "#999";
      default:
        return "#999";
    }
  };

  const getStatusLabel = (status: Deck["status"]) => {
    switch (status) {
      case "ongoing":
        return "ONGOING";
      case "hard":
        return "HARD";
      case "mastered":
        return "MASTERED";
      case "paused":
        return "PAUSED";
      default:
        return "";
    }
  };

  const DeckCard = ({ item }: { item: Deck }) => (
    <TouchableOpacity
      style={[styles.deckCard, { backgroundColor: item.color }]}
      onPress={() => router.push(`/library/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.deckHeader}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusLabel}>{getStatusLabel(item.status)}</Text>
        </View>
        <Text style={styles.cardCount}>{item.cards.length} Cards</Text>
      </View>
      <Text style={styles.deckTitle}>{item.title}</Text>
      <Text style={styles.deckDescription}>{item.description}</Text>

      <View style={styles.proficiencySection}>
        <View style={styles.proficiencyHeader}>
          <Text style={styles.label}>CURRENT PROFICIENCY</Text>
          <Text style={styles.proficiencyValue}>{item.proficiency}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${item.proficiency}%`,
                backgroundColor: getStatusColor(item.status),
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.statsValue}>{Math.round(weeklyMastery)}%</Text>
        <Text style={styles.statsLabel}>Weekly Mastery</Text>
        <Text style={styles.statsSubtext}>
          You're outperforming 92% of users this week. Keep the momentum.
        </Text>
      </View>

      <FlatList
        data={decks}
        renderItem={DeckCard}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/library/new")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  statsValue: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  statsSubtext: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  deckCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deckHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#666",
    letterSpacing: 0.5,
  },
  cardCount: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  deckDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    marginBottom: 16,
  },
  proficiencySection: {
    marginTop: 16,
  },
  proficiencyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#999",
    letterSpacing: 0.5,
  },
  proficiencyValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  fab: {
    position: "absolute",
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
