/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuickSidebarService } from './quick-sidebar.service';

describe('Service: QuickSidebar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickSidebarService]
    });
  });

  it('should ...', inject([QuickSidebarService], (service: QuickSidebarService) => {
    expect(service).toBeTruthy();
  }));
});
