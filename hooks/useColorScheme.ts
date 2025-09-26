import { AccessibilityInfo } from 'react-native';
import { theme, AppTheme } from '@/constants/theme';
import { useState, useEffect } from 'react';

export function useColorScheme(): {
  colorScheme: 'light';
  colors: AppTheme['colors'];
  theme: AppTheme;
  isReducedMotion: boolean;
} {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = async () => {
      try {
        const reduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
        setIsReducedMotion(reduceMotionEnabled);
      } catch (error) {
        setIsReducedMotion(false);
      }
    };

    checkReducedMotion();

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsReducedMotion
    );

    return () => subscription?.remove();
  }, []);
  
  return {
    colorScheme: 'light',
    colors: theme.colors,
    theme,
    isReducedMotion,
  };
}