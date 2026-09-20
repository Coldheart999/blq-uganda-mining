// Global Cross-Device Cloud Synchronization Service
// Backed by Google Firebase Realtime Database
// Ensures accounts, deposits, withdrawals, and rigs created on mobile work seamlessly across all devices in real-time.

export const FIREBASE_DATABASE_URL = 'https://blqmining-default-rtdb.firebaseio.com';

export type CloudCollection = 'accounts' | 'deposits' | 'withdrawals' | 'rigs' | 'admin_config';

export async function fetchCloudData<T>(collection: CloudCollection, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${FIREBASE_DATABASE_URL}/${collection}.json`, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });

    if (!res.ok) {
      console.warn(`[CloudSync] HTTP error fetching ${collection}:`, res.status);
      return fallback;
    }

    const json = await res.json();
    if (json === null || json === undefined) {
      return fallback;
    }

    // If expected type is an array but Firebase returned an indexed object, convert to array
    if (Array.isArray(fallback) && typeof json === 'object' && !Array.isArray(json)) {
      return Object.values(json) as T;
    }

    return json as T;
  } catch (error) {
    console.warn(`[CloudSync] Failed to fetch ${collection} from Firebase:`, error);
    return fallback;
  }
}

export async function saveCloudData<T>(collection: CloudCollection, items: T): Promise<boolean> {
  try {
    const res = await fetch(`${FIREBASE_DATABASE_URL}/${collection}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    });

    return res.ok;
  } catch (error) {
    console.warn(`[CloudSync] Failed to save ${collection} to Firebase:`, error);
    return false;
  }
}
