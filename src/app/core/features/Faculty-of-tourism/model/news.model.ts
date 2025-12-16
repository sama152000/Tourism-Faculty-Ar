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
  id: string;
  postId: string;
  index: number;
  name: string;
}

export interface NewsPost {
  id: string;
  title: string;
  urlTitleEn: string;
  content: string;
  status: string;
  publishedDate: string | null;
  featuredImagePath: string;
  pageId: string;
  pageTittle: string;
  createdDate: string;
  postCategories: PostCategory[];
  postAttachments: PostAttachment[];
  tags: PostTag[];
}

export interface NewsCategory {
  categoryName: string;
  posts: NewsPost[];
}

export interface NewsTabsData {
  title: string;
  subtitle: string;
  sections: NewsCategory[];
}
