
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface InteractiveElementSelectorProps {
  elements: string[];
  setElements: (value: string[]) => void;
  platform: string;
}

// Define available interactive elements by platform
const platformElements: Record<string, Array<{ id: string; label: string; description: string }>> = {
  // Instagram elements
  instagram: [
    { id: "polls", label: "Polls", description: "Simple polls to gather audience opinions" },
    { id: "quizzes", label: "Quiz Stickers", description: "Test audience knowledge on your topic" },
    { id: "questions", label: "Question Stickers", description: "Allow audience to ask questions" },
    { id: "usergen", label: "UGC Prompts", description: "Encourage audience to create related content" },
    { id: "sliders", label: "Emoji Sliders", description: "Gauge audience feelings" },
  ],
  instagram_stories: [
    { id: "polls", label: "Polls", description: "Simple polls to gather audience opinions" },
    { id: "quizzes", label: "Quiz Stickers", description: "Test audience knowledge on your topic" },
    { id: "questions", label: "Question Stickers", description: "Allow audience to ask questions" },
    { id: "countdown", label: "Countdown", description: "Create urgency with a countdown timer" },
    { id: "sliders", label: "Emoji Sliders", description: "Gauge audience feelings" },
  ],
  instagram_reels: [
    { id: "comments", label: "Comment Prompts", description: "Ask viewers to comment specific responses" },
    { id: "usergen", label: "UGC Prompts", description: "Encourage audience to create related content" },
    { id: "challenges", label: "Challenges", description: "Create viral challenges viewers can participate in" },
    { id: "duets", label: "Duet Prompts", description: "Encourage viewers to create duet content" },
  ],
  // TikTok elements
  tiktok: [
    { id: "comments", label: "Comment Prompts", description: "Ask viewers to comment specific responses" },
    { id: "usergen", label: "UGC Prompts", description: "Encourage audience to create related content" },
    { id: "challenges", label: "Challenges", description: "Create viral challenges viewers can participate in" },
    { id: "duets", label: "Duet Prompts", description: "Encourage viewers to create duet content" },
    { id: "stitches", label: "Stitch Prompts", description: "Prompt viewers to stitch your content" },
  ],
  // LinkedIn elements
  linkedin: [
    { id: "polls", label: "Polls", description: "Professional polls to gather industry insights" },
    { id: "questions", label: "Discussion Questions", description: "Prompt thoughtful comments and discussions" },
    { id: "document", label: "Document Sharing", description: "Share downloadable resources" },
    { id: "thought", label: "Thought Leadership", description: "Ask for professional opinions" },
    { id: "newsletter", label: "Newsletter Signup", description: "Convert engagement to subscribers" },
  ],
  // Default elements for all other platforms
  default: [
    { id: "polls", label: "Polls", description: "Simple polls to gather audience opinions" },
    { id: "quizzes", label: "Quizzes", description: "Test audience knowledge on your topic" },
    { id: "questions", label: "Questions", description: "Encourage audience participation with questions" },
    { id: "usergen", label: "UGC Prompts", description: "Encourage audience to create content" },
    { id: "challenges", label: "Challenges", description: "Create participatory challenges" },
  ]
};

export function InteractiveElementSelector({ 
  elements, 
  setElements, 
  platform 
}: InteractiveElementSelectorProps) {
  // Get elements based on selected platform or use default
  const availableElements = platformElements[platform] || platformElements.default;
  
  const handleElementToggle = (id: string, checked: boolean) => {
    if (checked) {
      setElements([...elements, id]);
    } else {
      setElements(elements.filter(item => item !== id));
    }
  };
  
  return (
    <div className="space-y-3">
      <Label>Interactive Elements</Label>
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableElements.map((element) => (
              <div key={element.id} className="flex space-x-2 items-start">
                <Checkbox 
                  id={`element-${element.id}`}
                  checked={elements.includes(element.id)}
                  onCheckedChange={(checked) => handleElementToggle(element.id, checked as boolean)}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor={`element-${element.id}`} className="font-medium">
                    {element.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {element.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        Select interactive elements to boost engagement based on your platform.
      </p>
    </div>
  );
}

export default InteractiveElementSelector;
