import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-shop-popover',
  templateUrl: './shop-popover.component.html',
  styleUrls: ['./shop-popover.component.scss'],
})
export class ShopPopoverComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

}
