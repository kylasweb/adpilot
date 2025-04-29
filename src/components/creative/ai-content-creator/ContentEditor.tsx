
import React, { useState } from "react";
import { ContentType, ContentTemplate, AdvancedContentSettings, ContentTone, ContentStyle, ContentUseCase, ContentLanguage } from "./types";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, Settings2, ChevronDown, ChevronUp } from "lucide-react";
import { useSuggestions } from "./hooks/useSuggestions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ContentEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  contentType: ContentType;
  selectedTemplate: ContentTemplate | null;
  advancedSettings: AdvancedContentSettings;
  setAdvancedSettings: React.Dispatch<React.SetStateAction<AdvancedContentSettings>>;
}

const ContentEditor = ({
  prompt,
  setPrompt,
  contentType,
  selectedTemplate,
  advancedSettings,
  setAdvancedSettings,
}: ContentEditorProps) => {
  const { promptSuggestions, getPromptSuggestion } = useSuggestions(contentType);
  const [keyPhrase, setKeyPhrase] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleApplySuggestion = (suggestion: string) => {
    const newPrompt = prompt ? `${prompt}\n\n${suggestion}` : suggestion;
    setPrompt(newPrompt);
  };

  const addKeyPhrase = () => {
    if (keyPhrase.trim() && !advancedSettings.keyPhrases?.includes(keyPhrase.trim())) {
      setAdvancedSettings(prev => ({
        ...prev,
        keyPhrases: [...(prev.keyPhrases || []), keyPhrase.trim()]
      }));
      setKeyPhrase("");
    }
  };

  const removeKeyPhrase = (phrase: string) => {
    setAdvancedSettings(prev => ({
      ...prev,
      keyPhrases: prev.keyPhrases?.filter(p => p !== phrase) || []
    }));
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
        <Button 
          onClick={() => setShowAdvanced(!showAdvanced)} 
          variant="outline" 
          className="w-full flex justify-between items-center mb-4"
        >
          <div className="flex items-center">
            <Settings2 className="h-4 w-4 mr-2" />
            <span>Advanced Content Settings</span>
          </div>
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {showAdvanced && (
          <div className="space-y-6 border rounded-md p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="content-tone">Content Tone</Label>
                <Select 
                  value={advancedSettings.tone} 
                  onValueChange={(value) => setAdvancedSettings({...advancedSettings, tone: value as ContentTone})}
                >
                  <SelectTrigger id="content-tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="empathetic">Empathetic</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content-style">Content Style</Label>
                <Select 
                  value={advancedSettings.style} 
                  onValueChange={(value) => setAdvancedSettings({...advancedSettings, style: value as ContentStyle})}
                >
                  <SelectTrigger id="content-style">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="analytical">Analytical</SelectItem>
                    <SelectItem value="narrative">Narrative</SelectItem>
                    <SelectItem value="descriptive">Descriptive</SelectItem>
                    <SelectItem value="instructional">Instructional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content-language">Language</Label>
                <Select 
                  value={advancedSettings.language} 
                  onValueChange={(value) => setAdvancedSettings({...advancedSettings, language: value as ContentLanguage})}
                >
                  <SelectTrigger id="content-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="portuguese">Portuguese</SelectItem>
                    <SelectItem value="russian">Russian</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="chinese">Chinese (Simplified)</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                    <SelectItem value="malayalam">Malayalam</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content-use-case">Use Case</Label>
                <Select 
                  value={advancedSettings.useCase || ""}
                  onValueChange={(value) => setAdvancedSettings({...advancedSettings, useCase: value as ContentUseCase})}
                >
                  <SelectTrigger id="content-use-case">
                    <SelectValue placeholder="Select use case" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead_generation">Lead Generation</SelectItem>
                    <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                    <SelectItem value="customer_retention">Customer Retention</SelectItem>
                    <SelectItem value="product_launch">Product Launch</SelectItem>
                    <SelectItem value="event_promotion">Event Promotion</SelectItem>
                    <SelectItem value="customer_education">Customer Education</SelectItem>
                    <SelectItem value="thought_leadership">Thought Leadership</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content-length">Content Length</Label>
                <Select 
                  value={advancedSettings.contentLength || "medium"} 
                  onValueChange={(value) => setAdvancedSettings({...advancedSettings, contentLength: value as "short" | "medium" | "long"})}
                >
                  <SelectTrigger id="content-length">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (~300 words)</SelectItem>
                    <SelectItem value="medium">Medium (~600 words)</SelectItem>
                    <SelectItem value="long">Long (~1000+ words)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input
                  id="target-audience"
                  value={advancedSettings.targetAudience || ""}
                  onChange={(e) => setAdvancedSettings({...advancedSettings, targetAudience: e.target.value})}
                  placeholder="e.g. Small business owners, Millennials"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Key Phrases</Label>
              <div className="flex gap-2">
                <Input
                  value={keyPhrase}
                  onChange={(e) => setKeyPhrase(e.target.value)}
                  placeholder="Add key phrases to include"
                  onKeyDown={(e) => e.key === "Enter" && addKeyPhrase()}
                />
                <Button onClick={addKeyPhrase} type="button" variant="outline">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {advancedSettings.keyPhrases?.map((phrase, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {phrase}
                    <button 
                      onClick={() => removeKeyPhrase(phrase)}
                      className="ml-1 h-4 w-4 rounded-full hover:bg-gray-300 inline-flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
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
