import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopDataExchangeService {
  private shops = [
    {
      MBLink: '',
      name: 'Good shop',
      imgs: ['https://placeimg.com/360/150', 'https://placeimg.com/360/150/any', 'https://placeimg.com/360/150/any/any'],
      valutation: Array(2),
      address: 'Via Roma 2, 50125',
      telephone: '+390555047041',
      hours: [
        [], //sun
        [ //mon
          { from: '08:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //tue
          { from: '08:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //wed
          { from: '08:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //thu
          { from: '08:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //fri
          { from: '08:00', to: '11:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //sat
          { from: '08:00', to: '12:00' }
        ]  
      ],
      automations: {music: false, heating: false}
    },
    {
      MBLink: '',
      name: 'The best shop',
      imgs: ['https://placeimg.com/360/150/any/any/any', 'https://placeimg.com/360/150/any/any', 'https://placeimg.com/360/150/any'],
      valutation: Array(5),
      address: 'Via Fantechi 25, 50133',
      telephone: '+390553298730',
      hours: [
        [], //sun
        [ //mon
          { from: '08:00', to: '12:00' },
          { from: '14:00', to: '17:00' },
          { from: '21:00', to: '24:00' }
        ], 
        [ //tue
          { from: '08:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //wed
          { from: '08:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //thu
          { from: '08:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //fri
          { from: '08:00', to: '12:00' },
          { from: '14:00', to: '17:00' }
        ], 
        [ //sat
          { from: '08:00', to: '12:00' }
        ]  
      ],
      automations: {music: false, heating: false}
    }
  ]

  constructor() { }

  public getShops(){
    return this.shops;
  }
  public setShop(shop: any, id: number){
    this.shops[id] = shop;
  }

  public getShop(i: number){
    return this.shops[i];
  }
}
