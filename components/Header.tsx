import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { theme } from "@/constants/theme";
import { AView, slideInDown } from "./motion";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title = "Explore", subtitle = "" }: HeaderProps) {
  return (
    <AView entering={slideInDown.delay(80)} style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </AView>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center" },
  title: { ...theme.typography.title, color: theme.colors.text },
  subtitle: { ...theme.typography.subhead, color: theme.colors.textMuted, marginTop: 4 },
});