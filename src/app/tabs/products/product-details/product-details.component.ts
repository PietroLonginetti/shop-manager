import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ProductDataExchangeService } from 'src/app/services/product-data-exchange/product-data-exchange.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  product: any;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductDataExchangeService, 
    private popoverController: PopoverController, private router: Router) { 
      this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      try {
        this.productService.getProduct(this.id).subscribe(prod => {this.product = prod});
      } catch (error) {
        alert('This product does not exist.');
        this.router.navigate(['/tabs/products'])
      }
    }

  ngOnInit() {}

}
