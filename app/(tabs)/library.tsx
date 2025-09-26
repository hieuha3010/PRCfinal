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
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Grid2x2 as Grid, List, Filter } from 'lucide-react-native';
import Animated, {
  FadeIn,
  Layout as LayoutAnimation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ScreenshotCard } from '@/components/ScreenshotCard';
import { MasonryGrid } from '@/components/MasonryGrid';
import { LoadingShimmer } from '@/components/LoadingShimmer';
import { useColorScheme } from '@/hooks/useColorScheme';
import { theme } from '@/constants/theme';
import { mockDataService } from '@/services/mockDataService';
import { Screenshot, SearchResult } from '@/types';

export default function LibraryScreen() {
  const { colors, colorScheme } = useColorScheme();
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    loadScreenshots();
  }, []);

  const loadScreenshots = async () => {
    setIsLoading(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const allScreenshots = mockDataService.getAllScreenshots();
    setScreenshots(allScreenshots);
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate live indexing
    mockDataService.simulateNewCapture();
    
    await loadScreenshots();
    setIsRefreshing(false);
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleScreenshotPress = (screenshot: Screenshot, index: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    router.push({
      pathname: '/(tabs)/viewer',
      params: { 
        screenshotId: screenshot.id,
        query: '' // Empty query shows all screenshots
      }
    });
  };

  const toggleViewMode = () => {
    setViewMode(current => current === 'list' ? 'grid' : 'list');
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Convert Screenshot to SearchResult for consistency
  const screenshotsAsResults: SearchResult[] = screenshots.map(screenshot => ({
    ...screenshot,
    matchScore: 1,
    matchedKeywords: [],
  }));

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>Library</Text>
            <Text style={styles.subtitle}>
              {screenshots.length} captured memories
            </Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Filter size={16} color={colors.muted} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={toggleViewMode}
              activeOpacity={0.7}
            >
              {viewMode === 'list' ? (
                <Grid size={16} color={colors.muted} />
              ) : (
                <List size={16} color={colors.muted} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        {isLoading ? (
          <LoadingShimmer count={12} />
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={colors.accent}
                colors={[colors.accent]}
              />
            }
          >
            {viewMode === 'list' ? (
              <View style={styles.listContainer}>
                {screenshotsAsResults.map((screenshot, index) => (
                  <Animated.View
                    key={screenshot.id}
                    entering={FadeIn.delay(index * 20).duration(400)}
                    layout={LayoutAnimation.springify()}
                  >
                    <ScreenshotCard
                      screenshot={screenshot}
                      onPress={() => handleScreenshotPress(screenshot, index)}
                      index={index}
                    />
                  </Animated.View>
                ))}
              </View>
            ) : (
              <MasonryGrid
                screenshots={screenshotsAsResults}
                onPress={handleScreenshotPress}
                numColumns={2}
              />
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.display.fontSize,
    fontWeight: theme.typography.display.fontWeight,
    color: colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: colors.muted,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.md,
  },
});