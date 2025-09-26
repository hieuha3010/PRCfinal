import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { useColorScheme } from '@/hooks/useColorScheme';
import { theme } from '@/constants/theme';
import { mockDataService } from '@/services/mockDataService';
import { AView, zoomInSoft } from '@/components/motion';
import { Screenshot } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 260;
const CARD_HEIGHT = 520;
const CARD_SPACING = 5;

export default function ViewerScreen() {
  const { colors } = useColorScheme();
  const styles = createStyles(colors);
  const params = useLocalSearchParams<{ screenshotId: string; query: string }>();

  const [allScreenshots, setAllScreenshots] = useState<Screenshot[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState<number>(SCREEN_WIDTH);

  const translateX = useSharedValue(0);
  const gestureTranslateX = useSharedValue(0);

  // Centering helper based on current viewport
  const centerFor = (idx: number, vw: number = viewportWidth) =>
    vw / 2 - (idx * (CARD_WIDTH + CARD_SPACING) + CARD_WIDTH / 2) - 20;

  useEffect(() => {
    loadScreenshots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.screenshotId]);

  const loadScreenshots = async () => {
    const allResults = mockDataService.searchScreenshots(params.query || '');
    setAllScreenshots(allResults);

    const found = allResults.findIndex(s => s.id === params.screenshotId);
    const idx = found === -1 ? 0 : found;
    setCurrentIndex(idx);

    // initial center using current viewportWidth
    translateX.value = centerFor(idx);
  };

  const handleBack = () => {
    router.push({
      pathname: '/(tabs)/results',
      params: { query: params.query || '' },
    });
  };

  const navigateToIndex = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= allScreenshots.length) return;

    setCurrentIndex(newIndex);
    translateX.value = withSpring(centerFor(newIndex), {
      damping: 50,
      stiffness: 500,
    });

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePrevious = () => navigateToIndex(currentIndex - 1);
  const handleNext = () => navigateToIndex(currentIndex + 1);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      gestureTranslateX.value = event.translationX;
    })
    .onEnd((event) => {
      const shouldNavigate = Math.abs(event.translationX) > CARD_WIDTH / 3;

      if (shouldNavigate) {
        if (event.translationX > 0 && currentIndex > 0) {
          runOnJS(navigateToIndex)(currentIndex - 1);
        } else if (event.translationX < 0 && currentIndex < allScreenshots.length - 1) {
          runOnJS(navigateToIndex)(currentIndex + 1);
        }
      }
      gestureTranslateX.value = withSpring(0);
    });

  const carouselAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + gestureTranslateX.value * 0.9 }],
  }));

  if (allScreenshots.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const currentScreenshot = allScreenshots[currentIndex];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        {/* Background Gradient */}
        <LinearGradient colors={['#0B0D0F', '#1B1D1F']} style={styles.backgroundGradient} />

        {/* Header Overlay */}
        <Animated.View entering={FadeIn.duration(300)} style={styles.headerOverlay}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.appBadge}>WhatsApp</Text>
            <Text style={styles.contactName}>from: {currentScreenshot?.contact}</Text>
          </View>

          <View style={styles.headerActions} />
        </Animated.View>

        {/* Carousel Container */}
        <GestureDetector gesture={panGesture}>
          <AView
            entering={zoomInSoft}
            style={styles.carouselContainer}
            onLayout={(e) => {
              const w = e.nativeEvent.layout.width;
              if (w && w !== viewportWidth) {
                setViewportWidth(w);
                // re-center on orientation/size change
                translateX.value = centerFor(currentIndex, w);
              }
            }}
          >
            <Animated.View style={[styles.carousel, carouselAnimatedStyle]}>
              {allScreenshots.map((screenshot, index) => (
                <CarouselCard
                  key={screenshot.id}
                  screenshot={screenshot}
                  index={index}
                  currentIndex={currentIndex}
                  onPress={() => navigateToIndex(index)}
                  styles={styles}
                />
              ))}
            </Animated.View>
          </AView>
        </GestureDetector>

        {/* Navigation Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.controlButton, currentIndex === 0 && styles.controlButtonDisabled]}
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            activeOpacity={0.7}
          >
            <ChevronLeft
              size={24}
              color={currentIndex === 0 ? 'rgba(255,255,255,0.3)' : 'white'}
            />
          </TouchableOpacity>

          <View style={styles.indicators}>
            {allScreenshots.slice(0, 5).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex && styles.activeIndicator,
                ]}
              />
            ))}
            {allScreenshots.length > 5 && (
              <Text style={styles.moreIndicator}>+{allScreenshots.length - 5}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.controlButton,
              currentIndex === allScreenshots.length - 1 && styles.controlButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={currentIndex === allScreenshots.length - 1}
            activeOpacity={0.7}
          >
            <ChevronRight
              size={24}
              color={
                currentIndex === allScreenshots.length - 1
                  ? 'rgba(255,255,255,0.3)'
                  : 'white'
              }
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

interface CarouselCardProps {
  screenshot: Screenshot;
  index: number;
  currentIndex: number;
  onPress: () => void;
  styles: any;
}

function CarouselCard({ screenshot, index, currentIndex, onPress, styles }: CarouselCardProps) {
  const distance = index - currentIndex;
  const isCenter = distance === 0;
  const isAdjacent = Math.abs(distance) === 1;

  const animatedStyle = useAnimatedStyle(() => {
    const scale = isCenter ? 1.0 : 1.0;
    const opacity = isCenter ? 1.0 : 1.0;
    const translateY = 0;

    return {
      transform: [
        { scale: withSpring(scale, { damping: 50, stiffness: 500 }) },
        { translateY: withSpring(translateY, { damping: 50, stiffness: 500 }) },
      ],
      opacity: withSpring(opacity, { damping: 50, stiffness: 500 }),
      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
    };
  });

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: screenshot.imageUrl }} style={styles.cardImage} resizeMode="cover" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    loadingText: {
      textAlign: 'center',
      marginTop: 100,
      fontSize: theme.typography.title.fontSize,
      color: 'white',
    },
    backgroundGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    headerOverlay: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.md,
      zIndex: 20,
    },
    backButton: {
      padding: theme.spacing.sm,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: theme.radii.lg,
    },
    headerInfo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    appBadge: {
      fontSize: theme.typography.subhead.fontSize,
      fontWeight: theme.typography.subhead.fontWeight,
      color: '#25D366', // WhatsApp green
      marginBottom: 2,
    },
    contactName: {
      fontSize: theme.typography.subhead.fontSize,
      color: 'rgba(255,255,255,0.8)',
    },
    headerActions: {
      width: 40, // balance the header
    },
    carouselContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: theme.spacing.md, // keep if you want side insets
      justifyContent: 'center', // vertical only
      alignItems: 'stretch', // <- don't center horizontally
      overflow: 'hidden',
    },
    carousel: {
      flexDirection: 'row',
    },
    cardContainer: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      marginHorizontal: CARD_SPACING / 2,
    },
    card: {
      width: '100%',
      height: '100%',
      borderRadius: theme.radii['2xl'],
      overflow: 'hidden',
      backgroundColor: 'rgba(255,255,255,0.1)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 24,
      elevation: 12,
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
      zIndex: 20,
    },
    controlButton: {
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlButtonDisabled: {},
    indicators: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    indicator: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(255,255,255,0.3)',
      marginHorizontal: 3,
    },
    activeIndicator: {
      backgroundColor: 'white',
      width: 20,
    },
    moreIndicator: {
      fontSize: theme.typography.subhead.fontSize,
      color: 'rgba(255,255,255,0.6)',
      marginLeft: theme.spacing.sm,
    },
  });