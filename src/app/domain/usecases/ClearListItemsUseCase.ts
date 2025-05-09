import { IItemRepository } from "../interfaces/IItemRepository";

export class ClearListItemsUseCase {
    private _repo: IItemRepository;

    constructor (repo: IItemRepository) {
        this._repo = repo;
    }

    async execute(): Promise<void> {
        try {
            await this._repo.cleanItems();
        } 
        catch (error) {
            console.error("Failed to clear items:", error);
            throw new Error("An error occurred while clearing the items list.");
        }
    }
}