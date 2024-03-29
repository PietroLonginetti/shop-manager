import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPage } from './settings.page';
import { SettingsPageRoutingModule } from './settings-routing.module';

import { LoginComponent } from '../login/login.component'
import { UserComponent } from './user/user.component'
import { CurrencyComponent } from './currency/currency.component' 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: SettingsPage }]),
    SettingsPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    SettingsPage,
    LoginComponent,
    CurrencyComponent,
    UserComponent
  ]
})
export class SettingsPageModule {}
