import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokens } from '../styles/tokens';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { setGeminiApiKey, getGeminiApiKey } from '../services/gemini';

export const SettingsScreen = () => {
  const [geminiKey, setGeminiKey] = useState('');
  const [gongEnabled, setGongEnabled] = useState(true);
  const [gongInterval, setGongInterval] = useState('30');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedKey = await AsyncStorage.getItem('gemini_api_key');
      const savedGongEnabled = await AsyncStorage.getItem('gong_enabled');
      const savedGongInterval = await AsyncStorage.getItem('gong_interval');

      if (savedKey) {
        setGeminiKey(savedKey);
        setGeminiApiKey(savedKey);
      }
      if (savedGongEnabled !== null) {
        setGongEnabled(savedGongEnabled === 'true');
      }
      if (savedGongInterval) {
        setGongInterval(savedGongInterval);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      
      // Save Gemini API key
      if (geminiKey) {
        await AsyncStorage.setItem('gemini_api_key', geminiKey);
        setGeminiApiKey(geminiKey);
      }
      
      // Save Gong settings
      await AsyncStorage.setItem('gong_enabled', String(gongEnabled));
      await AsyncStorage.setItem('gong_interval', gongInterval);
      
      Alert.alert('Success', 'Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const testGeminiKey = async () => {
    if (!geminiKey) {
      Alert.alert('Error', 'Please enter an API key first');
      return;
    }

    try {
      setGeminiApiKey(geminiKey);
      const { generateContent } = require('../services/gemini');
      await generateContent({ prompt: 'Say "API key working!" in one sentence.' });
      Alert.alert('Success', 'API key is valid and working!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'API key test failed');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>🤖 AI Content Generation</Text>
        <Text style={styles.description}>
          Cognigos uses Google Gemini AI to generate personalized scenarios, quiz questions, and
          content. Enter your own API key (free tier available).
        </Text>
        
        <Text style={styles.label}>Gemini API Key</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Gemini API key"
          placeholderTextColor={tokens.colors.silver}
          value={geminiKey}
          onChangeText={setGeminiKey}
          secureTextEntry
          autoCapitalize="none"
        />
        
        <Button
          onPress={testGeminiKey}
          variant="outline"
          style={styles.testButton}
        >
          Test API Key
        </Button>
        
        <Text style={styles.helpText}>
          Get your free API key at: https://makersuite.google.com/app/apikey
        </Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>🔕 Mindfulness Gong</Text>
        <Text style={styles.description}>
          The Gong reminds you to return to present-moment awareness throughout the day.
        </Text>
        
        <View style={styles.switchRow}>
          <Text style={styles.label}>Enable Gong</Text>
          <Switch
            value={gongEnabled}
            onValueChange={setGongEnabled}
            trackColor={{ false: tokens.colors.stoneGray, true: tokens.colors.bronze }}
            thumbColor={tokens.colors.alabaster}
          />
        </View>
        
        {gongEnabled && (
          <>
            <Text style={styles.label}>Interval (minutes)</Text>
            <TextInput
              style={styles.input}
              placeholder="30"
              placeholderTextColor={tokens.colors.silver}
              value={gongInterval}
              onChangeText={setGongInterval}
              keyboardType="number-pad"
            />
          </>
        )}
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ About</Text>
        <Text style={styles.description}>
          Cognigos v1.0.0{'\n\n'}
          Where Ancient Wisdom Meets Modern Mind{'\n\n'}
          A zero-paywall cognitive enhancement platform combining Stoic philosophy, memory
          techniques, meditation, and modern neuroscience.{'\n\n'}
          Built with ❤️ by the open-source community.
        </Text>
      </Card>

      <Button
        onPress={saveSettings}
        loading={saving}
        style={styles.saveButton}
      >
        Save Settings
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.obsidian,
  },
  section: {
    margin: tokens.spacing.lg,
  },
  sectionTitle: {
    fontSize: tokens.fontSizes.xl,
    fontWeight: '700',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.sm,
  },
  description: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    lineHeight: tokens.fontSizes.base * 1.6,
    marginBottom: tokens.spacing.md,
  },
  label: {
    fontSize: tokens.fontSizes.base,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
    marginTop: tokens.spacing.sm,
  },
  input: {
    backgroundColor: tokens.colors.stoneGray,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.sm,
    borderWidth: 1,
    borderColor: tokens.colors.charcoal,
  },
  testButton: {
    marginTop: tokens.spacing.sm,
  },
  helpText: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    marginTop: tokens.spacing.sm,
    fontStyle: 'italic',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: tokens.spacing.sm,
  },
  saveButton: {
    margin: tokens.spacing.lg,
    marginTop: 0,
    marginBottom: tokens.spacing['2xl'],
  },
});
