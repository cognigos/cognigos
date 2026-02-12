import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { tokens } from '../styles/tokens';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const NEXUS_DOMAINS = [
  {
    id: 'emotional-intelligence',
    name: 'Emotional Intelligence',
    icon: '🎭',
    description: 'Read emotions, develop empathy, manage emotional contagion.',
    color: tokens.colors.crimson.reasoning,
  },
  {
    id: 'persuasion',
    name: 'Persuasion & Influence',
    icon: '🎯',
    description: "Master Cialdini's 6 principles and objection handling.",
    color: tokens.colors.gold.memory,
  },
  {
    id: 'conflict',
    name: 'Conflict Resolution',
    icon: '⚖️',
    description: 'Navigate the 9-stage escalation ladder with grace.',
    color: tokens.colors.emerald.decision,
  },
  {
    id: 'listening',
    name: 'Active Listening',
    icon: '👂',
    description: 'Internal, Focused, and Global listening levels.',
    color: tokens.colors.sapphire.philosophy,
  },
  {
    id: 'nonverbal',
    name: 'Nonverbal Communication',
    icon: '🤝',
    description: 'Power poses, proxemics, charisma triangle.',
    color: tokens.colors.violet.creativity,
  },
  {
    id: 'adaptability',
    name: 'Adaptability',
    icon: '🦎',
    description: 'Code-switching, reading the room, mirroring.',
    color: tokens.colors.amber.flexibility,
  },
  {
    id: 'charisma',
    name: 'Charisma & Presence',
    icon: '✨',
    description: 'Vocal variety, storytelling, magnetism formula.',
    color: tokens.colors.bronze,
  },
];

export const NexusScreen = ({ navigation }: any) => {
  const [selectedDomain, setSelectedDomain] = useState<any>(null);
  const [scenario, setScenario] = useState<any>(null);

  const generateScenario = async (domain: any) => {
    // In production, this would call Gemini API
    const mockScenario = {
      personality: 'Skeptical CEO',
      context: 'Sales pitch meeting',
      dialogue: `"I appreciate you taking the time, but honestly, I've seen a dozen pitches like this. Why should I believe yours is any different?"`,
      subtext: [
        'Testing your confidence',
        'Looking for unique value',
        'Wants honesty, not hype',
      ],
      options: [
        {
          id: 'A',
          text: "You're absolutely right to be skeptical. Let me show you three specific ways we're different...",
          analysis: 'Good: Validates concern, promises specifics',
        },
        {
          id: 'B',
          text: "We're the market leader with 10,000 clients!",
          analysis: 'Weak: Generic claim, no differentiation',
        },
        {
          id: 'C',
          text: "What would make you believe we're different?",
          analysis: 'Strong: Turns it back, gathers intel',
        },
        {
          id: 'D',
          text: "Fair question. What's been missing in the pitches you've seen?",
          analysis: 'Best: Empathy + discovery question',
        },
      ],
    };
    setScenario(mockScenario);
  };

  const handleResponse = (optionId: string) => {
    // Award XP, show feedback, generate next scenario
    const option = scenario.options.find((o: any) => o.id === optionId);
    alert(`Analysis: ${option.analysis}\n\n+45 XP`);
    setScenario(null);
    setSelectedDomain(null);
  };

  if (scenario) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.scenarioHeader}>
          <Text style={styles.scenarioContext}>
            {scenario.personality} • {scenario.context}
          </Text>
        </View>

        <Card style={styles.dialogueCard}>
          <Text style={styles.dialogue}>{scenario.dialogue}</Text>
        </Card>

        <Card style={styles.subtextCard}>
          <Text style={styles.subtextTitle}>Detected Subtext:</Text>
          {scenario.subtext.map((text: string, i: number) => (
            <Text key={i} style={styles.subtextItem}>
              • {text}
            </Text>
          ))}
        </Card>

        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Your Response:</Text>
          {scenario.options.map((option: any) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => handleResponse(option.id)}
            >
              <Text style={styles.optionId}>{option.id}</Text>
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  if (selectedDomain) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedDomain(null)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.domainTitle}>
            {selectedDomain.icon} {selectedDomain.name}
          </Text>
          <Text style={styles.domainDescription}>{selectedDomain.description}</Text>
        </View>

        <View style={styles.centerContent}>
          <Button onPress={() => generateScenario(selectedDomain)}>
            Generate Scenario
          </Button>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎭 The Nexus</Text>
        <Text style={styles.subtitle}>
          AI-powered social intelligence training across 7 domains
        </Text>
      </View>

      <View style={styles.domainsGrid}>
        {NEXUS_DOMAINS.map((domain) => (
          <TouchableOpacity
            key={domain.id}
            style={[styles.domainCard, { borderLeftColor: domain.color, borderLeftWidth: 4 }]}
            onPress={() => setSelectedDomain(domain)}
          >
            <Text style={styles.domainIcon}>{domain.icon}</Text>
            <Text style={styles.domainName}>{domain.name}</Text>
            <Text style={styles.domainDesc}>{domain.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.obsidian,
  },
  header: {
    padding: tokens.spacing.lg,
    paddingTop: tokens.spacing['2xl'],
  },
  backButton: {
    fontSize: tokens.fontSizes.lg,
    color: tokens.colors.bronze,
    marginBottom: tokens.spacing.md,
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
    lineHeight: tokens.fontSizes.base * 1.6,
  },
  domainsGrid: {
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  domainCard: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.stoneGray,
    ...tokens.shadows.neomorphicOutset,
  },
  domainIcon: {
    fontSize: tokens.fontSizes['3xl'],
    marginBottom: tokens.spacing.sm,
  },
  domainName: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
  },
  domainDesc: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    lineHeight: tokens.fontSizes.sm * 1.6,
  },
  domainTitle: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
    textAlign: 'center',
    marginBottom: tokens.spacing.sm,
  },
  domainDescription: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    textAlign: 'center',
    lineHeight: tokens.fontSizes.base * 1.6,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    padding: tokens.spacing.lg,
  },
  scenarioHeader: {
    padding: tokens.spacing.lg,
    paddingTop: tokens.spacing['2xl'],
  },
  scenarioContext: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.bronze,
    textAlign: 'center',
    fontWeight: '600',
  },
  dialogueCard: {
    margin: tokens.spacing.lg,
    backgroundColor: tokens.colors.stoneGray,
  },
  dialogue: {
    fontSize: tokens.fontSizes.lg,
    color: tokens.colors.alabaster,
    lineHeight: tokens.fontSizes.lg * 1.6,
    fontStyle: 'italic',
  },
  subtextCard: {
    margin: tokens.spacing.lg,
    marginTop: 0,
  },
  subtextTitle: {
    fontSize: tokens.fontSizes.base,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.sm,
  },
  subtextItem: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    marginBottom: tokens.spacing.xs,
  },
  optionsContainer: {
    padding: tokens.spacing.lg,
  },
  optionsTitle: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.md,
  },
  optionButton: {
    flexDirection: 'row',
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    marginBottom: tokens.spacing.sm,
    borderWidth: 1,
    borderColor: tokens.colors.stoneGray,
    ...tokens.shadows.neomorphicOutset,
  },
  optionId: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '700',
    color: tokens.colors.bronze,
    marginRight: tokens.spacing.md,
  },
  optionText: {
    flex: 1,
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.alabaster,
    lineHeight: tokens.fontSizes.base * 1.6,
  },
});
