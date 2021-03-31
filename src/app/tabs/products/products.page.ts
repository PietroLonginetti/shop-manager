import { Component, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { PopoverController } from '@ionic/angular';
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
    if(this.scanSub)
      this.closeQRScanner()
  }
  isSearchBarOpened: boolean = false;
  products = [];
  fProducts = []
  shops = [];
  list: any;
  shopIds: number[] = []
  scanSub: any;
  qrTemplate: any;

  constructor(private productService: ProductDataExchangeService, private shopService: ShopDataExchangeService,
    private popoverController: PopoverController, private qrScanner: QRScanner, public router: Router) {
    this.shops = this.shopService.shops;
    this.products = this.productService.products;
    this.fProducts = this.filterProducts();
  }

  ngOnInit() {
    this.list = document.getElementById('prod-list');
    this.qrTemplate = document.getElementById('qr-template');
  }

  //Methods
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
  closeSearchBar() {
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
    if (this.shopIds.length == 0) {
      return this.products;
    }
    let fProducts = this.products.filter((prod) => {
      let isInshops = false;
      this.shopIds.forEach(shopId => {
        for (let i = 0; i < prod.value.available.length; i++) {
          if (prod.value.available[i].shop === shopId)
            isInshops = true
        }
      })
      return isInshops
    })
    return fProducts;
  }
  addProduct() {
    this.productService.addProduct();
    let lastElIndex = this.productService.numOfProducts - 1;
    let newProductId = this.products[lastElIndex].value.id;
    this.router.navigate(['/tabs/products/product-editor', newProductId, 'create']);
  }

  // Popovers
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ProductsPopoverComponent,
      event: ev,
      translucent: true,
    });
    return popover.present();
  }

  //QrScanner
  launchQRScanner() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.openQRScanner();

          this.scanSub = this.qrScanner.scan().subscribe((id: string) => {
            this.qrScanner.pausePreview();
            this.closeQRScanner()
            this.router.navigate(['/tabs/products/product-details', id]);
          })
        } else if (status.denied) {
          // Camera permission was permanently denied.
        } else {
          // permission was denied, but not permanently.
        }
      })
  }
  openQRScanner(){
    this.qrScanner.show();
    let prodPage = document.getElementsByTagName('app-products')[0];
    this.qrTemplate.style.display = 'block';
    prodPage.getElementsByTagName('ion-header')[0].style.display = 'none';
    prodPage.getElementsByTagName('ion-content')[0].style.display = 'none';
    document.getElementsByTagName('ion-tab-bar')[0].style.height = '0';
  }
  closeQRScanner(){
    let prodPage = document.getElementsByTagName('app-products')[0];
    this.qrTemplate.style.display = 'none';
    prodPage.getElementsByTagName('ion-header')[0].style.display = 'initial';
    prodPage.getElementsByTagName('ion-content')[0].style.display = 'initial';
    document.getElementsByTagName('ion-tab-bar')[0].style.height = '56px';
    this.qrScanner.hide();
    this.scanSub.unsubscribe();
  }
}
