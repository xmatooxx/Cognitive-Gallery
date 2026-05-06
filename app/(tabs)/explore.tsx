import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, DeckContext } from "../../components/DeckContext";

interface PublicDeck {
  id: string;
  title: string;
  author: string;
  category: string;
  cardsCount: number;
  color: string;
  mockCards: Card[];
}

const CATEGORIES = [
  "All Topics",
  "Neuroscience",
  "Classical Music",
  "Physics",
  "Languages",
];

const TRENDING_DECKS: PublicDeck[] = [
  {
    id: "t1",
    title: "Neuroplasticity Foundations",
    author: "Dr. Julian Atts",
    category: "Neuroscience",
    cardsCount: 5,
    color: "#1a237e",
    mockCards: [
      {
        id: "t1-1",
        term: "Synapse",
        definition:
          "Junction between two nerve cells, consisting of a minute gap across which impulses pass.",
        difficulty: "medium",
      },
      {
        id: "t1-2",
        term: "Neuron",
        definition:
          "A specialized cell transmitting nerve impulses; a nerve cell.",
        difficulty: "easy",
      },
      {
        id: "t1-3",
        term: "Neurogenesis",
        definition: "The process by which new neurons are formed in the brain.",
        difficulty: "hard",
      },
      {
        id: "t1-4",
        term: "Amygdala",
        definition:
          "Almond-shaped mass of gray matter involved in experiencing emotions.",
        difficulty: "medium",
      },
      {
        id: "t1-5",
        term: "Cerebral Cortex",
        definition:
          "The outer layer of the cerebrum, playing an important role in consciousness.",
        difficulty: "hard",
      },
    ],
  },
  {
    id: "t2",
    title: "Baroque Era Masterpieces",
    author: "Isabella Rossi",
    category: "Classical Music",
    cardsCount: 5,
    color: "#5d1049",
    mockCards: [
      {
        id: "t2-1",
        term: "Fugue",
        definition:
          "A contrapuntal composition technique in two or more voices.",
        difficulty: "hard",
      },
      {
        id: "t2-2",
        term: "Sonata",
        definition:
          "A composition for an instrumental soloist, often with a piano accompaniment.",
        difficulty: "medium",
      },
      {
        id: "t2-3",
        term: "Concerto",
        definition:
          "A musical composition for a solo instrument or instruments accompanied by an orchestra.",
        difficulty: "easy",
      },
      {
        id: "t2-4",
        term: "Harpsichord",
        definition:
          "A keyboard instrument with horizontal strings plucked by points of quill.",
        difficulty: "medium",
      },
      {
        id: "t2-5",
        term: "J.S. Bach",
        definition:
          "A German composer and musician of the late Baroque period.",
        difficulty: "easy",
      },
    ],
  },
];

