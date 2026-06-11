# Dokumentacja Techniczna – 📚 Cognitive Gallery

Niniejszy dokument stanowi szczegółową dokumentację techniczną wdrożenia oraz wymagania techniczne dla aplikacji mobilnej i webowej **Cognitive Gallery** (platformy do nauki z fiszek), opracowaną zgodnie z wytycznymi zawartymi w instrukcji laboratoryjnej `Instrukcja_5_WKCK_S.pdf`.

---

## 1. Informacje Ogólne i Architektura

**Cognitive Gallery** to wieloplatformowa aplikacja (Android, iOS oraz Web) stworzona w nowoczesnym ekosystemie **React Native** przy użyciu frameworka **Expo SDK 54**. Architektura opiera się na jednostronicowym przepływie danych (Single Source of Truth) z wykorzystaniem mechanizmu **React Context API** do zarządzania stanem danych w pamięci podręcznej aplikacji, bez konieczności stosowania ciężkich, zewnętrznych systemów bazodanowych w fazie klienckiej.

---

## 2. Stos Technologiczny (Tech Stack)

Aplikacja wykorzystuje zestaw sprawdzonych i nowoczesnych bibliotek oraz technologii zapewniających wysoką wydajność, bezpieczeństwo typów i płynność działania interfejsu użytkownika:

### 2.1 Podstawowe technologie:
*   **Expo SDK (wersja ~54.0.33):** Środowisko uruchomieniowe i zestaw natywnych bibliotek ułatwiających budowę aplikacji mobilnych.
*   **React Native (wersja 0.81.5):** Biblioteka do tworzenia w pełni natywnych interfejsów za pomocą komponentów Reacta.
*   **React (wersja 19.1.0):** Biblioteka bazowa dla struktury komponentów.
*   **TypeScript (wersja ~5.9.2):** Statyczne typowanie gwarantujące poprawność kodu i łatwość refaktoryzacji.

### 2.2 Kluczowe zależności i biblioteki pomocnicze:
*   **Expo Router (wersja ~6.0.23):** Nawigacja oparta na strukturze plików (file-based routing), eliminująca skomplikowaną konfigurację nawigatorów.
*   **React Native Reanimated (wersja ~4.1.1):** Zaawansowany silnik animacji uruchamiany bezpośrednio w wątku UI. Wykorzystywany do renderowania płynnych przejść i efektu obracania fiszek w 3D.
*   **Expo Haptics (wersja ~15.0.8):** Zapewnienie fizycznych wibracji (haptic feedback) podczas interakcji z przyciskami oceny trudności fiszek na urządzeniach fizycznych.
*   **React Native Web (wersja ~0.21.0):** Warstwa kompatybilności umożliwiająca uruchomienie tego samego kodu React Native w przeglądarce internetowej.

---

## 3. Struktura Projektu i Moduły

Struktura plików projektu została zorganizowana w oparciu o konwencję **Expo Router**. Kod aplikacji znajduje się w folderze `/app`, a nawigacja odbywa się automatycznie na podstawie układu katalogów.

```
cognitive-gallery/
├── assets/                    # Zasoby statyczne (obrazy, ikony, splash screen)
├── app/                       # Główny katalog kodu źródłowego (Expo Router)
│   ├── (tabs)/                # Główne zakładki dolnego paska nawigacyjnego
│   │   ├── _layout.tsx        # Definicja paska i stylów zakładek
│   │   ├── explore.tsx        # Baza zestawów publicznych i wyszukiwarka
│   │   ├── library.tsx        # Panel główny (Moja Biblioteka) z Weekly Mastery
│   │   └── profile.tsx        # Profil użytkownika, statystyki i ustawienia
│   ├── auth/                  # Ekrany autoryzacji użytkownika
│   │   ├── _layout.tsx        # Układ modułu autoryzacji
│   │   ├── login.tsx          # Ekran logowania z walidacją
│   │   └── signup.tsx         # Ekran rejestracji nowego użytkownika
│   ├── library/               # Moduł zarządzania zestawami fiszek
│   │   ├── [id]/              # Podkatalog dla wybranego zestawu
│   │   │   └── edit.tsx       # Kontroler edycji i przygotowania wersji roboczej
│   │   ├── [id].tsx           # Widok szczegółów wybranego zestawu i lista pojęć
│   │   ├── _layout.tsx        # Układ nawigacji dla modułu biblioteki
│   │   ├── new/               # Podkatalog dla kreatora nowego zestawu
│   │   │   └── add-cards.tsx  # Krok 2 kreatora: dodawanie pojęć i definicji
│   │   └── new.tsx            # Krok 1 kreatora: określenie nazwy, opisu i prywatności
│   ├── study/                 # Moduł sesji uczenia się
│   │   ├── [id].tsx           # Ekran sesji nauki z obrotem fiszki 3D i samooceną
│   │   └── _layout.tsx        # Układ nawigacji dla sesji nauki
│   ├── _layout.tsx            # Główny punkt wejściowy aplikacji (iniekcja Context Providera)
│   └── index.tsx              # Plik indeksujący, uruchamiający przekierowanie
├── components/                # Komponenty wielokrotnego użytku i logika stanu
│   ├── ui/                    # Drobne komponenty interfejsu (przyciski, ikony)
│   └── DeckContext.tsx        # Globalny stan zarządzania fiszkami (React Context)
├── package.json               # Plik konfiguracyjny Node.js (zależności, skrypty npm)
└── tsconfig.json              # Konfiguracja TypeScriptu
```

