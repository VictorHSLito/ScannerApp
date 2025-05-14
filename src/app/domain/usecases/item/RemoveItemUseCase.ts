import { IItemRepository } from "../../interfaces/IItemRepository";

export class RemoveItem {
    private _repo: IItemRepository;

    constructor (repo: IItemRepository) {
        this._repo = repo;
    }

    async execute(id: string): Promise<void> {
        try {
            if (!id) {
                throw new Error("ID wasn't provided or is incorrect");
            }
            await this._repo.removeItem(id);
        } catch (error) {
            console.error("Failed to remove item:", error);
            throw new Error("An error occurred while removing the item. Please try again.");
        }
    }
}