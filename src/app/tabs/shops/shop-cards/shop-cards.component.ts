import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';

@Component({
  selector: 'app-shop-cards',
  templateUrl: './shop-cards.component.html',
  styleUrls: ['./shop-cards.component.scss'],
})
export class ShopCardsComponent implements OnInit {
  shops: any;

  intValutation(i: number) {
    if(this.shops.data[i].value.valutation)
    return Array(parseInt(this.shops.data[i].value.valutation));
  }
  decValutation(i: number) {
    if(this.shops.data[i].value.valutation)
    return this.shops.data[i].value.valutation % 1 != 0;
  }

  constructor(private callNumber: CallNumber, private shopService: ShopDataExchangeService) {
    this.shops = this.shopService.shops;
   }

  ngOnInit() {
  }

  isOpen(i: number): boolean {
    let now = new Date();
    let day: number = now.getUTCDay();
    let hour: number = now.getUTCHours();
    let minutes: number = now.getUTCMinutes();

    let open: boolean = false;
    this.shops.data[i].value.hours[day].forEach(turn => {
      let fromHour: number, toHour: number, fromMinutes: number, toMinutes: number;
      fromHour = parseInt(turn.from.slice(0, 2));
      toHour = parseInt(turn.to.slice(0, 2));
      fromMinutes = parseInt(turn.from.slice(3, 5));
      toMinutes = parseInt(turn.to.slice(3, 5));
      if (hour > fromHour && hour < toHour) {
        open = true;
      } else if ((hour === fromHour && minutes >= fromMinutes) || (hour === toHour && minutes <= toMinutes)) {
        open = true;
      }
    })
    return open;
  }


  callShop(ev: MouseEvent, i: number) {
    ev.preventDefault();
    ev.stopPropagation();
    this.callNumber.callNumber(this.shops[i].value.telephone, true)
      .then(res => console.log('calling shop ' + i))
      .catch(err => console.error('Error opening dialer'));
  }
}
