import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import AppBackground from '@/components/AppBackground';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AppBackground>
      <StatusBar style="dark" backgroundColor="transparent" />
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' }
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