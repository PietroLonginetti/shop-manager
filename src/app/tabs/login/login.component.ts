import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentialsForm: FormGroup

  constructor(private authService: AuthService, private router: Router, private alertCtrl: AlertController) {
    this.credentialsForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() { }

  updateForm(ev, key) {
    ev.target.getInputElement().then((data) => {
      this.credentialsForm.controls[key].setValue(data.value)
    })
  }

  async submitCredentials() {
    Object.keys(this.credentialsForm.controls).forEach(key => {
      console.log(this.credentialsForm.get(key).errors);
    });
    console.log(this.credentialsForm.controls)
    if (!this.credentialsForm.valid) {
      const alert = await this.alertCtrl.create({
        message: 'Some data seem incomplete.',
        buttons: ['Ok']
      });
      await alert.present();
    }
    else {
      this.authService.login();
      this.router.navigate([this.authService.redirectUrl]);
    }
  }
}
