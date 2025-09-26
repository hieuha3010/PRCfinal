import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { GradientFill } from './Gradient';
import { theme } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  style, 
  textStyle 
}: ButtonProps) {
  const styles = createStyles();

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={[styles.buttonContainer, style]}
      >
        <GradientFill style={[styles.primaryButton, disabled && styles.disabledButton]}>
          <Text style={[styles.primaryButtonText, disabled && styles.disabledText, textStyle]}>
            {title}
          </Text>
        </GradientFill>
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={[styles.buttonContainer, styles.secondaryButton, disabled && styles.disabledSecondary, style]}
      >
        <Text style={[styles.secondaryButtonText, disabled && styles.disabledText, textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // Tertiary
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      style={[styles.tertiaryButton, style]}
    >
      <Text style={[styles.tertiaryButtonText, disabled && styles.disabledText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const createStyles = () => StyleSheet.create({
  buttonContainer: {
    borderRadius: theme.radii.xl,
    overflow: 'hidden',
  },
  primaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.headline.fontSize,
    fontWeight: theme.typography.headline.fontWeight,
    lineHeight: theme.typography.headline.lineHeight,
  },
  secondaryButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: theme.hairline,
    borderColor: theme.colors.border,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  secondaryButtonText: {
    color: theme.colors.brandSolid,
    fontSize: theme.typography.headline.fontSize,
    fontWeight: theme.typography.headline.fontWeight,
    lineHeight: theme.typography.headline.lineHeight,
  },
  tertiaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  tertiaryButtonText: {
    color: theme.colors.brandSolid,
    fontSize: theme.typography.headline.fontSize,
    fontWeight: theme.typography.headline.fontWeight,
    lineHeight: theme.typography.headline.lineHeight,
  },
  disabledButton: {
    opacity: 0.4,
  },
  disabledSecondary: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.7,
  },
});