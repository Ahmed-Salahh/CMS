export interface SuccessStory {
  id: number;
  title: string;
  description: string;
  author_name: string;
  author_image: string;
  story_image: string;
  rating: number;
  category: string;
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface SuccessStoryListResponse {
  success: boolean;
  data: SuccessStory[];
  pagination: {
    current_page: number;
    page_size: number;
    total_count: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

export interface SuccessStoryDetailResponse {
  success: boolean;
  data: SuccessStory;
  related_stories: Array<{
    id: number;
    title: string;
    author_name: string;
    story_image: string;
    rating: number;
    category: string;
  }>;
}

export interface Category {
  value: string;
  label: string;
  count: number;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}
