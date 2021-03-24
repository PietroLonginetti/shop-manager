import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataExchangeService {
  private _products = [
    new BehaviorSubject<Object>({
      id: 0,
      name: "Average product",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price: 35.99,
      available: [{shop: 2, quantity: 4}],
      imgs: ["https://picsum.photos/300", "https://picsum.photos/200"]
    }),
    new BehaviorSubject<Object>({
      id: 1,
      name: "Good product",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price: 59.99,
      available: [{shop: 1, quantity: 2}, {shop: 2, quantity: 1}],
      imgs: ["https://picsum.photos/200", "https://picsum.photos/300"]
    }),
    new BehaviorSubject<Object>({
      id: 2,
      name: "Bad product",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price: 9.99,
      available: [{shop: 1, quantity: 2}],
      imgs: ["https://picsum.photos/300", "https://picsum.photos/200"]
    }),
    new BehaviorSubject<Object>({
      id: 3,
      name: "Best product",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price: 109.99,
      available: [{shop: 2, quantity: 3}],
      imgs: ["https://picsum.photos/200", "https://picsum.photos/300"]
    })
  ]

  get numOfProducts(){
    return this._products.length;
  }
  public addProduct(){
    this._products.push(new BehaviorSubject<Object>({
      id: this._products.length *2, //Simulazione di una generazione pseudocasuale degli id dei prodotti
      name: '',
      description: '',
      price: 0,
      available: [],
      imgs: []
    }))
  }
  public deleteProduct(id: string){
    for(let i = 0; i < this._products.length; i ++){
      if (this._products[i].value['id'] === parseInt(id)){
        this._products.splice(i,1);
        return;
      }
    }
  }
  public modifyProduct(modifications: Object, id: string) { 
    for(let i = 0; i < this._products.length; i ++){
      if (this._products[i].value['id'] === parseInt(id)){
        this._products[i].next(modifications);
        return;
      }
    }
  }
  public getProductByPosition(i: number) {
    return this._products[i].asObservable();
  }
  public getProductById(id){
    id = parseInt(id);
    let target = null
    this._products.forEach((prod) => {
      if (prod.value['id'] === id){
        target = prod;
      }
    })
    return target.asObservable();
  }
  get products(){
    return this._products;
  }
  constructor() { }
}
