import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCredentialsService {
  private _user = {
    avatar: '../assets/img/avatar.jpg',
    username: 'Luca Rossi',
    password: 'passwordpassword'
  }

  constructor() { }

  public getUserData(key: string): Object{
    return this._user[key];

  }
}

