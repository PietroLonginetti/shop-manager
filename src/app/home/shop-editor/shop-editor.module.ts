import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopEditorPageRoutingModule } from './shop-editor-routing.module';

import { ShopEditorPage } from './shop-editor.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopEditorPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [ShopEditorPage]
})
export class ShopEditorPageModule {}
