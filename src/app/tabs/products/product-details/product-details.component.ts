import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ProductDataExchangeService } from 'src/app/services/product-data-exchange/product-data-exchange.service';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';
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
  price: number;
  currency = 'USD';

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductDataExchangeService, 
    private popoverController: PopoverController, private router: Router, private shopService: ShopDataExchangeService) { 
      this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      try {
        this.productService.getProduct(this.id).subscribe(prod => {this.product = prod});
      } catch (error) {
        alert('This product does not exist.');
        this.router.navigate(['/tabs/products'])
      }
      this.price = this.product.price;
    }

  ngOnInit() {}

  calculateTotalPieces(): number {
    let tot = 0;
    for (let i = 0; i < this.product.available.length; i++) {
      tot += this.product.available[i].quantity;
    }
    return tot;
  }

  //Popovers
  async presentEllipsisPopover(ev){
    const ellPopover = await this.popoverController.create({
      component: ProductDetailsPopoverComponent,
      event: ev
    })
    return await ellPopover.present();
  }
  async presentCurrenciesPopover(ev){
    const currenciesPopover = await this.popoverController.create({
      component: ProductCurrenciesPopoverComponent,
      backdropDismiss: false,
      componentProps: {currency: this.currency},
      event: ev
    })
    currenciesPopover.onDidDismiss().then((res) => {
      let oldCurrency = this.currency;
      let oldValue = this.price;
      let newCurrency = res.data;
      let newValue = this.price / 8; // TODO: Fake value conversion

      this.price = newValue;
      this.currency = newCurrency;
    })
    return await currenciesPopover.present();

  }
  async presentSellingTable(ev){
    const tablePopover = await this.popoverController.create({
      component: ProductAvailabilityPopoverComponent,
      componentProps: {prod: this.product},
      event: ev
    })
    return await tablePopover.present();
  }
}
