import { ItemLocalDataSource } from "../../data/datasources/local/ItemLocalDataSource";
import { ItemModel } from "../../data/model/ItemModel";

export class ItemController {
    private dataSource = new ItemLocalDataSource;

    async getAllItems(): Promise<ItemModel[]> {
        return await this.dataSource.listItems();
    }

    async saveItem(item: ItemModel): Promise<void> {
        return await this.dataSource.saveItem(item);
    }

    async deleteItem(id: string): Promise<void> {
        return await this.dataSource.removeItem(id);
    }
}