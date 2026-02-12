import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { tokens } from '../styles/tokens';
import { Button } from '../components/Button';

const BREATH_PATTERNS = [
  {
    id: 'box',
    name: 'Box Breathing',
    icon: '⬜',
    description: 'Navy SEAL technique. 4-4-4-4 pattern.',
    phases: [
      { name: 'Inhale', duration: 4, color: tokens.colors.emerald.decision },
      { name: 'Hold', duration: 4, color: tokens.colors.gold.memory },
      { name: 'Exhale', duration: 4, color: tokens.colors.crimson.reasoning },
      { name: 'Hold', duration: 4, color: tokens.colors.crimson.reasoning },
    ],
  },
  {
    id: 'physiological-sigh',
    name: 'Physiological Sigh',
    icon: '😮‍💨',
    description: 'Huberman Lab. Rapid stress reduction.',
    phases: [
      { name: 'Inhale', duration: 4, color: tokens.colors.emerald.decision },
      { name: 'Quick Inhale', duration: 1, color: tokens.colors.gold.memory },
      { name: 'Long Exhale', duration: 8, color: tokens.colors.crimson.reasoning },
    ],
  },
  {
    id: 'coherence',
    name: 'Coherence Breathing',
    icon: '♥️',
    description: 'HRV optimization. 5-5 pattern.',
    phases: [
      { name: 'Inhale', duration: 5, color: tokens.colors.emerald.decision },
      { name: 'Exhale', duration: 5, color: tokens.colors.crimson.reasoning },
    ],
  },
  {
    id: 'wim-hof',
    name: 'Wim Hof (Cyclic Hyperventilation)',
    icon: '❄️',
    description: '⚠️ Not while driving. 30 deep breaths + hold.',
    phases: [
      { name: 'Deep Breaths', duration: 60, color: tokens.colors.emerald.decision },
      { name: 'Hold Empty', duration: 90, color: tokens.colors.violet.creativity },
      { name: 'Recovery', duration: 15, color: tokens.colors.gold.memory },
    ],
  },
  {
    id: '4-7-8',
    name: '4-7-8 Sleep Breath',
    icon: '😴',
    description: 'Pre-sleep relaxation. Dr. Weil technique.',
    phases: [
      { name: 'Inhale', duration: 4, color: tokens.colors.emerald.decision },
      { name: 'Hold', duration: 7, color: tokens.colors.gold.memory },
      { name: 'Exhale', duration: 8, color: tokens.colors.crimson.reasoning },
    ],
  },
  {
    id: 'alternate-nostril',
    name: 'Alternate Nostril (Nadi Shodhana)',
    icon: '🧘‍♀️',
    description: 'Balance left/right brain hemispheres.',
    phases: [
      { name: 'Left Nostril In', duration: 4, color: tokens.colors.sapphire.philosophy },
      { name: 'Hold', duration: 4, color: tokens.colors.gold.memory },
      { name: 'Right Nostril Out', duration: 4, color: tokens.colors.amber.flexibility },
      { name: 'Right Nostril In', duration: 4, color: tokens.colors.amber.flexibility },
      { name: 'Hold', duration: 4, color: tokens.colors.gold.memory },
      { name: 'Left Nostril Out', duration: 4, color: tokens.colors.sapphire.philosophy },
    ],
  },
];

