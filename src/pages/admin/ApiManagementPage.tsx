
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Eye, EyeOff, Save, RefreshCw, Shield, Key, Cpu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const API_STORAGE_KEY = "adpilot-api-keys";

// Default API providers
const defaultApiProviders = [
  {
    id: "openai",
    name: "OpenAI",
    description: "ChatGPT, DALL-E, and other AI models",
    isEnabled: true,
    apiKey: ""
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    description: "Gateway to open-source models like Claude, Llama, and more",
    isEnabled: true,
    apiKey: ""
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google's multimodal AI model",
    isEnabled: true,
    apiKey: ""
  },
  {
    id: "replicate",
    name: "Replicate",
    description: "Open-source models hosted in the cloud",
    isEnabled: true,
    apiKey: ""
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    description: "Open-source model repository and inference API",
    isEnabled: true,
    apiKey: ""
  }
];

// Default API keys for development (would normally be stored in environment variables)
const developmentApiKeys = {
  openai: process.env.VITE_OPENAI_API_KEY || "",
  openrouter: process.env.VITE_OPENROUTER_API_KEY || "",
  gemini: process.env.VITE_GEMINI_API_KEY || "",
  replicate: process.env.VITE_REPLICATE_API_KEY || "",
  huggingface: process.env.VITE_HUGGINGFACE_API_KEY || "",
  agentrouter: process.env.VITE_AGENTROUTER_API_KEY || "",
  bytez: process.env.VITE_BYTEZ_API_KEY || "",
  groq: process.env.VITE_GROQ_API_KEY || ""
};

interface ApiProvider {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  apiKey: string;
}

