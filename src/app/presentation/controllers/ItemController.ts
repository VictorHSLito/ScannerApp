import { ItemMapper } from "../../data/mappers/ItemMapper";
import { ItemModel } from "../../data/model/ItemModel";
import { SQLiteItemRepository } from "../../data/repositories/SQLiteItemRepository";
import { Item } from "../../domain/entities/Item";
import { AddItem } from "../../domain/usecases/item/AddItemUseCase";
import { ClearListItems } from "../../domain/usecases/item/ClearListItemsUseCase";
import { EditItem } from "../../domain/usecases/item/EditItemUseCase";
import { ListItems } from "../../domain/usecases/item/ListItemsUseCase";
import { RemoveItem } from "../../domain/usecases/item/RemoveItemUseCase";

export class ItemController {
    private sql = new SQLiteItemRepository;
    private addUseCase = new AddItem(this.sql);
    private listUseCase = new ListItems(this.sql);
    private deleteUseCase = new RemoveItem(this.sql);
    private clearListUseCase = new ClearListItems(this.sql);
    private editItemUseCase = new EditItem(this.sql);

    async getAllItems(): Promise<Item[] | null> {
        return await this.listUseCase.execute();
    }

    async saveItem(item: ItemModel) {
        const itemModel = ItemMapper.toEntity(item);
        return await this.addUseCase.execute(itemModel);
    }

    async deleteItem(id: string): Promise<void> {
        return await this.deleteUseCase.execute(id);
    }

    async clearList(): Promise<void> {
        return await this.clearListUseCase.execute();
    }

    async updateItem(item: ItemModel) {
        const new_item = ItemMapper.toEntity(item);
        return await this.editItemUseCase.execute(new_item);
    }
}