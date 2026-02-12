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
import { philosophyTracks } from '../content/philosophyTracks';

export const PhilosophyScreen = ({ navigation }: any) => {
  const [selectedTrack, setSelectedTrack] = useState<any>(null);

  if (selectedTrack) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedTrack(null)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.trackTitle}>
            {selectedTrack.icon} {selectedTrack.name}
          </Text>
          <Text style={styles.trackDescription}>{selectedTrack.description}</Text>
        </View>

        <View style={styles.unitsContainer}>
          {selectedTrack.units.map((unit: any, index: number) => (
            <Card key={unit.id} style={styles.unitCard}>
              <View style={styles.unitHeader}>
                <Text style={styles.unitNumber}>Unit {unit.position}</Text>
                {unit.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.unitName}>{unit.name}</Text>
              <Text style={styles.unitDescription}>{unit.description}</Text>
              <Button
                onPress={() => {
                  // Navigate to module cards
                  navigation.navigate('PhilosophyModule', { unit });
                }}
                style={styles.startButton}
              >
                {unit.completed ? 'Review' : 'Start'}
              </Button>
            </Card>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 Philosophy Tracks</Text>
        <Text style={styles.subtitle}>
          Master 8 philosophical systems from ancient wisdom to modern thought
        </Text>
      </View>

      <View style={styles.tracksGrid}>
        {philosophyTracks.map((track) => (
          <TouchableOpacity
            key={track.id}
            style={styles.trackCard}
            onPress={() => setSelectedTrack(track)}
          >
            <Text style={styles.trackIcon}>{track.icon}</Text>
            <Text style={styles.trackName}>{track.name}</Text>
            <Text style={styles.trackDesc}>{track.description}</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${((track.units?.filter((u) => u.completed).length || 0) / track.totalUnits) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {track.units?.filter((u) => u.completed).length || 0} / {track.totalUnits} units
            </Text>
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
  tracksGrid: {
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  trackCard: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.stoneGray,
    ...tokens.shadows.neomorphicOutset,
  },
  trackIcon: {
    fontSize: tokens.fontSizes['3xl'],
    marginBottom: tokens.spacing.sm,
  },
  trackName: {
    fontSize: tokens.fontSizes.xl,
    fontWeight: '700',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
  },
  trackDesc: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    lineHeight: tokens.fontSizes.sm * 1.6,
    marginBottom: tokens.spacing.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: tokens.colors.stoneGray,
    borderRadius: tokens.radius.full,
    overflow: 'hidden',
    marginBottom: tokens.spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: tokens.colors.bronze,
  },
  progressText: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    textAlign: 'right',
  },
  trackTitle: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
    textAlign: 'center',
    marginBottom: tokens.spacing.sm,
  },
  trackDescription: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    textAlign: 'center',
    lineHeight: tokens.fontSizes.base * 1.6,
  },
  unitsContainer: {
    padding: tokens.spacing.lg,
  },
  unitCard: {
    marginBottom: tokens.spacing.md,
  },
  unitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.xs,
  },
  unitNumber: {
    fontSize: tokens.fontSizes.sm,
    fontWeight: '600',
    color: tokens.colors.bronze,
  },
  checkmark: {
    fontSize: tokens.fontSizes.xl,
    color: tokens.colors.success,
  },
  unitName: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
  },
  unitDescription: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    lineHeight: tokens.fontSizes.sm * 1.6,
    marginBottom: tokens.spacing.md,
  },
  startButton: {
    marginTop: tokens.spacing.sm,
  },
});
