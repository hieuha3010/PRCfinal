import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { MessageCircle, Hash, Minus } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { GradientBorder } from './Gradient';
import { SearchResult } from '@/types';

const SNIPPET_LENGTH = 120;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ScreenshotCardProps {
  screenshot: SearchResult;
  onPress: () => void;
  index: number;
  searchQuery?: string;
  featured?: boolean;
}

export function ScreenshotCard({ 
  screenshot, 
  onPress, 
  index,
  searchQuery = '',
  featured = false
}: ScreenshotCardProps) {
  const scale = useSharedValue(1);

  const getHighlightedSnippet = (text: string, query: string, maxLength: number) => {
    // If no query, just truncate the text
    if (!query.trim()) {
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength - 3) + '...';
    }

    const queryTokens = query.toLowerCase().split(/\s+/).filter(token => token.length > 0);
    const lowerText = text.toLowerCase();
    
    // Find the first occurrence of any query token
    let firstMatchIndex = -1;
    let matchedToken = '';
    
    for (const token of queryTokens) {
      const index = lowerText.indexOf(token);
      if (index !== -1 && (firstMatchIndex === -1 || index < firstMatchIndex)) {
        firstMatchIndex = index;
        matchedToken = token;
      }
    }
    
    // If no match found, just truncate
    if (firstMatchIndex === -1) {
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength - 3) + '...';
    }
    
    // Calculate snippet boundaries centered around the match
    const matchEnd = firstMatchIndex + matchedToken.length;
    const halfLength = Math.floor(maxLength / 2);
    
    let startIndex = Math.max(0, firstMatchIndex - halfLength);
    let endIndex = Math.min(text.length, startIndex + maxLength);
    
    // Adjust start if we're at the end of the text
    if (endIndex - startIndex < maxLength) {
      startIndex = Math.max(0, endIndex - maxLength);
    }
    
    // Extract the snippet
    let snippet = text.substring(startIndex, endIndex);
    
    // Add ellipses
    const needsStartEllipsis = startIndex > 0;
    const needsEndEllipsis = endIndex < text.length;
    
    if (needsStartEllipsis) {
      snippet = '...' + snippet;
    }
    if (needsEndEllipsis) {
      snippet = snippet + '...';
    }
    
    // Highlight the query tokens in the snippet
    const parts: (string | React.ReactElement)[] = [];
    let remainingText = snippet;
    let keyCounter = 0;
    
    while (remainingText.length > 0) {
      let earliestMatch = { index: -1, token: '', length: 0 };
      
      // Find the earliest match among all query tokens
      for (const token of queryTokens) {
        const index = remainingText.toLowerCase().indexOf(token);
        if (index !== -1 && (earliestMatch.index === -1 || index < earliestMatch.index)) {
          earliestMatch = { index, token, length: token.length };
        }
      }
      
      if (earliestMatch.index === -1) {
        // No more matches, add the rest as plain text
        parts.push(remainingText);
        break;
      }
      
      // Add text before the match
      if (earliestMatch.index > 0) {
        parts.push(remainingText.substring(0, earliestMatch.index));
      }
      
      // Add the highlighted match
      const matchedText = remainingText.substring(
        earliestMatch.index, 
        earliestMatch.index + earliestMatch.length
      );
      parts.push(
        <Text key={keyCounter++} style={{ fontWeight: '600', color: theme.colors.brandSolid }}>
          {matchedText}
        </Text>
      );
      
      // Continue with the remaining text
      remainingText = remainingText.substring(earliestMatch.index + earliestMatch.length);
    }
    
    return parts;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const queryTokens = query.toLowerCase().split(/\s+/);
    let highlightedText = text;
    
    queryTokens.forEach(token => {
      const regex = new RegExp(`(${token})`, 'gi');
      highlightedText = highlightedText.replace(regex, '**$1**');
    });
    
    return highlightedText;
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getAppIcon = (appSource: string) => {
    switch (appSource) {
      case 'whatsapp':
        return <MessageCircle size={16} color="#25D366" />;
      case 'slack':
        return <Hash size={16} color="#4A154B" />;
      case 'telegram':
        return <MessageCircle size={16} color="#0088CC" />;
      default:
        return <Minus size={16} color={theme.colors.textMuted} />;
    }
  };
  const styles = createStyles();

  return (
    <AnimatedTouchableOpacity
      style={[styles.card, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      {featured && <GradientBorder />}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: screenshot.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.content}>
        <View style={styles.metaTop}>
          {getAppIcon(screenshot.appSource)}
          <Text style={styles.dot}>•</Text>
          <Text style={styles.contact}>{screenshot.contact}</Text>
        </View>
        
        <Text style={styles.summary} numberOfLines={3}>
          {getHighlightedSnippet(screenshot.summary, searchQuery, SNIPPET_LENGTH)}
        </Text>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const createStyles = () => StyleSheet.create({
  card: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.xl,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.xl,
    borderWidth: theme.hairline,
    borderColor: theme.colors.border,
    ...Platform.select({
      ios: {
        ...theme.shadows.card,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  imageContainer: {
    width: 45,
    height: 97.5,
    aspectRatio: 9 / 19.5,
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    marginRight: theme.spacing.lg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  metaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  appSource: {
    fontSize: theme.typography.subhead.fontSize,
    fontWeight: theme.typography.subhead.fontWeight,
    color: theme.colors.brandSolid,
  },
  dot: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textMuted,
    marginHorizontal: theme.spacing.sm,
  },
  contact: {
    fontSize: theme.typography.subhead.fontSize,
    fontWeight: '500',
    color: theme.colors.text,
  },
  summary: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.colors.textMuted,
    flex: 1,
  },
});