import { CategoryType } from "./category";
import { PaginationLinkType } from "./pagination";
import { ProductImageWithPaginationType } from "./product-image";
import { ProductSize } from "./product-size";

export interface ProductType {
  id: number;
  category_id: number;
  category: CategoryType;
  title: string;
  description: string;
  slug: string;
  weight: number;
  created_at: string;
  updated_at: string;
}

interface ProductPaginationLinkType extends PaginationLinkType {}

export interface ProductWithPaginationType {
  current_page: number;
  data: ProductType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ProductPaginationLinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ProductWithSizeType extends ProductType {
  product_sizes: Array<ProductSize>;
}

export interface ProductWithImageAndPaginationType extends ProductType {
  product_images: ProductImageWithPaginationType;
}