const ApiManagementPage: React.FC = () => {
  const [apiProviders, setApiProviders] = useState<ApiProvider[]>([]);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [newProvider, setNewProvider] = useState({ name: "", description: "", apiKey: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("api-keys");
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  // Initialize with stored API keys or defaults
  useEffect(() => {
    const loadApiKeys = () => {
      const storedData = localStorage.getItem(API_STORAGE_KEY);
      if (storedData) {
        try {
          setApiProviders(JSON.parse(storedData));
        } catch (error) {
          console.error("Error loading API keys:", error);
          initializeDefaultProviders();
        }
      } else {
        initializeDefaultProviders();
      }
    };

    const loadOrganizationId = () => {
      // In a real app, this would come from an auth context
      setOrganizationId("org_test123456");
    };

    loadApiKeys();
    loadOrganizationId();
  }, []);

  const initializeDefaultProviders = () => {
    const initializedProviders = defaultApiProviders.map(provider => ({
      ...provider,
      apiKey: developmentApiKeys[provider.id as keyof typeof developmentApiKeys] || ""
    }));
    setApiProviders(initializedProviders);
    saveToLocalStorage(initializedProviders);
  };

  const saveToLocalStorage = (providers: ApiProvider[]) => {
    localStorage.setItem(API_STORAGE_KEY, JSON.stringify(providers));
  };

  const handleToggleVisibility = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleEnabled = (id: string) => {
    const updatedProviders = apiProviders.map(provider =>
      provider.id === id ? { ...provider, isEnabled: !provider.isEnabled } : provider
    );
    setApiProviders(updatedProviders);
    saveToLocalStorage(updatedProviders);

    const provider = updatedProviders.find(p => p.id === id);
    if (provider) {
      toast.success(`${provider.name} API ${provider.isEnabled ? 'enabled' : 'disabled'}`);
    }
  };

  const handleApiKeyChange = (id: string, value: string) => {
    const updatedProviders = apiProviders.map(provider =>
      provider.id === id ? { ...provider, apiKey: value } : provider
    );
    setApiProviders(updatedProviders);
  };

  const handleSaveApiKeys = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveToLocalStorage(apiProviders);
      setIsSaving(false);
      toast.success("API keys saved successfully");
    }, 800);
  };

  const handleAddNewProvider = () => {
    if (!newProvider.name.trim()) {
      toast.error("Provider name is required");
      return;
    }

    const id = newProvider.name.toLowerCase().replace(/\s+/g, '-');

    if (apiProviders.some(provider => provider.id === id)) {
      toast.error("A provider with this name already exists");
      return;
    }

    const updatedProviders = [
      ...apiProviders,
      {
        id,
        name: newProvider.name.trim(),
        description: newProvider.description.trim(),
        isEnabled: true,
        apiKey: newProvider.apiKey.trim()
      }
    ];

    setApiProviders(updatedProviders);
    saveToLocalStorage(updatedProviders);
    setNewProvider({ name: "", description: "", apiKey: "" });
    toast.success("New API provider added");
  };

  const handleTestApiKey = (id: string) => {
    const provider = apiProviders.find(p => p.id === id);
    if (!provider || !provider.apiKey) {
      toast.error("No API key to test");
      return;
    }

    toast.info(`Testing ${provider.name} API key...`);

    // This would typically be a real API validation call
    setTimeout(() => {
      toast.success(`${provider.name} API key is valid`);
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Management</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Manage API keys and integrations for AI generation services
            </p>
          </div>
          <Button onClick={handleSaveApiKeys} disabled={isSaving}>
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-md">
          <Shield className="h-5 w-5 text-amber-500 mr-2" />
          <p className="text-sm text-amber-800">
            API keys are currently stored in the browser's local storage for demonstration purposes.
            In a production environment, these should be securely stored server-side.
            <strong className="ml-1">Organization ID: {organizationId || "Not assigned"}</strong>
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="add-provider">Add New Provider</TabsTrigger>
            <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="space-y-4">
            {apiProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <Switch
                      checked={provider.isEnabled}
                      onCheckedChange={() => handleToggleEnabled(provider.id)}
                    />
                  </div>
                  <CardDescription>{provider.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor={`api-key-${provider.id}`}>API Key</Label>
                    <div className="flex items-center space-x-2">
                      <div className="relative w-full">
                        <Input
                          id={`api-key-${provider.id}`}
                          value={provider.apiKey}
                          onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                          type={showKeys[provider.id] ? "text" : "password"}
                          placeholder="Enter API key"
                          className="pr-10"
                          disabled={!provider.isEnabled}
                        />
                        <button
                          type="button"
                          onClick={() => handleToggleVisibility(provider.id)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showKeys[provider.id] ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleTestApiKey(provider.id)}
                        disabled={!provider.isEnabled || !provider.apiKey}
                      >
                        Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="add-provider">
            <Card>
              <CardHeader>
                <CardTitle>Add New API Provider</CardTitle>
                <CardDescription>
                  Add a custom API provider for your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provider-name">Provider Name</Label>
                  <Input
                    id="provider-name"
                    value={newProvider.name}
                    onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                    placeholder="e.g. Custom AI Service"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider-description">Description</Label>
                  <Input
                    id="provider-description"
                    value={newProvider.description}
                    onChange={(e) => setNewProvider({ ...newProvider, description: e.target.value })}
                    placeholder="Brief description of the service"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider-api-key">API Key (Optional)</Label>
                  <Input
                    id="provider-api-key"
                    value={newProvider.apiKey}
                    onChange={(e) => setNewProvider({ ...newProvider, apiKey: e.target.value })}
                    type="password"
                    placeholder="Enter API key"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddNewProvider}>
                  <Key className="mr-2 h-4 w-4" />
                  Add Provider
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>API Usage & Limits</CardTitle>
                <CardDescription>
                  Monitor your API usage and set limits for each provider
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {apiProviders.filter(p => p.isEnabled && p.apiKey).map((provider) => (
                    <div key={`usage-${provider.id}`} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{provider.name}</h3>
                        <span className="text-sm text-adpilot-text-secondary">
                          {Math.floor(Math.random() * 1000)} / Unlimited credits
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-adpilot-primary"
                          style={{ width: `${Math.floor(Math.random() * 80)}%` }}
                        />
                      </div>
                      <p className="text-xs text-adpilot-text-muted">
                        Last used: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  ))}

                  {apiProviders.filter(p => p.isEnabled && p.apiKey).length === 0 && (
                    <div className="text-center py-6">
                      <Cpu className="h-10 w-10 text-adpilot-text-muted mx-auto mb-4" />
                      <p className="text-adpilot-text-muted">No active API keys to show usage data for</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ApiManagementPage;
