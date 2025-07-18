import type { ApiError, Result } from "../../api/router.js";
import type { SearchPlace } from "../../domain/dto/four-square-place-search.js";
import type {
  GeminiResponse,
  LLMProvider,
} from "../../domain/models/gemini.js";
import type { FourSquarePlaceSearchResponse } from "../../domain/models/restaurant.js";

export class FourSquarePlaceSearcUsecase {
  constructor(private llmProvider: LLMProvider) {}

  async execute(
    search: string
  ): Promise<Result<FourSquarePlaceSearchResponse, ApiError>> {
    if (!search) {
      return { error: "Query must not be empty" };
    }

    const geminiResponse = (await this.llmProvider.completion(
      search
    )) as GeminiResponse;
    const { candidates } = geminiResponse;
    const parts =
      candidates.map((c) => c.content.parts).find((c) => c.length > 0) ?? [];

    const functionCall = parts
      .map((p) => p.functionCall)
      .find((p) => p.name === "placeSearch");

    if (!functionCall) {
      return { error: "Invalid response from LLM provider" };
    }

    const toolName = functionCall.name;
    const tool = this.llmProvider.getTool(toolName);

    const functionCallArgs = functionCall.args as SearchPlace;
    const response = await tool?.execute(functionCallArgs);

    return { ok: response };
  }
}
