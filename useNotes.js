// hooks/useNotes.js — CRUD hook backed by SQLite

import { useState, useEffect, useCallback } from 'react';
import { getAllNotes, insertNote, updateNote, deleteNote, searchNotes } from '../services/db';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const all = await getAllNotes();
      setNotes(all.map(dbRowToNote));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addNote = useCallback(async (note) => {
    await insertNote(noteToDbRow(note));
    await refresh();
  }, [refresh]);

  const saveNote = useCallback(async (note) => {
    await updateNote(noteToDbRow(note));
    await refresh();
  }, [refresh]);

  const removeNote = useCallback(async (id) => {
    await deleteNote(id);
    await refresh();
  }, [refresh]);

  const search = useCallback(async (query) => {
    if (!query.trim()) return refresh();
    const results = await searchNotes(query);
    setNotes(results.map(dbRowToNote));
  }, [refresh]);

  return { notes, loading, refresh, addNote, saveNote, removeNote, search };
}

// SQLite stores booleans as integers
function dbRowToNote(row) {
  return { ...row, synced: row.synced === 1 };
}

function noteToDbRow(note) {
  return { ...note, synced: note.synced ? 1 : 0 };
}
