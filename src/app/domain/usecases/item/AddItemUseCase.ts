import { Item } from "../../entities/Item";
import { IItemRepository } from "../../interfaces/IItemRepository";

export class AddItem {
    private _repo: IItemRepository;

    constructor(repo: IItemRepository) {
        this._repo = repo;
    }

    async execute(item: Item): Promise<Item | null> {
        try {
            if (!item.name && !item.price && !item.quantity) {
                throw new Error("Please provide all fields for item!");
            }

            else if (item.price <= 0 || item.quantity <= 0){
                throw new Error("Please insert a available value for item price and item quantity!");
            }
        
            return await this._repo.saveItem(item);
        }

        catch(error) {
            console.log("Operation couldn't be completed, some inexpected error occurred:", error);
            throw new Error("Some error occurred when tried to save the item, please try again!");
        }
    }

}