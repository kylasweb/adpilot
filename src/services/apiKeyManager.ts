
// API Key Manager Service
export interface ApiProvider {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  apiKey: string;
}

const API_STORAGE_KEY = "adsilo-api-keys";

/**
 * Initialize all default API providers
 */
export const initializeDefaultProviders = (): void => {
  try {
    Object.entries(defaultApiKeys).forEach(([providerId, apiKey]) => {
      // Only initialize if not already in storage
      const storedData = localStorage.getItem(API_STORAGE_KEY);
      if (!storedData || !(JSON.parse(storedData) as ApiProvider[]).find(p => p.id === providerId)) {
        saveApiKey(providerId, apiKey, true);
      }
    });
  } catch (error) {
    console.error("Error initializing default providers:", error);
  }
};

// Default API keys for development (would normally be stored in environment variables)
const defaultApiKeys: Record<string, string> = {
  openai: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  openrouter: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "",
  gemini: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
  replicate: process.env.NEXT_PUBLIC_REPLICATE_API_KEY || "",
  huggingface: process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || "",
  agentrouter: process.env.NEXT_PUBLIC_AGENTROUTER_API_KEY || "",
  bytez: process.env.NEXT_PUBLIC_BYTEZ_API_KEY || "",
  groq: process.env.NEXT_PUBLIC_GROQ_API_KEY || ""
};

/**
 * Get the API key for a specific provider
 * @param providerId - The ID of the provider (openai, openrouter, etc.)
 * @param useDefault - Whether to fall back to default keys if none is stored
 * @returns The API key or null if none is found or the provider is disabled
 */
export const getApiKey = (providerId: string, useDefault = true): string | null => {
  try {
    // Try to get the key from local storage first
    const storedData = localStorage.getItem(API_STORAGE_KEY);
    if (storedData) {
      const providers = JSON.parse(storedData) as ApiProvider[];
      const provider = providers.find(p => p.id === providerId);

      // If provider is found and enabled, return its key
      if (provider) {
        if (!provider.isEnabled) return null;
        if (provider.apiKey) return provider.apiKey;
      }
    }

    // If no stored data or provider not found, initialize with default key
    if (useDefault && defaultApiKeys[providerId]) {
      // Initialize provider with default key
      saveApiKey(providerId, defaultApiKeys[providerId], true);
      return defaultApiKeys[providerId];
    }

    return null;
  } catch (error) {
    console.error("Error accessing API key:", error);
    return useDefault ? defaultApiKeys[providerId] || null : null;
  }
};

/**
 * Check if a specific provider is enabled
 * @param providerId - The ID of the provider to check
 * @returns Boolean indicating if the provider is enabled
 */
export const isProviderEnabled = (providerId: string): boolean => {
  try {
    const storedData = localStorage.getItem(API_STORAGE_KEY);
    if (storedData) {
      const providers = JSON.parse(storedData) as ApiProvider[];
      const provider = providers.find(p => p.id === providerId);
      if (provider) {
        return provider.isEnabled;
      }
    }

    // If no stored data or provider not found, initialize with default state
    if (defaultApiKeys[providerId]) {
      saveApiKey(providerId, defaultApiKeys[providerId], true);
      return true;
    }

    return false;
  } catch {
    return defaultApiKeys[providerId] ? true : false;
  }
};

/**
 * Save an API key for a specific provider
 * @param providerId - The ID of the provider
 * @param apiKey - The API key to save
 * @param enabled - Whether the provider should be enabled
 */
export const saveApiKey = (
  providerId: string,
  apiKey: string,
  enabled = true
): void => {
  try {
    const storedData = localStorage.getItem(API_STORAGE_KEY);
    let providers: ApiProvider[] = [];

    if (storedData) {
      providers = JSON.parse(storedData);
      const index = providers.findIndex(p => p.id === providerId);

      if (index >= 0) {
        // Update existing provider
        providers[index] = {
          ...providers[index],
          apiKey,
          isEnabled: enabled
        };
      } else {
        // Add new provider
        providers.push({
          id: providerId,
          name: providerId.charAt(0).toUpperCase() + providerId.slice(1), // Capitalize
          description: `API provider for ${providerId}`,
          apiKey,
          isEnabled: enabled
        });
      }
    } else {
      // Create new providers array with this one
      providers = [{
        id: providerId,
        name: providerId.charAt(0).toUpperCase() + providerId.slice(1),
        description: `API provider for ${providerId}`,
        apiKey,
        isEnabled: enabled
      }];
    }

    localStorage.setItem(API_STORAGE_KEY, JSON.stringify(providers));
  } catch (error) {
    console.error("Error saving API key:", error);
  }
};
