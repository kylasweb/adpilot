
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { platforms } from "./constants/platforms";

interface PlatformSelectorProps {
  platform: string;
  onPlatformChange: (value: string) => void;
  selectedDimension: { name: string; width: number; height: number };
  setSelectedDimension: (dimension: { name: string; width: number; height: number }) => void;
}

const PlatformSelector = ({
  platform,
  onPlatformChange,
  selectedDimension,
  setSelectedDimension
}: PlatformSelectorProps) => {
  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Platform:</span>
        <Select value={platform} onValueChange={onPlatformChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="facebook">
              <div className="flex items-center gap-2">
                {platforms.facebook.icon}
                Facebook
              </div>
            </SelectItem>
            <SelectItem value="instagram">
              <div className="flex items-center gap-2">
                {platforms.instagram.icon}
                Instagram
              </div>
            </SelectItem>
            <SelectItem value="whatsapp">
              <div className="flex items-center gap-2">
                {platforms.whatsapp.icon}
                WhatsApp
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Size:</span>
        <Select
          value={`${selectedDimension.width}x${selectedDimension.height}`}
          onValueChange={(value) => {
            // @ts-expect-error - We know that platform will be a key of platforms
            const dimension = platforms[platform].dimensions.find(
              (d: { name: string; width: number; height: number }) => `${d.width}x${d.height}` === value
            );
            if (dimension) setSelectedDimension(dimension);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {/* @ts-expect-error - We know that platform will be a key of platforms */}
            {platforms[platform].dimensions.map((d) => (
              <SelectItem key={`${d.width}x${d.height}`} value={`${d.width}x${d.height}`}>
                {d.name} ({d.width}x{d.height})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PlatformSelector;
