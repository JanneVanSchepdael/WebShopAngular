import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Cart } from '../_models/cart';
import { Product } from '../_models/product';
import { User } from '../_models/user';
import { CartService } from '../_services/cart.service';
import { OrderService } from '../_services/order.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart!: Cart;
  public _fetchCart$: Observable<Cart>;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {
    const userJson = localStorage.getItem('user')
    const user: User = userJson !== null ? JSON.parse(userJson) : null;
    this._fetchCart$ = this.cartService.getCart$(user.id);
    this._fetchCart$.subscribe(res => {
      this.cart = res;
    })
  }

  ngOnInit(): void {
  }

  get cart$(): Observable<Cart>{
    return this._fetchCart$;
  }

  /*removeFromCart(product: Product){
    product.quantity = product.quantity - 1;

    let updateProduct = this.cart.products.find(i => i.id === product.id)!;
    let index = this.cart.products.indexOf(updateProduct);

    if(product.quantity > 0){
      this.cart.products[index] = product;
    } else{
      this.cart.products.splice(index, 1);
      console.log(this.cart);
    }

    this._fetchCart$ = this.cartService.editCart(this.cart);
  }

  addToCart(product: Product){
    product.quantity = product.quantity + 1;

    let updateProduct = this.cart.products.find(i => i.id === product.id)!;
    let index = this.cart.products.indexOf(updateProduct);

    this.cart.products[index] = product;
    this.cartService.editCart(this.cart);
  }*/

  order(){
    this.toastr.info("This function has not been implemented.")

  }
}
