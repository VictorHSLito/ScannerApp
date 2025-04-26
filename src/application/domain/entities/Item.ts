export class Item {
    private _id: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, name: string, price: number, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id;
    }

    set name(value: string) {
        this._name = value;
    }

    get name(): string {
        return this._name
    }

    set price(value: number) {
        this._price = value;
    }

    get price(): number {
        return this._price;
    }

    set quantity(quantity: number) {
        this._quantity = quantity;
    }

    get quantity(): number {
        return this._quantity;
    }

    get totalPrice(): number {
        return this._price*this._quantity;
    }
}