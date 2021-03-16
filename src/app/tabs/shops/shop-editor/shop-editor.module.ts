import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopEditorPageRoutingModule } from './shop-editor-routing.module';

import { ShopEditorPage } from './shop-editor.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { WeekSchedulerComponent } from 'src/app/components/week-scheduler/week-scheduler.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShopEditorPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [ShopEditorPage, WeekSchedulerComponent]
})
export class ShopEditorPageModule {}