const PUBLIC_LIBRARY: PublicDeck[] = [
  {
    id: "p1",
    title: "Quantum Physics 101",
    author: "Tech Labs Collective",
    category: "Physics",
    cardsCount: 5,
    color: "#1db679",
    mockCards: [
      {
        id: "p1-1",
        term: "Quark",
        definition:
          "A fundamental constituent of matter observed in modern particle physics.",
        difficulty: "hard",
      },
      {
        id: "p1-2",
        term: "Photon",
        definition:
          "A particle representing a quantum of light or other electromagnetic radiation.",
        difficulty: "medium",
      },
      {
        id: "p1-3",
        term: "Entanglement",
        definition:
          "A physical phenomenon occurring when pairs or groups of particles interact.",
        difficulty: "hard",
      },
      {
        id: "p1-4",
        term: "Superposition",
        definition:
          "The principle that a physical system exists in all its particular theoretical states simultaneously.",
        difficulty: "hard",
      },
      {
        id: "p1-5",
        term: "Planck's Constant",
        definition:
          "A fundamental physical constant characteristic of the mathematical formulations of quantum mechanics.",
        difficulty: "medium",
      },
    ],
  },
  {
    id: "p2",
    title: "Spanish Irregular Verbs",
    author: "Maria Gonzalez",
    category: "Languages",
    cardsCount: 5,
    color: "#e08900",
    mockCards: [
      {
        id: "p2-1",
        term: "Ser",
        definition: "To be (used for permanent characteristics or identity).",
        difficulty: "easy",
      },
      { id: "p2-2", term: "Ir", definition: "To go.", difficulty: "easy" },
      {
        id: "p2-3",
        term: "Tener",
        definition: "To have.",
        difficulty: "medium",
      },
      {
        id: "p2-4",
        term: "Hacer",
        definition: "To do / to make.",
        difficulty: "medium",
      },
      {
        id: "p2-5",
        term: "Decir",
        definition: "To say / to tell.",
        difficulty: "hard",
      },
    ],
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const context = useContext(DeckContext);
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  if (!context) {
    return null;
  }

  const { decks, addDeck } = context;

  const handleDeckPress = (item: PublicDeck) => {
    const isAlreadyInLibrary = decks.some((deck) => deck.id === item.id);

    if (isAlreadyInLibrary) {
      router.push(`/library/${item.id}`);
    } else {
      Alert.alert(
        "Add to Library",
        `Do you want to add "${item.title}" to your personal library?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Add to Library",
            onPress: () => {
              addDeck({
                id: item.id,
                title: item.title,
                description: `Category: ${item.category} | Author: ${item.author}`,
                isPublic: true,
                cards: item.mockCards,
                proficiency: 0,
                status: "ongoing",
                color: "#d1c4e9",
              });
              Alert.alert("Success!", "Deck has been added to your library.");
            },
          },
        ],
      );
    }
  };

  // --- LOGIKA WYSZUKIWANIA I FILTROWANIA ---

  const filteredTrendingDecks = useMemo(() => {
    return TRENDING_DECKS.filter((deck) => {
      const matchesSearch =
        deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Topics" || deck.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filteredPublicLibrary = useMemo(() => {
    return PUBLIC_LIBRARY.filter((deck) => {
      const matchesSearch =
        deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Topics" || deck.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // --- KOMPONENTY KART ---

  const TrendingCard = ({ item }: { item: PublicDeck }) => {
    const isAdded = decks.some((d) => d.id === item.id);

    return (
      <TouchableOpacity
        style={[styles.trendingCard, { backgroundColor: item.color }]}
        onPress={() => handleDeckPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category.toUpperCase()}</Text>
          </View>
          {isAdded && (
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
          )}
        </View>
        <Text style={styles.trendingTitle}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
      </TouchableOpacity>
    );
  };

  const PublicDeckItem = ({ item }: { item: PublicDeck }) => {
    const isAdded = decks.some((d) => d.id === item.id);

    return (
      <TouchableOpacity
        style={styles.publicDeckItem}
        onPress={() => handleDeckPress(item)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconPlaceholder,
            { backgroundColor: item.color + "20" },
          ]}
        >
          <Ionicons name="document-text" size={24} color={item.color} />
        </View>
        <View style={styles.deckInfo}>
          <Text style={styles.deckTitle}>{item.title}</Text>
          <Text style={styles.deckAuthor}>
            {item.author} • {item.category}
          </Text>
        </View>
        <View style={styles.deckActions}>
          <Text style={styles.cardCount}>{item.cardsCount} Cards</Text>
          {isAdded ? (
            <Ionicons
              name="checkmark"
              size={20}
              color="#4caf50"
              style={{ marginLeft: 8 }}
            />
          ) : (
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#000"
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title or author..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {/* Przycisk czyszczenia wyszukiwania */}
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryPill,
                selectedCategory === category && styles.categoryPillActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Section - pokazujemy tylko, gdy są wyniki */}
        {filteredTrendingDecks.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending</Text>
              <Text style={styles.sectionSubtitle}>CURATED DAILY</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.trendingContainer}
            >
              {filteredTrendingDecks.map((deck) => (
                <View key={deck.id} style={styles.trendingCardWrapper}>
                  <TrendingCard item={deck} />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Public Library Section - pokazujemy tylko, gdy są wyniki */}
        {filteredPublicLibrary.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Public Library</Text>
              <TouchableOpacity>
                <Text style={styles.filterText}>Filter 🎛</Text>
              </TouchableOpacity>
            </View>

            {filteredPublicLibrary.map((deck) => (
              <PublicDeckItem key={deck.id} item={deck} />
            ))}
          </View>
        )}

        {/* Pusty stan, gdy nic nie zostanie znalezione */}
        {filteredTrendingDecks.length === 0 &&
          filteredPublicLibrary.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#ccc" />
              <Text style={styles.emptyStateTitle}>No decks found</Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search or category filter.
              </Text>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  categoriesContainer: {
    marginVertical: 8,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryPillActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  categoryTextActive: {
    color: "#fff",
  },
  section: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 11,
    color: "#999",
    fontWeight: "600",
    letterSpacing: 1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  trendingContainer: {
    gap: 12,
  },
  trendingCardWrapper: {
    marginRight: 8,
  },
  trendingCard: {
    width: 220,
    height: 140,
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  author: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  publicDeckItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  deckInfo: {
    flex: 1,
  },
  deckTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  deckAuthor: {
    fontSize: 12,
    color: "#999",
  },
  deckActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardCount: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    paddingHorizontal: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
