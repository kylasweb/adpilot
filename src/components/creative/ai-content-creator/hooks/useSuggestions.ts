
import { useState, useEffect } from "react";
import { ContentType } from "../types";
import { socialSuggestions, websiteSuggestions, seoSuggestions, brandingSuggestions } from "../data/promptSuggestions";

export const useSuggestions = (contentType: ContentType) => {
  const [promptSuggestions, setPromptSuggestions] = useState<string[]>([]);

  useEffect(() => {
    let suggestions: string[] = [];
    
    switch (contentType) {
      case "social":
        suggestions = getRandomSuggestions(socialSuggestions, 4);
        break;
      case "website":
        suggestions = getRandomSuggestions(websiteSuggestions, 4);
        break;
      case "seo":
        suggestions = getRandomSuggestions(seoSuggestions, 4);
        break;
      case "branding":
        suggestions = getRandomSuggestions(brandingSuggestions, 4);
        break;
      default:
        suggestions = getRandomSuggestions(socialSuggestions, 4);
    }
    
    setPromptSuggestions(suggestions);
  }, [contentType]);

  const getPromptSuggestion = (): string => {
    let allSuggestions: string[] = [];
    
    switch (contentType) {
      case "social":
        allSuggestions = socialSuggestions;
        break;
      case "website":
        allSuggestions = websiteSuggestions;
        break;
      case "seo":
        allSuggestions = seoSuggestions;
        break;
      case "branding":
        allSuggestions = brandingSuggestions;
        break;
      default:
        allSuggestions = socialSuggestions;
    }
    
    const randomIndex = Math.floor(Math.random() * allSuggestions.length);
    return allSuggestions[randomIndex];
  };

  const getRandomSuggestions = (suggestions: string[], count: number): string[] => {
    const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return {
    promptSuggestions,
    getPromptSuggestion
  };
};
