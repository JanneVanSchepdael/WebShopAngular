import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Cart, CartJson, CartResponse } from '../_models/cart';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/env/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  getCart$(id: string): Observable<Cart> {
    return this.http
      .get<CartJson>(`${environment.apiUrl}/carts/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError),
        map(val => Cart.fromJson(val.cart)));
  }

  editCart(updatedCart: Cart): Observable<Cart>{
    return this.http
      .put<CartResponse>(`${environment.apiUrl}/carts/`, updatedCart.toJson())
      .pipe(catchError(this.handleError), map(res => Cart.fromJson(res.cart)));
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      console.log(err);
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    return throwError(() => new Error(errorMessage));
  }
}
