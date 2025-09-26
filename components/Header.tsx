import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title = "Explore", subtitle = "" }: HeaderProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center" },
  title: { ...theme.typography.title, color: theme.colors.text },
  subtitle: { ...theme.typography.subhead, color: theme.colors.textMuted, marginTop: 4 },
});