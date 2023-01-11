import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../_models/cart';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public _fetchCart$: Observable<Cart>;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this._fetchCart$ = this.cartService.getCart$(1);
  }

  ngOnInit(): void { }

  get cart$(): Observable<Cart>{
    return this._fetchCart$;
  }
}
