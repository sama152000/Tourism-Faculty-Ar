import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsService } from '../../../Services/news.service';
import { NewsPost } from '../../../model/news.model';
import { CleanHtmlPipe } from '../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CleanHtmlPipe],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  post: NewsPost | undefined;
  relatedPosts: NewsPost[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;

  /** All images for the slider: featuredImagePath first, then unique attachment URLs */
  sliderImages: string[] = [];
  activeSlideIndex: number = 0;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadPost(id);
      }
    });
  }

  loadPost(id: string): void {
    this.isLoading = true;
    this.hasError = false;
    this.post = undefined;
    this.relatedPosts = [];

    this.newsService.getNewsById(id).subscribe({
      next: post => {
        this.post = post;
        this.isLoading = false;
        this.buildSliderImages(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Load related posts after main post is loaded
        this.newsService.getRelatedNews(post, 4).subscribe({
          next: related => { this.relatedPosts = related; },
          error: () => { /* related posts are optional */ }
        });
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  navigateToPost(id: string): void {
    this.router.navigate(['/news', id]);
  }

  formatDate(dateStr: string | null): string {
    if (!dateStr) return '';
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(new Date(dateStr));
  }

  getPostCategories(post: NewsPost): string {
    return post.postCategories?.map(c => c.categoryName).join(', ') ?? '';
  }

  sharePost(): void {
    if (navigator.share && this.post) {
      navigator.share({
        // title: this.post.title,
        // text: this.post.content?.slice(0, 100) ?? '',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  /** Build the deduplicated image list: featuredImagePath first, then attachments */
  private buildSliderImages(post: NewsPost): void {
    const seen = new Set<string>();
    const images: string[] = [];

    if (post.featuredImagePath) {
      images.push(post.featuredImagePath);
      seen.add(post.featuredImagePath);
    }

    for (const att of post.postAttachments ?? []) {
      if (att.url && !seen.has(att.url)) {
        images.push(att.url);
        seen.add(att.url);
      }
    }

    this.sliderImages = images;
    this.activeSlideIndex = 0;
  }

  goToSlide(index: number): void {
    this.activeSlideIndex = index;
  }

  prevSlide(): void {
    this.activeSlideIndex =
      (this.activeSlideIndex - 1 + this.sliderImages.length) % this.sliderImages.length;
  }

  nextSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.sliderImages.length;
  }
}
