import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { ShopDataExchangeService } from '../shop-data-exchange.service';

@Component({
  selector: 'app-shop-editor',
  templateUrl: './shop-editor.page.html',
  styleUrls: ['./shop-editor.page.scss'],
})
export class ShopEditorPage implements OnInit {
  id = null;
  shop = null;
  modified: boolean = false;
  emptyTurn: any = null;
  modifications = null;
  weekDays: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];  //TODO: da rimuovere
  formCtrl: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private exService: ShopDataExchangeService,
    private alertController: AlertController, private animationCtrl: AnimationController) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.exService.getShop(this.id).subscribe(shop => { this.shop = shop });
    this.modifications = JSON.parse(JSON.stringify(this.shop)); //Deep copy
  }
  ngOnInit() {
    this.formCtrl = new FormGroup({
      name: new FormControl(`${this.modifications.name}`, [Validators.required, Validators.minLength(2)]),
      address: new FormControl(`${this.modifications.address}`, Validators.minLength(1)),
      telephone: new FormControl(`${this.modifications.telephone}`, [Validators.pattern('^[+][0-9]+$'), Validators.minLength(8)]),
      MBLink: new FormControl(`${this.modifications.MBLink}`, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'))
    })
  }

  // Alerts 
  async confirmAlert() {
    // if (this.emptyTurn) {
    //   await this.removeTurn(this.emptyTurn.day, this.emptyTurn.turn);
    // }
    if (this.modified) {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'Are you sure?',
        message: 'Do you really want apply those changes? This process cannot be undone.',
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Yes',
            handler: () => {
              this.exService.modifyShop(this.modifications, this.id);
              this.router.navigate(['/tabs/home/shop/' + this.id]);
            }
          }
        ]
      })
      await alert.present();
    }
    else {
      this.router.navigate(['/tabs/home/shop/' + this.id]);
    }
  }
  async discardAlert() {
    if (this.modified) {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'Are you sure?',
        message: 'Do you really want discard those changes? All your changes will be lost.',
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Yes',
            handler: () => {
              this.router.navigate(['/tabs/home/shop/' + this.id]);
            }
          }
        ]
      })
      await alert.present();
    }
    else {
      this.router.navigate(['/tabs/home/shop/' + this.id]);
    }
  }
  async deleteAlert() {
    await document.getElementsByTagName('ion-content')[0].scrollToTop(100);
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Are you sure?',
      message: 'Do you really want delete this shop? All your data will be lost.',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.exService.deleteShop(this.id);
            this.router.navigate(['/tabs/home']);
          }
        }
      ]
    })
    await alert.present();
  }

  // Validators
  validateInput(form, key) {
    form = form.parentNode;
    console.log(this.formCtrl.controls[key].errors)
    if (this.formCtrl.controls[key].errors) {
      form.style.borderColor = 'rgb(235, 68, 90)';
      form.style.backgroundColor = 'rgb(235, 68, 90, .05)';
      console.error(this.formCtrl.controls[key].errors);
    } else {
      form.style.borderColor = 'rgb(197, 197, 197)';
      form.style.backgroundColor = 'initial';
      this.modifications[key] = this.formCtrl.get(key).value;
    }
  }
  

  // Methods
  async deletePhoto(imgId: number) {
    this.modified = true;
    await this.animationCtrl.create()
      .addElement(document.getElementById('slide' + imgId))
      .duration(400)
      .fromTo('opacity', '1', '0')
      .play()
    this.modifications.imgs.splice(imgId, 1);
  }
  
  checkChangeOnEmptyTurn(i: number, t: number) {
    if (this.emptyTurn) {
      if (this.emptyTurn.day === i && this.emptyTurn.turn == t) {
        this.emptyTurn = null;
      }
    }
  }

  registerError(dayIndex: number){
    console.log('Nel giorno ' + dayIndex + 'è stato rilevato un errore')
    // TODO: registra errore
  }
}
