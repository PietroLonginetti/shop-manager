import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HomePopoverComponent } from './home-popover/home-popover.component';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  vis: string = 'cards';
  searchBar : any;
  shops = [
    {
      MBLink: '',
      name: 'Good shop',
      img: 'https://placeimg.com/360/150/any',
      valutation: Array(2),
      address: 'Via Roma 2, 50125',
      telephone: '+390555047041',
      hours: [
        [], //sun
        [ //mon
          { from: '8:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //tue
          { from: '8:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //wed
          { from: '8:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //thu
          { from: '8:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //fri
          { from: '8:00', to: '11:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //sat
          { from: '8:00', to: '12:00' }
        ]  
      ]
    },
    {
      MBLink: '',
      name: 'The best shop',
      img: 'https://placeimg.com/360/150',
      valutation: Array(5),
      address: 'Via Fantechi 25, 50133',
      telephone: '+390553298730',
      hours: [
        [], //sun
        [ //mon
          { from: '8:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //tue
          { from: '8:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //wed
          { from: '8:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //thu
          { from: '8:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //fri
          { from: '8:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //sat
          { from: '8:00', to: '12:00' }
        ]  
      ]
    }
  ]
  cards: any;
  list: any;

  constructor(public popoverController: PopoverController, private callNumber : CallNumber) {
  }
  ngOnInit(): void {
    this.searchBar = document.getElementsByTagName('ion-searchbar')[0]
    this.cards = document.getElementById('shop-cards');
    this.list = document.getElementById('shop-list');
    this.updateVis();
  }

  private updateVis(): void {
    if (this.vis === 'cards') {
      this.cards.style.display = 'block';
      this.list.style.display = 'none';
    } else if (this.vis === 'list') {
      this.cards.style.display = 'none';
      this.list.style.display = 'block';
    }
    
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: HomePopoverComponent,
      componentProps: { vis: this.vis },
      event: ev,
      translucent: true,
    });
    popover.onDidDismiss().then(res => {
      if (res.data === undefined || res.data === null) { }
      else if (this.vis != res.data) {
        this.vis = res.data;
        this.searchBar.value = '';
        this.findShop();
        this.updateVis();
      }
    })
    return await popover.present();
  }
  addShop() {
    console.log('Adding shop');
  }
  findShop() {
    let searchList: any;
    if (this.vis === 'cards')
      searchList = [...this.cards.children];
    else if (this.vis === 'list')
      searchList = [...this.list.children];
    const text = this.searchBar.value.toLowerCase();

    requestAnimationFrame(() => {
      searchList.forEach(item => {
        let shouldShow = item.children[1];
        if(this.vis === 'cards'){
          shouldShow = shouldShow.children[0];
        } shouldShow = shouldShow.textContent.toLowerCase().indexOf(text) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      })
    })
  }
  isOpen(i: number): boolean {
    let now = new Date();
    let day: number = now.getUTCDay();
    let hour: number = now.getUTCHours();
    let minutes: number = now.getUTCMinutes();

    let open: boolean = false;
    this.shops[i].hours[day].forEach(turn => {
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
    ev.stopPropagation();
    this.callNumber.callNumber(this.shops[i].telephone, true)
      .then(res => console.log('calling shop ' + i))
      .catch(err => console.error('Error opening dialer'));
  }
  openCard(ev: MouseEvent, i: number){
    console.log('opening card ' + i);
  }
}
