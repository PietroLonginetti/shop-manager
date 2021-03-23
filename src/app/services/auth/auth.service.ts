import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string = '';

  getLoggedIn(): Promise<boolean>{
    return this.storage.get('logged')
      .then((value) => { return value })
      .catch(() => { 
        console.error('No logged variable found in storage.')
        this.storage.set('logged', false);
      })
  }

  constructor(private storage: Storage) {}

  login() {
    // Sending credentials to Sintra backend and waiting for response
    this.storage.set('logged', true)
  }

  logout() {
    this.storage.set('logged', false)
  }
}
