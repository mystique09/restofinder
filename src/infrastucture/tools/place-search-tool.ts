import type { SearchPlace } from "../../domain/dto/four-square-place-search.js";
import type { FunctionDeclaration, Tool } from "../../domain/models/gemini.js";
import type { FourSquarePlaceSearchResponse } from "../../domain/models/restaurant.js";
import type { FourSquarePlaceSearchService } from "../place-search/four-square-place-search.js";

export class PlaceSearchTool implements Tool<SearchPlace> {
  constructor(
    public name: string,
    public description: string,
    private place_search_service: FourSquarePlaceSearchService
  ) {}

  getDeclaration(): FunctionDeclaration {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "A string to be matched against all content for this place, including but not limited to venue name, category, telephone number, taste, and tips.",
          },
          ll: {
            type: "string",
            description:
              "The latitude/longitude around which to retrieve place information. This must be specified as latitude,longitude (e.g., ll=41.8781,-87.6298).",
          },
          radius: {
            type: "number",
            description:
              "Sets a radius distance (in meters) used to define an area to bias search results. The maximum allowed radius is 100,000 meters. Radius can be used in combination with ll or ip biased geolocation only. By using radius, global search results will be omitted. If not provided, default radius applied is 22000 meters.",
          },
          categories: {
            type: "string",
            description:
              "Filters the response and returns FSQ Places matching the specified categories. Supports multiple Category IDs, separated by commas",
          },
          chains: {
            type: "string",
            description:
              "Filters the response and returns FSQ Places matching the specified chains. Supports multiple chain IDs, separated by commas.",
          },
          exclude_chains: {
            type: "string",
            description:
              "Filters the response and returns FSQ Places not matching any of the specified chains. Supports multiple chain IDs, separated by commas. Cannot be used in conjunction with exclude_all_chains.",
          },
          exclude_all_chains: {
            type: "boolean",
            description:
              "Filters the response by only returning FSQ Places that are not known to be part of any chain. Cannot be used in conjunction with exclude_chains.",
          },
          fields: {
            type: "string",
            description:
              "Indicate which fields to return in the response, separated by commas. If no fields are specified, all Core Fields are returned by default.",
          },
          min_price: {
            type: "number",
            description:
              "Restricts results to only those places within the specified price range. Valid values range between 1 (most affordable) to 4 (most expensive), inclusive.",
          },
          max_price: {
            type: "number",
            description:
              "Restricts results to only those places within the specified price range. Valid values range between 1 (most affordable) to 4 (most expensive), inclusive.",
          },
          open_at: {
            type: "string",
            description:
              "Support local day and local time requests through this parameter. To be specified as DOWTHHMM (e.g., 1T2130), where DOW is the day number 1-7 (Monday = 1, Sunday = 7) and time is in 24 hour format. Places that do not have opening hours will not be returned if this parameter is specified. Cannot be specified in conjunction with open_now.",
          },
          open_now: {
            type: "boolean",
            description:
              "Restricts results to only those places that are open now.",
          },
          ne: {
            type: "string",
            description:
              "The latitude/longitude representing the north/east points of a rectangle. Must be used with sw parameter to specify a rectangular search box. Global search results will be omitted.",
          },
          sw: {
            type: "string",
            description:
              "The latitude/longitude representing the south/west points of a rectangle. Must be used with ne parameter to specify a rectangular search box. Global search results will be omitted.",
          },
          near: {
            type: "string",
            description:
              'A string naming a locality in the world (e.g., "Chicago, IL"). If the value is not geocodable, returns an error.',
          },
          polygon: {
            type: "string",
            description:
              'A string containing a list of coordinate pairs which define the edges of the polygon. Each pair must include latitude and longitude separated by a comma, with each pair separated by a tilde ~. Must have at least 4 coordinate pairs and be considered a "closed" polygon.',
          },
          sort: {
            type: "string",
            description: `Specifies the order in which results are listed. Possible values are:
              relevance (default)
              rating
              distance
            `,
          },
          limit: {
            type: "number",
            description:
              "The number of results to return, up to 50. Defaults to 10.",
          },
          session_token: {
            type: "string",
            description:
              "A user-generated token to identify a session for billing purposes. Learn more about session tokens.",
          },
          super_venue_id: {
            type: "string",
            description:
              "A Foursquare Venue ID to use as search bounds so only places within that venue are returned",
          },
        },
        required: ["query"],
      },
    };
  }

  async execute(query: SearchPlace): Promise<FourSquarePlaceSearchResponse> {
    const place = await this.place_search_service.search(query);
    return place;
  }
}
