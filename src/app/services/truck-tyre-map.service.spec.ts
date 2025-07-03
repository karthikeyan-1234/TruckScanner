import { TestBed } from '@angular/core/testing';

import { TruckTyreMapService } from './truck-tyre-map.service';

describe('TruckTyreMapService', () => {
  let service: TruckTyreMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckTyreMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
