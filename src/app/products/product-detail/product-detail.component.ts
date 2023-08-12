import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { User } from 'src/app/_models/user';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  quantity: number = 1;
  user!: User;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastr: ToastrService){
    }


  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user: User) => {
        this.user = user;
    });

    this.route.params.subscribe(p => {
      this.productService.getProduct$(p['id']).subscribe( res =>{
        this.product = res;
        console.log(this.product);
      })
    })
  }

  addToCart(quantity: number){
    this.cartService.addToCart(this.user.id, this.product.id, quantity).subscribe((res: any) => {
      console.log(res);
    });
    this.toastr.success('Product added to cart.');
  }
}
