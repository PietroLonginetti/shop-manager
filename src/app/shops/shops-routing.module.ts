import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsPage } from './shops.page';

const routes: Routes = [
  {
    path: '',
    component: ShopsPage,
  },
  {
    path: 'shop/:id',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'shop-editor/:id',
    loadChildren: () => import('./shop-editor/shop-editor.module').then( m => m.ShopEditorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsPageRoutingModule {}
