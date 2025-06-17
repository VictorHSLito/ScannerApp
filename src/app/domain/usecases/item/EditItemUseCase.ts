import { Item } from "../../entities/Item";
import { IItemRepository } from "../../interfaces/IItemRepository";

export class EditItem {
    private _repo: IItemRepository;

    constructor(repository: IItemRepository) {
        this._repo = repository;
    }

    async execute(item: Item) {
        try {
            return await this._repo.editItem(item);
        }
        catch(err) {
            console.log("Error: ", err);
        }
    }
}