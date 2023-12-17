import { PaginationLinkType } from "./pagination";
import { RoleType } from "./role";

export interface UserType {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  roles: Array<RoleType>;
  created_at: string;
  updated_at: string;
}

interface UserPaginationLinkType extends PaginationLinkType {}

export interface UserWithPaginationType {
  current_page: number;
  data: UserType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: UserPaginationLinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
