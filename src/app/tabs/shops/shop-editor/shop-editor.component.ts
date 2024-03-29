import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { WeekSchedulerComponent } from 'src/app/tabs/shops/shop-editor/week-scheduler/week-scheduler.component';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';
import { trigger, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-shop-editor',
  templateUrl: './shop-editor.component.html',
  styleUrls: ['./shop-editor.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter',
      [
        style({height: 0, opacity: 0}),
        animate('0.2s ease-in', style({height: '1.4rem', opacity: 1}))
      ]),
      transition(':leave', 
        [
          style({ height: 24, opacity: 1 }),
          animate('0.2s ease-out', style({height: 0, opacity: 0}))
        ]
      )
    ])
  ]
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
    private alertController: AlertController, private toast: ToastController, private loadingController: LoadingController) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.shopService.getShopById(this.id).subscribe(shop => {
      this.shop = shop;
      this.modifications = JSON.parse(JSON.stringify(this.shop)); //Deep copy
    });

    this.formCtrl = new FormGroup({
      name: new FormControl(this.modifications.name,[Validators.required, Validators.minLength(3)]),
      street: new FormControl(this.modifications.street, Validators.minLength(5)),
      zip: new FormControl(this.modifications.zip,Validators.pattern('[0-9]{5}')),
      city: new FormControl(this.modifications.city, Validators.pattern('^[a-zA-Z]*$')),
      province: new FormControl(this.modifications.province),
      countryCode: new FormControl(this.modifications.countryCode, Validators.maxLength(2)),
      telephone: new FormControl(this.modifications.telephone, [Validators.pattern('^[+]?[0-9]+$'), Validators.minLength(8)]),
      email: new FormControl(this.modifications.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')),
      MBLink: new FormControl(this.modifications.MBLink)
    })
  }
  ngOnInit() {
  }

  // Alerts/Povers/Loaders
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 100000 //100 seconds
    });
    await loading.present();
  }
  async confirmAlert() {
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
                this.presentLoading();
                switch (this.mode) {
                  case 'create':
                    this.shopService.addShop(this.modifications)
                      .then((newId) => {
                        this.shop.id = newId;
                        this.loadingController.dismiss()
                        this.router.navigate(['/tabs/shops'])
                      })
                      .catch(err => {
                        console.error(err)
                      })
                    break;

                  case 'edit':
                    this.shopService.modifyShop(this.modifications)
                      .then(() => {
                        this.loadingController.dismiss()
                        this.router.navigate(['/tabs/shops/shop-details/' + this.id]);
                      })
                      .catch(err => {
                        console.error(err)
                      })
                    break;
                }
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
            text: 'Ok'
          }
        ]
      })
      await alert.present();
    }
  }
  async discardAlert() {
    switch (this.mode) {
      case 'create':
        this.shopService.abortCreation(this.id);
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
            this.presentLoading();
            this.shopService.deleteShop(parseInt(this.id))
              .then(() => {
                this.loadingController.dismiss()
                this.router.navigate(['/tabs/shops'])
              })
              .catch(err => {
                console.error(err)
              });
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
  saveInput(key) {
    if(!this.formCtrl.controls[key].errors)
      this.modifications[key] = this.formCtrl.get(key).value; //Saving the correct value
  }

  applyRedBorders(key: string): string{
    if(this.formCtrl.get(key).errors){
      return `border-color: rgb(235,68, 90); background-color: rgba(216, 154, 154, 0.29)`;
    } else {
      return `border-color: rgb(0,0,0,0); background-color: rgba(197, 197, 197, 0.384)`
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
