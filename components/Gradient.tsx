import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface GradientFillProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function GradientFill({ children, style }: GradientFillProps) {
  return (
    <LinearGradient
      colors={[theme.colors.brandStart, theme.colors.brandMid, theme.colors.brandEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}

interface GradientBorderProps {
  style?: ViewStyle;
  height?: number;
}

export function GradientBorder({ style, height = 2 }: GradientBorderProps) {
  return (
    <LinearGradient
      colors={[theme.colors.brandStart, theme.colors.brandMid, theme.colors.brandEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height,
        },
        style,
      ]}
    />
  );
}

interface GradientTextProps {
  children: string;
  style?: TextStyle;
  colors?: string[];
}

export function GradientText({ children, style, colors }: GradientTextProps) {
  // For now, fallback to solid brand color on all platforms
  // TODO: Implement proper text masking for gradient text
  const gradientColors = colors || [theme.colors.brandStart, theme.colors.brandMid, theme.colors.brandEnd];
  const fallbackColor = colors ? colors[0] : theme.colors.brandSolid;
  
  return (
    <Text style={[{ color: fallbackColor }, style]}>
      {children}
    </Text>
  );
}