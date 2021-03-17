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
  visualization: string;
  isSearchBarOpened: boolean = false;
  searchBar : any;
  shops = []
  cards: any;
  list: any;

  constructor(public popoverController: PopoverController, private callNumber : CallNumber, 
    private storage: Storage, private shopService: ShopDataExchangeService, private router: Router) {
      this.shops = this.shopService.shops;
  }
  ngOnInit(): void {
    this.cards = document.getElementById('shop-cards');
    this.list = document.getElementById('shop-list');

    this.storage.get('visualization')
    .then(res => {
      if(res == null){
        this.storage.set('visualization' , 'cards')
          .then((res) => {
            console.log('Visualizzazione a ' + res);
            this.visualization = res;
          });
      } else {
        console.log('Visualizzazione a ' + res);
        this.visualization = res;
      }
    })
    .catch(() => {
      console.error('No visualization variable found in storage')
      this.storage.set('visualization' , 'cards');
      this.visualization = 'cards';
    })
    .finally(() => this.updateVis());
  }

  private updateVis() {
    if (this.visualization === 'cards') {
      this.cards.classList.replace('inactive','active')
      this.list.classList.replace('active','inactive')
    } else if (this.visualization === 'list') {
      this.cards.classList.replace('active','inactive')
      this.list.classList.replace('inactive','active')
    }
    
  }
  toggleVis(ev){
    this.storage.set('visualization', ev.target.value);
    this.visualization = ev.target.value;
    this.updateVis();
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ShopsPopoverComponent,
      componentProps: { vis: this.visualization },
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
  addShop() {
    this.shopService.addShop();
    let lastElIndex = this.shopService.numOfShops-1;
    this.router.navigate(['/tabs/shops/shop-editor/' + lastElIndex + '/create']);
  }
  setFocus(){
    setTimeout(()=>{
      this.searchBar = document.getElementById('shop-searchbar');
      this.searchBar.setFocus();
    })
  }
  findShop() {
    this.searchBar = document.getElementById('shop-searchbar');
    let searchList: any;
    if (this.visualization === 'cards')
      searchList = [...this.cards.children];
    else if (this.visualization === 'list')
      searchList = [...this.list.children];
    const text = this.searchBar.value.toLowerCase();

    requestAnimationFrame(() => {
      searchList.forEach(item => {
        let shouldShow = item.children[1];
        if(this.visualization === 'cards'){
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
      fromHour = parseInt(turn.from.slice(turn.from.indexOf('T') + 1, turn.from.indexOf(':')));
      toHour = parseInt(turn.to.slice(turn.from.indexOf('T') + 1, turn.to.indexOf(':')));
      fromMinutes = parseInt(turn.from.slice(turn.from.indexOf(':') + 1, turn.from.indexOf(':') + 3));
      toMinutes = parseInt(turn.to.slice(turn.from.indexOf(':') + 1, turn.to.indexOf(':') + 3));
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
