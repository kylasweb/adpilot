
import { AIModel } from "../types";

export const getOpenRouterModel = (model: AIModel): string => {
  switch (model) {
    case "deepseek-coder":
      return "deepseek/deepseek-coder-33b-instruct";
    case "llama3-70b":
      return "meta-llama/llama-3-70b-instruct";
    case "mixtral-8x7b":
      return "mistralai/mixtral-8x7b-instruct";
    case "claude-3-opus":
      return "anthropic/claude-3-opus";
    default:
      return "deepseek/deepseek-coder-33b-instruct"; // Default fallback
  }
};
