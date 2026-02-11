# 🚀 Cognigos - Quick Start (5 Minutes)

## Fastest Path to Running App

### Step 1: Prerequisites (1 min)
```bash
# Check Node.js installed (need 18+)
node --version

# Install Expo CLI if needed
npm install -g expo-cli
```

### Step 2: Start Development Server (1 min)
```bash
cd cognigos
npm start
```

This opens Expo Developer Tools in browser.

### Step 3: Run on Device (2 min)

**Option A: iOS Simulator (Mac only)**
- Press `i` in terminal
- iOS Simulator launches automatically

**Option B: Android Emulator**
- Start Android emulator first
- Press `a` in terminal

**Option C: Physical Device**
1. Install "Expo Go" app (iOS App Store / Google Play)
2. Scan QR code shown in terminal
3. App loads on your device

### Step 4: Test the App (1 min)

1. **Sign Up**: Create test account (email + password)
2. **Home Screen**: See your profile, XP, streak
3. **Daily Batch**: Tap "Start Today's Batch" button
4. **Complete Module**: Swipe through cards, tap "Next"
5. **Check Progress**: See XP increase, streak update

---

## What Works (MVP Features)

✅ **Authentication** - Sign up, sign in, sign out  
✅ **User Profile** - Level, XP, streaks  
✅ **Daily Batch** - 25 modules generated  
✅ **Module Cards** - Text cards (animations placeholder)  
✅ **Progress Tracking** - XP, levels, streaks  
✅ **6 Cognitive Domains** - Reasoning, Memory, etc.  
✅ **Settings** - Gemini API key input  
✅ **Local Storage** - Progress persists offline  

---

## What's Next (To Implement)

🚧 **3D Neural Topology** - Three.js visualization  
🚧 **Philosophy Tracks** - 8 systems, 420 cards  
🚧 **The Nexus** - AI social scenarios  
🚧 **The Refuge** - 8 meditation techniques  
🚧 **Breath Engine** - 6 breathing patterns  
🚧 **Forbidden Library** - 7 advanced techniques  
🚧 **Achievements** - 100+ badges  
🚧 **Analytics Dashboard** - Progress charts  

---

## Configuration (Optional)

### Supabase (Backend Database)

**Without Supabase** (Demo Mode):
- App works offline with mock data
- No cloud sync across devices
- Perfect for testing

**With Supabase** (Production):
1. Create free account at [supabase.com](https://supabase.com)
2. Create new project
3. Run SQL schema from `/docs/DATABASE_SCHEMA.md`
4. Create `.env` file:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
5. Restart app

### Gemini API (AI Content)

**Without Gemini**:
- App uses pre-written content only
- No AI-generated scenarios

**With Gemini** (Recommended):
1. Get free API key: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Open app → Profile → Settings
3. Paste API key in "Gemini API Key" field
4. Tap "Test API Key" to verify
5. Tap "Save Settings"

Now AI features work:
- Generated Nexus scenarios
- Custom quiz questions
- Personalized feedback

---

## Troubleshooting

### "Network request failed"
- **Solution**: Supabase not configured (optional) or network down
- **Fix**: Add `.env` file OR ignore (app works offline)

### "Cannot find module"
- **Solution**: Dependencies not installed
- **Fix**: Run `npm install`

### App won't start
- **Solution**: Port conflict
- **Fix**: Run `expo start -c` (clear cache)

### TypeScript errors
- **Solution**: Type checking enabled
- **Fix**: Run `npx tsc --noEmit` to see errors

---

## File Structure Tour

```
cognigos/
├── App.tsx                    # Main entry point
├── src/
│   ├── screens/               # All app screens
│   │   ├── AuthScreen.tsx     # Sign in/sign up
│   │   ├── HomeScreen.tsx     # Main dashboard
│   │   ├── BatchScreen.tsx    # Daily module feed
│   │   ├── ProfileScreen.tsx  # User stats
│   │   └── SettingsScreen.tsx # API key config
│   ├── components/            # Reusable UI
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── stores/                # State management (Zustand)
│   │   ├── authStore.ts       # Authentication
│   │   ├── batchStore.ts      # Daily modules
│   │   └── progressStore.ts   # XP, streaks
│   ├── services/              # External APIs
│   │   ├── supabase.ts        # Database
│   │   └── gemini.ts          # AI generation
│   ├── styles/                # Design tokens
│   │   └── tokens.ts          # Colors, fonts, spacing
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   └── content/               # Module content
│       └── philosophyTracks.ts
└── docs/                      # Documentation
    ├── DATABASE_SCHEMA.md     # Supabase setup
    └── DEPLOYMENT.md          # Production guide
```

---

## Next Steps

### For Developers

1. **Read CODE_ARCHITECTURE.md** - Understand codebase structure
2. **Add Features** - See `/docs/FEATURE_ROADMAP.md`
3. **Run Tests** - `npm test`
4. **Submit PR** - Contributions welcome!

### For Users

1. **Complete First Batch** - Finish 25 modules
2. **Build 7-Day Streak** - Establish daily habit
3. **Add Gemini API Key** - Unlock AI features
4. **Explore Philosophy Tracks** - Start with Stoicism

---

## Support

- **Documentation**: `/docs` folder
- **Issues**: GitHub Issues tab
- **Community**: Discord (coming soon)

---

**You're ready to go! 🧠✨**

Run `npm start` and begin your cognitive journey.
