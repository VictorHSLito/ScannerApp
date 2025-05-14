import { IItemRepository } from "../../interfaces/IItemRepository";

export class EditItem {
    private _repo: IItemRepository;

    constructor(repository: IItemRepository) {
        this._repo = repository;
    }
}