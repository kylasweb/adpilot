
import React from "react";
import { AIModel, AISuggestion } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface AIConfigPanelProps {
  selectedModel: AIModel;
  onSelectModel: (model: AIModel) => void;
  aiSuggestions: AISuggestion[];
  setAiSuggestions: React.Dispatch<React.SetStateAction<AISuggestion[]>>;
}

const AIConfigPanel = ({
  selectedModel,
  onSelectModel,
  aiSuggestions,
  setAiSuggestions,
}: AIConfigPanelProps) => {
  const handleSuggestionToggle = (id: string) => {
    setAiSuggestions(prev =>
      prev.map(suggestion =>
        suggestion.id === id
          ? { ...suggestion, enabled: !suggestion.enabled }
          : suggestion
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">AI Configuration</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-model">AI Model</Label>
            <Select 
              value={selectedModel} 
              onValueChange={(value) => onSelectModel(value as AIModel)}
            >
              <SelectTrigger id="ai-model">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deepseek-coder">Deepseek Coder</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                <SelectItem value="llama3-70b">Llama 3 70B</SelectItem>
                <SelectItem value="mixtral-8x7b">Mixtral 8x7B</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Temperature</Label>
              <span className="text-xs text-muted-foreground">0.7</span>
            </div>
            <Slider 
              id="temperature"
              defaultValue={[0.7]} 
              max={1} 
              step={0.1} 
              className="w-full" 
            />
            <p className="text-xs text-muted-foreground">
              Controls randomness: lower values are more deterministic, higher values more creative
            </p>
          </div>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="suggestions">
          <AccordionTrigger className="text-sm">AI Suggestions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center space-x-2">
                  <Switch
                    id={`suggestion-${suggestion.id}`}
                    checked={suggestion.enabled}
                    onCheckedChange={() => handleSuggestionToggle(suggestion.id)}
                  />
                  <Label htmlFor={`suggestion-${suggestion.id}`} className="text-xs">
                    {suggestion.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="advanced">
          <AccordionTrigger className="text-sm">Advanced Options</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <span className="text-xs text-muted-foreground">1024</span>
                </div>
                <Slider 
                  id="max-tokens"
                  defaultValue={[1024]} 
                  max={2048} 
                  step={128} 
                  className="w-full" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="top-p">Top P</Label>
                  <span className="text-xs text-muted-foreground">0.9</span>
                </div>
                <Slider 
                  id="top-p"
                  defaultValue={[0.9]} 
                  max={1} 
                  step={0.05} 
                  className="w-full" 
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AIConfigPanel;
