import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { tokens } from '../styles/tokens';

const FORBIDDEN_TECHNIQUES = [
  {
    id: 'chaos-palace',
    name: 'The Chaos Palace',
    icon: '🏛️',
    description: 'Giordano Bruno\'s 30-station memory system with nested recursion.',
    warning: 'moderate',
    prerequisites: '10+ memory palaces',
  },
  {
    id: 'dark-chamber',
    name: 'The Dark Chamber',
    icon: '🌑',
    description: 'Tibetan dark retreat practice. 15 min → overnight progression.',
    warning: 'high',
    prerequisites: '30+ hours meditation',
  },
  {
    id: 'stress-inoculation',
    name: 'Stress Inoculation Protocol',
    icon: '⚡',
    description: 'Air Force/Navy SEAL mental toughness training under pressure.',
    warning: 'moderate',
    prerequisites: 'Box breathing mastery',
  },
  {
    id: 'sere',
    name: 'SERE Protocol',
    icon: '🎖️',
    description: 'CIA/military isolation and interrogation resistance training.',
    warning: 'high',
    prerequisites: 'Stress inoculation complete',
  },
  {
    id: 'soviet',
    name: 'Soviet Protocol',
    icon: '🏅',
    description: 'Olympic autosuggestion training. 21-day neuroplastic protocol.',
    warning: 'low',
    prerequisites: 'None',
  },
  {
    id: 'ice-chamber',
    name: 'Ice Chamber',
    icon: '❄️',
    description: 'Wim Hof cold exposure for prefrontal cortex strengthening.',
    warning: 'moderate',
    prerequisites: 'Medical clearance',
  },
  {
    id: 'fasting',
    name: 'Fasting Protocol',
    icon: '🌙',
    description: 'Intermittent fasting for neurogenesis and Klotho expression.',
    warning: 'moderate',
    prerequisites: 'Medical clearance',
  },
];

export const ForbiddenScreen = ({ navigation }: any) => {
  const getWarningColor = (level: string) => {
    switch (level) {
      case 'low':
        return tokens.colors.success;
      case 'moderate':
        return tokens.colors.warning;
      case 'high':
        return tokens.colors.danger;
      default:
        return tokens.colors.silver;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🗝️ The Forbidden Library</Text>
        <Text style={styles.subtitle}>
          7 advanced techniques requiring caution and preparation
        </Text>
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ These techniques are powerful but potentially intense. Follow prerequisites carefully.
          </Text>
        </View>
      </View>

      <View style={styles.techniquesGrid}>
        {FORBIDDEN_TECHNIQUES.map((technique) => (
          <TouchableOpacity
            key={technique.id}
            style={styles.techniqueCard}
            onPress={() => navigation.navigate('ForbiddenDetail', { technique })}
          >
            <View style={styles.techniqueHeader}>
              <Text style={styles.techniqueIcon}>{technique.icon}</Text>
              <View style={[styles.warningBadge, { backgroundColor: getWarningColor(technique.warning) }]}>
                <Text style={styles.warningBadgeText}>
                  {technique.warning.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.techniqueName}>{technique.name}</Text>
            <Text style={styles.techniqueDescription}>{technique.description}</Text>

            <View style={styles.prerequisiteBox}>
              <Text style={styles.prerequisiteLabel}>Prerequisites:</Text>
              <Text style={styles.prerequisiteText}>{technique.prerequisites}</Text>
            </View>

            <View style={styles.lockOverlay}>
              <Text style={styles.lockIcon}>🔒</Text>
              <Text style={styles.lockText}>Complete prerequisites to unlock</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          "With great knowledge comes great responsibility. Approach these techniques with respect, preparation, and caution."
        </Text>
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
    marginBottom: tokens.spacing.md,
  },
  warningBox: {
    backgroundColor: tokens.colors.stoneGray,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: tokens.colors.warning,
  },
  warningText: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.alabaster,
    lineHeight: tokens.fontSizes.sm * 1.6,
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
    position: 'relative',
    overflow: 'hidden',
  },
  techniqueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacing.sm,
  },
  techniqueIcon: {
    fontSize: tokens.fontSizes['3xl'],
  },
  warningBadge: {
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.radius.sm,
  },
  warningBadgeText: {
    fontSize: tokens.fontSizes.xs,
    fontWeight: '700',
    color: tokens.colors.alabaster,
  },
  techniqueName: {
    fontSize: tokens.fontSizes.xl,
    fontWeight: '700',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
  },
  techniqueDescription: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    lineHeight: tokens.fontSizes.sm * 1.6,
    marginBottom: tokens.spacing.md,
  },
  prerequisiteBox: {
    backgroundColor: tokens.colors.stoneGray,
    borderRadius: tokens.radius.sm,
    padding: tokens.spacing.sm,
  },
  prerequisiteLabel: {
    fontSize: tokens.fontSizes.xs,
    fontWeight: '600',
    color: tokens.colors.bronze,
    marginBottom: tokens.spacing.xs,
  },
  prerequisiteText: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.alabaster,
  },
  lockOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 25, 41, 0.95)',
    padding: tokens.spacing.md,
    alignItems: 'center',
    borderBottomLeftRadius: tokens.radius.lg,
    borderBottomRightRadius: tokens.radius.lg,
  },
  lockIcon: {
    fontSize: tokens.fontSizes['2xl'],
    marginBottom: tokens.spacing.xs,
  },
  lockText: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    fontWeight: '600',
  },
  footer: {
    padding: tokens.spacing.lg,
    marginTop: tokens.spacing.lg,
  },
  footerText: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: tokens.fontSizes.sm * 1.8,
  },
});
