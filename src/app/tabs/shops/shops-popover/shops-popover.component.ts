import { Component, OnInit } from '@angular/core';
import { AlertController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-shops-popover',
  templateUrl: './shops-popover.component.html',
  styleUrls: ['./shops-popover.component.scss'],
})
export class ShopsPopoverComponent implements OnInit {
  visualization: string;

  constructor(private popoverController: PopoverController, public alertController: AlertController, 
    public navParams: NavParams) { 
      this.visualization = this.navParams.get('vis');
    }

  ngOnInit() {}

  async presentHelpAlert(){
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'What am I watching?',
      message: 'In this section a list of all the shops managed by you is presented. You can interact with them by clicking on the tabs or search for them in the search bar. You can also add a new store by clicking a "plus" form in the top right.',
      buttons: [{
        text: 'Ok',
        handler: () => this.popoverController.dismiss()
      }]
    })
    await alert.present();
  }
}
