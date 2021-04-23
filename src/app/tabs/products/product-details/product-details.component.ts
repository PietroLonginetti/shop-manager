import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { ModalController, PopoverController } from '@ionic/angular';
import { ProductDataExchangeService } from 'src/app/services/product-data-exchange/product-data-exchange.service';
import { ProductDetailsPopoverComponent } from './product-details-popover/product-details-popover.component';
import { ProductAvailabilityModalComponent } from './product-availability-modal/product-availability-modal.component';
import { CurrencyService } from 'src/app/services/currency/currency.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  product: any;
  currency: string = 'EUR';
  priceToDisplay: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductDataExchangeService,
    private popoverController: PopoverController, private modalController: ModalController, private router: Router,
    private http: HttpClient, private storage: Storage, private currencyService: CurrencyService) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    try {
      this.productService.getProductById(this.id).subscribe(prod => { this.product = prod });
    } catch (error) {
      alert('This product does not exist.');
      this.router.navigate(['/tabs/products'])
    }
  }

  ngOnInit() {
    this.currencyService.currency.subscribe(currency => this.currency = currency);
    this.storage.get('exchangeRates')
      .then((res) => {
        if (!res) {
          //Fetch exchange Rates
          var response = this.http.get('http://data.fixer.io/api/latest?access_key=74f9a495e020b6d70e4fc3898fc49da7');
          response.subscribe((data) => {
            this.storage.set('exchangeRates', data['rates'])
              .then(() => {
                  this.priceToDisplay = this.product.price * data['rates'][this.currency];
              })
          })
        } else {
            this.priceToDisplay = this.product.price * res[this.currency];
        }
      })
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
  async presentSellingTable() {
    const tableModal = await this.modalController.create({
      component: ProductAvailabilityModalComponent,
      componentProps: { prod: this.product },
      swipeToClose: true,
      showBackdrop: true
    })
    return await tableModal.present();
  }
}
