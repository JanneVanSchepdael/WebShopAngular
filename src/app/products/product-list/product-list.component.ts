import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ProductParams } from 'src/app/_models/productParams';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private _fetchProducts$: Observable<Product[]>

  constructor(
    private productService: ProductService,
  ){
    const params = new ProductParams("", 1, 9, -1, 365, "new");
    this._fetchProducts$ = this.productService.getProducts$(params);
  }


  ngOnInit(): void {}

  get products$(): Observable<Product[]> {
    return this._fetchProducts$;
  }
}
