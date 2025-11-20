
import React, { useState } from "react";
import ContentTypeSelector from "./ContentTypeSelector";
import AIConfigPanel from "./AIConfigPanel";
import ContentEditor from "./ContentEditor";
import { ContentType, AIModel, ContentTemplate, AdvancedContentSettings } from "./types";
import { useAIGenerator } from "./hooks/useAIGenerator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Download, Copy, Languages } from "lucide-react";
import { toast } from "sonner";

export const ContentCreator = () => {
  const [contentType, setContentType] = useState<ContentType>("social");
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModel>("deepseek-coder");
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [activeTab, setActiveTab] = useState("create");
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedContentSettings>({
    tone: "professional",
    style: "informative",
    language: "english",
    useCase: undefined,
    targetAudience: "",
    keyPhrases: [],
    contentLength: "medium"
  });

  const {
    generateContent,
    generateImage,
    isGenerating,
    aiSuggestions,
    setAiSuggestions
  } = useAIGenerator();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      const content = await generateContent(
        prompt,
        selectedModel,
        contentType,
        selectedTemplate,
        advancedSettings
      );
      setGeneratedContent(content);
      setActiveTab("preview");
      toast.success("Content generated successfully!");
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
      console.error("Content generation error:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Content copied to clipboard!");
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    toast.success("Content saved to your library!");
  };

  const handleExport = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contentType}-content.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content exported successfully!");
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col border rounded-lg bg-card shadow-sm">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-adsilo-primary">AI Content Creator</h2>
      </div>

      <div className="flex h-full overflow-hidden">
        <div className="w-72 border-r p-4 bg-gray-50 overflow-y-auto">
          <ContentTypeSelector
            selectedType={contentType}
            onSelectType={setContentType}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />

          <div className="mt-6">
            <AIConfigPanel
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
              advancedSettings={advancedSettings}
              setAdvancedSettings={setAdvancedSettings}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b">
              <div className="px-4">
                <TabsList className="mt-2">
                  <TabsTrigger value="create">Create</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="create" className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Content Prompt</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the content you want to create..."
                    className="w-full h-32 p-3 border rounded-md resize-none focus:ring-2 focus:ring-adsilo-primary focus:border-transparent"
                  />
                </div>

                {aiSuggestions.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">AI Suggestions:</h3>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPrompt(suggestion.name)}
                          className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                          {suggestion.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setPrompt("")}
                    disabled={!prompt.trim() || isGenerating}
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Content'
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 flex-1 overflow-auto">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {generatedContent || "Generated content will appear here..."}
                  </pre>
                </div>
              </div>              {generatedContent && (
                <div className="border-t p-4 flex justify-between items-center bg-gray-50">
                  <div className="flex items-center">
                    <Languages className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">Content length: {generatedContent.length} characters</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={handleCopy}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm" onClick={handleExport}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;
