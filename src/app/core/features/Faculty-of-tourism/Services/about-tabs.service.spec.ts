/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AboutTabsService } from './about-tabs.service';

describe('Service: AboutTabs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutTabsService]
    });
  });

  it('should ...', inject([AboutTabsService], (service: AboutTabsService) => {
    expect(service).toBeTruthy();
  }));
});
