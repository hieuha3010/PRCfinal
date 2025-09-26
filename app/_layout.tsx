import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import AppBackground from '@/components/AppBackground';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AppBackground>
      <StatusBar style="dark" backgroundColor="transparent" />
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade_from_bottom',
        gestureEnabled: true
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="results" />
        <Stack.Screen name="viewer" />
        <Stack.Screen name="library" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AppBackground>
  );
}