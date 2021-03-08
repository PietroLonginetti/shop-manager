import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { ShopDataExchangeService } from '../shop-data-exchange.service';
import { ShopPopoverComponent } from './shop-popover/shop-popover.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopPage implements OnInit {
  id = null;
  shop = null;

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, 
    private exService: ShopDataExchangeService, private popoverController: PopoverController) {
  } 
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shop = this.exService.getShop(this.id)
  }

  goBack(){
    this.navCtrl.back();
  }
  async presentPopover(ev: any){
    const popover = await this.popoverController.create({
      component: ShopPopoverComponent,
      event: ev,
      translucent: true 
    });
    return await popover.present();
  }


}
