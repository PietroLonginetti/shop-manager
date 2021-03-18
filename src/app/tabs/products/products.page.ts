import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform, PopoverController } from '@ionic/angular';
import { ProductDataExchangeService } from 'src/app/services/product-data-exchange/product-data-exchange.service';
import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';
import { ProductsPopoverComponent } from './products-popover/products-popover.component';

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss']
})
export class ProductsPage {
  @HostListener('document:ionBackButton', ['$event'])
  async overrideHardwareBackAction($event: any) {
    let body = document.getElementsByTagName('body')[0];
    body.removeChild(this.wa);
    body.style.display = 'block';
    body.style.justifyContent = 'initial';
    body.style.alignItems = 'initial';
    document.getElementsByTagName('ion-app')[0].style.opacity = '1';
    this.scanSub.unsubscribe();
  }
  isSearchBarOpened: boolean = false;
  products = [];
  fProducts = []
  shops = [];
  list: any;
  shopIds: number[] = []
  scanSub: any;
  wa: any;

  constructor(private productService: ProductDataExchangeService, private shopService: ShopDataExchangeService,
    private popoverController: PopoverController, private qrScanner: QRScanner, public router: Router) {
    this.shops = this.shopService.shops;
    this.products = this.productService.products;
    this.fProducts = this.filterProducts();

    this.wa = document.createElement('IMG');
    this.wa.setAttribute('src', '../assets/img/qr-watermark.png');
    this.wa.style.width = '50%';
  }

  ngOnInit() {
    this.list = document.getElementById('prod-list');
  }

  calculateTotalPieces(prod): number {
    let tot = 0;
    for (let i = 0; i < prod.available.length; i++) {
      tot += prod.available[i].quantity;
    }
    return tot;
  }
  setFocus() {
    this.isSearchBarOpened = true;
    setTimeout(() => {
      let searchBar: any = document.getElementById('prod-searchbar');
      searchBar.setFocus();
    })
  }
  closeSearchBar(){
    this.isSearchBarOpened = false;
    let searchBar: any = document.getElementById('prod-searchbar');
    searchBar.value = '';
    this.findProductByKeyWord();
  }
  findProductByKeyWord() {
    let searchBar: any = document.getElementById('prod-searchbar');
    const text = searchBar.value.toLowerCase();
    let searchList = [...this.list.children];

    searchList.forEach(item => {
      let shouldShow = item.children[1].textContent.toLowerCase().indexOf(text) > -1;
      if (shouldShow) {
        item.classList.replace('inactive', 'active')
      } else {
        item.classList.replace('active', 'inactive')
      }
    })
  }
  changeFilter(ev) {
    this.shopIds = ev.target.value;
    this.fProducts = this.filterProducts();
  }
  filterProducts(): any[] {
    if(this.shopIds.length == 0){
      return this.products;
    }
    let fProducts = this.products.filter((prod)=>{
      let isInshops = false;
      this.shopIds.forEach(shopId => {
        for(let i = 0; i < prod.value.available.length; i++){
          if(prod.value.available[i].shop === shopId)
          isInshops = true
        }
      })
      return isInshops
    })
    return fProducts;
  }

  // Popovers
  async presentPopover(ev: any){
    const popover = await this.popoverController.create({
      component: ProductsPopoverComponent,
      event: ev,
      translucent: true,
    });
    return popover.present();
  }

  //QrScanner
  launchQRScanner(){
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) =>  {
        if(status.authorized){
          this.qrScanner.show();
          
          let body = document.getElementsByTagName('body')[0];
          body.appendChild(this.wa);
          body.style.display = 'flex';
          body.style.justifyContent = 'center';
          body.style.alignItems = 'center';
          document.getElementsByTagName('ion-app')[0].style.opacity = '0';
          
          this.scanSub = this.qrScanner.scan().subscribe((id: string) => {
            this.qrScanner.pausePreview();
            this.router.navigate(['/tabs/products/product-details', id]);

            body.removeChild(this.wa);
            body.style.display = 'block';
            body.style.justifyContent = 'initial';
            body.style.alignItems = 'initial';
            document.getElementsByTagName('ion-app')[0].style.opacity = '1';
            this.qrScanner.hide();
            this.scanSub.unsubscribe();
          })
        } else if(status.denied){
          // Camera permission was permanently denied.
        } else {
          // permission was denied, but not permanently.
        }
      })
  }
}
