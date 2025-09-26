import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = { children: React.ReactNode; };

export default function AppBackground({ children }: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
});