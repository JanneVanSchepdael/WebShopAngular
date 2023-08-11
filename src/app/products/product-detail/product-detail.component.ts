import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService){
    }


  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.productService.getProduct$(p['id']).subscribe( res =>{
        this.product = res;
        console.log(this.product);
      })
    })
  }

  addToCart(){
    this.toastr.success('Product added to cart.');
    // add product to cart, with quantity value
  }
}
