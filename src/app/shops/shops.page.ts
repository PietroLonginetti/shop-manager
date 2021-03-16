import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ShopsPopoverComponent } from './shops-popover/shops-popover.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Storage } from '@ionic/storage';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shops',
  templateUrl: 'shops.page.html',
  styleUrls: ['shops.page.scss']
})
export class ShopsPage{
  listVisualization: boolean;
  searchBar : any;
  shops = []
  cards: any;
  list: any;

  constructor(public popoverController: PopoverController, private callNumber : CallNumber, 
    private storage: Storage, private shopService: ShopDataExchangeService, private router: Router) {
      this.shops = this.shopService.shops;
  }
  ngOnInit(): void {
    this.searchBar = document.getElementsByTagName('ion-searchbar')[0]
    this.cards = document.getElementById('shop-cards');
    this.list = document.getElementById('shop-list');

    this.storage.get('listVis')
    .then(res => {
      console.log('Visualizzazione a ' + (res?'lista':'carte'));
      this.listVisualization = res;
    })
    .catch(() => {
      console.error('No listVis variable found in storage')
      this.storage.set('listVis' , false);
      this.listVisualization = false;
    })
    .finally(() => this.updateVis());
  }

  private updateVis(): void {
    if (!this.listVisualization) {
      this.cards.classList.replace('inactive','active')
      this.list.classList.replace('active','inactive')
    } else if (this.listVisualization) {
      this.cards.classList.replace('active','inactive')
      this.list.classList.replace('inactive','active')
    }
    
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ShopsPopoverComponent,
      componentProps: { vis: this.listVisualization },
      event: ev,
      translucent: true,
    });
    popover.onDidDismiss().then(res => {
      if (res.data === undefined || res.data === null) { }
      else if (this.listVisualization!= res.data) {
        this.storage.set('listVis', res.data);
        this.listVisualization = res.data;
        this.searchBar.value = '';
        this.findShop();
        this.updateVis();
      }
    })
    return await popover.present();
  }
  addShop() {
    this.shopService.addShop();
    let lastElIndex = this.shopService.numOfShops-1;
    this.router.navigate(['/tabs/shops/shop-editor/' + lastElIndex]);
  }
  findShop() {
    let searchList: any;
    if (!this.listVisualization)
      searchList = [...this.cards.children];
    else if (this.listVisualization)
      searchList = [...this.list.children];
    const text = this.searchBar.value.toLowerCase();

    requestAnimationFrame(() => {
      searchList.forEach(item => {
        let shouldShow = item.children[1];
        if(!this.listVisualization){
          shouldShow = shouldShow.children[0];
        } shouldShow = shouldShow.textContent.toLowerCase().indexOf(text) > -1;
        if(shouldShow){
          item.classList.replace('inactive','active')
        } else {
          item.classList.replace('active','inactive')
        }
      })
    })
  }
  isOpen(i: number): boolean {
    let now = new Date();
    let day: number = now.getUTCDay();
    let hour: number = now.getUTCHours();
    let minutes: number = now.getUTCMinutes();

    let open: boolean = false;
    this.shops[i].value.hours[day].forEach(turn => {
      let fromHour:number, toHour:number, fromMinutes:number, toMinutes:number;
      [fromHour, fromMinutes] = turn.from.split(':').map(x => parseInt(x));
      [toHour, toMinutes] = turn.to.split(':').map(x => parseInt(x));
      if(hour > fromHour && hour < toHour){
        open = true;
      } else if((hour === fromHour && minutes >= fromMinutes) || (hour === toHour && minutes <= toMinutes)){
        open = true;
      } 
    })
    return open;
  }
  callShop(ev: MouseEvent, i: number){
    ev.preventDefault();
    ev.stopPropagation();
    this.callNumber.callNumber(this.shops[i].value.telephone, true)
      .then(res => console.log('calling shop ' + i))
      .catch(err => console.error('Error opening dialer'));
  }
  openCard(ev: MouseEvent, i: number){
    console.log('opening card ' + i);
  }
  getListAvatar(i: number): string{
    if (this.shops[i].value.imgs[0] == null){
      return '../assets/img/store.jpg'
    } else return this.shops[i].value.imgs[0]
  }
}
