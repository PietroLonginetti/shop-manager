import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  shops = [
    {
      MBLink: '',
      name: 'The best shop',
      valutation: 4,
      address: 'Via Roma 2, 50125',
      hours: [
        {sunday: 'closed'},
        {monday: '8:00-12:00/14:00-17:00'},
        {tuesday: '8:00-12:00/14:00-17:00'},
        {wednesday: '8:00-12:00/14:00-17:00'},
        {thursday: '8:00-12:00/14:00-17:00'},
        {friday: '8:00-12:00/14:00-17:00'},
        {saturday: '8:00-12:00'},
      ]
    },
    {
      MBLink: '',
      name: 'The best of the best shops',
      valutation: 5,
      address: 'Via Fantechi 25, 50133',
      hours: [
        {sunday: 'closed'},
        {monday: '8:00-13:00'},
        {tuesday: '8:00-12:00/14:00-17:00'},
        {wednesday: '8:00-12:00/14:00-17:00'},
        {thursday: '8:00-12:00/14:00-17:00'},
        {friday: '8:00-12:00/14:00-17:00'},
        {saturday: '8:00-12:00'},
      ]

    }
  ]

  constructor() {}

  openShop(shopCard: any){
    shopCard = shopCard.parentNode;
    console.log(shopCard.childNodes[0].childNodes[0].textContent);
  }

}
