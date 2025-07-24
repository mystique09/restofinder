import type { ApiError, Result } from "../../api/router.js";
import type { SearchPlace } from "../../domain/dto/four-square-place-search.js";
import type {
  GeminiResponse,
  LLMProvider,
} from "../../domain/models/gemini.js";
import type { FourSquarePlaceSearchResponse } from "../../domain/models/restaurant.js";

export class FourSquarePlaceSearcUsecase {
  maxRetries = 3;
  retryCount = 0;

  constructor(private llmProvider: LLMProvider) {}

  async execute(
    search: string
  ): Promise<Result<FourSquarePlaceSearchResponse, ApiError>> {
    if (this.retryCount >= this.maxRetries) {
      return {
        error: "Sorry, I'm having trouble finding that. Please try again.",
      };
    }

    if (!search) {
      return { error: "Query must not be empty" };
    }

    try {
      const geminiResponse = (await this.llmProvider.completion(
        search
      )) as GeminiResponse;
      const { candidates } = geminiResponse;

      const parts =
        candidates.map((c) => c.content.parts).find((c) => c.length > 0) ?? [];

      console.log(parts);

      const functionCall = parts
        .map((p) => p.functionCall)
        .find((p) => p.name === "placeSearch");

      if (!functionCall) {
        this.retryCount++;

        setTimeout(() => Promise.resolve(), 2000);
        return await this.execute(
          `Invalid response: ${JSON.stringify(parts)}, ${search}`
        );
      }

      const toolName = functionCall.name;
      const tool = this.llmProvider.getTool(toolName);

      const functionCallArgs = functionCall.args as SearchPlace;
      const response = await tool?.execute(functionCallArgs);

      return { ok: response };
    } catch (e) {
      this.retryCount++;

      const error = e as { message: string };
      const message = error.message;

      console.error(message);

      setTimeout(() => Promise.resolve(), 2000);
      return await this.execute(`Invalid response: ${message}, ${search}`);
    }
  }
}
