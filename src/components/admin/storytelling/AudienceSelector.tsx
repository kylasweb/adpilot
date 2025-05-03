
import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface AudienceSelectorProps {
  industry: string;
  setIndustry: (value: string) => void;
  ageRange: [number, number];
  setAgeRange: (value: [number, number]) => void;
  language: string;
  setLanguage: (value: string) => void;
  interests: string;
  setInterests: (value: string) => void;
}

const industries = [
  { value: "retail", label: "Retail & E-commerce" },
  { value: "healthcare", label: "Healthcare & Wellness" },
  { value: "tech", label: "Technology & Software" },
  { value: "finance", label: "Finance & Banking" },
  { value: "education", label: "Education & Training" },
  { value: "travel", label: "Travel & Hospitality" },
  { value: "food", label: "Food & Beverage" },
  { value: "entertainment", label: "Entertainment & Media" },
  { value: "fashion", label: "Fashion & Beauty" },
  { value: "sports", label: "Sports & Fitness" },
  { value: "manufacturing", label: "Manufacturing & Industrial" },
  { value: "nonprofit", label: "Nonprofit & Causes" },
  { value: "real_estate", label: "Real Estate & Property" },
];

const languages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "arabic", label: "Arabic" },
  { value: "hindi", label: "Hindi" },
  { value: "portuguese", label: "Portuguese" },
  { value: "russian", label: "Russian" },
];

export function AudienceSelector({
  industry,
  setIndustry,
  ageRange,
  setAgeRange,
  language,
  setLanguage,
  interests,
  setInterests,
}: AudienceSelectorProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age-range">Age Range: {ageRange[0]} - {ageRange[1]}</Label>
          <Slider
            id="age-range"
            defaultValue={ageRange}
            min={13}
            max={75}
            step={1}
            onValueChange={(value) => setAgeRange(value as [number, number])}
            className="my-6"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language">Primary Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="interests">Audience Interests (comma separated)</Label>
          <Input
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. technology, sustainability, fitness"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default AudienceSelector;
