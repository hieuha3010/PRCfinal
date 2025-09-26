import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = { children: React.ReactNode; };

export default function AppBackground({ children }: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Pink to blue gradient
        colors={["#FFB6C1", "#87CEEB", "#4169E1"]}
        start={{ x: 0.0, y: 0.0 }}   // top-left
        end={{ x: 1.0, y: 1.0 }}     // bottom-right
        style={StyleSheet.absoluteFill}
      />
      {/* Optional subtle overlay to smooth colors */}
      <LinearGradient
        colors={["rgba(255,255,255,0.30)", "rgba(255,255,255,0.10)", "rgba(255,255,255,0.00)"]}
        start={{ x: 0.2, y: 0.0 }}
        end={{ x: 0.8, y: 1.0 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
});