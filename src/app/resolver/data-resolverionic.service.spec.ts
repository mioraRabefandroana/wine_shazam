import { TestBed } from '@angular/core/testing';

import { DataResolverionicService } from './data-resolverionic.service';

describe('DataResolverionicService', () => {
  let service: DataResolverionicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataResolverionicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
