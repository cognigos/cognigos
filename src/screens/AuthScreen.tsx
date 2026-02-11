import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Button } from '../components/Button';
import { tokens } from '../styles/tokens';
import { useAuthStore } from '../stores/authStore';

export const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuthStore();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      if (isSignUp) {
        await signUp(email, password, username);
        Alert.alert('Success', 'Account created! Welcome to Cognigos.');
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>🧠 COGNIGOS</Text>
        <Text style={styles.tagline}>Where Ancient Wisdom Meets Modern Mind</Text>

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Username (optional)"
            placeholderTextColor={tokens.colors.silver}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={tokens.colors.silver}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={tokens.colors.silver}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          onPress={handleAuth}
          loading={loading}
          style={styles.button}
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </Button>

        <Button
          onPress={() => setIsSignUp(!isSignUp)}
          variant="outline"
          style={styles.button}
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.obsidian,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.lg,
  },
  title: {
    fontSize: tokens.fontSizes['4xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
    textAlign: 'center',
    marginBottom: tokens.spacing.sm,
  },
  tagline: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    textAlign: 'center',
    marginBottom: tokens.spacing['2xl'],
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
    marginTop: tokens.spacing.sm,
  },
});
