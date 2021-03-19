import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';

@Component({
  selector: 'app-products-table-popover',
  templateUrl: './products-table-popover.component.html',
  styleUrls: ['./products-table-popover.component.scss'],
})
export class ProductsTablePopoverComponent implements OnInit {
  shops: any;
  product: any;

  constructor(private shopService: ShopDataExchangeService, private navParams: NavParams, private popoverController: PopoverController) {
    this.shops = this.shopService.shops;
    this.product = this.navParams.get('prod');
   }

  ngOnInit() {}

  async dismissPopover(){
    await this.popoverController.dismiss();
  }

  getShopData(id: number){
    for(let i = 0; i <this.shops.length; i++){
      if(this.shops[i].value.id === id){
        return this.shops[i].value;
      }
    }
  }

}
