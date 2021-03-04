import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HomePopoverComponent } from '../home-popover/home-popover.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  vis: string = 'cards';
  shops = [
    {
      MBLink: '',
      name: 'Good shop',
      img: 'https://placeimg.com/360/150/any',
      valutation: Array(3),
      address: 'Via Roma 2, 50125',
      hours: [
        {
          sun: [
          ]
        },
        {
          mon: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          tue: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          wed: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          thu: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          fri: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          sat: [
            { from: '8:00', to: '12:00' }
          ]
        },
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
        {
          sun: [
          ]
        },
        {
          mon: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          tue: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          wed: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          thu: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          fri: [
            { from: '8:00', to: '12:00' },
            { from: '14:00', to: '17:00' }
          ]
        },
        {
          sat: [
            { from: '8:00', to: '12:00' }
          ]
        },
      ],
      open: false
    }
  ]
  cards: any;
  list: any;

  constructor(public popoverController: PopoverController) {
  }
  ngOnInit(): void {
    this.cards = document.getElementById('shop-cards');
    this.list = document.getElementById('shop-list');
    this.updateVis();

    console.log(this.list);
    console.log(this.cards);
  }

  private updateVis(): void {
    if (this.vis === 'cards') {
      this.cards.style.display = 'initial';
      this.list.style.display = 'none';
    } else if (this.vis === 'list') {
      this.cards.style.display = 'none';
      this.list.style.display = 'initial';
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
        this.updateVis();
      }
    })
    return await popover.present();
  }
  addShop() {

  }
  findShop(ev: any) {
    let searchList: any;
    if (this.vis === 'cards')
      searchList = [...this.cards.children];
    else if (this.vis === 'list')
      searchList = [...this.list.children];
    const text = ev.target.value.toLowerCase();

    requestAnimationFrame(() => {
      searchList.forEach(item => {
        let shouldShow: boolean;
        switch (this.vis) {
          case "cards":
            shouldShow = item.children[2].children[0].textContent.toLowerCase().indexOf(text) > -1;
            break;
          case "list":
            shouldShow = item.children[1].textContent.toLowerCase().indexOf(text) > -1;
            break;
        }
        item.style.display = shouldShow ? 'block' : 'none';
      })
    })
  }
  isOpen(i: number) {
    if (this.shops[i].open) {
      return 'Now Open'
    } else {
      return 'Closed'
    }
  }
}
