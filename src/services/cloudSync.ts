// Global Cross-Device Cloud Synchronization Service
// Ensures accounts, deposits, withdrawals, and rigs created on mobile work seamlessly on PC and vice versa.

const CLOUD_API_BASE = 'https://api.restful-api.dev/objects';

export const CLOUD_STORE_IDS = {
  accounts: 'ff808181a067127101a09a0dc18d080c',
  deposits: 'ff808181a067127101a09a0dc3c8080d',
  withdrawals: 'ff808181a067127101a09a0dc5ca080e',
  rigs: 'ff808181a067127101a09a0dc7ae080f',
  admin_config: 'ff808181a067127101a09a0dc9af0810'
};

export async function fetchCloudData<T>(collection: keyof typeof CLOUD_STORE_IDS, fallback: T): Promise<T> {
  try {
    const objectId = CLOUD_STORE_IDS[collection];
    if (!objectId) return fallback;

    const res = await fetch(`${CLOUD_API_BASE}/${objectId}`, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });

    if (!res.ok) return fallback;

    const json = await res.json();
    if (json && json.data && json.data.items !== undefined) {
      return json.data.items as T;
    }
    return fallback;
  } catch (error) {
    console.warn(`[CloudSync] Failed to fetch ${collection} from cloud:`, error);
    return fallback;
  }
}

export async function saveCloudData<T>(collection: keyof typeof CLOUD_STORE_IDS, items: T): Promise<boolean> {
  try {
    const objectId = CLOUD_STORE_IDS[collection];
    if (!objectId) return false;

    const payload = {
      name: `blq_uganda_${collection}_production`,
      data: {
        items,
        lastUpdated: new Date().toISOString()
      }
    };

    const res = await fetch(`${CLOUD_API_BASE}/${objectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return res.ok;
  } catch (error) {
    console.warn(`[CloudSync] Failed to save ${collection} to cloud:`, error);
    return false;
  }
}
