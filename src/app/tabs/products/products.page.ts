import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProductDataExchangeService } from 'src/app/services/product-data-exchange/product-data-exchange.service';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';
import { ProductsPopoverComponent } from './products-popover/products-popover.component';

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss']
})
export class ProductsPage {
  isSearchBarOpened: boolean = false;
  products = [];
  fProducts = []
  shops = [];
  list: any;
  shopIds: number[] = []

  constructor(private productService: ProductDataExchangeService, private shopService: ShopDataExchangeService,
    private popoverController: PopoverController) {
    this.shops = this.shopService.shops;
    this.products = this.productService.products;
    this.fProducts = this.filterProducts()
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
  changeFilter(ev) {
    this.shopIds = ev.target.value;
    console.log(this.shopIds)
    this.fProducts = this.filterProducts();
  }
  filterProducts(): any[] {
    if(this.shopIds.length == 0){
      return this.products;
    }
    let fProducts = this.products.filter((prod)=>{
      let isInshops = false;
      this.shopIds.forEach(shopId => {
        for(let i = 0; i < prod.value.available.length; i++){
          if(prod.value.available[i].shop === shopId)
          isInshops = true
        }
      })
      return isInshops
    })
    return fProducts;
  }

  // Popovers
  async presentPopover(ev: any){
    const popover = await this.popoverController.create({
      component: ProductsPopoverComponent,
      event: ev,
      translucent: true,
    });
    return popover.present();
  }
}
