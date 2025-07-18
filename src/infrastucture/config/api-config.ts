import dotenv from "dotenv";

interface ApiConfig {
  host: string;
  port: number;
  four_square_api_key: string;
  gemini_key: string;
}

export function buildAPIConfig(): ApiConfig {
  dotenv.config();

  const host = process.env.HOST ?? "0.0.0.0";
  const port = parseInt(process.env.PORT ?? "3000");
  const four_square_api_key = process.env.FOUR_SQUARE_API_KEY ?? "";
  const gemini_key = process.env.GEMINI_KEY ?? "";

  if (!four_square_api_key) {
    console.error("Missing FOUR SQUARE API KEY");
  }

  if (!gemini_key) {
    console.error("Missing GEMINI API KEY");
  }

  return { host, port, four_square_api_key, gemini_key };
}
