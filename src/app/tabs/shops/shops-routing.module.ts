import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsPage } from './shops.page';
import { ComponentProvaComponent } from 'src/app/components/component-prova/component-prova.component'

const routes: Routes = [
  {
    path: '',
    component: ShopsPage
  },
  {
    path: 'shop/:id',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'shop-editor/:id',
    loadChildren: () => import('./shop-editor/shop-editor.module').then( m => m.ShopEditorPageModule)
  },
  {
    path: 'prova',
    component: ComponentProvaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsPageRoutingModule {}
