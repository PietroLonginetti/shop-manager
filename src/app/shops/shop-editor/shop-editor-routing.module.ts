import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopEditorPage } from './shop-editor.page';

const routes: Routes = [
  {
    path: '',
    component: ShopEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopEditorPageRoutingModule {}
