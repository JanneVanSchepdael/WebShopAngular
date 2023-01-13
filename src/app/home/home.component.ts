import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { ProductParams } from '../_models/productParams';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  private _fetchProducts$: Observable<Product[]>

  constructor(
    private productService: ProductService,
  ){
    const params = new ProductParams("", 1, 6, -1, 30, "new");
    this._fetchProducts$ = this.productService.getProducts$(params);
  }


  ngOnInit(): void {}

  get products$(): Observable<Product[]> {
    return this._fetchProducts$;
  }

}
