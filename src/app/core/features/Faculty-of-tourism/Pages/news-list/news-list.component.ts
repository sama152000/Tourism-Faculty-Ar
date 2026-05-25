import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsService } from '../../Services/news.service';
import { NewsPost } from '../../model/news.model';
import { Category } from '../../model/category.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CleanHtmlPipe],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  // Data
  posts: NewsPost[] = [];
  categories: Category[] = [];

  // Filter state
  searchQuery: string = '';
  selectedCategoryId: string = '';
  selectedCategoryName: string = 'الكل';
  selectedType: string = '';

  // Dropdown
  isDropdownOpen: boolean = false;

  // Pagination
  currentPage: number = 1;
  pageSize: number =9;
  totalCount: number = 0;

  // Loading / error
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    // Load categories first, then read query params and load posts
    this.newsService.getCategories().subscribe({
      next: cats => {
        this.categories = cats;
        this.route.queryParams.subscribe(params => {
          this.searchQuery = params['search'] ?? '';
          const catId = params['categoryId'] ?? '';
          const catName = params['category'] ?? 'الكل';
          this.selectedCategoryId = catId;
          this.selectedCategoryName = catId
            ? (cats.find(c => c.id === catId)?.name ?? catName)
            : 'الكل';
          this.selectedType = params['type'] ?? '';
          this.currentPage = params['page'] ? +params['page'] : 1;
          this.loadPosts();
        });
      },
      error: () => {
        // Still load posts even if categories fail
        this.loadPosts();
      }
    });
  }

  loadPosts(): void {
    this.isLoading = true;
    this.hasError = false;

    const filter: any = {};
    if (this.selectedCategoryId) {
      filter.categoryId = this.selectedCategoryId;
    }
    if (this.searchQuery.trim()) {
      filter.title = this.searchQuery.trim();
    }
    if (this.selectedType !== '') {
      filter.type = this.selectedType;
    }

    this.newsService.getPagedNews(this.currentPage, this.pageSize, filter).subscribe({
      next: result => {
        this.posts = result.items;
        this.totalCount = result.totalCount;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  // ── Filter actions ──────────────────────────────────────────────

  onSearch(): void {
    this.currentPage = 1;
    this.updateUrlAndLoad();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.currentPage = 1;
    this.updateUrlAndLoad();
  }

  selectCategory(cat: Category | null): void {
    this.selectedCategoryId = cat ? cat.id : '';
    this.selectedCategoryName = cat ? cat.name : 'الكل';
    this.isDropdownOpen = false;
    this.currentPage = 1;
    this.updateUrlAndLoad();
  }

  showAllNews(): void {
    this.selectCategory(null);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // ── Pagination ──────────────────────────────────────────────────

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get pages(): number[] {
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    const result: number[] = [];
    for (let i = start; i <= end; i++) result.push(i);
    return result;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.updateUrlAndLoad();
    this.scrollToTop();
  }

  nextPage(): void { this.goToPage(this.currentPage + 1); }
  prevPage(): void { this.goToPage(this.currentPage - 1); }

  // ── Navigation ──────────────────────────────────────────────────

  goToPost(post: NewsPost): void {
    this.router.navigate(['/news', post.id]);
  }

  // ── Helpers ─────────────────────────────────────────────────────

  getPostCategories(post: NewsPost): string {
    return post.postCategories?.map(c => c.categoryName).join(', ') ?? '';
  }

  formatDate(dateStr: string | null): string {
    if (!dateStr) return '';
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(new Date(dateStr));
  }

  private updateUrlAndLoad(): void {
    const queryParams: any = {};
    if (this.selectedCategoryId) queryParams['categoryId'] = this.selectedCategoryId;
    if (this.selectedCategoryName !== 'الكل') queryParams['category'] = this.selectedCategoryName;
    if (this.searchQuery.trim()) queryParams['search'] = this.searchQuery.trim();
    if (this.selectedType !== '') queryParams['type'] = this.selectedType;
    if (this.currentPage > 1) queryParams['page'] = this.currentPage;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'replace'
    });

    this.loadPosts();
  }

  private scrollToTop(): void {
    const el = document.querySelector('.news-filter-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
