import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SearchBar } from '@/components/SearchBar';
import { theme } from '@/constants/theme';
import { mockDataService } from '@/services/mockDataService';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRecentSearches(mockDataService.getRecentSearches());
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setTimeout(() => {
      mockDataService.addRecentSearch(query);
      setIsLoading(false);
      router.push({ pathname: '/(tabs)/results', params: { query } });
    }, 300);
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const styles = createStyles();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>MemoryHub</Text>
          <Text style={styles.subtitle}>Search your captured memories</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={handleSearch}
            placeholder="Search anything"
            autoFocus={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing["2xl"],
      paddingBottom: theme.spacing["3xl"],
    },
    header: {
      alignItems: 'center',
      paddingTop: theme.spacing["3xl"],
      paddingBottom: theme.spacing["2xl"],
    },
    title: {
      fontSize: theme.typography.display.fontSize,
      lineHeight: theme.typography.display.lineHeight,
      fontWeight: theme.typography.display.fontWeight,
      letterSpacing: theme.typography.display.letterSpacing,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: theme.typography.subhead.fontSize,
      lineHeight: theme.typography.subhead.lineHeight,
      fontWeight: theme.typography.subhead.fontWeight,
      color: theme.colors.textMuted,
      textAlign: 'center',
      marginBottom: theme.spacing["2xl"],
    },
    searchContainer: {
      paddingHorizontal: theme.spacing.md,
    },
  });
