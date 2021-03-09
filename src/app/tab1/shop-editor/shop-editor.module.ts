import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopEditorPageRoutingModule } from './shop-editor-routing.module';

import { ShopEditorPage } from './shop-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopEditorPageRoutingModule
  ],
  declarations: [ShopEditorPage]
})
export class ShopEditorPageModule {}
