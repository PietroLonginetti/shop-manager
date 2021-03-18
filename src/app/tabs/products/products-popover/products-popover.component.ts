import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-products-popover',
  templateUrl: './products-popover.component.html',
  styleUrls: ['./products-popover.component.scss'],
})
export class ProductsPopoverComponent implements OnInit {

  constructor(private popoverController: PopoverController, private alertController: AlertController) { }

  ngOnInit() {}

  async presentHelpAlert(){
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'What am I watching?',
      message: 'This section shows all the products that are sold in your stores. You can <strong>filter</strong> them by point of sale, or you can <strong>search</strong> them by keyword or <strong>QR code</strong> by clicking on the lens icon at the top. You can interact with the products by clicking on the items in the list and you can also <strong>add</strong> new ones by clicking on the plus icon',
      buttons: [{
        text: 'Ok',
        handler: () => this.popoverController.dismiss()
      }]
    })
    await alert.present();
  }

}
