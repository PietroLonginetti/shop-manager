import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { ShopDataExchangeService } from '../shop-data-exchange.service';
import { ShopPopoverComponent } from './shop-popover/shop-popover.component';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopPage implements OnInit {
  id = null;
  shop = null;
  weekDays: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, 
    private exService: ShopDataExchangeService, private popoverController: PopoverController,
    private callNumber: CallNumber) {
  } 
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shop = this.exService.getShop(this.id)
  }

  injectDivider(day: Array<Object>, turn: number): string{
    return turn == day.length-1? '': ',\xa0';
  }
  goBack(): void{
    this.navCtrl.back();
  }
  async presentPopover(ev: any){
    const popover = await this.popoverController.create({
      component: ShopPopoverComponent,
      componentProps: { music: this.shop.automations.music, heating: this.shop.automations.heating },
      event: ev,
      translucent: true 
    });
    popover.onDidDismiss().then(res => {
      this.shop.automations.music = false;
      this.shop.automations.heating = false;
      res.data.forEach(el => {
        this.shop.automations[el] = true;
      });
    })
    return await popover.present();
  }
  callShop(ev: MouseEvent){
    ev.stopPropagation();
    this.callNumber.callNumber(this.shop.telephone, true)
      .then(res => console.log('calling shop'))
      .catch(err => console.error('Error opening dialer'));
  }

}
