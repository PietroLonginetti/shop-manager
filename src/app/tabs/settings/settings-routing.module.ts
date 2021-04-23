import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CurrencyComponent } from './currency/currency.component';
import { SettingsPage } from './settings.page';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'currency',
    component: CurrencyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule {}
