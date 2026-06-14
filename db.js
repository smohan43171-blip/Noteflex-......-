// services/db.js — SQLite CRUD for notes table

import * as SQLite from 'expo-sqlite';

let _db = null;

function getDb() {
  if (!_db) {
    _db = SQLite.openDatabase('noteflex.db');
  }
  return _db;
}

export function initDb() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes (
            id TEXT PRIMARY KEY NOT NULL,
            type TEXT NOT NULL DEFAULT 'text',
            title TEXT NOT NULL DEFAULT '',
            content TEXT NOT NULL DEFAULT '',
            skin TEXT NOT NULL DEFAULT 'blank',
            scrollMode TEXT NOT NULL DEFAULT 'vertical',
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            synced INTEGER NOT NULL DEFAULT 0
          );`
        );
      },
      (err) => reject(err),
      () => resolve()
    );
  });
}

export function getAllNotes() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM notes ORDER BY updated_at DESC;',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

export function getNoteById(id) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM notes WHERE id = ?;',
        [id],
        (_, { rows }) => resolve(rows._array[0] || null),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

export function insertNote(note) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO notes (id, type, title, content, skin, scrollMode, created_at, updated_at, synced)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            note.id,
            note.type,
            note.title,
            note.content,
            note.skin,
            note.scrollMode,
            note.created_at,
            note.updated_at,
            note.synced ? 1 : 0,
          ]
        );
      },
      (err) => reject(err),
      () => resolve()
    );
  });
}

export function updateNote(note) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.transaction(
      (tx) => {
        tx.executeSql(
          `UPDATE notes
           SET title=?, content=?, skin=?, scrollMode=?, updated_at=?, synced=?
           WHERE id=?;`,
          [
            note.title,
            note.content,
            note.skin,
            note.scrollMode,
            note.updated_at,
            0, // mark unsynced on every local edit
            note.id,
          ]
        );
      },
      (err) => reject(err),
      () => resolve()
    );
  });
}

export function deleteNote(id) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM notes WHERE id=?;', [id]);
      },
      (err) => reject(err),
      () => resolve()
    );
  });
}

export function searchNotes(query) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const like = `%${query}%`;
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM notes WHERE title LIKE ? OR content LIKE ? ORDER BY updated_at DESC;`,
        [like, like],
        (_, { rows }) => resolve(rows._array),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}
