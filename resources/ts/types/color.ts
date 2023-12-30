import { PaginationLinkType } from "./pagination";

export interface ColorType {
  id: number;
  name: string;
  image: string;
}

interface ColorPaginationLinkType extends PaginationLinkType {}

export interface ColorWithPaginationType {
  current_page: number;
  data: ColorType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ColorPaginationLinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
