/**
 * IndexedDB & In-Memory Media Store for AI-generated images, avatars, and audio
 * 
 * Prevents localStorage QuotaExceededError by offloading multi-megabyte base64 strings
 * into IndexedDB (with synchronized in-memory cache for instant synchronous access).
 */

const DB_NAME = 'cookwise_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'media_items';

// In-memory cache for zero-latency synchronous access and sandbox fallback
const memoryCache = new Map<string, string>();

let dbPromise: Promise<IDBDatabase | null> | null = null;

function getDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    return Promise.resolve(null);
  }

  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          }
        };

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          console.warn('IndexedDB unavailable, using memory fallback:', request.error);
          resolve(null);
        };
      } catch (err) {
        console.warn('Failed to open IndexedDB:', err);
        resolve(null);
      }
    });
  }

  return dbPromise;
}

export const imageStore = {
  /**
   * Save an image (data URL or blob string) into in-memory cache and IndexedDB
   */
  async saveImage(key: string, dataUrl: string): Promise<void> {
    if (!key || !dataUrl) return;

    // Always cache in memory for instantaneous retrieval
    memoryCache.set(key, dataUrl);

    try {
      const db = await getDB();
      if (!db) return;

      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ key, dataUrl, updatedAt: Date.now() });

      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      });
    } catch (err) {
      console.warn(`Could not persist image for ${key} to IndexedDB:`, err);
    }
  },

  /**
   * Synchronously retrieve an image if it is already in memory
   */
  getImageSync(key: string): string | null {
    return memoryCache.get(key) || null;
  },

  /**
   * Asynchronously retrieve an image from memory cache or IndexedDB
   */
  async getImage(key: string): Promise<string | null> {
    if (memoryCache.has(key)) {
      return memoryCache.get(key) || null;
    }

    try {
      const db = await getDB();
      if (!db) return null;

      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      return new Promise<string | null>((resolve) => {
        req.onsuccess = () => {
          if (req.result && req.result.dataUrl) {
            memoryCache.set(key, req.result.dataUrl);
            resolve(req.result.dataUrl);
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  },

  /**
   * Delete image from memory and IndexedDB
   */
  async deleteImage(key: string): Promise<void> {
    memoryCache.delete(key);
    try {
      const db = await getDB();
      if (!db) return;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
    } catch {
      // Ignored
    }
  },

  /**
   * Check if an image exists in memory or has a key
   */
  hasInMemory(key: string): boolean {
    return memoryCache.has(key);
  },
};
