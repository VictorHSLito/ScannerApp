import { Item } from "../entities/Item";

export interface IItemRepository {
    saveItem(item: Item): Promise<Item | null>;
    listItems(): Item[];
    removeItem(): void;
    cleanItems(): void;
}