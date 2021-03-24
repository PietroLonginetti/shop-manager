import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { PopoverController } from '@ionic/angular';
import { ProductDataExchangeService } from 'src/app/services/product-data-exchange/product-data-exchange.service';
import { ProductDetailsPopoverComponent } from './product-details-popover/product-details-popover.component';
import { ProductAvailabilityPopoverComponent } from './product-availability-popover/product-availability-popover.component';
import { ProductCurrenciesPopoverComponent } from './product-currencies-popover/product-currencies-popover.component';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  product: any;
  priceInEuro: number;
  priceToDisplay: number = 0;
  currency: string = 'USD';
  exchangeRates: Object;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductDataExchangeService,
    private popoverController: PopoverController, private router: Router, private http: HttpClient,
    private storage: Storage) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    try {
      this.productService.getProductById(this.id).subscribe(prod => { this.product = prod });
    } catch (error) {
      alert('This product does not exist.');
      this.router.navigate(['/tabs/products'])
    }
    this.priceInEuro = this.product.price;
  }

  ngOnInit() {
    this.storage.get('currency')
      .then(res => {
        if (res == null) {
          this.storage.set('currency', 'EUR')
            .then((res) => {
              this.currency = res;
            });
        } else {
          this.currency = res;
        }
      })
      .catch(() => {
        console.error('No currency variable found in storage')
        this.storage.set('currency', 'EUR');
        this.currency = 'EUR';
      })
      .finally(() => {
        //Fetch exchange Rates
        //Il seguente codice su android non sembra venir eseguito
        var response = this.http.get('http://data.fixer.io/api/latest?access_key=74f9a495e020b6d70e4fc3898fc49da7');
        response.subscribe((data) => {
          console.log(data)
          this.exchangeRates = data['rates'];
          this.priceToDisplay = this.priceInEuro * (this.exchangeRates[this.currency]);
          alert('bruh2')
        })
      });
  }

  calculateTotalPieces(): number {
    let tot = 0;
    for (let i = 0; i < this.product.available.length; i++) {
      tot += this.product.available[i].quantity;
    }
    return tot;
  }

  //Popovers
  async presentEllipsisPopover(ev) {
    const ellPopover = await this.popoverController.create({
      component: ProductDetailsPopoverComponent,
      event: ev
    })
    return await ellPopover.present();
  }
  async presentCurrenciesPopover() {
    const currenciesPopover = await this.popoverController.create({
      component: ProductCurrenciesPopoverComponent,
      componentProps: { currency: this.currency }
    })
    currenciesPopover.onDidDismiss().then((res) => {
      if (res.data) {
        let newCurrency = res.data;
        this.currency = newCurrency;
        let newPriceToDisplay = this.priceInEuro * (this.exchangeRates[newCurrency]);
        this.priceToDisplay = newPriceToDisplay;
        this.storage.set('currency', this.currency);
      }
    })
    return await currenciesPopover.present();

  }
  async presentSellingTable(ev) {
    const tablePopover = await this.popoverController.create({
      component: ProductAvailabilityPopoverComponent,
      componentProps: { prod: this.product },
      event: ev
    })
    return await tablePopover.present();
  }
}
