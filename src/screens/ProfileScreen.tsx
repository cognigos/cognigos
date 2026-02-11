import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { tokens } from '../styles/tokens';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';

export const ProfileScreen = ({ navigation }: any) => {
  const { user, signOut } = useAuthStore();
  const { level, totalXP, currentStreak, longestStreak } = useProgressStore();

  const handleSignOut = async () => {
    await signOut();
    navigation.replace('Auth');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.username?.[0]?.toUpperCase() || '?'}</Text>
        </View>
        <Text style={styles.username}>{user?.username || 'Seeker'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalXP}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Longest Streak</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.section}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.menuText}>⚙️ Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🏆 Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>📊 Analytics</Text>
        </TouchableOpacity>
      </Card>

      <Button onPress={handleSignOut} variant="outline" style={styles.signOutButton}>
        Sign Out
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.obsidian,
  },
  header: {
    alignItems: 'center',
    padding: tokens.spacing.lg,
    paddingTop: tokens.spacing['2xl'],
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: tokens.colors.bronze,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: tokens.spacing.md,
  },
  avatarText: {
    fontSize: tokens.fontSizes['4xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
  },
  username: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.xs,
  },
  email: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
  },
  section: {
    marginHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  sectionTitle: {
    fontSize: tokens.fontSizes.lg,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    marginBottom: tokens.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.md,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.stoneGray,
    borderRadius: tokens.radius.md,
  },
  statValue: {
    fontSize: tokens.fontSizes['2xl'],
    fontWeight: '700',
    color: tokens.colors.bronze,
    marginBottom: tokens.spacing.xs,
  },
  statLabel: {
    fontSize: tokens.fontSizes.sm,
    color: tokens.colors.silver,
  },
  menuItem: {
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.stoneGray,
  },
  menuText: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.alabaster,
  },
  signOutButton: {
    marginHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing['2xl'],
  },
});
