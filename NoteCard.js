// components/NoteCard.js — grid/list card for HomeScreen

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

const TYPE_ICONS = {
  text: '📝',
  image: '🖼️',
  audio: '🎙️',
  draw: '✏️',
};

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NoteCard({ note, onPress, onLongPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(note)}
      onLongPress={() => onLongPress(note)}
      activeOpacity={0.75}
    >
      <View style={styles.iconRow}>
        <Text style={styles.icon}>{TYPE_ICONS[note.type] || '📝'}</Text>
        {!note.synced && <View style={styles.unsyncedDot} />}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {note.title || 'Untitled'}
      </Text>
      {note.type === 'text' && (
        <Text style={styles.preview} numberOfLines={2}>
          {note.content}
        </Text>
      )}
      <Text style={styles.time}>{timeAgo(note.updated_at)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    margin: 6,
    flex: 1,
    minHeight: 110,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  icon: {
    fontSize: 22,
  },
  unsyncedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
    marginTop: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  preview: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
    lineHeight: 17,
  },
  time: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 'auto',
  },
});
