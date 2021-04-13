import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductDataExchangeService } from 'src/app/services/product-data-exchange/product-data-exchange.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss'],
})
export class ProductEditorComponent implements OnInit {
  id = null;
  mode: string;
  modified: boolean = false;
  product = null;
  modifications = null;
  currency: string;
  priceToDisplay: number = 0;
  formCtrl: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private prodService: ProductDataExchangeService,
    private alertController: AlertController, private router: Router, private toast: ToastController,
    private storage: Storage) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.prodService.getProductById(this.id).subscribe((prod) => this.product = prod);
    this.modifications = JSON.parse(JSON.stringify(this.product)); //Deep copy
  }

  ngOnInit() {
    this.storage.get('currency')
      .then((curr) => {
        this.currency = curr;
        this.storage.get('exchangeRates')
          .then((res) => {
            this.priceToDisplay = this.modifications.price * res[this.currency];
          })
      })

    this.formCtrl = new FormGroup({
      name: new FormControl(`${this.modifications.name}`, Validators.required),
      id: new FormControl({ value: `${this.modifications.id}`, disabled: true }),
      price: new FormControl(this.priceToDisplay, Validators.pattern('[0-9]*(\.|,)[0-9]*')),
      description: new FormControl(`${this.modifications.description}`)
    })
  }

  // Alerts
  async confirmAlert() {
    if (this.formCtrl.valid) {
      if (this.modified) {
        const alert = await this.alertController.create({
          header: 'Confirm',
          message: 'Do you really want apply those changes?',
          buttons: [
            {
              text: 'Cancel'
            },
            {
              text: 'Yes',
              handler: () => {
                this.prodService.modifyProduct(this.modifications, this.id);
                this.router.navigate(['/tabs/products/product-details/' + this.id]);
              }
            }
          ]
        })
        await alert.present();
      }
      else {
        this.router.navigate(['/tabs/products/product-details/' + this.id]);
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
              for (let i = 0; i < forms.length; i++) {
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
        if (this.modified) {
          const alert = await this.alertController.create({
            header: 'Attention!',
            message: "If you proceed your data won't be saved.",
            buttons: [
              {
                text: 'Cancel'
              },
              {
                text: 'Ok',
                handler: () => {
                  this.prodService.deleteProduct(this.id);
                  this.router.navigate(['/tabs/products']);
                }
              }
            ]
          })
          await alert.present();
        } else {
          this.prodService.deleteProduct(this.id);
          this.router.navigate(['/tabs/products']);
        }
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
                  this.router.navigate(['/tabs/products/product-details/' + this.id]);
                }
              }
            ]
          })
          await alert.present();
        }
        else {
          this.router.navigate(['/tabs/products/product-details/' + this.id]);
        }
        break;
    }
  }
  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete this product? All data will be lost.',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.prodService.deleteProduct(this.id);
            this.router.navigate(['/tabs/products']);
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

  //Validators
  validateInput(form, key) {
    form = form.parentNode;
    if (this.formCtrl.controls[key].errors) {
      form.style.borderColor = 'rgb(235, 68, 90)';
    } else {
      form.style.borderColor = 'rgba(197, 197, 197, 0.384)';
      this.modifications[key] = this.formCtrl.get(key).value; //Saving the correct value
    }
  }

  //Methods
  async deletePhoto(imgId: number) {
    this.modified = true;
    this.modifications.imgs.splice(imgId, 1);
  }
  reorderImgs(ev) {
    this.modified = true;
    const imgToMove = this.modifications.imgs.splice(ev.detail.from, 1)[0];
    this.modifications.imgs.splice(ev.detail.to, 0, imgToMove);
    ev.detail.complete();
    this.presentToast();
  }
  updateDescription(ev) {
    this.modifications.description = ev.target.value;
  }

}
