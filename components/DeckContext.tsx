import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

export type Difficulty = "easy" | "medium" | "hard";

export type Card = {
  id: string;
  term: string;
  definition: string;
  difficulty: Difficulty;
};

export type DeckStatus = "ongoing" | "hard" | "mastered" | "paused";

export type Deck = {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  cards: Card[];
  proficiency: number;
  status: DeckStatus;
  color: string;
};

export type DraftDeck = {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  cards: Card[];
  color: string;
  status: DeckStatus;
  proficiency: number;
};

interface DeckContextValue {
  decks: Deck[];
  draftDeck: DraftDeck | null;
  weeklyMastery: number;
  setDraftDeck: (deck: DraftDeck | null) => void;
  updateDraftDeck: (payload: Partial<DraftDeck>) => void;
  addDeck: (deck: Deck) => void;
  removeDeck: (deckId: string) => void;
  addCardsToDeck: (deckId: string, cards: Card[]) => void;
  clearDraftDeck: () => void;
  updateDeckProficiency: (
    deckId: string,
    difficulty: "very-easy" | "easy" | "hard" | "very-hard",
  ) => void;
}

const initialDecks: Deck[] = [
  {
    id: "1",
    title: "English - Business",
    description: "Essential vocabulary for professional communication",
    isPublic: false,
    cards: [
      {
        id: "1-1",
        term: "Leverage",
        definition:
          "To use something that you already have in order to achieve something new or better.",
        difficulty: "easy",
      },
      {
        id: "1-2",
        term: "Stakeholder",
        definition:
          "A person or group with an interest in the success of an organization.",
        difficulty: "medium",
      },
      {
        id: "1-3",
        term: "Bottom line",
        definition:
          "The final total of an account or the most important factor in a situation.",
        difficulty: "hard",
      },
    ],
    proficiency: 62,
    status: "ongoing",
    color: "#e8f5e9",
  },
  {
    id: "2",
    title: "Advanced Quantum Physics",
    description: "Complex theories and principles",
    isPublic: false,
    cards: [
      {
        id: "2-1",
        term: "Wavefunction",
        definition:
          "A mathematical description of the quantum state of a system.",
        difficulty: "hard",
      },
      {
        id: "2-2",
        term: "Superposition",
        definition:
          "A principle where a quantum system exists in multiple states at once.",
        difficulty: "medium",
      },
    ],
    proficiency: 18,
    status: "hard",
    color: "#ffebee",
  },
  {
    id: "3",
    title: "History of Modern Art",
    description: "Art movements and famous artists",
    isPublic: false,
    cards: [
      {
        id: "3-1",
        term: "Cubism",
        definition:
          "An early-20th-century style of art that fragmented objects into geometric forms.",
        difficulty: "medium",
      },
      {
        id: "3-2",
        term: "Surrealism",
        definition:
          "A movement seeking to release the creative potential of the unconscious mind.",
        difficulty: "easy",
      },
    ],
    proficiency: 94,
    status: "mastered",
    color: "#e8f5e9",
  },
  {
    id: "4",
    title: "Urban Architecture Vol 1",
    description: "Building design and urban planning",
    isPublic: false,
    cards: [
      {
        id: "4-1",
        term: "Facade",
        definition: "The front face of a building.",
        difficulty: "easy",
      },
      {
        id: "4-2",
        term: "Zoning",
        definition: "Regulations governing land use in urban areas.",
        difficulty: "medium",
      },
    ],
    proficiency: 42,
    status: "paused",
    color: "#f3e5f5",
  },
];

export const DeckContext = createContext<DeckContextValue | undefined>(
  undefined,
);

export function DeckProvider({ children }: { children: ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>(initialDecks);
  const [draftDeck, setDraftDeck] = useState<DraftDeck | null>(null);
  const [weeklyMastery, setWeeklyMastery] = useState(65);

  const addDeck = useCallback((deck: Deck) => {
    setDecks((current) => {
      // Sprawdzamy, czy zestaw o tym ID już istnieje w bibliotece
      const deckExists = current.some((d) => d.id === deck.id);

      if (deckExists) {
        // Jeśli istnieje (czyli jesteśmy w trybie edycji), nadpisujemy go nowymi danymi
        return current.map((d) => (d.id === deck.id ? deck : d));
      } else {
        // Jeśli nie istnieje (nowy zestaw), dodajemy go na koniec
        return [...current, deck];
      }
    });
  }, []);

  const removeDeck = useCallback((deckId: string) => {
    setDecks((current) => current.filter((deck) => deck.id !== deckId));
  }, []);

  const addCardsToDeck = useCallback((deckId: string, cards: Card[]) => {
    setDecks((current) =>
      current.map((deck) =>
        deck.id === deckId
          ? {
              ...deck,
              cards: [...deck.cards, ...cards],
            }
          : deck,
      ),
    );
  }, []);

  const updateDraftDeck = useCallback((payload: Partial<DraftDeck>) => {
    setDraftDeck((current) => {
      if (!current) return current;
      return {
        ...current,
        ...payload,
      };
    });
  }, []);

  const clearDraftDeck = useCallback(() => {
    setDraftDeck(null);
  }, []);

  const updateDeckProficiency = useCallback(
    (
      deckId: string,
      difficulty: "very-easy" | "easy" | "hard" | "very-hard",
    ) => {
      const proficiencyGain: Record<string, number> = {
        "very-easy": 3,
        easy: 2,
        hard: 1,
        "very-hard": 0.5,
      };

      const gain = proficiencyGain[difficulty] || 1;

      setDecks((current) =>
        current.map((deck) =>
          deck.id === deckId
            ? {
                ...deck,
                proficiency: Math.min(100, deck.proficiency + gain),
              }
            : deck,
        ),
      );

      // Update weekly mastery
      setWeeklyMastery((current) => Math.min(100, current + gain * 0.5));
    },
    [],
  );

  const value = useMemo(
    () => ({
      decks,
      draftDeck,
      weeklyMastery,
      setDraftDeck,
      updateDraftDeck,
      addDeck,
      removeDeck,
      addCardsToDeck,
      clearDraftDeck,
      updateDeckProficiency,
    }),
    [
      decks,
      draftDeck,
      weeklyMastery,
      setDraftDeck,
      updateDraftDeck,
      addDeck,
      removeDeck,
      addCardsToDeck,
      clearDraftDeck,
      updateDeckProficiency,
    ],
  );

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}
