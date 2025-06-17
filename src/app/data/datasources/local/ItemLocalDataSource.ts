import { ItemModel } from "../../model/ItemModel";
import { DataBaseHelper } from "./DataBaseHelper";

export class ItemLocalDataSource {
    // É a classe responsável por fazer o acesso com as entidades do banco de dados
    
    async saveItem(model: ItemModel): Promise<void> {
        const db = DataBaseHelper.connection;
        await db.runAsync (
            `INSERT INTO items (name, price, quantity) VALUES (?, ?, ?)`,
            model.name, model.price, model.quantity
        );
    }

    async listItems(): Promise<ItemModel[]> { 
        const db = DataBaseHelper.connection;
        const rows = await db.getAllAsync(`SELECT * FROM items`);
        return rows.map(ItemModel.fromMap);
    }

    async removeItem(id: string): Promise<void> {
        const db = DataBaseHelper.connection;
        await db.runAsync (`DELETE FROM items WHERE id = ?`, id);
    }

    async clearItems(): Promise<void> {
        const db = DataBaseHelper.connection;
        await db.runAsync (`DELETE FROM items`);
    }

    async editItem(model: ItemModel): Promise<void> {
        const db = DataBaseHelper.connection;
        await db.runAsync (`UPDATE items SET name = ?, price = ?, quantity = ? WHERE id = ? `, model.name, model.price, model.quantity, model.id);
    }
}