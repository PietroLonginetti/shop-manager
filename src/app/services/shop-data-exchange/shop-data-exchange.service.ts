import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopDataExchangeService {
  private _shops = [
    new BehaviorSubject<Object>({
      id: 1,
      MBLink: '',
      name: 'Good shop',
      imgs: ['https://placeimg.com/360/150', 'https://placeimg.com/360/150/any'],
      valutation: Array(2),
      address: 'Via Roma 2, 50125',
      telephone: '+390555047041',
      hours: [
        [], //sun
        [ //mon
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //tue
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //wed
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //thu
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //fri
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //sat
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' }
        ]
      ],
      automations: { music: false, heating: false }
    }),
    new BehaviorSubject<Object>({
      id: 2,
      MBLink: '',
      name: 'The best shop',
      imgs: ['https://placeimg.com/360/150/any/any/any', 'https://placeimg.com/360/150/any/any'],
      valutation: Array(5),
      address: 'Via Fantechi 25, 50133',
      telephone: '+390553298730',
      hours: [
        [], //sun
        [ //mon
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //tue
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //wed
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //thu
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //fri
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
          { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
        ],
        [ //sat
          { from: '2021-03-10T08:00', to: '2021-03-10T12:00' }
        ]
      ],
      automations: { music: false, heating: false }
    })
  ]
  constructor() { }

  public addShop(){
    this._shops.push(new BehaviorSubject<Object>({
      id: this.shops.length * 2, //Si vuole simulare una generazione pseudocasuale degli id NON basata su valori posizionali
      MBLink: '',
      name: '',
      imgs: [],
      valutation: Array(0),
      address: '',
      telephone: '',
      hours: [
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      automations: { music: false, heating: false }
    }))
  }
  public modifyShop(modifications: Object, id: string) { 
    for(let i = 0; i < this._shops.length; i ++){
      if (this._shops[i].value['id'] === parseInt(id)){
        this._shops[i].next(modifications);
        return;
      }
    }
  }
  public deleteShop(id: string){
    for(let i = 0; i < this._shops.length; i ++){
      if (this._shops[i].value['id'] === parseInt(id)){
        this._shops.splice(i,1);
        return;
      }
    }
  }
  get numOfShops() {
    return this._shops.length;
  }
  public getShopByPosition(i: number) {
    return this._shops[i].asObservable();
  }
  public getShopById(id){
    id = parseInt(id);
    let target = null
    this._shops.forEach((shop) => {
      if (shop.value['id'] === id){
        target = shop;
      }
    })
    return target.asObservable();
  }
  get shops(){
    return this._shops
  }
}
