export class ItemModel {
    // Essa classe representa como o dado é armazenado no banco
    id: number | null;
    name: string;
    price: number;
    quantity: number;

    constructor(id: number | null, name: string, price: number, quantity: number) {
        this.id = id;
        this.name = name; 
        this.price = price;
        this.quantity = quantity;
    }

    // Esse método serve para transformar um objeto em Map
    toMap(): any { // Que pode ser usado em comandos SQL
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            quantity: this.quantity
        };
    }

    // Esse método é o contrário, pega um objeto do banco de dados e converte
    static fromMap(map: any): ItemModel { // Para um objeto da classe ItemModel
        return new ItemModel(map.id, map.name, map.price, map.quantity);
    }
}