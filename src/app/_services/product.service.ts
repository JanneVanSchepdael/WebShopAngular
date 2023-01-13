import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/env/environment';
import { Product, ProductJson } from '../_models/product';
import { ProductParams } from '../_models/productParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl + '/products';


  constructor(private http: HttpClient) { }

  getProduct$(id: number): Observable<Product> {
    return this.http
      .get<ProductJson>(`${environment.apiUrl}/products/${id}`)
      .pipe(
        tap(console.log),
        map(val => Product.fromJson(val.product)));
  }

  getProducts$(productParams: ProductParams): Observable<Product[]> {
    let params = new HttpParams();

    if(productParams != null){
      params = params.append("searchTerm", productParams.searchTerm);
      params = params.append("amount", productParams.amount);
      params = params.append("minDaysOld", productParams.minDaysOld);
      params = params.append("maxDaysOld", productParams.maxDaysOld);
      params = params.append("orderBy", productParams.orderBy);
      params = params.append("page", productParams.page);
    }

    return this.http
    .get(`${this.baseUrl}/`, { observe: "response", params})
    .pipe(
      tap(console.log),
      shareReplay(1),
      map(res => {
        return res.body.products.map(Product.fromJson);
      })
    );
  }
}
