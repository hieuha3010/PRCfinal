import React from 'react';
import { Tabs } from 'expo-router';
import { theme } from '@/constants/theme';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          display: 'none',
          backgroundColor: theme.colors.background,
          borderTopWidth: theme.hairline,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="results" />
      <Tabs.Screen name="viewer" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}