export const BreathScreen = ({ navigation }: any) => {
  const [selectedPattern, setSelectedPattern] = useState<any>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [waveAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isSessionActive && selectedPattern) {
      const phase = selectedPattern.phases[currentPhase];
      
      // Animate wave
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnimation, {
            toValue: 1,
            duration: phase.duration * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Phase timer
      const interval = setInterval(() => {
        setPhaseTimer((prev) => {
          if (prev >= phase.duration) {
            // Move to next phase
            const nextPhase = (currentPhase + 1) % selectedPattern.phases.length;
            setCurrentPhase(nextPhase);
            if (nextPhase === 0) {
              setCyclesCompleted((c) => c + 1);
            }
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isSessionActive, currentPhase, selectedPattern]);

  const startSession = () => {
    setIsSessionActive(true);
    setCurrentPhase(0);
    setPhaseTimer(0);
    setCyclesCompleted(0);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setSelectedPattern(null);
    // Award XP, calculate resonance score
  };

  if (isSessionActive && selectedPattern) {
    const phase = selectedPattern.phases[currentPhase];
    const progress = (phaseTimer / phase.duration) * 100;

    return (
      <View style={[styles.sessionContainer, { backgroundColor: phase.color + '20' }]}>
        <View style={styles.sessionHeader}>
          <Text style={styles.patternName}>{selectedPattern.name}</Text>
          <Text style={styles.cycleCount}>Cycle {cyclesCompleted + 1}</Text>
        </View>

        <View style={styles.waveContainer}>
          <Animated.View
            style={[
              styles.wave,
              {
                opacity: waveAnimation,
                transform: [
                  {
                    scale: waveAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1.2],
                    }),
                  },
                ],
                backgroundColor: phase.color,
              },
            ]}
          />
        </View>

        <View style={styles.phaseDisplay}>
          <Text style={styles.phaseName}>{phase.name}</Text>
          <Text style={styles.phaseTimer}>
            {(phase.duration - phaseTimer).toFixed(1)}s
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: phase.color }]} />
          </View>
        </View>

        <Button onPress={endSession} variant="outline">
          End Session
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🫁 Breath Engine</Text>
        <Text style={styles.subtitle}>6 Breathing Patterns with Resonance Scoring</Text>
      </View>

      <View style={styles.patternsGrid}>
        {BREATH_PATTERNS.map((pattern) => (
          <TouchableOpacity
            key={pattern.id}
            style={styles.patternCard}
            onPress={() => setSelectedPattern(pattern)}
          >
            <Text style={styles.patternIcon}>{pattern.icon}</Text>
            <Text style={styles.patternTitle}>{pattern.name}</Text>
            <Text style={styles.patternDescription}>{pattern.description}</Text>
            {pattern.id === 'wim-hof' && (
              <Text style={styles.warningText}>⚠️ Not while driving</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {selectedPattern && !isSessionActive && (
        <View style={styles.detailsOverlay}>
          <View style={styles.detailsContent}>
            <Text style={styles.detailsTitle}>
              {selectedPattern.icon} {selectedPattern.name}
            </Text>
            <Text style={styles.detailsDescription}>{selectedPattern.description}</Text>

            <Text style={styles.phasesLabel}>Breathing Pattern:</Text>
            {selectedPattern.phases.map((phase: any, idx: number) => (
              <View key={idx} style={styles.phaseRow}>
                <View style={[styles.phaseColorDot, { backgroundColor: phase.color }]} />
                <Text style={styles.phaseRowText}>
                  {phase.name}: {phase.duration}s
                </Text>
              </View>
            ))}

            <Button onPress={startSession} style={styles.startButton}>
              Begin Practice
            </Button>
            <Button
              onPress={() => setSelectedPattern(null)}
              variant="outline"
              style={styles.backButton}
            >
              Back
            </Button>
          </View>
        </View>
      )}
    </View>
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
  patternsGrid: {
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  patternCard: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.stoneGray,
    ...tokens.shadows.neomorphicOutset,
  },
  patternIcon: {
    fontSize: tokens.fontSizes['3xl'],
    marginBottom: tokens.spacing.sm,
  },
  patternTitle: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
  },
  patternDescription: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    lineHeight: tokens.fontSizes.sm * 1.6,
  },
  warningText: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.warning,
    marginTop: tokens.spacing.xs,
    fontWeight: '600',
  },
  detailsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    padding: tokens.spacing.lg,
  },
  detailsContent: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.xl,
  },
  detailsTitle: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
    textAlign: 'center',
    marginBottom: tokens.spacing.md,
  },
  detailsDescription: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    textAlign: 'center',
    marginBottom: tokens.spacing.lg,
    lineHeight: tokens.fontSizes.base * 1.6,
  },
  phasesLabel: {
    fontSize: tokens.fontSizes.base,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.sm,
  },
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.sm,
  },
  phaseColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: tokens.spacing.sm,
  },
  phaseRowText: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
  },
  startButton: {
    marginTop: tokens.spacing.lg,
    marginBottom: tokens.spacing.sm,
  },
  backButton: {
    marginTop: tokens.spacing.sm,
  },
  sessionContainer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: tokens.spacing.xl,
  },
  sessionHeader: {
    alignItems: 'center',
  },
  patternName: {
    fontSize: tokens.fontSizes.xl,
    fontWeight: '700',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
  },
  cycleCount: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
  },
  waveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  wave: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  phaseDisplay: {
    alignItems: 'center',
  },
  phaseName: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.sm,
  },
  phaseTimer: {
    fontSize: 48,
    fontWeight: '700',
    color: tokens.colors.bronze,
    marginBottom: tokens.spacing.md,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: tokens.colors.stoneGray,
    borderRadius: tokens.radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
});
