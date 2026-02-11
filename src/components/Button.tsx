import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { tokens } from '../styles/tokens';

interface ButtonProps {
  children: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={tokens.colors.alabaster} />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`] as TextStyle]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: tokens.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: tokens.colors.bronze,
  },
  secondary: {
    backgroundColor: tokens.colors.stoneGray,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: tokens.colors.bronze,
  },
  sm: {
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.md,
  },
  md: {
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.lg,
  },
  lg: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.xl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: tokens.fonts.body,
    fontSize: tokens.fontSizes.base,
    fontWeight: '600',
  },
  primaryText: {
    color: tokens.colors.alabaster,
  },
  secondaryText: {
    color: tokens.colors.alabaster,
  },
  outlineText: {
    color: tokens.colors.bronze,
  },
});
