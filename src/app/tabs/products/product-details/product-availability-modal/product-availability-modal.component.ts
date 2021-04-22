import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';

@Component({
  selector: 'app-product-availability-modal',
  templateUrl: './product-availability-modal.component.html',
  styleUrls: ['./product-availability-modal.component.scss'],
})
export class ProductAvailabilityModalComponent implements OnInit {
  shops: any;

  @Input() prod:any;

  constructor(private shopService: ShopDataExchangeService, private modalController: ModalController) {
    this.shops = this.shopService.shops;
   }

  ngOnInit() {}

  async dismissModal(){
    await this.modalController.dismiss({
      'dismissed': true
    });
  }

  getShopName(id: number): any{
    let shopName;
    this.shopService.getShopById(id).subscribe((shop) => {
      shopName = shop.name;
    })
    return shopName;
  }

}
