
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
  recentColors: string[];
}

const ColorPicker = ({ color, onColorChange, recentColors }: ColorPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline" 
          className="w-full justify-start"
          style={{ backgroundColor: color }}
        >
          <div 
            className="w-4 h-4 rounded mr-2 border"
            style={{ backgroundColor: color }}
          ></div>
          {color}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Select Color</h4>
          <div className="grid grid-cols-6 gap-2">
            {["#FFFFFF", "#F8FAF0", "#F0F4FA", "#FFF0F0", "#F0FFF4", "#FAF0FF", 
              "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"].map(color => (
              <div
                key={color}
                className="w-full aspect-square rounded-md cursor-pointer border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              ></div>
            ))}
          </div>
          
          <h4 className="text-sm font-medium mt-2">Recent Colors</h4>
          <div className="flex flex-wrap gap-2">
            {recentColors.map(color => (
              <div
                key={color}
                className="w-6 h-6 rounded-md cursor-pointer border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              ></div>
            ))}
          </div>
          
          <div className="pt-2">
            <label className="text-xs font-medium">Custom Color</label>
            <Input 
              type="color" 
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="h-8 p-1"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
