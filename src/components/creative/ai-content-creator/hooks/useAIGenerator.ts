
import { useState } from "react";
import { ContentType, ContentTemplate, AIModel, AISuggestion } from "../types";
import { getOpenRouterModel } from "../utils/aiModelMapping";
import { toast } from "sonner";

const OPENROUTER_API_KEY = "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";
const GEMINI_API_KEY = "AIzaSyAPi9CB4lcHCvOGs6fTxZdcUSU48FUFgps";

const DEFAULT_SUGGESTIONS: AISuggestion[] = [
  { id: "keyword-suggestions", name: "Keyword Suggestions", enabled: true },
  { id: "content-improvement", name: "Content Improvement Ideas", enabled: true },
  { id: "seo-optimization", name: "SEO Optimization", enabled: true },
  { id: "tone-analysis", name: "Tone and Style Analysis", enabled: false },
  { id: "competitor-insights", name: "Competitor Content Insights", enabled: false },
];

export const useAIGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>(DEFAULT_SUGGESTIONS);

  const generateContent = async (
    prompt: string,
    model: AIModel,
    contentType: ContentType,
    template: ContentTemplate | null
  ): Promise<string> => {
    setIsGenerating(true);
    try {
      // Enhance the prompt with the content type and template
      let enhancedPrompt = prompt;
      
      if (template) {
        enhancedPrompt = `I need to create ${contentType} content using the "${template.name}" template. 
        ${template.promptGuide ? `Note: ${template.promptGuide}` : ''}
        
        Here's my content description:
        ${prompt}
        
        Format the output accordingly and provide well-structured content that follows best practices for ${contentType} content.`;
      }

      // Use OpenRouter for text generation
      if (model !== "gemini-pro") {
        return await generateWithOpenRouter(enhancedPrompt, model);
      } else {
        return await generateWithGemini(enhancedPrompt);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWithOpenRouter = async (prompt: string, model: AIModel): Promise<string> => {
    const openRouterModel = getOpenRouterModel(model);
    
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "AI Content Creator"
        },
        body: JSON.stringify({
          model: openRouterModel,
          messages: [
            {
              role: "system",
              content: "You are an expert content creator that specializes in creating professional, engaging, and SEO-optimized content. Format your responses with clear sections and use descriptive language."
            },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1024
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error generating content with OpenRouter");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API error:", error);
      toast.error("Failed to generate with the selected AI model");
      throw error;
    }
  };

  const generateWithGemini = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Error generating content with Gemini");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API error:", error);
      toast.error("Failed to generate with Gemini");
      throw error;
    }
  };

  const generateImage = async (prompt: string): Promise<string> => {
    setIsGenerating(true);
    try {
      // Using Gemini for image generation
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Describe a detailed image based on this prompt: ${prompt}. Focus on visual details that would be important for creating an actual image.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Error generating image description with Gemini");
      }

      const data = await response.json();
      const imageDescription = data.candidates[0].content.parts[0].text;
      
      // Here we would typically integrate with an actual image generation API
      // For now, we'll return the image description as a placeholder
      toast.info("Image generation API integration is a placeholder");
      return imageDescription;
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image");
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateContent,
    generateImage,
    isGenerating,
    aiSuggestions,
    setAiSuggestions
  };
};
