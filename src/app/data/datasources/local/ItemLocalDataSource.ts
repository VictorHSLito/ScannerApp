import { ItemModel } from "../../model/ItemModel";
import { DataBaseHelper } from "./DataBaseHelper";

export class ItemLocalDataSource {
    // É a classe responsável por fazer o acesso com as entidades do banco de dados
    
    async saveItem(model: ItemModel): Promise<void> {
        const db = DataBaseHelper.connection;
        await db.run (
            `INSERT INTO items (id, name, price, quantity) VALUES (?, ?, ?, ?)`,
            model.id, model.name, model.price, model.quantity
        );
    }

    async listItems(): Promise<ItemModel[]> { 
        const db = DataBaseHelper.connection;
        const rows = await db.all(`SELECT * FROM items`);
        return rows.map(ItemModel.fromMap);
    }

    async removeItem(id: string): Promise<void> {
        const db = DataBaseHelper.connection;
        await db.run (`DELETE FROM items WHERE id = ?`, id);
    }

    async clearItems(): Promise<void> {
        const db = DataBaseHelper.connection;
        await db.run (`DELETE FROM items`);
    }
}