import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { tokens } from '../styles/tokens';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const MEDITATION_TECHNIQUES = [
  {
    id: 'focused-attention',
    name: 'Focused Attention',
    icon: '🎯',
    description: 'Concentrate on your breath. Build foundational attention skills.',
    duration: [5, 10, 15, 20],
  },
  {
    id: 'noting',
    name: 'Noting',
    icon: '📝',
    description: 'Label mental experiences as they arise. Develop meta-awareness.',
    duration: [10, 15, 20],
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    icon: '🧘',
    description: 'Systematic attention to bodily sensations. MBSR protocol.',
    duration: [15, 20, 30],
  },
  {
    id: 'loving-kindness',
    name: 'Loving-Kindness (Metta)',
    icon: '💖',
    description: 'Cultivate compassion for self and others. Ancient Buddhist practice.',
    duration: [10, 15, 20],
  },
  {
    id: 'open-monitoring',
    name: 'Open Monitoring',
    icon: '🌊',
    description: 'Observe whatever arises without attachment. Advanced Zen technique.',
    duration: [10, 15, 20, 30],
  },
  {
    id: 'visualization',
    name: 'Visualization',
    icon: '🏔️',
    description: 'Guided imagery meditation. Mountain, forest, ocean scenes.',
    duration: [10, 15, 20],
  },
  {
    id: 'reflection',
    name: 'Reflection (Analytical)',
    icon: '🤔',
    description: 'Contemplate philosophical topics. Tibetan tradition.',
    duration: [15, 20, 30],
  },
  {
    id: 'compassion',
    name: 'Skillful Compassion',
    icon: '🙏',
    description: 'Integration practice. Wisdom + compassion + skill.',
    duration: [15, 20, 30],
  },
];

export const MeditationScreen = ({ navigation }: any) => {
  const [selectedTechnique, setSelectedTechnique] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(10);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const startSession = () => {
    setTimeRemaining(selectedDuration * 60);
    setIsSessionActive(true);
    // In production, implement actual timer with setInterval
  };

  const endSession = () => {
    setIsSessionActive(false);
    setSelectedTechnique(null);
    // Award XP, log session to database
  };

  if (isSessionActive) {
    return (
      <View style={styles.sessionContainer}>
        <View style={styles.timerDisplay}>
          <Text style={styles.timerText}>
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </Text>
          <Text style={styles.techniqueLabel}>{selectedTechnique?.name}</Text>
        </View>

        <View style={styles.visualizationArea}>
          <Text style={styles.visualizationEmoji}>
            {selectedTechnique?.icon}
          </Text>
          <Text style={styles.instructionText}>
            {selectedTechnique?.id === 'focused-attention' && 'Focus on your breath...'}
            {selectedTechnique?.id === 'noting' && 'Notice and label: thinking, feeling, sensing...'}
            {selectedTechnique?.id === 'body-scan' && 'Scan from feet to head...'}
            {selectedTechnique?.id === 'loving-kindness' && 'May I be happy, healthy, safe, at ease...'}
          </Text>
        </View>

        <Button onPress={endSession} variant="outline">
          End Session
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧘 The Refuge</Text>
        <Text style={styles.subtitle}>8 Evidence-Based Meditation Techniques</Text>
      </View>

      <View style={styles.techniquesGrid}>
        {MEDITATION_TECHNIQUES.map((technique) => (
          <TouchableOpacity
            key={technique.id}
            style={styles.techniqueCard}
            onPress={() => setSelectedTechnique(technique)}
          >
            <Text style={styles.techniqueIcon}>{technique.icon}</Text>
            <Text style={styles.techniqueName}>{technique.name}</Text>
            <Text style={styles.techniqueDescription}>
              {technique.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Configuration Modal */}
      <Modal
        visible={!!selectedTechnique && !isSessionActive}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedTechnique(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedTechnique?.icon} {selectedTechnique?.name}
            </Text>
            <Text style={styles.modalDescription}>
              {selectedTechnique?.description}
            </Text>

            <Text style={styles.durationLabel}>Select Duration:</Text>
            <View style={styles.durationButtons}>
              {selectedTechnique?.duration.map((dur: number) => (
                <TouchableOpacity
                  key={dur}
                  style={[
                    styles.durationButton,
                    selectedDuration === dur && styles.durationButtonActive,
                  ]}
                  onPress={() => setSelectedDuration(dur)}
                >
                  <Text
                    style={[
                      styles.durationButtonText,
                      selectedDuration === dur && styles.durationButtonTextActive,
                    ]}
                  >
                    {dur} min
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button onPress={startSession} style={styles.startButton}>
              Begin Session
            </Button>
            <Button
              onPress={() => setSelectedTechnique(null)}
              variant="outline"
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
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
  },
  techniquesGrid: {
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  techniqueCard: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.stoneGray,
    ...tokens.shadows.neomorphicOutset,
  },
  techniqueIcon: {
    fontSize: tokens.fontSizes['3xl'],
    marginBottom: tokens.spacing.sm,
  },
  techniqueName: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
  },
  techniqueDescription: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    lineHeight: tokens.fontSizes.sm * 1.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: tokens.spacing.lg,
  },
  modalContent: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.xl,
  },
  modalTitle: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
    textAlign: 'center',
    marginBottom: tokens.spacing.md,
  },
  modalDescription: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    textAlign: 'center',
    marginBottom: tokens.spacing.lg,
    lineHeight: tokens.fontSizes.base * 1.6,
  },
  durationLabel: {
    fontSize: tokens.fontSizes.base,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.sm,
  },
  durationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.lg,
  },
  durationButton: {
    backgroundColor: tokens.colors.stoneGray,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.lg,
    borderRadius: tokens.radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  durationButtonActive: {
    borderColor: tokens.colors.bronze,
    backgroundColor: tokens.colors.charcoal,
  },
  durationButtonText: {
    color: tokens.colors.silver,
    fontWeight: '600',
  },
  durationButtonTextActive: {
    color: tokens.colors.bronze,
  },
  startButton: {
    marginBottom: tokens.spacing.sm,
  },
  cancelButton: {
    marginTop: tokens.spacing.sm,
  },
  sessionContainer: {
    flex: 1,
    backgroundColor: tokens.colors.obsidian,
    justifyContent: 'space-around',
    padding: tokens.spacing.xl,
  },
  timerDisplay: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 72,
    fontWeight: '700',
    color: tokens.colors.bronze,
    marginBottom: tokens.spacing.sm,
  },
  techniqueLabel: {
    fontSize: tokens.fontSizes.xl,
    color: tokens.colors.alabaster,
  },
  visualizationArea: {
    alignItems: 'center',
    padding: tokens.spacing.xl,
  },
  visualizationEmoji: {
    fontSize: 100,
    marginBottom: tokens.spacing.lg,
  },
  instructionText: {
    fontSize: tokens.fontSizes.lg,
    color: tokens.colors.silver,
    textAlign: 'center',
    lineHeight: tokens.fontSizes.lg * 1.8,
  },
});
