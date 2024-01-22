import { ColorType } from "./color";
import { PaginationLinkType } from "./pagination";
import { ProductType, ProductWithPaginationType } from "./product";

export interface ProductImageType {
  id: number;
  product: ProductType;
  color: ColorType;
  image: string;
}

interface ProductImageLinkType extends PaginationLinkType {}

export interface ProductImageWithPaginationType {
  current_page: number;
  data: ProductImageType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ProductImageLinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
