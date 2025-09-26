import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = { children: React.ReactNode; };

export default function AppBackground({ children }: Props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
        style={StyleSheet.absoluteFill}
      />
      {/* Optional subtle overlay to smooth colors */}
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.0)"]}
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