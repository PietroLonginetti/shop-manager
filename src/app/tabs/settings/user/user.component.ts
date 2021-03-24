import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from 'src/app/services/user-credentials/user-credentials.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  pswVisible: boolean = false;

  constructor(public userService: UserCredentialsService) { }
  
  ngOnInit() {}

}
