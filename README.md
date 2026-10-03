# 🚀 Startup Idea Evaluator — AI + Voting App

A React Native (Expo) app where users pitch startup ideas, get a (fun, fake) AI rating, upvote other ideas, and see a live leaderboard.

> 📱 **APK:** [Download from Google Drive](https://drive.google.com/file/d/1OPVzNIYl8eMekH6qtQscUeQmKeP3UFr9/view?usp=sharing)
>
> 🎥 **Walkthrough video:** [Watch on Google Drive](https://drive.google.com/file/d/1l_7Fwp24U7xTSYqxs6IKESv3Nv8qNgVL/view?usp=sharing)

---

## ✨ Features

### 🧾 Idea Submission
- Form with **Startup Name**, **Tagline**, **Description** (with character counters and validation)
- On submit, a fake "AI" evaluates the idea (with a loading state) and generates:
  - a **rating from 0–100** (random base + small bonuses for detail and buzzwords)
  - a **witty one-line verdict** matching the score tier
- Idea is saved locally (AsyncStorage) and you're taken to the Ideas list, where the new idea is highlighted

### 📜 Idea Listing
- Each card shows name, tagline, AI rating badge (colour-coded), AI verdict, and vote count
- **Upvote** button — **one vote per idea per device**, stored in AsyncStorage (tap again to undo)
- **Read more / Show less** to expand the full description
- **Sort** by AI rating or by votes

### 🏆 Leaderboard
- **Top 5** ideas, switchable between **by votes** and **by AI rating**
- 🥇🥈🥉 badges with **gold / silver / bronze gradient cards** and shadows
- Animated entry of cards

### 🌚 Bonus features
- **Dark mode toggle** (moon/sun icon in every header, persisted; uses Tailwind `dark:` classes)
- **Toast notifications** on submission, voting, and copying
- **Share** via the native share sheet, and **copy to clipboard**
- **Swipe gestures**: swipe a card **right → upvote**, **left → share**
- **Animations** (Reanimated): cards fade/spring in, vote button "pops"
- **Custom font** (Poppins) and **icons** (Ionicons)
- Sample ideas are seeded on first launch so the app isn't empty

---

## 🧑‍💻 Tech Stack

| Area | Choice |
|---|---|
| Framework | React Native + **Expo** (TypeScript) |
| Navigation | React Navigation (bottom tabs) |
| State | **Zustand** with `persist` middleware |
| Storage | **AsyncStorage** |
| Styling | **Tailwind CSS** via **NativeWind v4** (`className` on components, `dark:` variants for dark mode) |
| UI | Custom components, `expo-linear-gradient`, `@expo/vector-icons` |
| Animations / gestures | `react-native-reanimated`, `react-native-gesture-handler` (`ReanimatedSwipeable`) |
| Feedback | `react-native-toast-message` |
| Sharing | React Native `Share` API, `expo-clipboard` |
| Fonts | `@expo-google-fonts/poppins` |

---

## 📂 Project Structure

```
App.tsx                      # Fonts, theme, navigation, toast host
global.css                   # Tailwind directives
tailwind.config.js           # Colour palette (light/dark pairs) + Poppins font classes
babel.config.js / metro.config.js   # NativeWind setup
src/
  types.ts                   # Idea type + navigation params
  theme.ts                   # Raw colours for props that can't take classes (icons, gradients)
  store/
    useIdeaStore.ts          # Zustand store (ideas, votes, dark mode) persisted to AsyncStorage
    seed.ts                  # Sample ideas for first launch
  utils/
    fakeAI.ts                # Fake AI rating + verdict generator
    share.ts                 # Share sheet + clipboard helpers
  components/
    ScreenHeader.tsx         # Gradient header with dark-mode toggle
    IdeaCard.tsx             # Swipeable card: vote, read more, share
    RatingBadge.tsx          # Colour-coded score circle
  screens/
    SubmitScreen.tsx
    IdeasScreen.tsx
    LeaderboardScreen.tsx
```

---

## ▶️ Run locally

**Prerequisites:** Node.js 20+ and the **Expo Go** app on your phone (Play Store / App Store).

```bash
git clone <your-repo-url>
cd startup-idea-evaluator
npm install
npx expo start -c
```

(`-c` clears Metro's cache — needed the first time so Tailwind styles are compiled.)

Scan the QR code with Expo Go (Android) or the Camera app (iOS). Press `a` for an Android emulator or `w` to open it in a browser.

---

## 📦 Install the APK (Android)

1. Download the APK: **[Google Drive link](https://drive.google.com/file/d/1OPVzNIYl8eMekH6qtQscUeQmKeP3UFr9/view?usp=sharing)**
2. Open it on your Android phone and allow "Install unknown apps" if prompted.

> ⚠️ Android shows a standard "file might be harmful" warning for any APK downloaded outside the Play Store. Tap **Download anyway**, then **More details → Install anyway** if Google Play Protect asks.

### Building the APK yourself

The project includes an `eas.json` with a `preview` profile that outputs an installable `.apk`:

```bash
npm install -g eas-cli
eas login            # free Expo account
eas build -p android --profile preview
```

When the build finishes, EAS gives you a download link for the `.apk` — upload it to Google Drive and share the link.

> Note: `expo publish` has been retired by Expo; EAS Build (above) or EAS Update are the current ways to share an Expo app.
