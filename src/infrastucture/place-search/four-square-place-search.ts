import type { SearchPlace } from "../../domain/dto/four-square-place-search.js";
import type { FourSquarePlaceSearchResponse } from "../../domain/models/restaurant.js";

const FOUR_SQUARE_PLACE_SEARCH_API =
  "https://places-api.foursquare.com/places/search";

export class FourSquarePlaceSearchService {
  constructor(private api_key: string) {}

  async search(query: SearchPlace): Promise<FourSquarePlaceSearchResponse> {
    let OPTIONS: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.api_key}`,
        "X-Places-Api-Version": "2025-06-17",
      },
    };

    const params = build_query_params(query);

    const url = `${FOUR_SQUARE_PLACE_SEARCH_API}?${params}`;
    const request = await fetch(url, OPTIONS);
    const response = (await request.json()) as FourSquarePlaceSearchResponse;

    return response;
  }
}

function build_query_params(query: SearchPlace): string {
  let new_query = new URLSearchParams(query as {});
  return new_query.toString();
}
