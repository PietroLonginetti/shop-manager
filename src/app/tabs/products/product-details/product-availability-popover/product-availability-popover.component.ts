import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';

@Component({
  selector: 'app-product-availability-popover',
  templateUrl: './product-availability-popover.component.html',
  styleUrls: ['./product-availability-popover.component.scss'],
})
export class ProductAvailabilityPopoverComponent implements OnInit {
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

  getShopName(id: number): any{
    let shopName;
    this.shopService.getShopById(id).subscribe((shop) => {
      shopName = shop.name;
    })
    return shopName
  }

}
