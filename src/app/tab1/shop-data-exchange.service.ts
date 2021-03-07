import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopDataExchangeService {
  private shops = [
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

  constructor() { }

  public getShops(){
    return this.shops;
  }

  public getShop(i: number){
    return this.shops[i];
  }
}