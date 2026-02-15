import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Output() loadingComplete = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    // Auto-complete loading after animation duration
    setTimeout(() => {
      this.loadingComplete.emit();
    }, 7000); // 7 seconds total duration
  }

  onAnimationEnd(): void {
    this.loadingComplete.emit();
  }
}