import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ShopsPopoverComponent } from './shops-popover/shops-popover.component';
import { Storage } from '@ionic/storage';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';
import { Router } from '@angular/router';
import { ShopCardsComponent } from './shop-cards/shop-cards.component';
import { ShopListComponent } from './shop-list/shop-list.component';

@Component({
  selector: 'app-shops',
  templateUrl: 'shops.page.html',
  styleUrls: ['shops.page.scss']
})
export class ShopsPage {
  @ViewChild("container", { read: ViewContainerRef }) container;
  visualization: string;
  isSearchBarOpened: boolean = false;
  searchBar: any;
  shops: any;

  constructor(private popoverController: PopoverController, private resolver: ComponentFactoryResolver,
    private storage: Storage, private shopService: ShopDataExchangeService, private router: Router) {
    this.shops = this.shopService.shops;
  }
  ngAfterViewInit(){  
    this.loadShops()
  }

  loadShops(){
    this.storage.get('visualization')
    .then(res => {
      if (res == null) {
        this.storage.set('visualization', 'cards')
          .then((res) => {
            this.visualization = res;
          });
      } else {
        this.visualization = res;
      }
    })
    .catch(() => {
      console.error('No visualization variable found in storage')
      this.storage.set('visualization', 'cards');
      this.visualization = 'cards';
    })
    .finally(() => this.updateVis());
  }

  private updateVis() {
    this.container.clear();
    if (this.visualization === 'cards') {
      const factory = this.resolver.resolveComponentFactory(ShopCardsComponent);
      this.container.createComponent(factory);
    } else if (this.visualization === 'list') {
      const factory = this.resolver.resolveComponentFactory(ShopListComponent);
      this.container.createComponent(factory);
    }

  }
  toggleVis(ev) {
    this.storage.set('visualization', ev.target.value).then(() => {
      this.visualization = ev.target.value;
      this.updateVis()
    })
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ShopsPopoverComponent,
      event: ev,
      translucent: true,
    });
    return popover.present();
  }
  addShop() {
    this.shopService.addShop();
    let lastElIndex = this.shopService.numOfShops - 1;
    let newShopId = this.shops[lastElIndex].value.id;
    this.router.navigate(['/tabs/shops/shop-editor', newShopId, 'create']);
  }
  setFocus() {
    this.isSearchBarOpened = true;
    setTimeout(() => {
      this.searchBar = document.getElementById('shop-searchbar');
      this.searchBar.setFocus();
    })
  }
  closeSearchBar() {
    this.isSearchBarOpened = false;
    this.searchBar.value = '';
    this.findShop();
  }
  findShop() {
    this.searchBar = document.getElementById('shop-searchbar');
    const text = this.searchBar.value.toLowerCase();
    let searchList;
    switch (this.visualization) {
      case 'cards':
        searchList = document.getElementById('shop-cards').childNodes;
        searchList.forEach(item => {
          if (item.firstChild) {
            let shouldShow = item.childNodes[1].children[0].textContent.toLowerCase().indexOf(text) > -1;
            if (shouldShow)
              item.classList.replace('inactive', 'active')
            else item.classList.replace('active', 'inactive')
          }
        })
        break;

      case 'list':
        searchList = document.getElementById('shop-list').childNodes;
        searchList.forEach(item => {
          if (item.firstChild) {
            let shouldShow = item.childNodes[1].textContent.toLowerCase().indexOf(text) > -1;
            if (shouldShow)
              item.classList.replace('inactive', 'active')
            else item.classList.replace('active', 'inactive')
          }
        })
        break;
    }
  }
}
