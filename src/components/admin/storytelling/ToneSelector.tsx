
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface ToneSelectorProps {
  tone: string;
  setTone: (value: string) => void;
}

const tones = [
  {
    value: "energetic",
    label: "Energetic & Motivational",
    description: "Upbeat, inspiring content that motivates the audience to take action"
  },
  {
    value: "professional",
    label: "Professional & Informative",
    description: "Formal, data-driven content for business and educational contexts"
  },
  {
    value: "friendly",
    label: "Friendly & Conversational",
    description: "Casual, approachable content that connects on a personal level"
  },
  {
    value: "humorous",
    label: "Humorous & Entertaining",
    description: "Light-hearted, funny content that entertains while informing"
  },
  {
    value: "emotional",
    label: "Emotional & Heartfelt",
    description: "Sentimental content designed to evoke strong emotions"
  },
  {
    value: "dramatic",
    label: "Dramatic & Mysterious",
    description: "Suspenseful content that builds curiosity and anticipation"
  },
];

export function ToneSelector({ tone, setTone }: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Emotional Tone & Style</Label>
      <RadioGroup value={tone} onValueChange={setTone} className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {tones.map((item) => (
          <TooltipProvider key={item.value}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:border-primary cursor-pointer">
                  <RadioGroupItem value={item.value} id={`tone-${item.value}`} />
                  <Label htmlFor={`tone-${item.value}`} className="cursor-pointer flex-grow">{item.label}</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">{item.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </RadioGroup>
      <p className="text-sm text-muted-foreground">
        Select the emotional tone and style that matches your brand voice and story goals.
      </p>
    </div>
  );
}

export default ToneSelector;
