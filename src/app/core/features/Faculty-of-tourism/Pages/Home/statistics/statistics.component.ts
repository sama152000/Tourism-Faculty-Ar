import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../../../Services/statistics.service';
import { StatisticsData } from '../../../model/statistics.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  @ViewChildren('counter') counters!: QueryList<ElementRef>;
  
  statisticsData!: StatisticsData;
  animatedValues: number[] = [];
  hasAnimated = false;
  private observer: IntersectionObserver | null = null;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsData = this.statisticsService.getStatisticsData();
    this.animatedValues = new Array(this.statisticsData.statistics.length).fill(0);
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.startCountAnimation();
            this.hasAnimated = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe the component element
    setTimeout(() => {
      const element = document.querySelector('.statistics-section');
      if (element) {
        this.observer?.observe(element);
      }
    }, 100);
  }

  private startCountAnimation(): void {
    this.statisticsData.statistics.forEach((stat, index) => {
      this.animateCounter(index, stat.value);
    });
  }

  private animateCounter(index: number, targetValue: number): void {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let currentValue = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      currentValue += increment;
      
      if (step >= steps) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      
      this.animatedValues[index] = Math.floor(currentValue);
    }, duration / steps);
  }
}