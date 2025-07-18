import { serve } from "@hono/node-server";
import { buildRouter } from "./api/router.js";
import { buildAPIConfig } from "./infrastucture/config/api-config.js";
import { FourSquarePlaceSearchService } from "./infrastucture/place-search/four-square-place-search.js";
import { GeminiProvider } from "./infrastucture/ai-provider/gemini.js";
import { PlaceSearchTool } from "./infrastucture/tools/place-search-tool.js";

const config = buildAPIConfig();
const fourSearchApiService = new FourSquarePlaceSearchService(
  config.four_square_api_key
);

const placeSearchTool = new PlaceSearchTool(
  "placeSearch",
  "A service to search for places based on a query.",
  fourSearchApiService
);

const gemini = new GeminiProvider(config.gemini_key, new Map());
gemini.addTool(placeSearchTool);

const app = buildRouter(gemini, config);

serve(
  {
    fetch: app.fetch,
    hostname: config.host,
    port: config.port,
  },
  (_info) => {
    console.log(`Server is running on ${config.host}:${config.port}`);
  }
);
