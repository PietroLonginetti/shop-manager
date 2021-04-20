import { Component, OnInit } from '@angular/core';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  shops: any;

  intValutation(i: number) {
    if(this.shops.data[i].value.valutation)
    return Array(parseInt(this.shops.data[i].value.valutation));
  }
  decValutation(i: number) {
    if(this.shops.data[i].value.valutation)
    return this.shops.data[i].value.valutation % 1 != 0;
  }

  constructor(private shopService: ShopDataExchangeService) { 
    this.shops = this.shopService.shops;
  }

  ngOnInit() {
    console.log('shop-list is initialized')
  }

  getListAvatar(i: number): string {
    if (this.shops.data[i].value.imgs[0] == null) {
      return '../assets/img/shops/generic-shop.jpg'
    } else return this.shops.data[i].value.imgs[0]
  }

}
