# Instrukcja Obsługi – 📚 Cognitive Gallery

Witamy w **Cognitive Gallery**! Ta aplikacja została zaprojektowana, aby pomóc Ci w skutecznej nauce oraz zapamiętywaniu pojęć za pomocą interaktywnych fiszek. Dzięki systemowi samooceny i analizie postępów, nauka staje się bardziej zorganizowana, efektywna i dopasowana do Twojego indywidualnego tempa.

Niniejsza instrukcja krok po kroku wyjaśnia wszystkie funkcjonalności aplikacji, pomagając Ci w pełnym wykorzystaniu jej potencjału.

---

## Spis Treści
1. [Wprowadzenie i Cel Aplikacji](#1-wprowadzenie-i-cel-aplikacji)
2. [Logowanie i Rejestracja Użytkownika](#2-logowanie-i-rejestracja-u%C5%BCytkownika)
3. [Panel Główny: Moja Biblioteka](#3-panel-g%C5%82%C3%B3wny-moja-biblioteka)
4. [Szczegóły Zestawu Fiszki](#4-szczeg%C3%B3%C5%82y-zestawu-fiszki)
5. [Odkrywanie Zestawów Publicznych](#5-odkrywanie-zestaw%C3%B3w-publicznych)
6. [Tworzenie i Edycja Własnych Fiszki](#6-tworzenie-i-edycja-w%C5%82asnych-fiszki)
7. [Tryb Uczenia Się (Aktywna Nauka)](#7-tryb-uczenia-si%C4%99-aktywna-nauka)
8. [Profil Użytkownika i Statystyki Grywalizacyjne](#8-profil-u%C5%BCytkownika-i-statystyki-grywalizacyjne)

---

## 1. Wprowadzenie i Cel Aplikacji

Aplikacja **Cognitive Gallery** opiera się na technice **aktywnego przypominania** (ang. *active recall*) oraz **powtórek rozstrzelonych w czasie** (ang. *spaced repetition*). Zamiast biernego czytania notatek, aplikacja zmusza mózg do aktywnego wydobywania informacji z pamięci, co drastycznie zwiększa skuteczność zapamiętywania.

**Główne zalety korzystania z aplikacji:**
*   **Szybka nauka:** Dzięki podziałowi na małe porcje informacji (fiszki).
*   **Analiza postępów:** Stały podgląd na tygodniowe statystyki (`Weekly Mastery`) oraz poziom opanowania poszczególnych zestawów.
*   **Baza publiczna:** Dostęp do gotowych, starannie wyselekcjonowanych zestawów z różnych dziedzin nauki i kultury.
*   **Grywalizacja:** System motywacyjny oparty na passach codziennej nauki (`Streak`).

---

## 2. Logowanie i Rejestracja Użytkownika

Uzyskanie dostępu do Twojej personalnej biblioteki wymaga zalogowania się. Nowi użytkownicy mogą w łatwy sposób utworzyć konto.

### 2.1 Logowanie
1. Po uruchomieniu aplikacji zobaczysz ekran powitalny.
2. Wpisz swój adres e-mail w polu **EMAIL ADDRESS**.
3. Wpisz hasło w polu **PASSWORD**.
4. Dotknij czarnego przycisku **Log in**.
5. *W przypadku podania pustych lub błędnych danych, aplikacja wyświetli u góry czerwony komunikat ostrzegawczy.*

### 2.2 Rejestracja (Tworzenie Konta)
1. Na dole ekranu logowania kliknij odnośnik **Create an account**.
2. Wypełnij wymagane pola:
    *   **FULL NAME** (Imię i Nazwisko)
    *   **EMAIL ADDRESS** (Adres e-mail)
    *   **PASSWORD** (Hasło – minimum 6 znaków)
3. Zatwierdź, klikając przycisk **Create account**.

> [!TIP]
> 📸 **INSTRUKCJA ZRZUTU EKRANU – EKRAN LOGOWANIA:**
> *   **Ekran do przechwycenia:** Ekran logowania aplikacji po pierwszym otwarciu (ścieżka kodu: `app/auth/login.tsx`).
> *   **Co ma przedstawiać:** Estetyczny, jasny widok powitalny z logiem 📚 Cognitive Gallery, polami tekstowymi dla adresu e-mail i hasła oraz widocznym czarnym przyciskiem logowania.
> *   **Zaznaczone i opisane elementy interfejsu:**
>     1.  **Logo i Nagłówek** – 📚 *Cognitive Gallery* i hasło przewodnie *"Welcome back."* – element budujący tożsamość wizualną.
>     2.  **Pola Formularza** – Wejścia tekstowe dla e-maila i hasła z szarymi podpowiedziami (placeholders).
>     3.  **Link "FORGOT?"** – Szybki odnośnik do resetowania hasła w razie jego zgubienia.
>     4.  **Przycisk "Log in"** – Centralny element interakcji, zaokrąglony czarny przycisk o wysokim kontraście.
>     5.  **Odnośnik "Create an account"** – Umożliwia płynne przejście do ekranu rejestracji.

---

## 3. Panel Główny: Moja Biblioteka

To Twój osobisty pulpit dowodzenia. Ekran ten gromadzi wszystkie zestawy fiszek, które aktualnie studiujesz lub samodzielnie utworzyłeś.

### 3.1 Statystyki Tygodniowe (Weekly Mastery)
Na samej górze ekranu znajduje się sekcja podsumowująca Twoją efektywność w tym tygodniu.
*   **Wskaźnik procentowy (np. 65%):** Pokazuje, w jakim stopniu opanowałeś materiał w ostatnich 7 dniach.
*   **Informacja motywacyjna:** Krótki komunikat podpowiadający, jak wypadasz na tle innych użytkowników (np. *"Prześcigasz 92% użytkowników w tym tygodniu. Tak trzymaj!"*).

### 3.2 Lista Zestawów (Kolekcji)
Każdy zestaw reprezentowany jest przez dużą kartę o pastelowym tle. Na karcie znajdziesz:
1.  **Status Zestawu:**
    *   `ONGOING` (W toku) – Zestaw jest w trakcie aktywnej nauki (kolor zielony).
    *   `HARD` (Trudny) – Oznaczony tak, gdy sprawia Ci większe trudności (kolor czerwony).
    *   `MASTERED` (Opanowany) – Osiągnąłeś bardzo wysoki wskaźnik biegłości (kolor zielony).
    *   `PAUSED` (Wstrzymany) – Nauka zestawu została tymczasowo zawieszona (kolor szary).
2.  **Liczbę kart** zawartych w zestawie (np. *3 Cards*).
3.  **Tytuł i Opis** zestawu objaśniający jego zakres tematyczny.
4.  **Poziom Biegłości (Current Proficiency):** Wyrażony w procentach wraz z graficznym paskiem postępu.

### 3.3 Dodawanie nowego zestawu
W prawym dolnym rogu znajduje się czarny, pływający przycisk ze znakiem plusa (`+`). Kliknięcie go przenosi do kreatora nowych fiszek.

> [!TIP]
> 📸 **INSTRUKCJA ZRZUTU EKRANU – MOJA BIBLIOTEKA:**
> *   **Ekran do przechwycenia:** Ekran główny biblioteki użytkownika (ścieżka kodu: `app/(tabs)/library.tsx`).
> *   **Co ma przedstawiać:** Widok z nagłówkiem statystyk tygodniowych oraz listą kart zestawów o różnych kolorach (np. pastelowa zieleń, czerwień i fiolet). W prawym dolnym rogu musi być widoczny pływający przycisk dodawania (`FAB`).
> *   **Zaznaczone i opisane elementy interfejsu:**
>     1.  **Nagłówek Tygodniowego Postępu (Weekly Mastery)** – Duża czcionka procentowa informująca o postępie w nauce.
>     2.  **Status Zestawu (Status Badge)** – Mała etykieta na karcie zestawu (np. `ONGOING`, `HARD`), określająca bieżący stan nauki.
>     3.  **Licznik Fiszek (Card Count)** – Pokazuje liczbę kart w danym zestawie.
>     4.  **Pasek Biegłości (Proficiency Bar)** – Graficzna wizualizacja postępu w opanowywaniu danego zestawu (od 0% do 100%).
>     5.  **Przycisk Tworzenia (FAB)** – Czarna, okrągła ikona `+` w dolnym rogu, służąca do szybkiego otwierania kreatora zestawów.

---

## 4. Szczegóły Zestawu Fiszki

Po kliknięciu w dowolny zestaw z biblioteki przejdziesz do ekranu jego szczegółów. Ekran ten pozwala przeanalizować zawartość przed rozpoczęciem sesji oraz zarządzać zestawem.

### 4.1 Sekcja Informacyjna i Statystyki
*   **Nazwa i Opis zestawu:** Wyraźnie wyświetlone u góry.
*   **Wskaźniki szczegółowe:**
    *   **CURRENT MASTERY** (Biegłość zestawu) – stopień opanowania wyrażony procentowo.
    *   **ITEMS STUDIED** (Przestudiowane pozycje) – dokładna liczba kart.
*   **Pasek Postępu:** Płynna zielona linia wizualizująca biegłość.

### 4.2 Lista Pojęć (Deck Contents)
Poniżej statystyk znajduje się lista wszystkich fiszek zawartych w zestawie. Każda pozycja na liście pokazuje:
*   **Pojęcie (Term):** Słowo lub pytanie kluczowe pogrubioną czcionką.
*   **Definicję (Definition):** Skrócone wyjaśnienie/odpowiedź pod pojęciem.
*   **Kropkę Trudności:** Mały kolorowy punkt po prawej stronie określający stopień trudności pojedynczej fiszki:
    *   Zielona kropka: **Łatwa (Easy)**
    *   Pomarańczowa kropka: **Średnia (Medium)**
    *   Czerwona kropka: **Trudna (Hard)**

### 4.3 Zarządzanie Zestawem
*   **Usuwanie zestawu:** Dotknięcie ikony z trzema kropkami (`⋮`) w prawym górnym rogu ekranu wywołuje okienko potwierdzenia usunięcia zestawu z biblioteki.
*   **Przycisk "Add Terms & Definitions":** Pozwala szybko przejść do edycji i dodania nowych pojęć do tego zestawu.
*   **Przycisk "Start Study Session":** Duży czarny przycisk, który uruchamia pełnoekranowy tryb nauki dla tego zestawu.

> [!TIP]
> 📸 **INSTRUKCJA ZRZUTU EKRANU – SZCZEGÓŁY ZESTAWU:**
> *   **Ekran do przechwycenia:** Ekran szczegółowego podglądu wybranego zestawu (ścieżka kodu: `app/library/[id].tsx`).
> *   **Co ma przedstawiać:** Ekran z widocznym tytułem zestawu (np. *"English - Business"*), kartą postępu, listą pojęć i definicji na białym tle oraz dolnymi przyciskami akcji.
> *   **Zaznaczone i opisane elementy interfejsu:**
>     1.  **Przycisk powrotu (Chevron Back)** – Górna lewa strona, służy do powrotu do biblioteki.
>     2.  **Menu Opcji (Ellipsis Vertical)** – Górna prawa strona, umożliwia usunięcie zestawu z bazy.
>     3.  **Karta Postępu Mastery** – Sekcja z liczbami prezentująca poziom wiedzy i liczbę słówek.
>     4.  **Lista Zawartości (Deck Contents)** – Lista z podglądem pojęć wraz z kolorowymi kropkami poziomu trudności po prawej stronie.
>     5.  **Dwuprzyciskowy Panel Akcji (Footer Buttons)** – Przycisk dodawania słówek (biały) oraz przycisk startu nauki (czarny).

---

## 5. Odkrywanie Zestawów Publicznych

Nie musisz tworzyć wszystkiego od zera! Karta **Explore** (Odkrywaj) w dolnym menu pozwala na przeszukiwanie globalnej biblioteki zestawów stworzonych przez społeczność oraz ekspertów.

### 5.1 Wyszukiwarka i Filtry
*   **Pasek wyszukiwania:** Wpisz tytuł lub autora w polu u góry. Wciśnięcie ikony "X" spowoduje natychmiastowe wyczyszczenie wpisanego tekstu.
*   **Pigułki Kategorii:** Przewijane poziomo przyciski tematów (np. *Neuroscience, Physics, Languages, Classical Music, All Topics*). Pozwalają jednym kliknięciem zawęzić bazę wyników.

### 5.2 Sekcje Tematyczne
1.  **Trending (Popularne):** Przewijana w poziomie lista wyróżnionych, najchętniej pobieranych zestawów o wysokiej jakości merytorycznej.
2.  **Public Library (Biblioteka Publiczna):** Pionowa lista wszystkich dostępnych zestawów publicznych.

### 5.3 Pobieranie do Biblioteki
1.  Kliknij interesujący Cię zestaw na liście.
2.  Zostanie wyświetlony komunikat **Add to Library** z zapytaniem, czy chcesz dodać tę kolekcję do swojej osobistej biblioteki.
3.  Wybierz **Add to Library** – zestaw natychmiast pojawi się w Twojej zakładce *Library*, a przy ikonie zestawu w wyszukiwarce pojawi się zielony znaczek (checkmark).

> [!TIP]
> 📸 **INSTRUKCJA ZRZUTU EKRANU – EKRAN EXPLORE:**
> *   **Ekran do przechwycenia:** Ekran wyszukiwania publicznego (ścieżka kodu: `app/(tabs)/explore.tsx`).
> *   **Co ma przedstawiać:** Widok z aktywnym paskiem wyszukiwania, rzędem okrągłych filtrów kategorii (np. zaznaczona czarna pigułka *"All Topics"*), kartami sekcji *Trending* oraz listą zestawów w sekcji *Public Library*. Na pobranych zestawach powinien być widoczny zielony ptaszek.
> *   **Zaznaczone i opisane elementy interfejsu:**
>     1.  **Pasek Wyszukiwania (Search Bar)** – Z ikoną lupy i polem wejściowym do wpisywania fraz.
>     2.  **Pigułki Tematyczne (Category Pills)** – Poziomy filtr tematów ułatwiający selekcję materiału.
>     3.  **Karty Sekcji Trending** – Kolorowe, szerokie karty z informacją o kategorii i autorze zestawu.
>     4.  **Znacznik posiadania (Checkmark)** – Zielona ikona potwierdzająca, że dany zestaw został już dodany do Twojej osobistej biblioteki.

---

## 6. Tworzenie i Edycja Własnych Fiszki

Aplikacja umożliwia łatwe tworzenie własnych, spersonalizowanych zestawów słówek lub pytań w dwuetapowym kreatorze.

### Krok 1: Podstawowe Informacje o Zestawie (`new.tsx`)
1.  Otwórz kreator przyciskiem `+` w Bibliotece.
2.  W polu **Title** wpisz nazwę swojego zestawu (np. *Słówka hiszpańskie - Poziom A2*). *Jest to pole wymagane.*
3.  W polu **Description** opisz, czego dotyczy ten zestaw.
4.  Ustaw widoczność za pomocą suwaka **Public / Private**:
    *   **Włączony (zielony):** Zestaw będzie widoczny dla całej społeczności w zakładce *Explore*.
    *   **Wyłączony (szary):** Zestaw pozostanie całkowicie prywatny, dostępny tylko dla Ciebie.
5.  Kliknij przycisk **Add Terms & Definitions**, aby przejść do dodawania kart.

### Krok 2: Wprowadzanie Pojęć i Definicji (`add-cards.tsx`)
1.  W polu **Term** wpisz pojęcie (np. słówko w języku obcym lub pytanie).
2.  W polu **Definition** wpisz jego znaczenie, odpowiedź lub objaśnienie.
3.  Kliknij **Add Card** – fiszka zostanie zapisana w bieżącej sesji tworzenia, a formularz zostanie wyczyszczony, umożliwiając wpisanie kolejnej pozycji.
4.  **Podgląd na żywo:** Na dole ekranu zobaczysz przewijaną listę fiszek dodanych w tej sesji. Każdą z nich możesz usunąć klikając małą ikonę krzyżyka (`x`) po prawej stronie.
5.  Po dodaniu wszystkich fiszek kliknij przycisk **Save** w stopce, aby trwale zapisać zestaw w Mojej Bibliotece.

> [!NOTE]
> **Edycja Zestawu:** Aby edytować istniejący zestaw, wejdź w jego szczegóły, kliknij przycisk **Add Terms & Definitions**. Aplikacja automatycznie wczyta wszystkie dotychczasowe fiszki do edytora, umożliwiając dopisywanie nowych lub usuwanie niechcianych pojęć.

> [!TIP]
> 📸 **INSTRUKCJA ZRZUTU EKRANU – KREATOR FISZEK (Krok 2):**
> *   **Ekran do przechwycenia:** Ekran dodawania fiszek (ścieżka kodu: `app/library/new/add-cards.tsx`).
> *   **Co ma przedstawiać:** Widok z nagłówkiem *"Add Cards"*, licznikiem kart (np. *"3 / 20"*), wypełnionymi polami tekstowymi *Term* oraz *Definition*, czarnym przyciskiem *"Add Card"* oraz sekcją *"Added this session"* z listą wcześniej dodanych fiszek.
> *   **Zaznaczone i opisane elementy interfejsu:**
>     1.  **Licznik sesji (Card Count)** – Informuje, ile kart znajduje się w tworzonym zestawie (np. *3 / 20*).
>     2.  **Pole Pojęcia (Term Input)** – Pole do wpisania słowa kluczowego.
>     3.  **Pole Definicji (Definition Input)** – Kilkulinijkowe pole tekstowe na odpowiedź.
>     4.  **Przycisk "Add Card"** – Dodaje aktualnie wpisaną fiszkę do listy roboczej.
>     5.  **Lista dodanych kart (Preview List)** – Podgląd dodanych fiszek z ikonami szybkiego usuwania.
>     6.  **Przycisk "Done"** – Kończy proces edycji i trwale zapisuje zestaw.

---

## 7. Tryb Uczenia Się (Aktywna Nauka)

Ekran nauki to najważniejsze miejsce w całej aplikacji. Został zoptymalizowany pod kątem pełnego skupienia i wygody użytkowania na urządzeniach mobilnych.

### 7.1 Przebieg Sesji Nauki
1.  **Pasek postępu sesji:** U góry ekranu zielony pasek (`SESSION PROGRESS`) pokazuje, ile kart z puli dzisiejszej sesji już przeanalizowałeś.
2.  **Karta Fiszki:** Na środku ekranu znajduje się biała, zaokrąglona karta. Na jej frontowej stronie wyświetlone jest **Pytanie / Pojęcie**.
3.  **Obrócenie karty (Odkrycie Odpowiedzi):**
    *   Aby poznać odpowiedź, **dotknij w dowolnym miejscu obszaru karty**.
    *   Karta wykona płynny obrót 3D, prezentując na odwrocie **Odpowiedź / Definicję**.
    *   Ponowne tąpnięcie w kartę odwróci ją z powrotem.

### 7.2 Ocena Trudności (Samoocena)
Po odwróceniu karty i zapoznaniu się z odpowiedzią musisz szczerze ocenić, jak dobrze pamiętałeś daną informację. Na dole ekranu pojawią się 4 przyciski:
*   🔴 **Very Hard** (Bardzo Trudne): Pytanie było dla Ciebie całkowicie obce lub odpowiedziałeś błędnie.
    *   *Efekt:* Karta błyśnie na czerwono, a poziom biegłości zestawu nie wzrośnie. Fiszka wróci do puli częstszych powtórek.
*   🟡 **Hard** (Trudne): Pamiętałeś odpowiedź, ale wymagało to od Ciebie ogromnego wysiłku i dłuższego namysłu.
    *   *Efekt:* Karta błyśnie na pomarańczowo, biegłość zestawu wzrośnie nieznacznie (+1%).
*   🟢 **Easy** (Łatwe): Odpowiedziałeś poprawnie i bez większego wahania.
    *   *Efekt:* Karta błyśnie na zielono, biegłość zestawu wzrośnie o +2%.
*   ❇️ **Very Easy** (Bardzo Łatwe): Odpowiedź była dla Ciebie oczywista i natychmiastowa.
    *   *Efekt:* Karta błyśnie na intensywny zielony kolor, biegłość zestawu wzrośnie o +3%.

> [!NOTE]
> **Haptic Feedback:** Każde wciśnięcie przycisku oceny generuje subtelną wibrację urządzenia (haptics), potwierdzając rejestrację odpowiedzi przez system. Po dokonaniu oceny aplikacja automatycznie i płynnie załaduje kolejną fiszkę. Sesja kończy się po ocenieniu ostatniej karty.

> [!TIP]
> 📸 **INSTRUKCJA ZRZUTU EKRANU – TRYB UCZENIA SIĘ:**
> *   **Ekran do przechwycenia:** Ekran aktywnej nauki w trakcie sesji (ścieżka kodu: `app/study/[id].tsx`).
> *   **Co ma przedstawiać:** Widok z górnym paskiem postępu sesji, dużą centralną białą kartą prezentującą pytanie, dolną wskazówką *"Tap to reveal answer"* oraz panelem 4 kolorowych przycisków samooceny na dole ekranu.
> *   **Zaznaczone i opisane elementy interfejsu:**
>     1.  **Wskaźnik postępu sesji** – Pokazuje procentowe ukończenie bieżącej sesji nauki.
>     2.  **Karta Fiszki** – Centralny obszar interaktywny, reagujący na dotyk (obracanie).
>     3.  **Licznik Fiszek w sesji** – Informacja tekstowa na dole karty (np. *"Card 1 of 3"*).
>     4.  **Panel Samooceny (Difficulty Buttons)** – Cztery wyraźne, kolorowe przyciski (`Very Hard` – czerwony, `Hard` – pomarańczowy, `Easy` – jasnozielony, `Very Easy` – zielony), służące do oceny stopnia zapamiętania pojęcia.

---

## 8. Profil Użytkownika i Statystyki Grywalizacyjne

Zakładka **Profile** pozwala śledzić swoje postępy w dłuższej perspektywie, zarządzać kontem oraz dostosowywać opcje aplikacji.

### 8.1 Statystyki Długoterminowe (Grywalizacja)
Cztery duże kafle w sekcji statystyk wyświetlają kluczowe parametry Twojej aktywności:
*   🔥 **Current Streak (Aktualna Passa):** Liczba dni z rzędu, w których uczyłeś się w aplikacji (np. *12 days*). Regularność to klucz do sukcesu!
*   ✅ **Total Cards Mastered (Opanowane Karty):** Sumaryczna liczba fiszek, których poziom biegłości osiągnął status opanowanych (np. *1,234*).
*   ⏱ **Study Hours (Czas Nauki):** Łączny czas spędzony na aktywnej nauce w aplikacji (np. *48.5h*).
*   🎗 **Accuracy Rate (Celność):** Średnia dokładność Twoich odpowiedzi bazująca na wyborach `Easy` i `Very Easy` (np. *87%*).

### 8.2 Ustawienia i Pomoc
W dolnej części profilu możesz zarządzać ustawieniami aplikacji:
*   **Notifications (Powiadomienia):** Konfiguracja przypomnień o codziennej nauce, aby utrzymać swoją passę (`Streak`).
*   **Privacy (Prywatność):** Zarządzanie widocznością Twoich zestawów dla społeczności.
*   **Appearance (Wygląd):** Wybór motywu jasnego lub ciemnego.
*   **FAQ / Wsparcie:** Dostęp do pomocy technicznej i najczęściej zadawanych pytań.
*   **Wylogowanie (Log Out):** Czerwony przycisk na samym dole pozwalający na bezpieczne wylogowanie się z konta.

> [!TIP]
> 📸 **INSTRUKCJA ZRZUTU EKRANU – PROFIL I STATYSTYKI:**
> *   **Ekran do przechwycenia:** Ekran profilu użytkownika (ścieżka kodu: `app/(tabs)/profile.tsx`).
> *   **Co ma przedstawiać:** Widok z nagłówkiem profilu (avatar, imię i adres e-mail), czterema kafelkami statystyk ułożonymi w siatce oraz przewijaną listą opcji ustawień.
> *   **Zaznaczone i opisane elementy interfejsu:**
>     1.  **Sekcja Użytkownika** – Avatar oraz dane osobowe zalogowanego użytkownika.
>     2.  **Siatka Statystyk (Stats Grid)** – Czytelne, duże kafle prezentujące postęp (np. ikonka płomienia dla passy nauki).
>     3.  **Menu Ustawień (Settings Section)** – Lista opcji z ikonami (powiadomienia, prywatność, wygląd).
>     4.  **Przycisk wylogowania (Log Out)** – Wyraźny przycisk z czerwoną ramką na dole ekranu profilu.

---

Życzymy owocnej nauki i spektakularnych sukcesów w zapamiętywaniu z aplikacją **Cognitive Gallery**! W razie jakichkolwiek pytań skorzystaj z sekcji *Contact Support* w zakładce Profil.
