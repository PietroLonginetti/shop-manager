import { Component } from '@angular/core';
import { ProductDataExchangeService } from '../services/product-data-exchange/product-data-exchange.service';

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss']
})
export class ProductsPage {
  products = [];

  constructor(private productService: ProductDataExchangeService) {
    this.products = this.productService.products;
    this.products.forEach(el => {
      console.log(el.value);
    })
  }


}
