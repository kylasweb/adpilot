
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { StoryData } from "@/hooks/useStoryGenerator";
import { Button } from "@/components/ui/button";
import { Copy, Download, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StoryOutputProps {
  isLoading: boolean;
  storyData: StoryData | null;
  errorMessage?: string | null;
}

const StoryOutput: React.FC<StoryOutputProps> = ({ isLoading, storyData, errorMessage }) => {
  const handleCopy = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${description} copied to clipboard`);
  };
  
  const handleExport = () => {
    if (!storyData) return;
    
    const storyText = `
# AI Generated Story

## Hook Visual
${storyData.hook}

## Hook Text
${storyData.hookText}

## Story
${storyData.story}

## Learning Points
${storyData.learningPoints.map(point => `- ${point}`).join('\n')}

## Call to Action
${storyData.cta}

## Visual Elements
${storyData.visuals.map(visual => `- ${visual}`).join('\n')}
    `;
    
    const blob = new Blob([storyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-generated-story.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Story exported successfully");
  };
  
  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Generating Story...</CardTitle>
          <CardDescription>
            Our AI is crafting your platform-specific narrative
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-adpilot-primary mx-auto mb-4" />
            <p className="text-adpilot-text-secondary">
              Crafting an engaging narrative tailored to your specifications
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (errorMessage) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-red-500 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Generation Error
          </CardTitle>
          <CardDescription>
            There was a problem generating your story
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{errorMessage}</p>
            <p className="text-sm text-red-600 mt-2">
              Please check your API keys in the API Management section or try again with different parameters.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!storyData) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Story Output</CardTitle>
          <CardDescription>
            Your generated story will appear here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center text-center text-adpilot-text-muted">
          <div>
            <p className="mb-2">Configure your story parameters on the left and click "Generate Story"</p>
            <p className="text-sm">The AI will create a platform-specific narrative based on your selections</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Generated Story</CardTitle>
        <CardDescription>
          Platform-optimized narrative based on your parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-6">
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium text-adpilot-text-secondary">Hook Visual</h3>
          <div className="bg-adpilot-bg p-3 rounded-md">
            <p>{storyData.hook}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCopy(storyData.hook, "Hook visual")}
              className="mt-2"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium text-adpilot-text-secondary">Hook Text</h3>
          <div className="bg-adpilot-bg p-3 rounded-md">
            <p>{storyData.hookText}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCopy(storyData.hookText, "Hook text")}
              className="mt-2"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium text-adpilot-text-secondary">Story</h3>
          <div className="bg-adpilot-bg p-3 rounded-md">
            <p className="whitespace-pre-line">{storyData.story}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCopy(storyData.story, "Story")}
              className="mt-2"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium text-adpilot-text-secondary">Learning Points</h3>
          <div className="bg-adpilot-bg p-3 rounded-md">
            <ul className="list-disc pl-5 space-y-1">
              {storyData.learningPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCopy(storyData.learningPoints.join("\n- "), "Learning points")}
              className="mt-2"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium text-adpilot-text-secondary">Call to Action</h3>
          <div className="bg-adpilot-bg p-3 rounded-md">
            <p>{storyData.cta}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCopy(storyData.cta, "Call to action")}
              className="mt-2"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium text-adpilot-text-secondary">Visual Elements</h3>
          <div className="bg-adpilot-bg p-3 rounded-md">
            <ul className="list-disc pl-5 space-y-1">
              {storyData.visuals.map((visual, index) => (
                <li key={index}>{visual}</li>
              ))}
            </ul>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleCopy(storyData.visuals.join("\n- "), "Visual elements")}
              className="mt-2"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Button onClick={handleExport} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Export Story
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryOutput;
