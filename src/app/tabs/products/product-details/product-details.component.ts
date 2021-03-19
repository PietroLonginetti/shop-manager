import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ProductDataExchangeService } from 'src/app/services/product-data-exchange/product-data-exchange.service';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';
import { ProductDetailsPopoverComponent } from './product-details-popover/product-details-popover.component';
import { ProductsTablePopoverComponent } from './products-table-popover/products-table-popover.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  product: any;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductDataExchangeService, 
    private popoverController: PopoverController, private router: Router, private shopService: ShopDataExchangeService) { 
      this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      try {
        this.productService.getProduct(this.id).subscribe(prod => {this.product = prod});
      } catch (error) {
        alert('This product does not exist.');
        this.router.navigate(['/tabs/products'])
      }
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

  async presentSellingTable(ev){
    const tablePopover = await this.popoverController.create({
      component: ProductsTablePopoverComponent,
      componentProps: {prod: this.product},
      event: ev
    })
    return await tablePopover.present();
  }
}
