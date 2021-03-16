import { TestBed } from '@angular/core/testing';

import { ProductDataExchangeService } from './product-data-exchange.service';

describe('ProductDataExchangeService', () => {
  let service: ProductDataExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
