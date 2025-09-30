import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Switch,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Filter, Grid2x2 as Grid, List } from 'lucide-react-native';
import Animated, {
  FadeIn,
  SlideInUp,
  Layout as LayoutAnimation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SearchBar } from '@/components/SearchBar';
import { ScreenshotCard } from '@/components/ScreenshotCard';
import { MasonryGrid } from '@/components/MasonryGrid';
import { LoadingShimmer } from '@/components/LoadingShimmer';
import { EmptyState } from '@/components/EmptyState';
import { theme } from '@/constants/theme';
import { GradientText } from '@/components/Gradient';
import { mockDataService } from '@/services/mockDataService';
import { SearchResult } from '@/types';
import { fadeInFast, fadeOutFast, springLayout, AView } from '@/components/motion';

export default function ResultsScreen() {
  const params = useLocalSearchParams<{ query: string }>();
  const initialQuery = params.query || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedConversationNames, setSelectedConversationNames] = useState<string[]>([]);
  const [availableConversationNames, setAvailableConversationNames] = useState<string[]>([]);

  // Trigger search whenever searchQuery or selectedConversationNames changes
  useEffect(() => {
    performSearch(searchQuery, selectedConversationNames);
  }, [searchQuery, selectedConversationNames]);

  // Update available conversation names whenever searchQuery changes
  useEffect(() => {
    const updateAvailableConversationNames = async () => {
      // Get all potential results for the current search query without conversation filters
      const allPotentialResults = mockDataService.searchScreenshots(searchQuery, null, null);
      
      // Extract unique conversation names from all potential results
      const uniqueNames = [...new Set(allPotentialResults.map(screenshot => screenshot.conversationName))];
      setAvailableConversationNames(uniqueNames);
    };

    updateAvailableConversationNames();
  }, [searchQuery]);

  const performSearch = async (
    query: string, 
    conversationFilters: string[]
  ) => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const searchResults = mockDataService.searchScreenshots(query, null, conversationFilters);
    setResults(searchResults);
    setIsLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate live indexing - add a new capture
    const newCapture = mockDataService.simulateNewCapture();
    
    // Re-perform search with updated data
    await performSearch(searchQuery, selectedConversationNames);
    
    setIsRefreshing(false);
    
    // Haptic feedback
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleResultPress = (screenshot: SearchResult, index: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    router.push({
      pathname: '/(tabs)/viewer',
      params: { 
        screenshotId: screenshot.id,
        query: searchQuery 
      }
    });
  };

  const handleBack = () => {
    router.back();
  };

  const toggleViewMode = () => {
    setViewMode(current => current === 'list' ? 'grid' : 'list');
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const styles = createStyles();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={theme.colors.text} />
          </TouchableOpacity>
          
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmit={handleSearch}
              placeholder="Search anything"
            />
          </View>
          
          <View style={styles.headerActions}>
          </View>
        </View>
      </Animated.View>

      {/* Results */}
      <View style={styles.content}>
        {isLoading ? (
          <LoadingShimmer count={8} />
        ) : results.length === 0 ? (
          <EmptyState 
            title="Nothing yet."
            message="Try broader words like 'invoice' or 'green banner'."
          />
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={theme.colors.brandSolid}
                colors={[theme.colors.brandSolid]}
              />
            }
          >
            {/* Results Count */}
            <Animated.View 
              entering={FadeIn.delay(150).duration(400)}
              style={styles.contextContainer}
            >
              <Text style={styles.contextText}>
                John mention Dany son's birthday party on Sep 15, all these chat is in 1 continous conversation. Nick & John and Dany are best friends. THey talk quite often on casual subjects.
              </Text>
            </Animated.View>

            <Animated.View 
              entering={FadeIn.delay(200).duration(400)}
              style={styles.resultsMeta}
            >
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsCount}>
                  {results.length} sources{results.length !== 1 ? 's' : ''}
                </Text>
                
                <View style={styles.resultsActions}>
                  <TouchableOpacity 
                    style={styles.resultsActionButton}
                    onPress={() => {}}
                    activeOpacity={0.7}
                  >
                    <Filter size={14} color={theme.colors.textMuted} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.resultsActionButton}
                    onPress={toggleViewMode}
                    activeOpacity={0.7}
                  >
                    {viewMode === 'list' ? (
                      <Grid size={14} color={theme.colors.textMuted} />
                    ) : (
                      <List size={14} color={theme.colors.textMuted} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>

            {/* Filter Buttons */}
            <Animated.View 
              entering={FadeIn.delay(250).duration(400)}
              style={styles.filterContainer}
            >
              <View style={styles.filterRow}>
                {availableConversationNames.map((conversationName) => (
                  <TouchableOpacity 
                    key={conversationName}
                    style={[
                      styles.filterButton, 
                      selectedConversationNames.includes(conversationName) && styles.filterButtonActive
                    ]}
                    onPress={() => {
                      setSelectedConversationNames(prevSelected => {
                        if (prevSelected.includes(conversationName)) {
                          // Remove from selection
                          return prevSelected.filter(name => name !== conversationName);
                        } else {
                          // Add to selection
                          return [...prevSelected, conversationName];
                        }
                      });
                    }}
                  >
                    {selectedConversationNames.includes(conversationName) ? (
                      <GradientText 
                        style={styles.filterButtonText}
                        colors={['#FF375F', '#0A84FF']}
                      >
                        {conversationName}
                      </GradientText>
                    ) : (
                      <Text style={styles.filterButtonText}>
                        {conversationName}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>

            {/* Results List/Grid */}
            {viewMode === 'list' ? (
              <View style={styles.listContainer}>
                {results.map((screenshot, index) => (
                  <AView
                    key={screenshot.id}
                    entering={fadeInFast.delay(index * 40)}
                    exiting={fadeOutFast}
                    layout={springLayout}
                  >
                    <ScreenshotCard
                      screenshot={screenshot}
                      onPress={() => handleResultPress(screenshot, index)}
                      index={index}
                      searchQuery={searchQuery}
                      featured={index === 0}
                    />
                  </AView>
                ))}
              </View>
            ) : (
              <MasonryGrid
                screenshots={results}
                onPress={handleResultPress}
                numColumns={2}
              />
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: theme.hairline,
    borderBottomColor: theme.colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
  },
  backButton: {
    padding: theme.spacing.sm,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    minWidth: 44,
  },
  actionButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: theme.spacing.lg,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing["3xl"],
  },
  resultsMeta: {
    paddingHorizontal: theme.spacing["2xl"],
    paddingVertical: theme.spacing.lg,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsCount: {
    fontSize: theme.typography.subhead.fontSize,
    lineHeight: theme.typography.subhead.lineHeight,
    fontWeight: '500',
    color: theme.colors.textMuted,
  },
  resultsActions: {
    flexDirection: 'row',
  },
  resultsActionButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    paddingHorizontal: theme.spacing["2xl"],
    paddingBottom: theme.spacing.lg,
  },
  filterRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  filterButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.round,
    borderWidth: theme.hairline,
    borderColor: theme.colors.border,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.brandSolid,
  },
  filterButtonText: {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: theme.typography.caption.lineHeight,
    fontWeight: '500',
    color: theme.colors.textMuted,
  },
  listContainer: {
    paddingHorizontal: theme.spacing["2xl"],
  },
  contextContainer: {
    paddingHorizontal: theme.spacing["2xl"],
    paddingVertical: theme.spacing.md,
  },
  contextText: {
    fontSize: theme.typography.subhead.fontSize,
    lineHeight: theme.typography.subhead.lineHeight,
    fontWeight: '500',
    color: theme.colors.textMuted,
  },
});