// screens/HomeScreen.js — main note list with search, FAB, settings

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';

import NoteCard from '../components/NoteCard';
import FAB from '../components/FAB';
import { useNotes } from '../hooks/useNotes';
import { COLORS } from '../utils/constants';
import { deleteFile } from '../services/storage';

export default function HomeScreen({ navigation }) {
  const { notes, loading, refresh, addNote, removeNote, search } = useNotes();
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));

  async function handleFABSelect(type) {
    const now = Date.now();
    const note = {
      id: uuidv4(),
      type,
      title: '',
      content: '',
      skin: 'blank',
      scrollMode: 'vertical',
      created_at: now,
      updated_at: now,
      synced: false,
    };
    await addNote(note);
    navigation.navigate('NoteEditor', { noteId: note.id, isNew: true });
  }

  function handlePress(note) {
    navigation.navigate('NoteEditor', { noteId: note.id });
  }

  function handleLongPress(note) {
    Alert.alert(
      'Delete Note',
      `Delete "${note.title || 'Untitled'}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (note.type !== 'text' && note.content) {
              await deleteFile(note.content);
            }
            await removeNote(note.id);
          },
        },
      ]
    );
  }

  function handleSearch(text) {
    setQuery(text);
    search(text);
  }

  const numColumns = viewMode === 'grid' ? 2 : 1;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>NoteFlex</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <Text style={styles.iconBtnText}>{viewMode === 'grid' ? '☰' : '⊞'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.iconBtnText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Note grid / list */}
      {notes.length === 0 && !loading ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📓</Text>
          <Text style={styles.emptyTitle}>No notes yet</Text>
          <Text style={styles.emptyHint}>Tap + to create your first note</Text>
        </View>
      ) : (
        <FlatList
          key={numColumns}
          data={notes}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={handlePress}
              onLongPress={handleLongPress}
            />
          )}
        />
      )}

      {/* FAB */}
      <FAB onSelect={handleFABSelect} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnText: {
    fontSize: 18,
  },
  searchRow: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  list: {
    padding: 6,
    paddingBottom: 100,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  emptyHint: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
