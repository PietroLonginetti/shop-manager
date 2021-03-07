import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopPageRoutingModule } from './shop-routing.module';

import { ShopPage } from './shop.page';
import { ShopPopoverComponent } from './shop-popover/shop-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopPageRoutingModule
  ],
  entryComponents: [ShopPopoverComponent],
  declarations: [ShopPage, ShopPopoverComponent]
})
export class ShopPageModule {}
