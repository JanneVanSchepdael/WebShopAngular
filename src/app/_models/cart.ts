import { ItemJson, OrderItem } from "./orderItem";

export interface CartResponse{
  cart: CartJson;
}

export interface CartJson{
  items: ItemJson[];
  userId: string;
  id: number;
  totalPrice: number;
}

export class Cart{
  private _id!: number;
  constructor(
    private _items= new Array<OrderItem>(),
    private _userId: string,
    private _totalPrice = 0
  ) {}

  static fromJson(json: CartJson): Cart {
    const cart = new Cart(
      json.items.map(OrderItem.fromJson),
      json.userId,
      json.totalPrice
      );
    cart._id = json.id;
    return cart;
  }

  toJson() : any {
    return {
        cart: {
        id: this._id,
        items: this._items.map(i => i.toJson()),
        userId: this._userId
      }
    }
  }

  get id(): number{
    return this._id;
  }

  get userId(): string{
    return this._userId;
  }

  get items(): OrderItem[]{
    return this._items;
  }

  set items(x: OrderItem[]){
    this._items = x;
  }

  get totalPrice(): number{
    return this._totalPrice;
  }

  set totalPrice(x: number){
    this._totalPrice = x;
  }

  addItem(item: OrderItem){
    const existingProduct = this._items.find(i => i.id === item.id);
    if(existingProduct){
      existingProduct.quantity += item.quantity;
    } else{
      this._items.push(item);
    }

    this.recalculateTotalPrice();
  }

  removeItem(item: OrderItem){
    const existingProduct = this._items.find(i => i.id === item.id);
    if(existingProduct){
        this._items = this._items.filter(i => i.id !== item.id);
    }
    this.recalculateTotalPrice();
  }

  public recalculateTotalPrice(){
    this.totalPrice = this._items
      .reduce((sum, current) => sum + current.product.price * current.quantity, 0);
  }
}
