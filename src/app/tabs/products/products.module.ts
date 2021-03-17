import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsPage } from './products.page';
import { ProductsPageRoutingModule } from './products-routing.module';

import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProductsPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
