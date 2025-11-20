'use client'

import React, { useState, useEffect, useMemo } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Database, Key, Settings, Bot, Save, RefreshCw, Plus, Trash2 } from "lucide-react";
import { getApiKey, saveApiKey, isProviderEnabled } from "@/services/apiKeyManager";
import { toast } from "sonner";

const AdminAPIManagementPage = () => {
  // API Providers configuration
  const apiProviders = useMemo(() => [
    {
      id: "openai",
      name: "OpenAI",
      description: "GPT models for text and code generation",
      models: [
        { id: "gpt-4o", name: "GPT-4o" },
        { id: "gpt-4o-mini", name: "GPT-4o Mini" },
        { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
        { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" }
      ]
    },
    {
      id: "openrouter",
      name: "OpenRouter",
      description: "Access to multiple AI models through a single API",
      models: [
        { id: "deepseek/deepseek-coder-33b-instruct", name: "DeepSeek Coder 33B" },
        { id: "meta-llama/llama-3-70b-instruct", name: "Llama 3 70B" },
        { id: "mistralai/mixtral-8x7b-instruct", name: "Mixtral 8x7B" },
        { id: "anthropic/claude-3-opus", name: "Claude 3 Opus" },
        { id: "google/gemini-pro", name: "Gemini Pro" }
      ]
    },
    {
      id: "gemini",
      name: "Google Gemini",
      description: "Google's AI models for text and multimodal tasks",
      models: [
        { id: "gemini-pro", name: "Gemini Pro" },
        { id: "gemini-pro-vision", name: "Gemini Pro Vision" }
      ]
    },
    {
      id: "replicate",
      name: "Replicate",
      description: "AI models for image and audio generation",
      models: [
        { id: "stability-ai/sdxl", name: "Stable Diffusion XL" },
        { id: "stability-ai/stable-diffusion", name: "Stable Diffusion" }
      ]
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      description: "Access to thousands of open-source AI models",
      models: [
        { id: "meta-llama/Llama-2-70b-chat-hf", name: "Llama 2 70B" },
        { id: "mistralai/Mistral-7B-v0.1", name: "Mistral 7B" }
      ]
    },
    {
      id: "agentrouter",
      name: "AgentRouter",
      description: "Specialized AI agents for specific tasks",
      models: [
        { id: "agentrouter-default", name: "Default Agent" }
      ]
    },
    {
      id: "bytez",
      name: "Bytez",
      description: "AI model marketplace and deployment",
      models: [
        { id: "bytez-default", name: "Bytez Models" }
      ]
    },
    {
      id: "groq",
      name: "Groq",
      description: "Ultra-fast inference for Llama models",
      models: [
        { id: "llama3-70b-8192", name: "Llama 3 70B (8K)" },
        { id: "llama3-8b-8192", name: "Llama 3 8B (8K)" },
        { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B (32K)" }
      ]
    }
  ], []);

  // State for API keys
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [enabledProviders, setEnabledProviders] = useState<Record<string, boolean>>({});

  // State for model selection
  const [selectedModels, setSelectedModels] = useState<Record<string, string>>({
    contentGeneration: "openrouter",
    imageGeneration: "replicate",
    storyGeneration: "openai"
  });

  // Define types for model assignments
  type ModelAssignment = {
    provider: string;
    model: string;
  };

  type ModelAssignments = {
    contentGeneration: ModelAssignment[];
    imageGeneration: ModelAssignment[];
    storyGeneration: ModelAssignment[];
  };

  // State for model assignments
  const [modelAssignments, setModelAssignments] = useState<ModelAssignments>({
    contentGeneration: [
      { provider: "openrouter", model: "meta-llama/llama-3-70b-instruct" },
      { provider: "openai", model: "gpt-4o" },
      { provider: "gemini", model: "gemini-pro" }
    ],
    imageGeneration: [
      { provider: "replicate", model: "stability-ai/sdxl" }
    ],
    storyGeneration: [
      { provider: "openai", model: "gpt-4o" },
      { provider: "openrouter", model: "anthropic/claude-3-opus" }
    ]
  });

  // Load API keys and provider status on component mount
  useEffect(() => {
    const loadApiKeys = () => {
      const keys: Record<string, string> = {};
      const enabled: Record<string, boolean> = {};

      apiProviders.forEach(provider => {
        keys[provider.id] = getApiKey(provider.id, false) || "";
        enabled[provider.id] = isProviderEnabled(provider.id);
      });

      setApiKeys(keys);
      setEnabledProviders(enabled);
    };

    loadApiKeys();
  }, [apiProviders]);

  // Handle API key changes
  const handleApiKeyChange = (providerId: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [providerId]: value
    }));
  };

  // Handle provider enable/disable
  const handleProviderToggle = (providerId: string, enabled: boolean) => {
    setEnabledProviders(prev => ({
      ...prev,
      [providerId]: enabled
    }));
  };

  // Save all API keys
  const saveAllApiKeys = () => {
    try {
      Object.keys(apiKeys).forEach(providerId => {
        saveApiKey(providerId, apiKeys[providerId], enabledProviders[providerId]);
      });
      toast.success("API keys saved successfully!");
    } catch (error) {
      console.error("Error saving API keys:", error);
      toast.error("Failed to save API keys. Please try again.");
    }
  };

  // Add a new model assignment
  const addModelAssignment = (category: keyof ModelAssignments) => {
    setModelAssignments(prev => ({
      ...prev,
      [category]: [
        ...prev[category],
        { provider: "openai", model: "gpt-4o" }
      ]
    }));
  };

  // Remove a model assignment
  const removeModelAssignment = (category: keyof ModelAssignments, index: number) => {
    setModelAssignments(prev => ({
      ...prev,
      [category]: prev[category].filter((_: ModelAssignment, i: number) => i !== index)
    }));
  };

  // Update a model assignment
  const updateModelAssignment = (category: keyof ModelAssignments, index: number, field: "provider" | "model", value: string) => {
    setModelAssignments(prev => {
      const updated = [...prev[category]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [category]: updated };
    });
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">API Management</h1>
            <p className="text-adsilo-text-secondary mt-1">
              Manage API keys, model selection, and provider configurations.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6 mt-6"
      >
        {/* API Keys Management */}
        <Card className="border-adsilo-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="mr-2 h-5 w-5" />
              API Keys Management
            </CardTitle>
            <CardDescription>
              Configure API keys for external services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {apiProviders.map(provider => (
                <Card key={provider.id} className="border-adsilo-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <CardDescription>{provider.description}</CardDescription>
                      </div>
                      <Switch
                        checked={enabledProviders[provider.id] || false}
                        onCheckedChange={(checked) => handleProviderToggle(provider.id, checked)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor={`api-key-${provider.id}`}>API Key</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`api-key-${provider.id}`}
                          type="password"
                          value={apiKeys[provider.id] || ""}
                          onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                          placeholder={`Enter ${provider.name} API key`}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={saveAllApiKeys}>
                <Save className="mr-2 h-4 w-4" />
                Save All API Keys
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Model Selection */}
        <Card className="border-adsilo-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Model Selection
            </CardTitle>
            <CardDescription>
              Select default models for different tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Content Generation</Label>
                <Select
                  value={selectedModels.contentGeneration}
                  onValueChange={(value) => setSelectedModels(prev => ({ ...prev, contentGeneration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiProviders.map(provider => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="mt-2">
                  <Label className="text-sm text-adsilo-text-secondary">Available Models</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {apiProviders
                        .find(p => p.id === selectedModels.contentGeneration)
                        ?.models.map(model => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Image Generation</Label>
                <Select
                  value={selectedModels.imageGeneration}
                  onValueChange={(value) => setSelectedModels(prev => ({ ...prev, imageGeneration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiProviders.map(provider => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="mt-2">
                  <Label className="text-sm text-adsilo-text-secondary">Available Models</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {apiProviders
                        .find(p => p.id === selectedModels.imageGeneration)
                        ?.models.map(model => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Story Generation</Label>
                <Select
                  value={selectedModels.storyGeneration}
                  onValueChange={(value) => setSelectedModels(prev => ({ ...prev, storyGeneration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiProviders.map(provider => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="mt-2">
                  <Label className="text-sm text-adsilo-text-secondary">Available Models</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {apiProviders
                        .find(p => p.id === selectedModels.storyGeneration)
                        ?.models.map(model => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Assignments */}
        <Card className="border-adsilo-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Model Assignments
            </CardTitle>
            <CardDescription>
              Assign multiple models for redundancy and load balancing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Content Generation Models</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addModelAssignment("contentGeneration")}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Model
                  </Button>
                </div>
                <div className="space-y-3">
                  {modelAssignments.contentGeneration.map((assignment, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Select
                          value={assignment.provider}
                          onValueChange={(value) => updateModelAssignment("contentGeneration", index, "provider", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {apiProviders.map(provider => (
                              <SelectItem key={provider.id} value={provider.id}>
                                {provider.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={assignment.model}
                          onValueChange={(value) => updateModelAssignment("contentGeneration", index, "model", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Model" />
                          </SelectTrigger>
                          <SelectContent>
                            {apiProviders
                              .find(p => p.id === assignment.provider)
                              ?.models.map(model => (
                                <SelectItem key={model.id} value={model.id}>
                                  {model.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeModelAssignment("contentGeneration", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Image Generation Models</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addModelAssignment("imageGeneration")}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Model
                  </Button>
                </div>
                <div className="space-y-3">
                  {modelAssignments.imageGeneration.map((assignment, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Select
                          value={assignment.provider}
                          onValueChange={(value) => updateModelAssignment("imageGeneration", index, "provider", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {apiProviders.map(provider => (
                              <SelectItem key={provider.id} value={provider.id}>
                                {provider.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={assignment.model}
                          onValueChange={(value) => updateModelAssignment("imageGeneration", index, "model", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Model" />
                          </SelectTrigger>
                          <SelectContent>
                            {apiProviders
                              .find(p => p.id === assignment.provider)
                              ?.models.map(model => (
                                <SelectItem key={model.id} value={model.id}>
                                  {model.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeModelAssignment("imageGeneration", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Story Generation Models</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addModelAssignment("storyGeneration")}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Model
                  </Button>
                </div>
                <div className="space-y-3">
                  {modelAssignments.storyGeneration.map((assignment, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Select
                          value={assignment.provider}
                          onValueChange={(value) => updateModelAssignment("storyGeneration", index, "provider", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {apiProviders.map(provider => (
                              <SelectItem key={provider.id} value={provider.id}>
                                {provider.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={assignment.model}
                          onValueChange={(value) => updateModelAssignment("storyGeneration", index, "model", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Model" />
                          </SelectTrigger>
                          <SelectContent>
                            {apiProviders
                              .find(p => p.id === assignment.provider)
                              ?.models.map(model => (
                                <SelectItem key={model.id} value={model.id}>
                                  {model.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeModelAssignment("storyGeneration", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Assignments
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
};

export default AdminAPIManagementPage;