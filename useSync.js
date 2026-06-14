// hooks/useSync.js — Firebase sync hook stub

import { useEffect } from 'react';
import { onRemoteChange, syncPendingNotes } from '../services/sync';

/**
 * Stub sync hook. Wire up Firebase here later.
 * FIREBASE-TODO: call syncPendingNotes(notes) when NetInfo says online
 * FIREBASE-TODO: call onRemoteChange to merge remote edits
 */
export function useSync(notes) {
  useEffect(() => {
    // FIREBASE-TODO: check connectivity with @react-native-community/netinfo
    // FIREBASE-TODO: const unsub = onRemoteChange((remoteNotes) => { ... merge logic ... });
    // FIREBASE-TODO: return () => unsub();
    console.log('useSync: Firebase not connected yet');
  }, [notes]);
}
