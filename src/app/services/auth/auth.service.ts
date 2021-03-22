import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string = '';

  constructor() { }

  login(){
    // Sending credentials to Sintra backend and waiting for response
    this.isLoggedIn = true;
  }

  logout(){
    this.isLoggedIn = false;
  }
}
