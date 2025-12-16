import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSliderService } from '../../../Services/hero-slider.service';
import { HeroSliderData } from '../../../model/hero-slider.model';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css']
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  sliderData!: HeroSliderData;
  currentSlide = 0;
  autoPlayInterval: any;

  constructor(private heroSliderService: HeroSliderService) {}

 ngOnInit(): void {
  this.heroSliderService.getHeroSliderData().subscribe(data => {
    this.sliderData = data;

    if (this.sliderData.autoPlay) {
      this.startAutoPlay();
    }
  });
}


  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  startAutoPlay(): void {
    if (this.sliderData && this.sliderData.interval) {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, this.sliderData.interval);
    }
  }

  nextSlide(): void {
    if (this.sliderData && this.sliderData.slides) {
      this.currentSlide = (this.currentSlide + 1) % this.sliderData.slides.length;
    }
  }

  prevSlide(): void {
    if (this.sliderData && this.sliderData.slides) {
      this.currentSlide = this.currentSlide === 0
        ? this.sliderData.slides.length - 1
        : this.currentSlide - 1;
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  onMouseEnter(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  onMouseLeave(): void {
    if (this.sliderData && this.sliderData.autoPlay) {
      this.startAutoPlay();
    }
  }
}