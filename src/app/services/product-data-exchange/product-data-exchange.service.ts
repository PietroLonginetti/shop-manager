import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataExchangeService {
  private _products = [
    new BehaviorSubject({
      id: 0,
      name: "Average product",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      QRCode: "",
      price: 35.99,
      available: [{shop: 1, quantity: 4}],
      imgs: ["https://dummyimage.com/300x300", "https://dummyimage.com/300x300"]
    }),
    new BehaviorSubject({
      id: 1,
      name: "Good product",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      QRCode: "",
      price: 59.99,
      available: [{shop: 0, quantity: 2}, {shop: 1, quantity: 1}],
      imgs: ["https://dummyimage.com/300x300", "https://dummyimage.com/300x300"]
    }),
    new BehaviorSubject({
      id: 2,
      name: "Bad product",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      QRCode: "",
      price: 9.99,
      available: [{shop: 0, quantity: 2}],
      imgs: ["https://dummyimage.com/300x300", "https://dummyimage.com/300x300"]
    }),
    new BehaviorSubject({
      id: 3,
      name: "Best product",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      QRCode: "",
      price: 109.99,
      available: [{shop: 1, quantity: 3}],
      imgs: ["https://dummyimage.com/300x300", "https://dummyimage.com/300x300"]
    })
  ]

  get products(){
    return this._products;
  }
  constructor() { }
}
