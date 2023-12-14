import { PaginationLinkType } from "./pagination";

export interface PermissionType {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}

interface PermissionPaginationLinkType extends PaginationLinkType {}

export interface PermissionWithPaginationType {
  current_page: number;
  data: PermissionType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PermissionPaginationLinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
