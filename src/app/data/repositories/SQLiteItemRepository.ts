import { Item } from "../../domain/entities/Item";
import { IItemRepository } from "../../domain/interfaces/IItemRepository";
import { ItemLocalDataSource } from "../datasources/local/ItemLocalDataSource";
import { ItemMapper } from "../mappers/ItemMapper";

export class SQLiteItemRepository implements IItemRepository {
    private dataSource = new ItemLocalDataSource;

    async saveItem(item: Item): Promise<Item | null> {
        try {
            const model = ItemMapper.toModel(item);
            await this.dataSource.saveItem(model);
            return item;
        } catch (error) {
            console.log("There was a problem when tried to save item: ", error);
            throw new Error("Method not implemented.");
        }   
    }

    async listItems(): Promise<Item[] | null> {
        try {
            const models = this.dataSource.listItems();
            return (await models).map(ItemMapper.toEntity);
        } catch (error) {
            console.log();
            throw new Error("Method not implemented.");
        }     
    }


    async removeItem(id: string): Promise<void> {
        try {
            await this.dataSource.removeItem(id);
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    
    
    async cleanItems(): Promise<void> {
        try {
            await this.dataSource.clearItems();
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }

}