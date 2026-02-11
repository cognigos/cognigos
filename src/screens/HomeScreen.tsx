import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { tokens, getDomainColor } from '../styles/tokens';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useProgressStore } from '../stores/progressStore';
import { useBatchStore } from '../stores/batchStore';
import { useAuthStore } from '../stores/authStore';

const { width } = Dimensions.get('window');

export const HomeScreen = ({ navigation }: any) => {
  const { level, totalXP, currentXP, xpToNextLevel, currentStreak } = useProgressStore();
  const { currentBatch, generateDailyBatch, isLoading } = useBatchStore();
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    generateDailyBatch();
  }, []);

  const cognitiveNodes = [
    { name: 'Reasoning', domain: 'reasoning', mastery: 0, icon: '⚖️' },
    { name: 'Memory', domain: 'memory', mastery: 0, icon: '🏛️' },
    { name: 'Creativity', domain: 'creativity', mastery: 0, icon: '🌀' },
    { name: 'Decision', domain: 'decision', mastery: 0, icon: '🔱' },
    { name: 'Flexibility', domain: 'flexibility', mastery: 0, icon: '🔀' },
    { name: 'Philosophy', domain: 'philosophy', mastery: 0, icon: '🕉️' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.username || 'Seeker'}</Text>
          <Text style={styles.subtitle}>Level {level} • {totalXP} XP</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.username?.[0]?.toUpperCase() || '?'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* XP Progress */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Progress to Level {level + 1}</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentXP / xpToNextLevel) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentXP} / {xpToNextLevel} XP
        </Text>
      </Card>

      {/* Streak */}
      <Card style={styles.section}>
        <View style={styles.streakContainer}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <View>
            <Text style={styles.streakNumber}>{currentStreak} Day Streak</Text>
            <Text style={styles.streakSubtext}>Keep it going!</Text>
          </View>
        </View>
      </Card>

      {/* Daily Batch */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Batch</Text>
        {isLoading ? (
          <Text style={styles.text}>Loading modules...</Text>
        ) : currentBatch ? (
          <>
            <Text style={styles.text}>
              {currentBatch.completedCount} / {currentBatch.totalModules} modules completed
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(currentBatch.completedCount / currentBatch.totalModules) * 100}%`,
                  },
                ]}
              />
            </View>
            <Button
              onPress={() => navigation.navigate('Batch')}
              style={styles.button}
            >
              {currentBatch.completedCount === 0 ? 'Start Today\'s Batch' : 'Continue'}
            </Button>
          </>
        ) : (
          <Button onPress={generateDailyBatch}>Generate Batch</Button>
        )}
      </Card>

      {/* Cognitive Nodes */}
      <Text style={styles.sectionTitle}>Neural Topology</Text>
      <View style={styles.nodesGrid}>
        {cognitiveNodes.map((node) => (
          <TouchableOpacity
            key={node.domain}
            style={[
              styles.nodeCard,
              { borderColor: getDomainColor(node.domain) },
            ]}
            onPress={() => navigation.navigate('NodeDetail', { node })}
          >
            <Text style={styles.nodeIcon}>{node.icon}</Text>
            <Text style={styles.nodeName}>{node.name}</Text>
            <Text style={styles.nodeMastery}>{node.mastery}%</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Meditation')}
        >
          <Text style={styles.actionIcon}>🧘</Text>
          <Text style={styles.actionName}>Meditate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Breath')}
        >
          <Text style={styles.actionIcon}>🫁</Text>
          <Text style={styles.actionName}>Breathwork</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Philosophy')}
        >
          <Text style={styles.actionIcon}>📚</Text>
          <Text style={styles.actionName}>Philosophy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Forbidden')}
        >
          <Text style={styles.actionIcon}>🗝️</Text>
          <Text style={styles.actionName}>Forbidden</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.obsidian,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: tokens.spacing.lg,
    paddingTop: tokens.spacing['2xl'],
  },
  greeting: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
  },
  subtitle: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    marginTop: tokens.spacing.xs,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: tokens.colors.bronze,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: tokens.fontSizes.xl,
    fontWeight: '700',
    color: tokens.colors.alabaster,
  },
  section: {
    marginHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  sectionTitle: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.sm,
  },
  text: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    marginBottom: tokens.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: tokens.colors.stoneGray,
    borderRadius: tokens.radius.full,
    marginVertical: tokens.spacing.sm,
    overflow: 'hidden',
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
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakEmoji: {
    fontSize: tokens.fontSizes['3xl'],
    marginRight: tokens.spacing.md,
  },
  streakNumber: {
    fontSize: tokens.fontSizes.xl,
    fontWeight: '700',
    color: tokens.colors.alabaster,
  },
  streakSubtext: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
  },
  button: {
    marginTop: tokens.spacing.md,
  },
  nodesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  nodeCard: {
    width: (width - tokens.spacing.lg * 2 - tokens.spacing.sm) / 2,
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    marginRight: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
    borderWidth: 2,
    alignItems: 'center',
  },
  nodeIcon: {
    fontSize: tokens.fontSizes['2xl'],
    marginBottom: tokens.spacing.xs,
  },
  nodeName: {
    fontSize: tokens.fontSizes.base,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    textAlign: 'center',
  },
  nodeMastery: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
    marginTop: tokens.spacing.xs,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  actionCard: {
    width: (width - tokens.spacing.lg * 2 - tokens.spacing.sm) / 2,
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    marginRight: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: tokens.fontSizes['3xl'],
    marginBottom: tokens.spacing.xs,
  },
  actionName: {
    fontSize: tokens.fontSizes.base,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    textAlign: 'center',
  },
});
