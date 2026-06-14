// services/sync.js — Firebase Firestore stubs. NOT connected yet.
// FIREBASE-TODO: npm install firebase @react-native-firebase/app @react-native-firebase/firestore
// FIREBASE-TODO: Add google-services.json (Android) and GoogleService-Info.plist (iOS)

// FIREBASE-TODO: import firestore from '@react-native-firebase/firestore';

/**
 * Push a single note to Firestore.
 * @param {import('../utils/types').Note} note
 */
export async function pushNote(note) {
  // FIREBASE-TODO: await firestore().collection('notes').doc(note.id).set(note);
  console.log('TODO: Firebase pushNote', note.id);
}

/**
 * Pull all notes from Firestore for the current user.
 * @returns {Promise<import('../utils/types').Note[]>}
 */
export async function pullNotes() {
  // FIREBASE-TODO: const snap = await firestore().collection('notes').get();
  // FIREBASE-TODO: return snap.docs.map(d => d.data());
  console.log('TODO: Firebase pullNotes');
  return [];
}

/**
 * Listen for remote changes to notes.
 * Uses updated_at for last-write-wins conflict resolution.
 * @param {(notes: import('../utils/types').Note[]) => void} callback
 * @returns {() => void} unsubscribe function
 */
export function onRemoteChange(callback) {
  // FIREBASE-TODO:
  // const unsub = firestore().collection('notes').onSnapshot(snap => {
  //   const notes = snap.docs.map(d => d.data());
  //   callback(notes);
  // });
  // return unsub;
  console.log('TODO: Firebase onRemoteChange');
  return () => {}; // no-op unsubscribe
}

/**
 * Push all unsynced notes in bulk.
 * Call this when user goes online.
 * @param {import('../utils/types').Note[]} notes
 */
export async function syncPendingNotes(notes) {
  // FIREBASE-TODO: batch write all notes where synced === false
  const unsynced = notes.filter((n) => !n.synced);
  console.log(`TODO: Firebase syncPendingNotes — ${unsynced.length} pending`);
}
