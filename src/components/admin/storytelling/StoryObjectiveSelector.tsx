
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

interface StoryObjectiveSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const objectives = [
  { value: "brand_awareness", label: "Brand Awareness" },
  { value: "product_launch", label: "Product Launch" },
  { value: "community_engagement", label: "Community Engagement" },
  { value: "education", label: "Education & Knowledge Sharing" },
  { value: "lead_generation", label: "Lead Generation" },
  { value: "customer_retention", label: "Customer Retention" },
  { value: "thought_leadership", label: "Thought Leadership" },
  { value: "crisis_management", label: "Crisis Management" },
];

export function StoryObjectiveSelector({ value, onChange }: StoryObjectiveSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="objective">Story Objective</Label>
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
      <p className="text-sm text-muted-foreground">
        Select the primary goal of your story to align with your business objectives.
      </p>
    </div>
  );
}

export default StoryObjectiveSelector;
