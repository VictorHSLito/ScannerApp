import { Item } from "../entities/Item";
import { IItemRepository } from "../interfaces/IItemRepository";

export class ListItemsUseCase {
    private _repo: IItemRepository;

    constructor (repo: IItemRepository) {
        this._repo = repo;
    }

    listItems(): Promise<Item[] | null> {
        try {
            const allItems = this._repo.listItems();
            return allItems;
        }
        catch (error) {
            console.log("Operation couldn't be completed, some inexpected error occurred:", error)
            throw new Error("Some error occurred when tried to list all the items, please try again!");
        }
    }
}