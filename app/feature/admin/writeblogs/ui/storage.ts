// src/components/medium/storage.ts

export interface StorageAPI {
    set: (key: string, value: string) => Promise<{ success: boolean }>;
    get: (key: string) => Promise<{ value: string } | null>;
    delete: (key: string) => Promise<{ success: boolean }>;
    list: (prefix?: string) => Promise<{ keys: string[] }>;
  }
  
  declare global {
    interface Window {
      storage?: StorageAPI;
    }
  }
  
  // Mock storage implementation for development
  export const createStorage = (): void => {
    if (typeof window !== "undefined") {
      if (!window.storage) {
        console.log("Creating mock storage implementation");
        window.storage = {
          async set(key: string, value: string) {
            try {
              localStorage.setItem(key, value);
              return { success: true };
            } catch (error) {
              console.error("Storage set error:", error);
              throw error;
            }
          },
          async get(key: string) {
            try {
              const value = localStorage.getItem(key);
              return value ? { value } : null;
            } catch (error) {
              console.error("Storage get error:", error);
              return null;
            }
          },
          async delete(key: string) {
            try {
              localStorage.removeItem(key);
              return { success: true };
            } catch (error) {
              console.error("Storage delete error:", error);
              throw error;
            }
          },
          async list(prefix = "") {
            try {
              const keys: string[] = [];
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(prefix)) {
                  keys.push(key);
                }
              }
              return { keys };
            } catch (error) {
              console.error("Storage list error:", error);
              return { keys: [] };
            }
          },
        };
      }
    }
  };
  