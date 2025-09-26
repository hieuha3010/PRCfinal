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
import * as Haptics from 'expo-haptics';
import { SearchBar } from '@/components/SearchBar';
import Header from '@/components/Header';
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
        backgroundColor="transparent"
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER ABOVE */}
        <View style={styles.headerWrap}>
          <Header
            title="MemoryHub"        
            subtitle="Relax, we remember it all!"   
          />
        </View>

        {/* CENTERED, SMALLER SEARCH BAR */}
        <View style={styles.searchWrap}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={handleSearch}
            placeholder="Search…"
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
      backgroundColor: 'transparent',
    },
    content: {
      flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing["2x1"],
    },
    headerWrap: {
        position: 'absolute',     // float above the search container
        top: '38%',               // roughly 40% down the screen (adjust as needed)
        alignItems: 'center',
        width: '100%',
    },
    searchWrap: {
      flex: 1,                  
      justifyContent: 'center', // center vertically
      alignItems: 'center',     // center horizontally
      width: '85%',  
    }, 
  });
