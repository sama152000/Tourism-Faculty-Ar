/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DepartmentTabsService } from './department-tabs.service';

describe('Service: DepartmentTabs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentTabsService]
    });
  });

  it('should ...', inject([DepartmentTabsService], (service: DepartmentTabsService) => {
    expect(service).toBeTruthy();
  }));
});
