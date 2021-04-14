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
    return Array(parseInt(this.shops[i].value.valutation));
  }
  decValutation(i: number) {
    return this.shops[i].value.valutation % 1 != 0;
  }

  constructor(private shopService: ShopDataExchangeService) { 
    this.shops = this.shopService.shops;
  }

  ngOnInit() {}

  getListAvatar(i: number): string {
    if (this.shops[i].value.imgs[0] == null) {
      return '../assets/img/shops/generic-shop.jpg'
    } else return this.shops[i].value.imgs[0]
  }

}
