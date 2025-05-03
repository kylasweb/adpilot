
import { useState } from "react";
import { ContentType, ContentTemplate, AIModel, AISuggestion, AdvancedContentSettings } from "../types";
import { getOpenRouterModel } from "../utils/aiModelMapping";
import { toast } from "sonner";
import { getApiKey, isProviderEnabled } from "@/services/apiKeyManager";

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
    template: ContentTemplate | null,
    advancedSettings?: AdvancedContentSettings
  ): Promise<string> => {
    setIsGenerating(true);
    try {
      // Enhance the prompt with the content type, template, and advanced settings
      let enhancedPrompt = prompt;
      
      if (template || advancedSettings) {
        enhancedPrompt = `I need to create ${contentType} content`;
        
        if (template) {
          enhancedPrompt += ` using the "${template.name}" template. 
          ${template.promptGuide ? `Note: ${template.promptGuide}` : ''}`;
        }
        
        if (advancedSettings) {
          enhancedPrompt += `\n\nThe content should be written in ${advancedSettings.language} with a ${advancedSettings.tone} tone and ${advancedSettings.style} style.`;
          
          if (advancedSettings.useCase) {
            enhancedPrompt += `\nThe purpose of this content is for ${advancedSettings.useCase.replace("_", " ")}.`;
          }
          
          if (advancedSettings.targetAudience) {
            enhancedPrompt += `\nThe target audience is ${advancedSettings.targetAudience}.`;
          }
          
          if (advancedSettings.keyPhrases && advancedSettings.keyPhrases.length > 0) {
            enhancedPrompt += `\nPlease include these key phrases naturally in the content: ${advancedSettings.keyPhrases.join(", ")}.`;
          }
          
          if (advancedSettings.contentLength) {
            const wordCount = advancedSettings.contentLength === "short" ? "about 300" : 
                             advancedSettings.contentLength === "medium" ? "about 600" : "at least 1000";
            enhancedPrompt += `\nThe content should be ${wordCount} words in length.`;
          }
        }
        
        enhancedPrompt += `\n\nHere's my content description:
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
      toast.error("Content generation failed. Please check API keys in the API Management page.");
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWithOpenRouter = async (prompt: string, model: AIModel): Promise<string> => {
    const openRouterModel = getOpenRouterModel(model);
    const apiKey = getApiKey("openrouter");
    
    if (!apiKey || !isProviderEnabled("openrouter")) {
      toast.error("OpenRouter API key is missing or disabled. Please check API Management.");
      throw new Error("OpenRouter API key is missing or disabled");
    }
    
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
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
          max_tokens: 2048
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API error response:", errorData);
        throw new Error(errorData.error?.message || "Error generating content with OpenRouter");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API error:", error);
      toast.error("Failed to generate with the selected AI model. Please check your API key.");
      throw error;
    }
  };

  const generateWithGemini = async (prompt: string): Promise<string> => {
    const apiKey = getApiKey("gemini");
    
    if (!apiKey || !isProviderEnabled("gemini")) {
      toast.error("Gemini API key is missing or disabled. Please check API Management.");
      throw new Error("Gemini API key is missing or disabled");
    }
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
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
            maxOutputTokens: 2048,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error response:", errorData);
        throw new Error(errorData.error?.message || "Error generating content with Gemini");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API error:", error);
      toast.error("Failed to generate with Gemini. Please check your API key.");
      throw error;
    }
  };

  const generateImage = async (prompt: string): Promise<string> => {
    setIsGenerating(true);
    try {
      // First check Replicate API for image generation
      const replicateKey = getApiKey("replicate");
      if (replicateKey && isProviderEnabled("replicate")) {
        return await generateWithReplicate(prompt, replicateKey);
      }

      // Fallback to Gemini for description if Replicate isn't available
      const geminiKey = getApiKey("gemini");
      if (!geminiKey || !isProviderEnabled("gemini")) {
        toast.error("No available image generation API. Please check API Management.");
        throw new Error("No available image generation API");
      }
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
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
      
      toast.info("Image description generated. Actual image generation requires Replicate API.");
      return imageDescription;
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image. Please check API keys in API Management.");
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  // Method to generate image with Replicate API
  const generateWithReplicate = async (prompt: string, apiKey: string): Promise<string> => {
    try {
      // Step 1: Start the prediction
      const startResponse = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${apiKey}`
        },
        body: JSON.stringify({
          version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", // Stable Diffusion XL
          input: {
            prompt: prompt,
            negative_prompt: "blurry, low quality, distorted proportions, disfigured",
            width: 768,
            height: 768,
            num_outputs: 1
          }
        })
      });

      if (!startResponse.ok) {
        const errorData = await startResponse.json();
        throw new Error(errorData.detail || "Failed to start image generation");
      }

      const prediction = await startResponse.json();
      const predictionId = prediction.id;

      // Step 2: Poll for results (with a timeout)
      const maxAttempts = 30;
      let attempts = 0;
      
      while (attempts < maxAttempts) {
        attempts++;
        
        const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
          headers: {
            "Authorization": `Token ${apiKey}`,
            "Content-Type": "application/json",
          }
        });

        if (!pollResponse.ok) {
          const errorData = await pollResponse.json();
          throw new Error(errorData.detail || "Failed to check image generation status");
        }

        const result = await pollResponse.json();
        
        if (result.status === "succeeded") {
          // Return the first output image URL
          return result.output[0];
        } 
        
        if (result.status === "failed") {
          throw new Error("Image generation failed: " + (result.error || "Unknown error"));
        }
        
        // Wait before polling again
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      throw new Error("Image generation timed out");
    } catch (error) {
      console.error("Replicate API error:", error);
      throw error;
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
