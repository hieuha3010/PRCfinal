import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Bell, Shield, Database, Download, Trash2, CircleHelp as HelpCircle, ExternalLink, ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { theme } from '@/constants/theme';

export default function SettingsScreen() {
  const { colors, colorScheme } = useColorScheme();

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  const settingSections = [
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: <Shield size={16} color={colors.muted} />,
          title: 'Data Privacy',
          subtitle: 'All data stays on your device',
          onPress: () => showAlert('Data Privacy', 'This is a demo app. All data is simulated and stored locally in memory only.'),
        },
        {
          icon: <Bell size={16} color={colors.muted} />,
          title: 'Notifications',
          subtitle: 'When new content is indexed',
          rightComponent: <Switch value={true} trackColor={{ false: colors.surface, true: colors.accent }} />,
        },
      ],
    },
    {
      title: 'Data Management',
      items: [
        {
          icon: <Database size={16} color={colors.muted} />,
          title: 'Storage Usage',
          subtitle: 'View indexed content size',
          rightComponent: <Text style={{ color: colors.muted, fontSize: 14 }}>~2.4 MB</Text>,
        },
        {
          icon: <Download size={16} color={colors.muted} />,
          title: 'Export Data',
          subtitle: 'Download your search index',
          onPress: () => showAlert('Export Data', 'This feature would export your indexed content for backup.'),
        },
        {
          icon: <Trash2 size={16} color={colors.muted} />,
          title: 'Clear All Data',
          subtitle: 'Remove all indexed content',
          onPress: () => Alert.alert(
            'Clear All Data',
            'This will remove all indexed screenshots and search history. This action cannot be undone.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Clear', style: 'destructive' }
            ]
          ),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle size={16} color={colors.muted} />,
          title: 'Help & FAQ',
          subtitle: 'Learn how to use Memory Search',
          rightComponent: <ExternalLink size={14} color={colors.muted} />,
          onPress: () => showAlert('Help & FAQ', 'This would open the help documentation.'),
        },
      ],
    },
  ];

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
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your memory search experience</Text>
      </Animated.View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Demo Notice */}
        <Animated.View 
          entering={FadeIn.delay(100).duration(400)}
          style={styles.demoNotice}
        >
          <Text style={styles.demoTitle}>Demo Mode</Text>
          <Text style={styles.demoText}>
            This is a demonstration app. All screenshots and data are simulated for preview purposes only.
          </Text>
        </Animated.View>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <Animated.View
            key={section.title}
            entering={FadeIn.delay((sectionIndex + 1) * 100).duration(400)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.lastItem
                  ]}
                  onPress={item.onPress}
                  activeOpacity={item.onPress ? 0.7 : 1}
                  disabled={!item.onPress}
                >
                  <View style={styles.settingIcon}>
                    {item.icon}
                  </View>
                  
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  
                  <View style={styles.settingRight}>
                    {item.rightComponent || (
                      item.onPress && <ChevronRight size={14} color={colors.muted} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        ))}

        {/* App Version */}
        <Animated.View 
          entering={FadeIn.delay(500).duration(400)}
          style={styles.versionContainer}
        >
          <Text style={styles.versionText}>Memory Search v1.0.0</Text>
          <Text style={styles.versionSubtext}>Built with ❤️ for ambient computing</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.display.fontSize,
    fontWeight: theme.typography.display.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textMuted,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  demoNotice: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.brandSolid,
    borderStyle: 'dashed',
  },
  demoTitle: {
    fontSize: theme.typography.headline.fontSize,
    fontWeight: theme.typography.headline.fontWeight,
    color: theme.colors.brandSolid,
    marginBottom: theme.spacing.xs,
  },
  demoText: {
    fontSize: theme.typography.subhead.fontSize,
    color: theme.colors.textMuted,
    lineHeight: theme.typography.subhead.lineHeight,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  sectionContent: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  settingTitle: {
    fontSize: theme.typography.headline.fontSize,
    fontWeight: theme.typography.headline.fontWeight,
    color: theme.colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: theme.typography.subhead.fontSize,
    color: theme.colors.textMuted,
  },
  settingRight: {
    marginLeft: theme.spacing.sm,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  versionText: {
    fontSize: theme.typography.subhead.fontSize,
    fontWeight: theme.typography.subhead.fontWeight,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  versionSubtext: {
    fontSize: theme.typography.subhead.fontSize,
    color: theme.colors.textMuted,
  },
});