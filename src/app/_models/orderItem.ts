import { Product } from "./product";

export interface ItemJson{
  id: number;
  product: Product;
  quantity: number;
}

export class OrderItem{
  private _id!: number;
  constructor(
    private _product: Product,
    private _quantity: number
    ){}


  static fromJson(json: ItemJson): OrderItem {
    const item = new OrderItem(
      json.product,
      json.quantity
      );
    item._id = json.id;
    return item;
  }

  toJson() : ItemJson {
    return <ItemJson>{
      product: this._product,
      quantity: this._quantity
    }
  }

  get id(): number{
    return this._id;
  }

  get product(): Product{
    return this._product;
  }

  get quantity(): number{
    return this._quantity;
  }

  set quantity(x: number){
    this._quantity = x;
  }
}