---

## 4. Architektura Stanu i Modele Danych

Za logikę biznesową, przechowywanie danych oraz aktualizację postępów odpowiada plik `components/DeckContext.tsx`. Zarządza on danymi w pamięci lokalnej (Local In-Memory State) i udostępnia interfejs manipulacji danymi w całej aplikacji poprzez `DeckProvider`.

### 4.1 Definicje Typów Danych (TypeScript Models)

W aplikacji zdefiniowano trzy kluczowe modele danych opisujące strukturę fiszek i zestawów:

```typescript
// Model pojedynczej fiszki
export type Difficulty = "easy" | "medium" | "hard";

export type Card = {
  id: string;          // Unikalny identyfikator fiszki
  term: string;        // Pojęcie / Pytanie (przód karty)
  definition: string;  // Definicja / Odpowiedź (tył karty)
  difficulty: Difficulty; // Stopień trudności
};

// Etykiety statusów nauki zestawu
export type DeckStatus = "ongoing" | "hard" | "mastered" | "paused";

// Pełny model zestawu (kolekcji) fiszek
export type Deck = {
  id: string;          // Unikalny identyfikator zestawu
  title: string;       // Nazwa zestawu
  description: string; // Opis zestawu
  isPublic: boolean;   // Flaga widoczności (publiczny/prywatny)
  cards: Card[];       // Tablica fiszek należących do zestawu
  proficiency: number; // Poziom biegłości opanowania (0 - 100%)
  status: DeckStatus;  // Aktualny status nauki
  color: string;       // Pastelowy kolor tła karty zestawu w UI
};
```

### 4.2 Kluczowe Funkcje Zarządzania Stanem:
*   `addDeck(deck: Deck)`: Służy do dodawania nowego zestawu lub nadpisywania istniejącego w przypadku edycji.
*   `removeDeck(deckId: string)`: Usuwa zestaw o podanym ID z biblioteki użytkownika.
*   `addCardsToDeck(deckId: string, cards: Card[])`: Szybkie dodawanie partii fiszek do wybranego zestawu.
*   `updateDeckProficiency(deckId: string, difficulty: "very-easy" | "easy" | "hard" | "very-hard")`: Kluczowa funkcja kalkulacji wskaźników wiedzy. W zależności od samooceny użytkownika podczas sesji nauki, poziom opanowania zestawu (`proficiency`) oraz wskaźnik tygodniowy (`weeklyMastery`) rosną o odpowiednie wagi:
    *   `very-easy` $\rightarrow$ +3%
    *   `easy` $\rightarrow$ +2%
    *   `hard` $\rightarrow$ +1%
    *   `very-hard` $\rightarrow$ +0.5%

---

## 5. Uruchomienie Środowiska Deweloperskiego (Instrukcja "Wdrożenia")

Aby uruchomić projekt lokalnie na stacji roboczej, należy posiadać zainstalowane środowisko **Node.js** w wersji minimum **18.x** (rekomendowana wersja LTS 20.x lub nowsza) oraz menedżer pakietów **npm**.

### Krok 1: Klonowanie i Instalacja Zależności
Pobierz kod źródłowy aplikacji na dysk lokalny, a następnie otwórz terminal w katalogu głównym projektu i wykonaj polecenie instalacji pakietów:

```bash
npm install
```
*Skrypt ten pobierze wszystkie wymagane biblioteki z rejestru npm i utworzy folder `node_modules`.*

