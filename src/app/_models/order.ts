export interface OrderJson{
  orderDate: string;
  amountOfProducts: number;
  totalPrice: number;
}

export class Order {
  constructor(
    private _orderDate = new Date(),
    private _amountOfProducts: number,
    private _totalPrice: number
  ) {}

  static fromJson(json: OrderJson): Order {
    const order = new Order(
      new Date(json.orderDate),
      json.amountOfProducts,
      json.totalPrice
    )
    return order;
  }

  toJson(): OrderJson {
    return <OrderJson>{
      orderDate: this._orderDate.toString(),
      amountOfProducts: this._amountOfProducts,
      totalPrice: this._totalPrice
    }
  }

  get orderDate(): Date{
    return this._orderDate;
  }

  get amountOfProducts(): number{
    return this._amountOfProducts;
  }

  get totalPrice(): number{
    return this._totalPrice;
  }

}
