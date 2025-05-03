
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

interface PlatformSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const platforms = [
  { value: "instagram", label: "Instagram", group: "Visual" },
  { value: "instagram_reels", label: "Instagram Reels", group: "Visual" },
  { value: "instagram_stories", label: "Instagram Stories", group: "Visual" },
  { value: "tiktok", label: "TikTok", group: "Visual" },
  { value: "youtube", label: "YouTube", group: "Visual" },
  { value: "youtube_shorts", label: "YouTube Shorts", group: "Visual" },
  { value: "facebook", label: "Facebook", group: "Social" },
  { value: "linkedin", label: "LinkedIn", group: "Professional" },
  { value: "twitter", label: "Twitter", group: "Text" },
  { value: "pinterest", label: "Pinterest", group: "Visual" },
  { value: "blog", label: "Blog", group: "Long-form" },
  { value: "email", label: "Email Campaign", group: "Long-form" },
];

export function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="platform">Target Platform</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="platform" className="w-full">
          <SelectValue placeholder="Select target platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Visual Platforms</SelectLabel>
            {platforms
              .filter((p) => p.group === "Visual")
              .map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Professional Platforms</SelectLabel>
            {platforms
              .filter((p) => p.group === "Professional")
              .map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Text-Based Platforms</SelectLabel>
            {platforms
              .filter((p) => p.group === "Text" || p.group === "Long-form")
              .map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Social Platforms</SelectLabel>
            {platforms
              .filter((p) => p.group === "Social")
              .map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Choose the platform where your story will be published to optimize format and content.
      </p>
    </div>
  );
}

export default PlatformSelector;
