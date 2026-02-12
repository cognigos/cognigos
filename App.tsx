import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

const tokens = {
  colors: {
    obsidian: '#0A1929',
    charcoal: '#132F4C',
    stoneGray: '#1E4976',
    bronze: '#8C6239',
    alabaster: '#ECEFF1',
    silver: '#B0BEC5',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  fontSizes: { sm: 13, base: 16, lg: 21, xl: 25, '2xl': 31, '3xl': 39 },
  radius: { md: 10, lg: 16 },
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (!isSignedIn) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.authContainer}>
          <Text style={styles.title}>🧠 COGNIGOS</Text>
          <Text style={styles.subtitle}>Where Ancient Wisdom Meets Modern Mind</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={tokens.colors.silver}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={tokens.colors.silver}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (email && password) {
                setIsSignedIn(true);
              } else {
                alert('Please fill in all fields');
              }
            }}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          <Text style={styles.demoText}>Demo Mode - Any email/password works!</Text>
        </ScrollView>
      </View>
    );
  }

  if (screen === 'meditation') {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setScreen('home')}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.screenTitle}>🧘 The Refuge</Text>
            <Text style={styles.screenSubtitle}>8 Meditation Techniques</Text>
          </View>
          
          {['Focused Attention', 'Noting', 'Body Scan', 'Loving-Kindness', 'Open Monitoring', 'Visualization', 'Reflection', 'Compassion'].map((technique, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.cardTitle}>{technique}</Text>
              <Text style={styles.cardText}>Ancient meditation practice for mindfulness and awareness.</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (screen === 'breath') {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setScreen('home')}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.screenTitle}>🫁 Breath Engine</Text>
            <Text style={styles.screenSubtitle}>6 Breathing Patterns</Text>
          </View>
          
          {['Box Breathing', 'Physiological Sigh', 'Coherence', 'Wim Hof', '4-7-8 Sleep', 'Alternate Nostril'].map((pattern, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.cardTitle}>{pattern}</Text>
              <Text style={styles.cardText}>Breathwork pattern for focus and relaxation.</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Seeker</Text>
          <Text style={styles.level}>Level 1 • 0 XP</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥 Streak: 0 days</Text>
          <Text style={styles.cardText}>Start your journey today!</Text>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.actionCard} onPress={() => setScreen('meditation')}>
          <Text style={styles.actionIcon}>🧘</Text>
          <Text style={styles.actionName}>Meditate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={() => setScreen('breath')}>
          <Text style={styles.actionIcon}>🫁</Text>
          <Text style={styles.actionName}>Breathwork</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>📚</Text>
          <Text style={styles.actionName}>Philosophy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>🎭</Text>
          <Text style={styles.actionName}>Social IQ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>🗝️</Text>
          <Text style={styles.actionName}>Forbidden</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => setIsSignedIn(false)}>
            <Text style={styles.signOutButton}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.obsidian,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: tokens.spacing.lg,
    minHeight: '100vh',
  },
  header: {
    padding: tokens.spacing.lg,
    paddingTop: tokens.spacing.xl,
  },
  title: {
    fontSize: tokens.fontSizes['3xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
    textAlign: 'center',
    marginBottom: tokens.spacing.sm,
  },
  subtitle: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    textAlign: 'center',
    marginBottom: tokens.spacing.xl,
  },
  greeting: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
  },
  level: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    marginTop: tokens.spacing.xs,
  },
  input: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.stoneGray,
  },
  button: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    alignItems: 'center',
    marginTop: tokens.spacing.sm,
    borderWidth: 1,
    borderColor: tokens.colors.bronze,
  },
  buttonText: {
    color: tokens.colors.alabaster,
    fontSize: tokens.fontSizes.base,
    fontWeight: '600',
  },
  demoText: {
    color: tokens.colors.silver,
    fontSize: tokens.fontSizes.sm,
    textAlign: 'center',
    marginTop: tokens.spacing.lg,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    margin: tokens.spacing.md,
    marginTop: 0,
    borderWidth: 1,
    borderColor: tokens.colors.stoneGray,
  },
  cardTitle: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
  },
  cardText: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
  },
  sectionTitle: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    margin: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  actionCard: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    margin: tokens.spacing.md,
    marginTop: 0,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.stoneGray,
  },
  actionIcon: {
    fontSize: 48,
    marginBottom: tokens.spacing.sm,
  },
  actionName: {
    fontSize: tokens.fontSizes.base,
    fontWeight: '600',
    color: tokens.colors.alabaster,
  },
  screenTitle: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
    textAlign: 'center',
    marginTop: tokens.spacing.md,
  },
  screenSubtitle: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    textAlign: 'center',
    marginTop: tokens.spacing.xs,
  },
  backButton: {
    fontSize: tokens.fontSizes.lg,
    color: tokens.colors.bronze,
  },
  footer: {
    padding: tokens.spacing.lg,
    alignItems: 'center',
  },
  signOutButton: {
    color: tokens.colors.bronze,
    fontSize: tokens.fontSizes.base,
  },
});
