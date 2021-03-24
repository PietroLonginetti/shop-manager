import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'product-editor/:id/:mode',
    // id: shop identifier, 
    // mode: mode of shop data editing. Accepted values: ['create', 'edit']
    component: ProductEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsPageRoutingModule {}
