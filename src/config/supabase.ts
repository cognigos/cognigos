// Supabase Configuration
// User should set these in environment variables or .env file

export const SUPABASE_CONFIG = {
  url: process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL',
  anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY',
};

export const GEMINI_CONFIG = {
  apiKey: '', // User inputs in Settings screen
};
