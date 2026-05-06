import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DeckContext } from "../../components/DeckContext";

interface FlashCard {
  id: string;
  question: string;
  answer: string;
}

const MOCK_CARDS: FlashCard[] = [
  {
    id: "1",
    question:
      "What is the primary psychological effect of biophilic design in modern workspaces?",
    answer:
      "Biophilic design reduces stress and improves cognitive function by connecting humans with nature.",
  },
  {
    id: "2",
    question: "Define market segmentation.",
    answer:
      "The process of dividing a market into groups with similar needs and characteristics.",
  },
  {
    id: "3",
    question: "What is neural plasticity?",
    answer:
      "The brain's ability to reorganize itself by forming new neural connections throughout life.",
  },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48;

export default function StudyScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const context = useContext(DeckContext);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [lastDifficultyColor, setLastDifficultyColor] = useState<string | null>(
    null,
  );

  const flipAnim = useRef(new Animated.Value(0)).current;
  const cardFlashAnim = useRef(new Animated.Value(0)).current;
  const contentOpacityAnim = useRef(new Animated.Value(1)).current;

  const buttonScaleRef = useRef({
    "very-hard": new Animated.Value(1),
    hard: new Animated.Value(1),
    easy: new Animated.Value(1),
    "very-easy": new Animated.Value(1),
  }).current;

  const difficultyColors = {
    "very-hard": "#ffcccc",
    hard: "#ffe0cc",
    easy: "#ccf0cc",
    "very-easy": "#b3e5b3",
  };

  const cards = useMemo(() => {
    if (!context || !id) {
      return MOCK_CARDS;
    }

    const deck = context.decks.find((d) => d.id === id);
    if (!deck || deck.cards.length === 0) {
      return MOCK_CARDS;
    }

    return deck.cards.map((card) => ({
      id: card.id,
      question: card.term,
      answer: card.definition,
    }));
  }, [context, id]);

  const currentCard = cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  const handleDifficulty = async (
    difficulty: "very-easy" | "easy" | "hard" | "very-hard",
  ) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const color = difficultyColors[difficulty];
    setLastDifficultyColor(color);

    if (context && id) {
      context.updateDeckProficiency(id as string, difficulty);
    }

    // Animacja przycisku
    Animated.sequence([
      Animated.timing(buttonScaleRef[difficulty], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleRef[difficulty], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Błysk koloru tła karty
    Animated.sequence([
      Animated.timing(cardFlashAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(cardFlashAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(contentOpacityAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(async () => {
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
        flipAnim.setValue(0);

        Animated.timing(contentOpacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      } else {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/(tabs)/library");
      }
    });
  };

  const handleFlipCard = async () => {
    await Haptics.selectionAsync();

    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={handleClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Cognitive Gallery</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLabel}>
          <Text style={styles.progressText}>SESSION PROGRESS</Text>
        </View>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Card Section */}
      <View style={styles.cardSection}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: cardFlashAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.7, 1],
              }),
            },
          ]}
        >
          {/* Flash overlay */}
          {lastDifficultyColor && (
            <Animated.View
              style={[
                styles.cardFlashOverlay,
                {
                  backgroundColor: lastDifficultyColor,
                  opacity: cardFlashAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.6],
                  }),
                },
              ]}
            />
          )}

          <TouchableOpacity
            style={styles.cardTouchable}
            onPress={handleFlipCard}
            activeOpacity={1}
          >
            {/* Opakowaliśmy zawartość karty (bez nakładki flash) w Animated.View, żeby całość płynnie gasła */}
            <Animated.View style={{ flex: 1, opacity: contentOpacityAnim }}>
              <View style={styles.cardCategory}>
                <Text style={styles.categoryText}>ARCHITECTURE & DESIGN</Text>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#999"
                />
              </View>

              <View style={styles.textContentContainer}>
                {/* Front side (Question) */}
                <Animated.View
                  style={[
                    styles.faceContainer,
                    {
                      opacity: flipAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [1, 0, 0],
                      }),
                    },
                  ]}
                  pointerEvents={isFlipped ? "none" : "auto"}
                >
                  <Text style={styles.cardContent}>{currentCard.question}</Text>
                </Animated.View>

                {/* Back side (Answer) */}
                <Animated.View
                  style={[
                    styles.faceContainer,
                    {
                      opacity: flipAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 0, 1],
                      }),
                    },
                  ]}
                  pointerEvents={isFlipped ? "auto" : "none"}
                >
                  <Text style={styles.cardContent}>{currentCard.answer}</Text>
                </Animated.View>
              </View>

              <View style={styles.cardFooter}>
                <Ionicons name="hand-left-outline" size={16} color="#999" />
                <Text style={styles.flipHint}>Tap to reveal answer</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text
          style={[styles.cardCounter, { opacity: contentOpacityAnim }]}
        >
          Card {currentCardIndex + 1} of {cards.length}
        </Animated.Text>
      </View>

      {/* Difficulty Buttons */}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                transform: [{ scale: buttonScaleRef["very-hard"] }],
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.difficultyButton, styles.veryHardButton]}
              onPress={() => handleDifficulty("very-hard")}
              activeOpacity={0.8}
            >
              <Text style={styles.difficultyButtonText}>Very Hard</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                transform: [{ scale: buttonScaleRef["hard"] }],
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.difficultyButton, styles.hardButton]}
              onPress={() => handleDifficulty("hard")}
              activeOpacity={0.8}
            >
              <Text style={styles.difficultyButtonText}>Hard</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.buttonRow}>
          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                transform: [{ scale: buttonScaleRef["easy"] }],
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.difficultyButton, styles.easyButton]}
              onPress={() => handleDifficulty("easy")}
              activeOpacity={0.8}
            >
              <Text style={styles.difficultyButtonText}>Easy</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                transform: [{ scale: buttonScaleRef["very-easy"] }],
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.difficultyButton, styles.veryEasyButton]}
              onPress={() => handleDifficulty("very-easy")}
              activeOpacity={0.8}
            >
              <Text style={styles.difficultyButtonText}>Very Easy</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  progressLabel: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4caf50",
    letterSpacing: 0.5,
  },
  progressBar: {
    height: 3,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4caf50",
    borderRadius: 2,
  },
  cardSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: CARD_WIDTH,
    minHeight: 320,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 28,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTouchable: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardFlashOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
  },
  cardCategory: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
  },
  textContentContainer: {
    flex: 1,
    position: "relative",
  },
  faceContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 32,
    color: "#000",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  flipHint: {
    fontSize: 12,
    color: "#999",
  },
  cardCounter: {
    marginTop: 16,
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
  difficultyButton: {
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  difficultyButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },
  veryHardButton: {
    backgroundColor: "#ffcccc",
  },
  hardButton: {
    backgroundColor: "#ffe0cc",
  },
  easyButton: {
    backgroundColor: "#ccf0cc",
  },
  veryEasyButton: {
    backgroundColor: "#b3e5b3",
  },
});
