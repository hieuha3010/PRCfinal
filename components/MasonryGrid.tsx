import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeIn,
} from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { theme } from '@/constants/theme';
import { SearchResult } from '@/types';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface MasonryGridProps {
  screenshots: SearchResult[];
  onPress: (screenshot: SearchResult, index: number) => void;
  numColumns?: number;
}

export function MasonryGrid({ 
  screenshots, 
  onPress, 
  numColumns = 2 
}: MasonryGridProps) {
  const { colors } = useColorScheme();

  const renderItem = (screenshot: SearchResult, index: number) => {
    return (
      <MasonryItem
        key={screenshot.id}
        screenshot={screenshot}
        onPress={() => onPress(screenshot, index)}
        index={index}
      />
    );
  };

  // Split items into columns
  const columns = Array.from({ length: numColumns }, () => [] as SearchResult[]);
  screenshots.forEach((item, index) => {
    columns[index % numColumns].push(item);
  });

  return (
    <View style={styles.container}>
      {columns.map((column, columnIndex) => (
        <View key={columnIndex} style={styles.column}>
          {column.map((screenshot, itemIndex) => {
            const globalIndex = itemIndex * numColumns + columnIndex;
            return renderItem(screenshot, globalIndex);
          })}
        </View>
      ))}
    </View>
  );
}

interface MasonryItemProps {
  screenshot: SearchResult;
  onPress: () => void;
  index: number;
}

function MasonryItem({ screenshot, onPress, index }: MasonryItemProps) {
  const { colors } = useColorScheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const styles = createMasonryStyles(colors);

  return (
    <AnimatedTouchableOpacity
      entering={FadeIn.delay(index * 40).duration(300)}
      style={[styles.item, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: screenshot.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.overlay}>
        <Text style={styles.summary} numberOfLines={2}>
          {screenshot.summary}
        </Text>
        
        <View style={styles.meta}>
          <View style={styles.metaLeft}>
            <Text style={styles.contact}>{screenshot.contact}</Text>
          </View>
          <ChevronRight size={14} color={colors.card} />
        </View>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
  },
  column: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
});

const createMasonryStyles = (colors: any) => StyleSheet.create({
  item: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  imageContainer: {
    height: 260, // Fixed 9:19.5 aspect ratio height (120 * 19.5/9 = 260)
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: theme.spacing.sm,
  },
  summary: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.background,
    lineHeight: theme.typography.caption.lineHeight,
    marginBottom: theme.spacing.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaLeft: {
    flex: 1,
  },
  appSource: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    color: theme.colors.brandSolid,
    marginBottom: 2,
  },
  contact: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.background,
  },
});