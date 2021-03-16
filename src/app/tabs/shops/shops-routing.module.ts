import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsPage } from './shops.page';
import { ShopEditorComponent } from './shop-editor/shop-editor.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';

const routes: Routes = [
  {
    path: '',
    component: ShopsPage
  },
  {
    path: 'shop/:id',
    component: ShopDetailsComponent
  },
  {
    path: 'shop-editor/:id',
    component: ShopEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsPageRoutingModule {}
