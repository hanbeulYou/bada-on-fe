class IndexedDBManager {
  private static instance: IndexedDBManager;
  private dbName: string;
  private storeName: string;
  private db: IDBDatabase | null;

  private constructor(dbName: string, storeName: string) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
  }

  public static getInstance(
    dbName: string,
    storeName: string,
  ): IndexedDBManager {
    if (!IndexedDBManager.instance) {
      IndexedDBManager.instance = new IndexedDBManager(dbName, storeName);
    }
    return IndexedDBManager.instance;
  }

  async init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      };

      request.onsuccess = event => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = event => {
        reject(`IndexedDB error: ${(event.target as IDBOpenDBRequest).error}`);
      };
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database is not initialized.');
        return;
      }

      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        resolve(event.target.result);
      };

      request.onerror = event => {
        reject(`Request error: ${event.target.errorCode}`);
      };
    });
  }

  async add(data: object): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database is not initialized.');
        return;
      }

      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(data);

      request.onsuccess = () => {
        resolve('Data added successfully.');
      };

      request.onerror = event => {
        reject(`Request error: ${(event.target as IDBRequest).error}`);
      };
    });
  }

  async delete(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database is not initialized.');
        return;
      }

      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve(`Object with ID ${id} deleted successfully.`);
      };

      request.onerror = event => {
        reject(`Request error: ${(event.target as IDBRequest).error}`);
      };
    });
  }
}

export default IndexedDBManager;
