import { Item } from "../../domain/entities/Item";
import { ItemModel } from "../model/ItemModel";

export class ItemMapper {
    // Essa classe é responsável por transformar os objetos do banco em objetos da domain
    // E vice-versa
    static toEntity(model: ItemModel): Item {
        return new Item(String(model.id), model.name, model.price, model.quantity);
    }

    static toModel(entity: Item): ItemModel {
        return new ItemModel(Number(entity.id), entity.name, entity.price, entity.quantity);
    }
}