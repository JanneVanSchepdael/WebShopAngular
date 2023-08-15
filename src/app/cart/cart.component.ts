import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Cart } from '../_models/cart';
import { User } from '../_models/user';
import { CartService } from '../_services/cart.service';
import { OrderItem } from '../_models/orderItem';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart!: Cart;
  public _fetchCart$: Observable<Cart>;
  public user!: User;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.userService.currentUser$.subscribe((user: User) => {
      this.user = user;
    });

    this._fetchCart$ = this.cartService.getCart$(this.user.id);
    this._fetchCart$.subscribe(res => {
      this.cart = res;
      this.cart.recalculateTotalPrice();
    })

  }

  ngOnInit(): void {
    console.log(this.cart)
  }

  get cart$(): Observable<Cart> {
    return this._fetchCart$;
  }

  quantityChanged(item: OrderItem) {
    this.cart.recalculateTotalPrice();
    this.cartService.editCart(this.cart).subscribe(res => {
      console.log("Cart edited successfully.")
    })

  }

  confirmDelete(item: OrderItem) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.cart.removeItem(item);
      this.cartService.editCart(this.cart).subscribe(res => {
        this.toastr.success("Product removed from cart.")
      })
    }
  }
  
  order() {
    this.toastr.info("This function has not been implemented.")
  }
}
