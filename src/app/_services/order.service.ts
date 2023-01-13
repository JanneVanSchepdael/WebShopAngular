import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/env/environment';
import { Cart } from '../_models/cart';
import { Order, OrderJson } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl + '/orders';
  private _reloadOrders$ = new BehaviorSubject<boolean>(true);


  constructor(private http: HttpClient) { }

  getOrders$(id: string): Observable<Order[]> {
    return this.http
    .get(`${this.baseUrl}/${id}`).pipe(
      tap(console.log),
      shareReplay(1),
      map(res => {
        return res.orders.map(Order.fromJson);
      })
    );
  }

  addNewOrder(cart: Cart) {
    return this.http
      .post<OrderJson>(`${environment.apiUrl}/`, cart.toJson())
      .pipe(catchError(this.handleError), map(Order.fromJson))
      .pipe(
        tap((ord: Order) => {
          this._reloadOrders$.next(true);
        })
      );
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
    return throwError(errorMessage);
  }
}
