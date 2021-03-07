import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ShopDataExchangeService } from '../shop-data-exchange.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopPage implements OnInit {
  id = null;
  shop = null;

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, private exService: ShopDataExchangeService) {
  } 
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shop = this.exService.getShop(this.id)
  }

  goBack(){
    this.navCtrl.back();
  }
  presentPopover(ev){

  }

}
