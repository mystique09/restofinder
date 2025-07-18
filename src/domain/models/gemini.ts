export interface LLMProvider {
  completion: (query: string) => any;
  getTool(toolName: string): Tool<any> | undefined;
  addTool(tool: Tool<any>): unknown;
  buildToolDeclarations(): unknown;
  buildCompletion(query: string): unknown;
}

export interface Tool<T> {
  name: string;
  description: string;
  getDeclaration(): FunctionDeclaration;
  execute: (query: T) => any;
}

export interface GeminiContent {
  role: string;
  parts: Part[];
}

export interface Part {
  text: string;
}

export interface GeminiTool {
  functionDeclarations: FunctionDeclaration[];
}

export interface FunctionDeclaration {
  name?: string;
  description?: string;
  parameters?: Parameters;
}

export interface Parameters {
  type?: string;
  properties?: Properties;
  required?: string[];
}

export interface Properties {
  [key: string]: {
    type: string;
    items?: { type: string };
    description: string;
  };
}

export interface Attendees {
  type?: string;
  items?: Items;
  description?: string;
}

export interface Items {
  type?: string;
}

export interface Date {
  type?: string;
  description?: string;
}

export interface Time {
  type?: string;
  description?: string;
}

export interface Topic {
  type?: string;
  description?: string;
}

export interface GeminiResponse {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion: string;
  responseId: string;
}

export interface Candidate {
  content: Content;
  finishReason: string;
  index: number;
}

export interface Content {
  parts: ResponsePart[];
  role: string;
}

export interface ResponsePart {
  functionCall: FunctionCall;
}

export interface FunctionCall {
  name: string;
  args: any;
}

export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  promptTokensDetails: PromptTokensDetail[];
}

export interface PromptTokensDetail {
  modality: string;
  tokenCount: number;
}
