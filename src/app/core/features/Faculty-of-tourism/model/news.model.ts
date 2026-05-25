export interface PostCategory {
  id: string;
  postId: string;
  categoryId: string;
  categoryName: string;
}

export interface PostAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  postId: string;
}

export interface PostTag {
  postId: string;
  index: number;
  id: string;
  name: string;
}

export interface News {
  id: string;
  title: string;
  urlTitleEn: string;
  content: string;
  status: string;
  type: number | string;
  publishedDate: string | null;
  featuredImagePath: string;
  pageId: string;
  pageTittle: string;
  createdDate: string;
  postCategories: PostCategory[];
  postAttachments: PostAttachment[];
  tags: PostTag[];
  newsViewCounters: any[];
  totalViewCount: number;
}

/** Alias used across components */
export type NewsPost = News;

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  message: string;
  errors: string[];
  statusCode: number;
  timestamp: string;
}

export interface PagedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  };
}
