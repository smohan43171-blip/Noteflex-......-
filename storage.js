// services/storage.js — expo-file-system helpers for images, audio, draw PNGs

import * as FileSystem from 'expo-file-system';
import { NOTE_DIR } from '../utils/constants';

const BASE_DIR = FileSystem.documentDirectory + NOTE_DIR;

export async function ensureNoteDir() {
  const info = await FileSystem.getInfoAsync(BASE_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(BASE_DIR, { intermediates: true });
  }
}

export async function saveFile(sourceUri, filename) {
  await ensureNoteDir();
  const dest = BASE_DIR + filename;
  await FileSystem.copyAsync({ from: sourceUri, to: dest });
  return dest;
}

export async function deleteFile(uri) {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (info.exists) {
      await FileSystem.deleteAsync(uri, { idempotent: true });
    }
  } catch (e) {
    console.warn('deleteFile error:', e);
  }
}

export async function readFile(uri) {
  const info = await FileSystem.getInfoAsync(uri);
  if (!info.exists) return null;
  return uri;
}

export function getNoteFilePath(noteId, ext) {
  // Returns a stable path for a note's media file
  return BASE_DIR + `${noteId}.${ext}`;
}

export async function saveBase64File(base64Data, noteId, ext) {
  await ensureNoteDir();
  const path = getNoteFilePath(noteId, ext);
  await FileSystem.writeAsStringAsync(path, base64Data, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return path;
}
