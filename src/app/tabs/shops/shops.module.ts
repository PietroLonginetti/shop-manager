import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopsPage } from './shops.page';

import { ShopsPageRoutingModule } from './shops-routing.module';

import { ShopsPopoverComponent } from './shops-popover/shops-popover.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component'
import { ShopEditorComponent } from './shop-editor/shop-editor.component';
import { WeekSchedulerComponent } from 'src/app/tabs/shops/shop-editor/week-scheduler/week-scheduler.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShopsPageRoutingModule
  ],
  entryComponents: [ShopsPopoverComponent],
  declarations: [
    ShopsPage, 
    ShopsPopoverComponent, 
    ShopDetailsComponent,
    ShopEditorComponent,
    WeekSchedulerComponent
  ]
})
export class ShopsPageModule {}
