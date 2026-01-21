// FAQs TypeScript Interfaces

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category_id: number;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  order: number;
  is_active: boolean;
  faqs: FAQ[];
  created_at: string;
  updated_at: string;
}

export interface FAQsResponse {
  success: boolean;
  data: FAQCategory[];
  error?: string;
}

export interface FAQCategoryResponse {
  success: boolean;
  data: FAQCategory;
  error?: string;
}
