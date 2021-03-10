import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  modifications = null;
  weekDays: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private exService: ShopDataExchangeService,
    private alertController: AlertController) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shop = this.exService.getShop(this.id);
    this.modifications = JSON.parse(JSON.stringify(this.shop)); //Deep copy
  }
  ngOnInit() {
  }

  async confirmAlert() {
    if (this.modified) {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'Are you sure?',
        message: 'Do you really want apply those changes? This process cannot be undone.',
        buttons: [
          {
            text: 'Cancel',
            handler: () => { console.log('Modifications discarded'); }
          },
          {
            text: 'Yes',
            handler: () => {
              this.exService.setShop(this.modifications, this.id);
              this.router.navigate(['/tabs/tab1/shop/' + this.id]);
            }
          }
        ]
      })
      await alert.present();
    }
    else {
      this.router.navigate(['/tabs/tab1/shop/' + this.id]);
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
            text: 'Cancel',
            handler: () => { console.log('Returned to modification page'); }
          },
          {
            text: 'Yes',
            handler: () => {
              this.modifications = JSON.parse(JSON.stringify(this.shop)); //Undo all changes
              this.router.navigate(['/tabs/tab1/shop/' + this.id]);
            }
          }
        ]
      })
      await alert.present();
    }
    else{
      this.router.navigate(['/tabs/tab1/shop/' + this.id]);
    }
  }

  deletePhoto(imgId: number) {
    this.modified = true;
    this.modifications.imgs.splice(imgId, 1);
  }

  loadNewTurn(i: number) {
    this.modifications.hours[i].push({from: '', to: ''})
    console.log(this.modifications.hours)
  }
  removeTurn(day: Array<Object>, t:number){
    day.splice(t,1);
    console.log(this.modifications.hours)
  }

}
