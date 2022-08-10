import { TestBed } from '@angular/core/testing';

import { FilterlicenseService } from './filterlicense.service';

describe('FilterlicenseService', () => {
  let service: FilterlicenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterlicenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
