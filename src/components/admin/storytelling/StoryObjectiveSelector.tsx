
import React from "react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface StoryObjectiveSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const objectives = [
  { value: "brand_awareness", label: "Brand Awareness", description: "Build recognition and familiarity with your brand" },
  { value: "product_launch", label: "Product Launch", description: "Generate excitement and interest for new product releases" },
  { value: "community_engagement", label: "Community Engagement", description: "Foster interaction with and among your audience" },
  { value: "education", label: "Education & Knowledge Sharing", description: "Educate your audience about topics relevant to your industry" },
  { value: "lead_generation", label: "Lead Generation", description: "Capture potential customer information and interest" },
  { value: "customer_retention", label: "Customer Retention", description: "Strengthen relationships with existing customers" },
  { value: "thought_leadership", label: "Thought Leadership", description: "Position your brand as an authority in your industry" },
  { value: "crisis_management", label: "Crisis Management", description: "Address challenges or problems with transparent communication" },
];

export function StoryObjectiveSelector({ value, onChange }: StoryObjectiveSelectorProps) {
  const selectedObjective = objectives.find(obj => obj.value === value);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="objective" className="font-medium">
          Story Objective
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-1 inline-block text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px]">
                Select the primary goal of your story to align with your business objectives.
                For custom objectives, use the Custom Objective field below.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="objective" className="w-full">
          <SelectValue placeholder="Select story objective" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Marketing Objectives</SelectLabel>
            {objectives.map((objective) => (
              <SelectItem key={objective.value} value={objective.value}>
                {objective.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedObjective && (
        <p className="text-sm text-muted-foreground">
          {selectedObjective.description}
        </p>
      )}
    </div>
  );
}

export default StoryObjectiveSelector;
