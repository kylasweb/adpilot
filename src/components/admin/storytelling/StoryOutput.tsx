
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StoryOutputProps {
  isLoading: boolean;
  storyData: {
    hook: string;
    hookText: string;
    story: string;
    learningPoints: string[];
    cta: string;
    visuals: string[];
  } | null;
}

export function StoryOutput({ isLoading, storyData }: StoryOutputProps) {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard.",
    });
  };
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Generating Your Story...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Our AI is crafting your perfect story...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!storyData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Story Output</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <p className="text-muted-foreground">Complete the form and click "Generate Story" to create your content.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <CardTitle>Your AI-Generated Story</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="story">
          <TabsList className="mb-4">
            <TabsTrigger value="story">Complete Story</TabsTrigger>
            <TabsTrigger value="hook">Hook & Opening</TabsTrigger>
            <TabsTrigger value="learning">Key Points</TabsTrigger>
            <TabsTrigger value="cta">Call to Action</TabsTrigger>
            <TabsTrigger value="visuals">Visual Guidance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="story">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-bold mb-2">Full Story</h3>
                <p className="whitespace-pre-line">{storyData.story}</p>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(storyData.story)}>
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hook">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-bold mb-2">Hook Visual Description</h3>
                <p className="whitespace-pre-line">{storyData.hook}</p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-bold mb-2">Hook Text</h3>
                <p className="whitespace-pre-line">{storyData.hookText}</p>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(`${storyData.hook}\n\n${storyData.hookText}`)}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="learning">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-bold mb-2">Key Learning Points</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {storyData.learningPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(storyData.learningPoints.join("\n\n"))}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cta">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-bold mb-2">Call to Action</h3>
                <p className="whitespace-pre-line">{storyData.cta}</p>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(storyData.cta)}>
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="visuals">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-bold mb-2">Visual Suggestions</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {storyData.visuals.map((visual, index) => (
                    <li key={index}>{visual}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(storyData.visuals.join("\n\n"))}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Save to Library
        </Button>
        <Button>Share with Team</Button>
      </CardFooter>
    </Card>
  );
}

export default StoryOutput;
