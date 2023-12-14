import { PaginationLinkType } from "./pagination";
import { PermissionType } from "./permission";

export interface RoleType {
  id: number;
  name: string;
  guard_name: string;
  permissions: Array<PermissionType>;
  created_at: string;
  updated_at: string;
}

interface RolePaginationLinkType extends PaginationLinkType {}

export interface RoleWithPaginationType {
  current_page: number;
  data: RoleType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: RolePaginationLinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
