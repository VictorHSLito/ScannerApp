import { Item } from "../entities/Item";

export interface IItemRepository {
    saveItem(item: Item): Promise<Item | null>;
    listItems(): Promise<Item[] | null>;
    removeItem(): void;
    cleanItems(): void;
}