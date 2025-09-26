import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { theme } from '@/constants/theme';

interface LoadingShimmerProps {
  count?: number;
  cardHeight?: number;
}

export function LoadingShimmer({ count = 6, cardHeight = 100 }: LoadingShimmerProps) {
  const { colors } = useColorScheme();
  const shimmerAnimation = useSharedValue(0);

  useEffect(() => {
    shimmerAnimation.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedShimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerAnimation.value,
      [0, 1],
      [-100, 100]
    );

    return {
      transform: [{ translateX }],
    };
  });

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={[styles.card, { height: cardHeight }]}>
          <View style={styles.content}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.textContent}>
              <View style={[styles.textLine, styles.titleLine]} />
              <View style={[styles.textLine, styles.summaryLine1]} />
              <View style={[styles.textLine, styles.summaryLine2]} />
              <View style={styles.metaContainer}>
                <View style={[styles.textLine, styles.metaLine]} />
                <View style={[styles.textLine, styles.timestampLine]} />
              </View>
            </View>
          </View>
          
          <Animated.View style={[styles.shimmer, animatedShimmerStyle]} />
        </View>
      ))}
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  imagePlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radii.md,
    marginRight: theme.spacing.md,
  },
  textContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textLine: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 4,
    marginBottom: theme.spacing.xs,
  },
  titleLine: {
    height: 16,
    width: '80%',
  },
  summaryLine1: {
    height: 14,
    width: '100%',
  },
  summaryLine2: {
    height: 14,
    width: '60%',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xs,
  },
  metaLine: {
    height: 12,
    width: '40%',
  },
  timestampLine: {
    height: 12,
    width: '20%',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background,
    opacity: 0.3,
    width: 100,
  },
});