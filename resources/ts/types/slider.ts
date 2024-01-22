import { PaginationLinkType } from "./pagination";

export interface SliderType {
  id: number;
  link: string;
  image: string;
}

interface SliderPaginationLinkType extends PaginationLinkType {}

export interface SliderWithPaginationType {
  current_page: number;
  data: SliderType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: SliderPaginationLinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
