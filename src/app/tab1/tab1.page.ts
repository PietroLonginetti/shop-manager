import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HomePopoverComponent } from '../home-popover/home-popover.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  shops = [
    {
      MBLink: '',
      name: 'Good shop',
      img: 'https://placeimg.com/360/150/any',
      valutation: Array(3),
      address: 'Via Roma 2, 50125',
      hours: [
        {sun: [
        ]},
        {mon: [
          {from: '8:00', to: '12:00'}, 
          {from: '14:00', to: '17:00'}
        ]},
        {tue: [
          {from: '8:00', to: '12:00'}, 
          {from: '14:00', to: '17:00'}
        ]},
        {wed: [
          {from: '8:00', to: '12:00'}, 
          {from: '14:00', to: '17:00'}
        ]},
        {thu: [
          {from: '8:00', to: '12:00'}, 
          {from: '14:00', to: '17:00'}
        ]},
        {fri: [
          {from: '8:00', to: '12:00'}, 
          {from: '14:00', to: '17:00'}
        ]},
        {sat: [
          {from: '8:00', to: '12:00'}
        ]},
      ],
      open: true
    },
    {
      MBLink: '',
      name: 'The best shop',
      img: 'https://placeimg.com/360/150/any/any',
      valutation: Array(4),
      address: 'Via Fantechi 25, 50133',
      hours: [
        {sunday: 'closed'},
        {monday: '8:00-13:00'},
        {tuesday: '8:00-12:00/14:00-17:00'},
        {wednesday: '8:00-12:00/14:00-17:00'},
        {thursday: '8:00-12:00/14:00-17:00'},
        {friday: '8:00-12:00/14:00-17:00'},
        {saturday: '8:00-12:00'},
      ],
      open: false
    },
    {
      MBLink: '',
      name: 'The best of the best shops',
      img: 'https://placeimg.com/360/150',
      valutation: Array(5),
      address: 'Via Fantechi 25, 50133',
      hours: [
        {sunday: 'closed'},
        {monday: '8:00-13:00'},
        {tuesday: '8:00-12:00/14:00-17:00'},
        {wednesday: '8:00-12:00/14:00-17:00'},
        {thursday: '8:00-12:00/14:00-17:00'},
        {friday: '8:00-12:00/14:00-17:00'},
        {saturday: '8:00-12:00'},
      ],
      open: true
    }
  ]
  cards : any;

  constructor(public popoverController: PopoverController) {
  }
  ngOnInit(): void{
  }

  async presentPopover(ev: any){
    const popover = await this.popoverController.create({
      component: HomePopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  findShop(ev: any){
    if(!this.cards){
      this.cards = document.querySelectorAll('ion-card');
    }
    const text = ev.target.value.toLowerCase();
    requestAnimationFrame(()=>{
      this.cards.forEach(card => {
        const shouldShow = card.children[2].children[0].textContent.toLowerCase().indexOf(text) > -1;
        card.style.display = shouldShow ? 'block' : 'none';
      })
    })
  }
  isOpen(i: number){
    if(this.shops[i].open){
      return 'Now Open'
    } else{
      return 'Closed'
    }
  }
}