### Krok 2: Uruchomienie Serwera Expo
Uruchom serwer deweloperski Expo za pomocą skryptu:

```bash
npm run start
# alternatywnie: npx expo start
```

W konsoli terminala pojawi się interaktywne menu deweloperskie wraz z wygenerowanym kodem **QR**.

### Krok 3: Uruchomienie na Urządzeniach Klienckich

#### A. Wersja Mobilna - Uruchomienie na Fizycznym Smartfonie (Najszybsza Metoda)
1. Zainstaluj na telefonie darmową aplikację **Expo Go** (dostępną w Google Play oraz App Store).
2. Upewnij się, że komputer oraz telefon są podłączone do tej samej sieci Wi-Fi.
3. Zeskanuj aparatami telefonu kod QR wyświetlony w terminalu. Aplikacja zostanie zbudowana i uruchomiona bezpośrednio na Twoim smartfonie.

#### B. Wersja Mobilna - Emulatory i Symulatory na Komputerze
*   **Android:** Zainstaluj program *Android Studio*, skonfiguruj wirtualne urządzenie (AVD) i wciśnij klawisz **`a`** w oknie terminala z uruchomionym serwerem Expo, aby automatycznie uruchomić aplikację w emulatorze.
*   **iOS (Wymaga macOS):** Zainstaluj program *Xcode*, uruchom wbudowany symulator iOS i wciśnij klawisz **`i`** w terminalu.

#### C. Wersja Webowa (W przeglądarce)
Aby uruchomić aplikację w oknie przeglądarki internetowej, wpisz w terminalu klawisz **`w`** lub uruchom bezpośrednio dedykowaną komendę:

```bash
npm run web
# alternatywnie: npx expo start --web
```
*Aplikacja zostanie otwarta pod adresem: `http://localhost:8081` lub kolejnym wolnym porcie.*

---

## 6. Wymagania Techniczne i Sprzętowe

Projekt działa prawidłowo i płynnie na poniższych konfiguracjach systemowo-sprzętowych:

### 6.1 Środowisko Deweloperskie (Komputer Programisty):
*   **System operacyjny:** Windows 10/11, macOS 12+ lub Linux (Ubuntu 20.04+).
*   **Procesor:** Wielordzeniowy (min. 4 rdzenie) o taktowaniu min. 2.0 GHz.
*   **Pamięć RAM:** Minimum 8 GB (zalecane 16 GB w przypadku jednoczesnego uruchamiania emulatorów Android/iOS).
*   **Dysk:** SSD z co najmniej 5 GB wolnej przestrzeni (dla zależności npm oraz narzędzi SDK).

### 6.2 Konfiguracja Kliencka (Urządzenie Docelowe Użytkownika):

| Platforma | Minimalne Wymagania | Rekomendowana Konfiguracja |
| :--- | :--- | :--- |
| **Android** | System Android 9.0 (Pie), 2 GB RAM, procesor 4-rdzeniowy | System Android 11.0 lub nowszy, 4 GB RAM, obsługa Haptics (wibracji) |
| **iOS** | System iOS 15.0, iPhone 8, 2 GB RAM | System iOS 16.0 lub nowszy, iPhone 11 lub nowszy |
| **Przeglądarka (Web)** | Chrome 100+, Safari 15+, Firefox 90+, Edge 100+ | Dowolna nowoczesna przeglądarka z włączoną akceleracją sprzętową |

---

## 7. Informacje o Pliku Głównym i Wdrożeniu Produkcyjnym

*   **Plik Główny (Entry Point):** Punktem wejściowym zadeklarowanym w `package.json` jest `"expo-router/entry"`. Odpowiada on za dynamiczną konfigurację systemu nawigacji. Pierwszym plikiem inicjującym interfejs graficzny jest `app/_layout.tsx`, w którym osadzony jest dostawca stanu `DeckProvider` (dzięki czemu stan fiszek jest spójny w całej aplikacji).
*   **Wdrożenie Produkcyjne (Build):**
    Aplikacja mobilna może zostać spakowana do plików instalacyjnych `.apk` (Android) lub `.ipa` (iOS) przy użyciu usługi chmurowej **EAS Build** (Expo Application Services) poprzez komendę:
    ```bash
    eas build --platform all
    ```
    Dla platformy webowej produkcyjny zbiór statycznych plików generuje się poleceniem `npx expo export`, a wynikowy katalog `dist/` może zostać wdrożony na dowolnym serwerze WWW (np. Apache, Nginx) lub darmowych platformach hostingowych typu Netlify czy Vercel.
