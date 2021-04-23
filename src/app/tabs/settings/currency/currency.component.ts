import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  currency: string;

  constructor(private currencySerive: CurrencyService) {
    this.currencySerive.currency.subscribe(currency => this.currency = currency);
  }

  ngOnInit() {}

  changeCurrency(){
    let newCurrency = document.getElementsByTagName('ion-radio-group')[0].value;
    this.currencySerive.changeCurrency(newCurrency);
  }

}
