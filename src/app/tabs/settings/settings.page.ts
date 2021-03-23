import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(private authService: AuthService, private router: Router) {}

  logoutAndRedirect(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
