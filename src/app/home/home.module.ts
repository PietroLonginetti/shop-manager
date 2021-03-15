import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePopoverComponent } from './home-popover/home-popover.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule
  ],
  entryComponents: [HomePopoverComponent],
  declarations: [HomePage, HomePopoverComponent]
})
export class HomePageModule {}
