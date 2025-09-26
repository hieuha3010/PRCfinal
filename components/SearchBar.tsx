import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Search } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { GradientBorder } from './Gradient';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  style?: any;
}

export function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Search anything',
  autoFocus = false,
  style,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  const focusScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: focusScale.value }],
  }));

  const animatedRingStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value,
  }));

  const handleFocus = () => {
    setIsFocused(true);
    focusScale.value = withSpring(1.01);
    ringOpacity.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusScale.value = withSpring(1);
    ringOpacity.value = withTiming(0, { duration: 200 });
  };

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      inputRef.current?.blur();
    }
  };

  const styles = createStyles();

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.ringContainer, animatedRingStyle]}>
        <GradientBorder height={2} style={{ borderRadius: theme.radii["2xl"] + 2 }} />
      </Animated.View>
      
      <Animated.View style={[styles.searchContainer, animatedContainerStyle]}>
        <View style={styles.searchBar}>
          <Search 
            size={18} 
            color={theme.colors.textMuted} 
            style={styles.searchIcon}
          />
          
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleSubmit}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textMuted}
            selectionColor={theme.colors.brandSolid}
            returnKeyType="search"
            autoFocus={autoFocus}
            blurOnSubmit={false}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const createStyles = () => StyleSheet.create({
  container: {
    position: 'relative',
  },
  ringContainer: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    zIndex: -1,
    borderRadius: theme.radii["2xl"] + 2,
  },
  searchContainer: {
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii["2xl"],
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 14,
    minHeight: 44,
    borderWidth: theme.hairline,
    borderColor: theme.colors.border,
    ...Platform.select({
      ios: {
        ...theme.shadows.card,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    lineHeight: theme.typography.body.lineHeight,
    color: theme.colors.text,
  },
});