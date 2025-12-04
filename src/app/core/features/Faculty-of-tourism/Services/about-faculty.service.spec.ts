/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AboutFacultyService } from './about-faculty.service';

describe('Service: AboutFaculty', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutFacultyService]
    });
  });

  it('should ...', inject([AboutFacultyService], (service: AboutFacultyService) => {
    expect(service).toBeTruthy();
  }));
});
