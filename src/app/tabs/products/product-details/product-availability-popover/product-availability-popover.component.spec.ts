import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductAvailabilityPopoverComponent } from './product-availability-popover.component';

describe('ProductAvailabilityPopoverComponent', () => {
  let component: ProductAvailabilityPopoverComponent;
  let fixture: ComponentFixture<ProductAvailabilityPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAvailabilityPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAvailabilityPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
