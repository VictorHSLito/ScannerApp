import  sqlite3  from "sqlite3";
import {open, Database} from 'sqlite';

export class DataBaseHelper { 
    // Essa classe é responsável por criar a conexão com o banco de dados
    private static db: Database;
    
    static async init(): Promise<void> {
        if(!this.db) {
            this.db = await open ({
                filename: "name of database", // Ex: products.db
                driver: sqlite3.Database 
            });

            await this.db.exec(`CREATE TABLE IF NOT EXISTS items (
                id PRIMARY KEY TEXT,
                name TEXT,
                price REAL,
                quantity INTEGER
                )
            `);
        }
    }

    static get connection(): Database {
        if (!this.db) {
            throw new Error("Database not initialized.");
        }
        return this.db;
    }
}