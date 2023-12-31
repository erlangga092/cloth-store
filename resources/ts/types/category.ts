import { PaginationLinkType } from "./pagination";

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface CategoryPaginationLinkType extends PaginationLinkType {}

export interface CategoryWithPaginationType {
  current_page: number;
  data: CategoryType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: CategoryPaginationLinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
