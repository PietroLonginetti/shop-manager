import { Component, OnInit } from '@angular/core';
import { AlertController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-shop-popover',
  templateUrl: './shop-popover.component.html',
  styleUrls: ['./shop-popover.component.scss'],
})
export class ShopPopoverComponent implements OnInit {
  music: boolean;
  heating: boolean;

  constructor(private popoverController: PopoverController, public alertController: AlertController, 
    public navParams: NavParams) {
      this.music = this.navParams.get('music');
      this.heating = this.navParams.get('heating');
     }

  ngOnInit() {}

  async presentAutoAlert(){
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Automation Services',
      message: '',
      inputs: [
        {
          name: 'music',
          type: 'checkbox',
          label: 'Music',
          checked: this.music,
          value: 'music'
        },
        {
          name: 'heating',
          type: 'checkbox',
          label: 'Heating',
          checked: this.heating,
          value: 'heating'
        }
      ],
      buttons: [{
        text: 'Ok',
        handler: (data: any) => {
          this.popoverController.dismiss(data);
        }
      }]
    })
    await alert.present();
  }

  async presentHelpAlert(){
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'What am I watching?',
      message: 'On this page all informations related to your shop are shown. You can change them by clicking on the pencil-shaped button at the top.',
      buttons: [{
        text: 'Ok',
        handler: () => this.popoverController.dismiss()
      }]
    })
    await alert.present();
  }

}
