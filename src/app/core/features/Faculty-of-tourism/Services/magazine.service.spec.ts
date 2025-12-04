/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MagazineService } from './magazine.service';

describe('Service: Magazine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MagazineService]
    });
  });

  it('should ...', inject([MagazineService], (service: MagazineService) => {
    expect(service).toBeTruthy();
  }));
});
