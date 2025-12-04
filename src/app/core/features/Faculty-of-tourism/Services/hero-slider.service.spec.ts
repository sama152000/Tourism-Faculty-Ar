/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroSliderService } from './hero-slider.service';

describe('Service: HeroSlider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroSliderService]
    });
  });

  it('should ...', inject([HeroSliderService], (service: HeroSliderService) => {
    expect(service).toBeTruthy();
  }));
});
