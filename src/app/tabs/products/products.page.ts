import { Component } from '@angular/core';
import { ProductDataExchangeService } from 'src/app/services/product-data-exchange/product-data-exchange.service';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss']
})
export class ProductsPage {
  isSearchBarOpened: boolean = false;
  products = [];
  shops = [];
  filterByShop: number[];
  list: any;

  constructor(private productService: ProductDataExchangeService, private shopService: ShopDataExchangeService) {
    this.products = this.productService.products;
    this.shops = this.shopService.shops;
  }
  ngOnInit() {
    this.list = document.getElementById('prod-list');
  }

  calculateTotalPieces(prod): number {
    let tot = 0;
    for (let i = 0; i < prod.available.length; i++) {
      tot += prod.available[i].quantity;
    }
    return tot;
  }
  setFocus() {
    setTimeout(() => {
      let searchBar: any = document.getElementById('prod-searchbar');
      searchBar.setFocus();
    })
  }
  findProductByKeyWord() {
    let searchBar: any = document.getElementById('prod-searchbar');
    const text = searchBar.value.toLowerCase();
    let searchList = [...this.list.children];

    searchList.forEach(item => {
      let shouldShow = item.children[1].textContent.toLowerCase().indexOf(text) > -1;
      if (shouldShow) {
        item.classList.replace('inactive', 'active')
      } else {
        item.classList.replace('active', 'inactive')
      }
    })
  }
  filterProducts(ev) {
    let shopIds = ev.target.value;
    shopIds.forEach(shopId => {
      console.log(shopId);
      this.products.forEach(prod => {
        prod = prod.value;
        let isInShop = false;
        prod.available.forEach(link => {
          if(link.shop === shopId)
            isInShop = true;
        });
      })
    });

    let prodHTML = this.list.children;

  }

}
