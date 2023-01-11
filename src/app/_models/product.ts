export interface ProductJson{
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export class Product {
  private _id!: number;
  constructor(
    private _name: string,
    private _price = 0,
    private _quantity = 0
  ) {}

  static fromJson(json: ProductJson): Product {
    const product = new Product(
      json.name,
      json.price,
      json.quantity
      );
    product._id = json.id;
    return product;
  }

  toJson() : ProductJson {
    return <ProductJson>{
      name: this._name,
      price: this._price,
      quantity: this._quantity
    }
  }

  get id(): number{
    return this._id;
  }

  get name():string{
    return this._name;
  }

  get price(): number{
    return this._price;
  }

  get quantity(): number{
    return this._quantity;
  }
}
