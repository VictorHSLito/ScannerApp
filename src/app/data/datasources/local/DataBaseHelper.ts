import * as SQLite from 'expo-sqlite';

export class DataBaseHelper { 
    // Essa classe é responsável por criar a conexão com o banco de dados
    private static db: SQLite.SQLiteDatabase;
    
    static async init(): Promise<void> {
        if(!this.db) {
            this.db = await SQLite.openDatabaseAsync('products.db');

            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS items(
                    id TEXT PRIMARY KEY,
                    name TEXT,
                    price REAL,
                    quantity INTEGER 
                );`
            );
        }
    }

    static get connection(): SQLite.SQLiteDatabase {
        if (!this.db) {
            throw new Error("Database not initialized.");
        }
        return this.db;
    }
}