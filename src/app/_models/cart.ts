import { Product, ProductJson } from "./product";

export interface CartJson{
  products: ProductJson[];
  userId: string;
  id: number;
  totalPrice: number;
}

export class Cart{
  private _id!: number;
  constructor(
    private _products= new Array<Product>(),
    private _userId: string,
    private _totalPrice = 0
  ) {}

  static fromJson(json: CartJson): Cart {
    const cart = new Cart(
      json.products.map(Product.fromJson),
      json.userId,
      json.totalPrice
      );
    cart._id = json.id;
    return cart;
  }

  toJson() : CartJson {
    return <CartJson>{
      products: this._products.map(pro => pro.toJson()),
      userId: this._userId
    }
  }

  get id(): number{
    return this._id;
  }

  get userId(): string{
    return this._userId;
  }

  get products(): Product[]{
    return this._products;
  }

  get totalPrice(): number{
    return this._totalPrice;
  }

  set products(x: Product[]){
    this._products = x;
  }

  // Add product here?
}
