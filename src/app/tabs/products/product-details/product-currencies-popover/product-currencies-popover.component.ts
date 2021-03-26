import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-product-currencies-popover',
  templateUrl: './product-currencies-popover.component.html',
  styleUrls: ['./product-currencies-popover.component.scss'],
})
export class ProductCurrenciesPopoverComponent implements OnInit {
  current: any;

  constructor(private navParams: NavParams, private popController: PopoverController) {
    this.current = navParams.get('currency');
  }

  ngOnInit() {}

  changeCurrency(){
    this.current = document.getElementsByTagName('ion-radio-group')[0].value;
    this.popController.dismiss(this.current);
  }
}
