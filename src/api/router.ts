import type { Context, Hono as HonoApp } from "hono";
import { Hono } from "hono";
import type { BlankSchema, TypedResponse } from "hono/types";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { FourSquarePlaceSearcUsecase } from "../application/usecases/find-restaurant-usecase.js";
import type { LLMProvider } from "../domain/models/gemini.js";
import type { FourSquarePlaceSearchResponse } from "../domain/models/restaurant.js";
import type { FourSquarePlaceSearchService } from "../infrastucture/place-search/four-square-place-search.js";

export type Result<T, E> = {
  ok?: T;
  error?: E;
};

export type ApiError = string;

type HonoContext = Context<{ Variables: State }, string, BlankSchema>;
type ApiResponse<T extends Object> = Response &
  TypedResponse<T, ContentfulStatusCode, "json">;

type State = {
  llmProvider: LLMProvider;
  fourPlaceSearchService: FourSquarePlaceSearchService;
};

export function buildRouter(
  llm_provider: LLMProvider
): HonoApp<{ Variables: State }, BlankSchema> {
  const app = new Hono<{ Variables: State }>();

  app.use(async (c, next) => {
    c.set("llmProvider", llm_provider);
    await next();
  });

  app.get("/", index);
  app.get("/healthz", healthz);
  app.get("/api/execute", execute);

  return app;
}

interface IndexResponse {
  message: string;
}

async function index(c: HonoContext): Promise<ApiResponse<IndexResponse>> {
  return c.json({ message: "Hello, world" });
}

async function healthz(c: HonoContext): Promise<ApiResponse<{ API: string }>> {
  return c.json({ API: "OK" });
}

async function execute(
  c: HonoContext
): Promise<ApiResponse<Result<FourSquarePlaceSearchResponse, ApiError>>> {
  const search = c.req.query("message") ?? "";
  const code = c.req.query("code");

  if (!code) {
    c.status(401);
    return c.json({ error: "Forbidden" });
  }

  if (code !== "pioneerdevai") {
    c.status(401);
    return c.json({ error: "Forbidden" });
  }

  const llmProvider = c.get("llmProvider");

  const usecase = new FourSquarePlaceSearcUsecase(llmProvider);
  const { ok, error } = await usecase.execute(search);

  if (error) {
    c.status(400);
    return c.json({ error });
  }

  return c.json(ok);
}
