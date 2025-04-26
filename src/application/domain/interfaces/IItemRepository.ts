import { Item } from "../entities/Item";

export interface IItemRepository {
    saveItem(item: Item): void;
    listItems(): Item[];
    removeItem(): void;
    cleanItems(): void;
}