import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsPage } from './products.page';
import { ProductsPageRoutingModule } from './products-routing.module';

import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module'

import { ProductsPopoverComponent } from './products-popover/products-popover.component'
import { ProductDetailsPopoverComponent } from './product-details/product-details-popover/product-details-popover.component'
import { ProductAvailabilityModalComponent} from './product-details/product-availability-modal/product-availability-modal.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ProductEditorComponent } from './product-editor/product-editor.component'


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [
    ProductsPage,
    ProductsPopoverComponent,
    ProductDetailsPopoverComponent,
    ProductEditorComponent,
    ProductAvailabilityModalComponent,
    ProductDetailsComponent
  ]
})
export class ProductsPageModule {}
