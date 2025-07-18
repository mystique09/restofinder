export interface SearchPlace {
  query: string;
  ll?: string; // latitude / longitude
  radius?: number;
  categories?: string; // comma-separated
  chains?: string; // comma-separated
  exclude_chains?: string; // comma-separated
  exclude_all_chains?: boolean;
  fields?: string; // comma-separated
  min_price?: number;
  max_price?: number;
  open_at?: string;
  open_now?: boolean;
  ne?: string; // North / East
  sw?: string; // South / West
  near?: string;
  polygon?: string;
  sort?: "relevance" | "rating" | "distance";
  limit?: number;
  session_token?: string; // optional
  super_venue_id?: string;
}
