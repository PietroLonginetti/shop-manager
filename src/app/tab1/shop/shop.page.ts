import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  data = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.activatedRoute.snapshot.paramMap.get('data');
  }

}
