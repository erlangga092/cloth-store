import { PaginationLinkType } from "./pagination";
import { UserType } from "./user";

export interface TransactionType {
  id: number;
  user_id: number;
  province_id: number;
  city_id: number;
  invoice: string;
  courier_name: string;
  courier_service: string;
  courier_cost: number;
  weight: number;
  grand_total: number;
  status: "UNPAID" | "PAID" | "EXPIRED" | "CANCELLED";
  reference: string;
  address: string;
  user?: UserType;
  created_at: string;
  updated_at: string;
}

interface TransactionPaginationLinkType extends PaginationLinkType {}

export interface TransactionWithPaginationType {
  current_page: number;
  data: TransactionType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: TransactionPaginationLinkType[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
