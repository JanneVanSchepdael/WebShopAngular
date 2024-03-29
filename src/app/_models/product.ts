export interface ProductJson{
  id: number;
  name: string;
  image: string;
  price: number;
}

export class Product {
  private _id!: number;
  constructor(
    private _name: string,
    private _image: string,
    private _price: number
  ) {}

  static fromJson(json: ProductJson): Product {
    const product = new Product(
      json.name,
      json.image,
      json.price
      );
    product._id = json.id;
    return product;
  }

  toJson() : ProductJson {
    return <ProductJson>{
      name: this._name,
      image: this._image,
      price: this._price
    }
  }

  get id(): number{
    return this._id;
  }

  get name():string{
    return this._name;
  }

  get image():string{
    return this._image;
  }

  get price(): number{
    return this._price;
  }
}
