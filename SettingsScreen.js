// screens/SettingsScreen.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../utils/constants';

const SETTINGS_KEY = 'noteflex_settings';

export default function SettingsScreen({ navigation }) {
  function aboutPress() {
    Alert.alert('NoteFlex', 'v1.0.0 — Local-first note app.\nFirebase sync ready to enable.');
  }

  // TODO: load/save settings.json for user prefs
  // TODO: "Upload background image as skin" — call saveImageAsSkin from customization.js
  // TODO: default skin selector
  // TODO: default scroll mode selector

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionHeader}>General</Text>

        <TouchableOpacity style={styles.row} onPress={aboutPress}>
          <Text style={styles.rowLabel}>About NoteFlex</Text>
          <Text style={styles.rowArrow}>›</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Sync</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Firebase Sync</Text>
          <Text style={styles.rowValue}>Disabled</Text>
        </View>
        <Text style={styles.hint}>
          {/* FIREBASE-TODO: Replace this with a toggle that calls syncPendingNotes() */}
          Firebase sync is stubbed. Enable it in services/sync.js when ready.
        </Text>

        <Text style={styles.sectionHeader}>Coming Soon</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Export Notes (PDF, MD, TXT)</Text>
          <Text style={styles.rowValue}>TODO</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Custom Skins (100+)</Text>
          <Text style={styles.rowValue}>Drop into /skins</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Upload Background Image as Skin</Text>
          <Text style={styles.rowValue}>TODO</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 4,
  },
  row: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 2,
  },
  rowLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  rowValue: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  rowArrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  hint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    paddingHorizontal: 4,
    marginTop: 6,
    lineHeight: 18,
  },
});
