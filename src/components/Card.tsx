import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { tokens } from '../styles/tokens';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.stoneGray,
    ...tokens.shadows.neomorphicOutset,
  },
});
