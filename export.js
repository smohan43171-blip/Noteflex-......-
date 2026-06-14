// services/export.js — export stubs for future formats

/**
 * Export a note to a given format.
 * @param {import('../utils/types').Note} note
 * @param {'pdf'|'md'|'txt'} format
 */
export async function exportNote(note, format) {
  // TODO: implement PDF export with expo-print
  // TODO: implement Markdown export
  // TODO: implement plain text export
  console.log(`TODO: exportNote id=${note.id} format=${format}`);
}
