/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CentersService } from './centers.service';

describe('Service: Centers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CentersService]
    });
  });

  it('should ...', inject([CentersService], (service: CentersService) => {
    expect(service).toBeTruthy();
  }));
});
