/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImportantLinksService } from './important-links.service';

describe('Service: ImportantLinks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportantLinksService]
    });
  });

  it('should ...', inject([ImportantLinksService], (service: ImportantLinksService) => {
    expect(service).toBeTruthy();
  }));
});
