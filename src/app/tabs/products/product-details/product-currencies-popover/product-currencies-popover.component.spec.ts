import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductCurrenciesPopoverComponent } from './product-currencies-popover.component';

describe('ProductCurrenciesPopoverComponent', () => {
  let component: ProductCurrenciesPopoverComponent;
  let fixture: ComponentFixture<ProductCurrenciesPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCurrenciesPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCurrenciesPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
