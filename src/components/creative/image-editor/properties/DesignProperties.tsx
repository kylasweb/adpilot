
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Layers, Brush } from "lucide-react";
import ColorPicker from "./ColorPicker";

interface DesignPropertiesProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  opacity: number[];
  setOpacity: (opacity: number[]) => void;
}

const DesignProperties = ({
  backgroundColor,
  setBackgroundColor,
  opacity,
  setOpacity
}: DesignPropertiesProps) => {
  const [recentColors, setRecentColors] = useState(["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"]);

  const handleColorSelect = (color: string) => {
    setRecentColors(prev => {
      if (prev.includes(color)) {
        return prev;
      }
      return [color, ...prev.slice(0, 4)];
    });
    
    setBackgroundColor(color);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Design Properties</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium">Background Color</label>
          <ColorPicker 
            color={backgroundColor}
            onColorChange={handleColorSelect}
            recentColors={recentColors}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Opacity</label>
            <span className="text-xs">{opacity}%</span>
          </div>
          <Slider 
            value={opacity} 
            onValueChange={setOpacity} 
            max={100} 
            step={1} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium">Effects</label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Layers className="mr-2 h-4 w-4" />
              Drop Shadow
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Brush className="mr-2 h-4 w-4" />
              Blur
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignProperties;
