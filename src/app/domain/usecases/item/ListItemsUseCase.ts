import { Item } from "../../entities/Item";
import { IItemRepository } from "../../interfaces/IItemRepository";

export class ListItems {
    private _repo: IItemRepository;

    constructor (repo: IItemRepository) {
        this._repo = repo;
    }

    async execute(): Promise<Item[] | null> {
        try {
            return await this._repo.listItems();
        }
        catch (error) {
            console.log("Operation couldn't be completed, some inexpected error occurred:", error)
            throw new Error("Some error occurred when tried to list all the items, please try again!");
        }
    }
}