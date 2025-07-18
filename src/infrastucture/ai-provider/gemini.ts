import type {
  GeminiContent,
  GeminiResponse,
  GeminiTool,
  LLMProvider,
  Tool,
} from "../../domain/models/gemini.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent";

const INITIAL_PROMP: GeminiContent = {
  role: "model",
  parts: [
    {
      text: `
      You are an AI that has an access to a tool called "Place Search".
      You have access to a tool "placeSearch" that fetches data to an external source, you must use this tool in every request from the user.
      Your response must be in JSON format only, follow the tool parameters.
      `,
    },
  ],
};

export class GeminiProvider implements LLMProvider {
  constructor(private api_key: string, public tools: Map<string, Tool<any>>) {}

  async completion(query: string): Promise<GeminiResponse> {
    const prompt = this.buildCompletion(query);
    const tools = this.buildToolDeclarations();

    const body = {
      contents: [INITIAL_PROMP, prompt],
      tools: [tools],
    };

    const request = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "x-goog-api-key": `${this.api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = (await request.json()) as GeminiResponse;

    return response;
  }

  buildCompletion(query: string): GeminiContent {
    return {
      role: "user",
      parts: [{ text: query }],
    };
  }

  addTool(tool: Tool<any>) {
    this.tools.set(tool.name, tool);
  }

  getTool(toolName: string): Tool<any> | undefined {
    return this.tools.get(toolName);
  }

  buildToolDeclarations(): GeminiTool {
    const functionDeclarations = [];

    for (let [_, tool] of this.tools) {
      functionDeclarations.push(tool.getDeclaration());
    }

    return {
      functionDeclarations,
    };
  }
}
