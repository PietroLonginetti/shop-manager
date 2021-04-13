import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { WeekSchedulerComponent } from 'src/app/tabs/shops/shop-editor/week-scheduler/week-scheduler.component';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';

@Component({
  selector: 'app-shop-editor',
  templateUrl: './shop-editor.component.html',
  styleUrls: ['./shop-editor.component.scss'],
})
export class ShopEditorComponent implements OnInit {
  @HostListener('document:ionBackButton', ['$event'])
  async overrideHardwareBackAction($event: any) {
    await this.discardAlert();
  }
  @ViewChild(WeekSchedulerComponent) ws: WeekSchedulerComponent;
  shop = null;
  id = null;
  mode = null;
  modified: boolean = false;
  emptyTurn: any = null;
  modifications = null;
  formCtrl: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private shopService: ShopDataExchangeService,
    private alertController: AlertController, private toast: ToastController) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.shopService.getShopById(this.id).subscribe(shop => { this.shop = shop });
    this.modifications = JSON.parse(JSON.stringify(this.shop)); //Deep copy

    this.formCtrl = new FormGroup({
      name: new FormControl(`${this.modifications.name}`, [Validators.required, Validators.minLength(2)]),
      id: new FormControl({value: `${this.modifications.id}`, disabled: true}),
      street: new FormControl(`${this.modifications.street}`, Validators.minLength(3)),
      zip: new FormControl(`${this.modifications.zip}`, Validators.pattern('[0-9]{5}')),
      city: new FormControl(`${this.modifications.city}`, Validators.pattern('^[a-zA-Z]*$')),
      province: new FormControl(`${this.modifications.province}`, Validators.maxLength(2)),
      countryCode: new FormControl(`${this.modifications.countryCode}`, Validators.maxLength(2)),
      telephone: new FormControl(`${this.modifications.telephone}`, [Validators.pattern('^[+]?[0-9]+$'), Validators.minLength(8)]),
      MBLink: new FormControl(`${this.modifications.MBLink}`)
    })
  }
  ngOnInit() {
  }

  // Alerts 
  async confirmAlert() {
    if (this.ws.emptyTurn) {
      await this.ws.removeEmptyTurn()
    }
    if (this.formCtrl.valid && this.ws.validWeek()) {
      if (this.modified) {
        const alert = await this.alertController.create({
          backdropDismiss: false,
          header: 'Confirm',
          message: 'Do you really want apply those changes?',
          buttons: [
            {
              text: 'Cancel'
            },
            {
              text: 'Yes',
              handler: () => {
                this.shopService.modifyShop(this.modifications, this.id);
                this.router.navigate(['/tabs/shops/shop-details/' + this.id]);
              }
            }
          ]
        })
        await alert.present();
      }
      else {
        this.router.navigate(['/tabs/shops/shop-details/' + this.id]);
      }
    }
    else {
      const alert = await this.alertController.create({
        header: 'Invalid Data!',
        message: 'Some data seem incorrect. Please, verify your input data before proceeding.',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              let forms = document.getElementsByClassName('active-form')
              for(let i = 0; i < forms.length; i++){
                this.validateInput(forms[i].childNodes[0].childNodes[0], Object.keys(this.formCtrl.value)[i])
              }
            }
          }
        ]
      })
      await alert.present();
    }
  }
  async discardAlert() {
    switch (this.mode) {
      case 'create':
        this.shopService.deleteShop(this.id);
        this.router.navigate(['/tabs/shops']);
        break;

      case 'edit':
        if (this.modified) {
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Attention!',
            message: 'Do you really want discard those changes? All your changes will be lost.',
            buttons: [
              {
                text: 'Cancel'
              },
              {
                text: 'Yes',
                handler: () => {
                  this.router.navigate(['/tabs/shops/shop-details/' + this.id]);
                }
              }
            ]
          })
          await alert.present();
        }
        else {
          this.router.navigate(['/tabs/shops/shop-details/' + this.id]);
        }
        break;
    }
  }
  async deleteAlert() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Are you sure?',
      message: 'Do you really want to delete this shop? All your data will be lost.',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.shopService.deleteShop(this.id);
            this.router.navigate(['/tabs/shops']);
          }
        }
      ]
    })
    await alert.present();
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: "Your images have been reordered.",
      duration: 1500
    });
    toast.present()
  }

  // Validators
  validateInput(form, key) {
    form = form.parentNode;
    if (this.formCtrl.controls[key].errors) {
      form.style.borderColor = 'rgb(235, 68, 90)';
    } else {
      form.style.borderColor = 'rgb(0,0,0,0)';
      this.modifications[key] = this.formCtrl.get(key).value; //Saving the correct value
    }
  }

  // Methods
  reorderImgs(ev) {
    this.modified = true;
    const imgToMove = this.modifications.imgs.splice(ev.detail.from, 1)[0];
    this.modifications.imgs.splice(ev.detail.to, 0, imgToMove);
    ev.detail.complete();
    this.presentToast();
  }
}
