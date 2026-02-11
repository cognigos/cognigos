# Deployment Guide

## Prerequisites

1. **Supabase Account**: Create at [supabase.com](https://supabase.com)
2. **Expo Account**: Create at [expo.dev](https://expo.dev)
3. **Gemini API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey) (users will input their own)

---

## Step 1: Supabase Setup

### Create Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Enter project details and region
4. Wait for project to provision (~2 minutes)

### Configure Database

1. Go to SQL Editor in Supabase dashboard
2. Copy the entire SQL schema from `/docs/DATABASE_SCHEMA.md`
3. Paste and run in SQL Editor
4. Verify tables created in Table Editor

### Get Credentials

1. Go to Settings → API
2. Copy:
   - `Project URL` (e.g., `https://xxxxx.supabase.co`)
   - `anon public` key

### Configure App

Create `.env` file in project root:

```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## Step 2: Test Locally

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Open in simulator
# Press 'i' for iOS
# Press 'a' for Android
# Press 'w' for web
```

### Test Authentication

1. Sign up with test account
2. Verify user created in Supabase Users table
3. Check that `public.users` row auto-created
4. Check that 6 `cognitive_nodes` rows auto-created

### Test Daily Batch

1. From Home screen, tap "Start Today's Batch"
2. Verify 25 modules loaded
3. Complete a module
4. Verify XP awarded and progress saved
5. Check Supabase `batch_progress` table

---

## Step 3: Production Build (iOS/Android)

### Install EAS CLI

```bash
npm install -g eas-cli
eas login
```

### Configure EAS

```bash
eas build:configure
```

This creates `eas.json`:

```json
{
  "build": {
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  }
}
```

### Build for iOS

```bash
# Preview build (internal testing)
eas build --platform ios --profile preview

# Production build (App Store)
eas build --platform ios --profile production
```

**Requirements:**
- Apple Developer account ($99/year)
- Provisioning profile and certificates (EAS handles this)

### Build for Android

```bash
# Preview build (internal testing)
eas build --platform android --profile preview

# Production build (Play Store)
eas build --platform android --profile production
```

**Requirements:**
- Google Play Developer account ($25 one-time)
- Keystore (EAS generates automatically)

---

## Step 4: App Store Submission

### iOS (App Store Connect)

1. Build with `eas build --platform ios --profile production`
2. Download `.ipa` file
3. Upload to App Store Connect via Transporter or EAS Submit:
   ```bash
   eas submit --platform ios
   ```
4. Fill in App Store metadata:
   - App name: Cognigos
   - Description: (see Marketing copy below)
   - Screenshots: (generate from simulator)
   - Keywords: cognitive, philosophy, stoicism, meditation, learning
   - Category: Education

### Android (Google Play)

1. Build with `eas build --platform android --profile production`
2. Download `.aab` file
3. Upload to Google Play Console or use EAS Submit:
   ```bash
   eas submit --platform android
   ```
4. Fill in Play Store metadata (similar to above)

---

## Step 5: Web Deployment (Optional)

### Build for Web

```bash
npx expo export:web
```

This creates `/web-build` folder with static files.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd web-build
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd web-build
netlify deploy --prod
```

---

## Step 6: Over-the-Air (OTA) Updates

Expo EAS Update allows you to push code updates without app store approval:

```bash
# Configure updates
eas update:configure

# Publish update
eas update --branch production --message "Bug fixes"
```

Users will receive updates automatically on next app launch.

---

## Environment Variables (Production)

### Required for Build

Add to `eas.json`:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://xxxxx.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "your_anon_key"
      }
    }
  }
}
```

Or use EAS Secrets:

```bash
eas secret:create --name EXPO_PUBLIC_SUPABASE_URL --value https://xxxxx.supabase.co
eas secret:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value your_anon_key
```

---

## Monitoring & Analytics

### Sentry (Error Tracking)

```bash
npm install @sentry/react-native

# Initialize
npx @sentry/wizard -i reactNative
```

### PostHog (Analytics)

```bash
npm install posthog-react-native

# Configure in App.tsx
```

---

## Marketing Copy

### App Store Description

**Cognigos - Ancient Wisdom, Modern Mind**

Elevate your cognitive performance with Cognigos, the free cognitive enhancement platform combining ancient philosophy, memory techniques, and modern neuroscience.

**Features:**
• Visual Micro-Learning: Beautiful 2-3 minute animated modules
• Philosophy Tracks: Master Stoicism, Zen Buddhism, and 6 more systems
• Memory Mastery: Build memory palaces like ancient scholars
• Social Intelligence: Practice real-world scenarios with AI
• Meditation: 8 evidence-based techniques
• Breathwork: 6 breathing patterns with real-time feedback
• Advanced Techniques: Dark retreats, stress inoculation, cold exposure
• Gamification: XP, streaks, achievements, and neural topology visualization
• 100% Free: No paywalls, no subscriptions, forever

**Zero Paywalls. Maximum Learning.**

Based on research from Trinity College, Air Force Research Lab, Navy SEAL protocols, and Tibetan Buddhist traditions.

Perfect for students, entrepreneurs, knowledge workers, and lifelong learners.

---

### Keywords

cognitive enhancement, philosophy, stoicism, memory palace, meditation, breathwork, learning, education, neuroscience, mindfulness, zen, ancient wisdom, mental training, focus, memory improvement

---

### Screenshots Needed

1. Home screen with Neural Topology
2. Daily batch modules
3. Philosophy track card
4. Meditation timer
5. Profile with stats
6. Streak visualization

---

## Troubleshooting

### Build Fails

- Check `eas.json` configuration
- Verify environment variables set
- Check build logs: `eas build:list`

### Authentication Issues

- Verify Supabase URL and anon key correct
- Check Supabase dashboard for auth errors
- Ensure RLS policies enabled

### Database Errors

- Re-run SQL schema from scratch
- Check table permissions in Supabase
- Verify trigger `on_auth_user_created` exists

---

## Maintenance

### Regular Tasks

1. **Weekly**: Check error logs (Sentry)
2. **Weekly**: Review user analytics (PostHog)
3. **Monthly**: Update dependencies: `npm update`
4. **Monthly**: Check Supabase database size
5. **Quarterly**: Rebuild apps with latest Expo SDK

### Backups

Supabase auto-backs up daily. To manually backup:

```bash
# Export database
pg_dump -h db.xxxxx.supabase.co -U postgres your_db > backup.sql
```

---

## Support

- **Docs**: /docs folder
- **GitHub Issues**: Report bugs
- **Community**: Discord/Reddit (to be created)

---

**Deployment complete! 🚀**
