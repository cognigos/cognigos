# 🧠 COGNIGOS

**Where Ancient Wisdom Meets Modern Mind**

A zero-paywall cognitive enhancement platform combining:
- Imprint-style visual micro-learning
- Ancient cognitive techniques (Memory palaces, Stoicism, etc.)
- Military stress inoculation protocols
- Contemplative neuroscience (8 meditation types)
- Casino-grade engagement psychology (ethical application)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android emulator

### Installation

```bash
# Clone or navigate to project
cd cognigos

# Install dependencies
npm install

# Start development server
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

---

## 🏗️ Project Structure

```
cognigos/
├── App.tsx                 # Main app entry
├── app.json                # Expo configuration
├── package.json            # Dependencies
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── screens/            # App screens
│   │   ├── AuthScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── BatchScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── stores/             # Zustand state management
│   │   ├── authStore.ts
│   │   ├── batchStore.ts
│   │   └── progressStore.ts
│   ├── services/           # API and external services
│   │   └── supabase.ts
│   ├── styles/             # Design tokens
│   │   └── tokens.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── config/             # Configuration files
│   │   └── supabase.ts
│   └── content/            # Module content & data
```

---

## ⚙️ Configuration

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create `.env` file in project root:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

3. Run database migrations (see `docs/database-schema.sql`)

### Gemini API (AI Content Generation)

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Enter in Settings screen within the app

---

## 🎯 Core Features

### ✅ Implemented (MVP)
- [x] Authentication (Supabase)
- [x] User profiles with XP/leveling
- [x] Daily batch system (25-50 modules)
- [x] Streak tracking
- [x] Module card renderer (Imprint-style)
- [x] 6 cognitive domain tracking
- [x] Progress persistence (AsyncStorage)

### 🚧 In Development
- [ ] 3D Neural Topology Map (Three.js)
- [ ] Philosophy tracks (8 systems, 420 cards)
- [ ] The Nexus (AI social intelligence scenarios)
- [ ] The Refuge (8 meditation techniques)
- [ ] The Breath Engine (6 breathing patterns)
- [ ] The Mindfulness Gong
- [ ] Forbidden Library (7 advanced techniques)
- [ ] Achievement system (100+ badges)
- [ ] Analytics dashboard

---

## 📚 Technology Stack

### Frontend
- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **State:** Zustand
- **Navigation:** React Navigation
- **Animations:** React Native Reanimated + Lottie
- **Storage:** AsyncStorage

### Backend
- **Auth & Database:** Supabase
- **AI:** Google Gemini API (user-provided key)
- **Content:** Mix of curated + AI-generated

---

## 🧪 Development

### Run Tests
```bash
npm test
```

### Type Check
```bash
npx tsc --noEmit
```

### Build for Production
```bash
# iOS
expo build:ios

# Android
expo build:android

# Web
npm run web
```

---

## 📖 Module Content System

### Content Structure

Modules are defined in `/src/content/modules/` as JSON:

```json
{
  "id": "stoicism-control",
  "title": "Dichotomy of Control",
  "domain": "philosophy",
  "difficulty": 3,
  "estimatedTime": 120,
  "cards": [
    {
      "id": "card-1",
      "type": "text",
      "text": "The Stoics divided the world into two categories..."
    },
    {
      "id": "card-2",
      "type": "animation",
      "lottieUrl": "https://...",
      "text": "Within your control: thoughts, actions, judgments."
    }
  ],
  "quiz": {...},
  "xpReward": 10
}
```

### AI Content Generation

Use the Gemini API to generate:
- Philosophy track cards
- Nexus social scenarios
- Quiz questions
- Feedback explanations

Example API call in `src/services/gemini.ts`.

---

## 🎨 Design System

### Color Palette

**Cognitive Domains:**
- Reasoning: Crimson (#8B0000)
- Memory: Gold (#D4AF37)
- Creativity: Violet (#4B0082)
- Decision: Emerald (#50C878)
- Flexibility: Amber (#FFBF00)
- Philosophy: Sapphire (#0F52BA)

**Base:**
- Obsidian: #0D0D0D (background)
- Charcoal: #1A1A1A (cards)
- Bronze: #CD7F32 (primary actions)
- Alabaster: #F0EAD6 (text)

### Typography
- Display: System (Bold for headers)
- Body: System (Regular for content)
- Mono: Courier (Code/data)

---

## 🚢 Deployment

### Expo EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build
eas build --platform ios
eas build --platform android
```

### Web Deployment

```bash
npm run web
npx expo export:web
# Deploy /web-build to Vercel/Netlify
```

---

## 📄 License

MIT License - Free forever, no paywalls.

---

## 🤝 Contributing

Contributions welcome! See `CONTRIBUTING.md` for guidelines.

---

## 📞 Support

- GitHub Issues: [cognigos/issues](https://github.com/cognigos/cognigos/issues)
- Documentation: [docs.cognigos.com](https://docs.cognigos.com)
- Community: [Discord](https://discord.gg/cognigos)

---

**Built with 🧠 by the Cognigos community**

*Cogni-* (knowing, thinking) + *-gos* (acting, moving)
