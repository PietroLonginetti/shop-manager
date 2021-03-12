import { Component, OnInit } from '@angular/core';
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
  weekDays: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private exService: ShopDataExchangeService,
    private alertController: AlertController, private animationCtrl: AnimationController) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.exService.getShop(this.id).subscribe(shop => { this.shop = shop });
    this.modifications = JSON.parse(JSON.stringify(this.shop)); //Deep copy
  }
  ngOnInit() {
  }

  // Alerts 
  async confirmAlert() {
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
    document.getElementsByTagName('ion-content')[0].scrollToTop(100);
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
  async loadNewTurn(i: number) {
    if (this.emptyTurn) {
      await this.removeTurn(this.emptyTurn.day, this.emptyTurn.turn);
    }
    this.modified = true;
    this.modifications.hours[i].push({ from: '', to: '' });
    this.emptyTurn = {day: i, turn: this.modifications.hours[i].length-1}
  }
  checkChangeOnEmptyTurn(i: number, t: number){
    if(this.emptyTurn){
      if(this.emptyTurn.day === i && this.emptyTurn.turn == t){
        this.emptyTurn = null;
      }
    }
  }
  async removeTurn(i: number, t: number) {
    this.modified = true;
    await this.animationCtrl.create()
      .addElement(document.getElementById('day' + i).getElementsByTagName('ion-row')[this.modifications.hours[i].length - 1])
      .duration(300)
      .fromTo('opacity', '1', '0')
      .fromTo('height', '35.3px', '0')
      .easing('ease-out')
      .play()
    this.modifications.hours[i].splice(t, 1);
  }
}
