import { Component, OnInit } from '@angular/core';
import { AlertController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {
  listVisualization:boolean = false;

  constructor(public popoverController: PopoverController,
    public alertController: AlertController, 
    public navParams: NavParams) { 
      this.listVisualization = this.navParams.get('vis');
    }

  ngOnInit() {}

  async presentVisAlert(){
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Visualization',
      message: 'Choose a page visualization:',
      inputs: [
        {
        name: 'cards',
        type: 'radio',
        label: 'Cards',
        value: 0,
        checked: !this.listVisualization
      },
      {
        name: 'list',
        type: 'radio',
        label: 'List',
        value: 1,
        checked: this.listVisualization
      }
    ],
    buttons: [{
      text: 'Ok',
      handler: (data: any) => {
        if(data === 1){
          this.popoverController.dismiss(true)
        } else if(data === 0){
          this.popoverController.dismiss(false)
        }
      }
    }]
    })
    await alert.present();
  }

  async presentInfAlert(){
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Informations',
      message: 'In this section a list of all the shops managed by you is presented. You can interact with them by clicking on the tabs or search for them in the search bar. You can also add a new store by clicking a "plus" form in the top right.',
      buttons: [{
        text: 'Ok',
        handler: () => this.popoverController.dismiss()
      }]
    })
    await alert.present();
  }
}
