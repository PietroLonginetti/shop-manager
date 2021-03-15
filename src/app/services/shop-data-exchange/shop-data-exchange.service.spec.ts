import { TestBed } from '@angular/core/testing';

import { ShopDataExchangeService } from 'src/app/services/shop-data-exchange/shop-data-exchange.service';

describe('ShopDataExchangeService', () => {
  let service: ShopDataExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopDataExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
