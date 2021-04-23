import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _currency: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private storage: Storage) {
    this.storage.get('currency')
      .then(res => {
        if (!res) {
          this.storage.set('currency', 'EUR')
          this._currency.next('EUR');
        } else {
          this._currency.next(res);
        }
      })
      .catch(() => {
        console.error('No currency variable found in storage')
        this.storage.set('currency', 'EUR');
        this._currency.next('EUR');
      })
  }

  get currency(){
    return this._currency.asObservable();
  }
  public changeCurrency(value: string){
    this._currency.next(value);
    this.storage.set('currency', value);
  }
}
