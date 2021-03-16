import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopsPage } from './shops.page';

import { ShopsPageRoutingModule } from './shops-routing.module';
import { ShopsPopoverComponent } from './shops-popover/shops-popover.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShopsPageRoutingModule
  ],
  entryComponents: [ShopsPopoverComponent],
  declarations: [ShopsPage, ShopsPopoverComponent]
})
export class ShopsPageModule {}
