
import React from "react";
import { ContentType, ContentTemplate } from "./types";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useSuggestions } from "./hooks/useSuggestions";

interface ContentEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  contentType: ContentType;
  selectedTemplate: ContentTemplate | null;
}

const ContentEditor = ({
  prompt,
  setPrompt,
  contentType,
  selectedTemplate,
}: ContentEditorProps) => {
  const { promptSuggestions, getPromptSuggestion } = useSuggestions(contentType);

  const handleApplySuggestion = (suggestion: string) => {
    const newPrompt = prompt ? `${prompt}\n\n${suggestion}` : suggestion;
    setPrompt(newPrompt);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Content Description</h3>
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              selectedTemplate
                ? `Describe your ${selectedTemplate.name.toLowerCase()} content...`
                : "Describe the content you want to generate..."
            }
            className="min-h-[200px] resize-y"
          />
          
          {selectedTemplate && (
            <div className="mt-2 text-xs text-muted-foreground">
              <p className="mb-1">
                <span className="font-medium">Template:</span> {selectedTemplate.name}
              </p>
              <p>{selectedTemplate.description}</p>
              {selectedTemplate.promptGuide && (
                <div className="mt-2 p-2 bg-muted rounded text-xs">
                  <span className="font-medium">Prompt Guide:</span> {selectedTemplate.promptGuide}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Prompt Suggestions</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleApplySuggestion(getPromptSuggestion())}
            className="h-7 text-xs"
          >
            <Wand2 className="h-3 w-3 mr-1" />
            Generate New
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {promptSuggestions.map((suggestion, index) => (
            <SuggestionCard
              key={index}
              suggestion={suggestion}
              onApply={handleApplySuggestion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface SuggestionCardProps {
  suggestion: string;
  onApply: (suggestion: string) => void;
}

const SuggestionCard = ({ suggestion, onApply }: SuggestionCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3">
        <p className="text-xs line-clamp-3">{suggestion}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onApply(suggestion)}
          className="w-full mt-2 h-7 text-xs"
        >
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentEditor;
