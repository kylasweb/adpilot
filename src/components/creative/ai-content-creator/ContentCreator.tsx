
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ContentTypeSelector from "./ContentTypeSelector";
import AIConfigPanel from "./AIConfigPanel";
import ContentEditor from "./ContentEditor";
import { ContentType, AIModel, ContentTemplate, AdvancedContentSettings } from "./types";
import { useAIGenerator } from "./hooks/useAIGenerator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Download, Copy, Languages } from "lucide-react";
import { toast } from "sonner";

interface ContentCreatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContentCreator = ({ open, onOpenChange }: ContentCreatorProps) => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-bold">AI Content Creator</DialogTitle>
        </DialogHeader>
        
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
                aiSuggestions={aiSuggestions}
                setAiSuggestions={setAiSuggestions}
              />
            </div>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="px-6 border-b">
                <TabsList className="mt-2">
                  <TabsTrigger value="create">Create</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="create" className="flex-1 overflow-y-auto p-6 m-0">
                <ContentEditor 
                  prompt={prompt} 
                  setPrompt={setPrompt} 
                  contentType={contentType}
                  selectedTemplate={selectedTemplate}
                  advancedSettings={advancedSettings}
                  setAdvancedSettings={setAdvancedSettings}
                />
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    className="px-6"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Content"
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="flex-1 flex flex-col overflow-hidden p-0 m-0">
                <div className="flex items-center px-6 py-2 border-b">
                  <Languages className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium capitalize">
                    {advancedSettings.language} | {advancedSettings.tone} | {advancedSettings.style}
                  </span>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="prose max-w-none">
                    {generatedContent ? (
                      <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
                    ) : (
                      <p className="text-gray-400 italic">Generated content will appear here</p>
                    )}
                  </div>
                </div>
                
                {generatedContent && (
                  <div className="border-t p-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCopy}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="outline" onClick={handleExport}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save to Library
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
