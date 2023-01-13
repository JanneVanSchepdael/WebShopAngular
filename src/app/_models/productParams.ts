export interface ProductParamsJson{
  searchTerm: string;
  page: number;
  amount: number;
  minDaysOld: number;
  maxDaysOld: number;
  orderBy: string;
}

export class ProductParams {
  constructor(
    private _searchTerm = "",
    private _page = 1,
    private _amount = 6,
    private _minDaysOld = -1,
    private _maxDaysOld = 365,
    private _orderBy = "new"
  ) {}

  toJson(): ProductParamsJson {
    return <ProductParamsJson>{
      searchTerm: this._searchTerm,
      page: this._page,
      amount: this._amount,
      minDaysOld: this._minDaysOld,
      maxDaysOld: this._maxDaysOld,
      orderBy: this._orderBy
    }
  }

  get searchTerm(){
    return this._searchTerm;
  }

  get amount(){
    return this._amount;
  }

  get minDaysOld(){
    return this._minDaysOld;
  }

  get maxDaysOld(){
    return this._maxDaysOld;
  }

  get orderBy(){
    return this._orderBy;
  }

  get page(){
    return this._page;
  }
}
