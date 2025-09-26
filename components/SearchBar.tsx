import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Search…',
}: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      inputRef.current?.blur();
    }
  };

  const styles = createStyles();

  return (
    <View style={styles.outer}>
      {/* Optional 1dp gradient ring outline; keep subtle */}
      <LinearGradient
        colors={[theme.colors.brandStart, theme.colors.brandEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.ring}
      />
      <View style={styles.container}>
        <Search 
          size={16} 
          color={theme.colors.textMuted} 
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          selectionColor={theme.colors.brandSolid}
          returnKeyType="search"
          blurOnSubmit={false}
        />
      </View>
    </View>
  );
}

const HEIGHT = 40; // smaller vertical size
const createStyles = () => StyleSheet.create({
  outer: {
    width: "95%",            // wider search bar
    alignSelf: "center",
    height: HEIGHT + 2,      // room for 1dp ring
    borderRadius: HEIGHT / 2,
    position: "relative",
  },
  ring: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: HEIGHT / 2,
    opacity: 0.35,           // very light ring
  },
  container: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,                // inside the ring
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: HEIGHT / 2,
    borderWidth: theme.hairline,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    height: HEIGHT,
    paddingHorizontal: 14,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 6,      // tighter vertical padding
    color: theme.colors.text,
    ...theme.typography.subhead, // slightly smaller text by default
  },
});