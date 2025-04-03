
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlignLeft, AlignCenter, AlignRight, Plus, Minus } from "lucide-react";
import ColorPicker from "./ColorPicker";

interface TextPropertiesProps {
  selectedElement: string | null;
}

const TextProperties = ({ selectedElement }: TextPropertiesProps) => {
  const [textProperties, setTextProperties] = useState({
    fontFamily: "inter",
    fontSize: "16px",
    color: "#000000",
    bold: false,
    italic: false,
    underline: false,
    alignment: "left"
  });
  const [recentColors, setRecentColors] = useState(["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"]);

  const handleTextPropertyChange = (property: string, value: any) => {
    setTextProperties(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const handleColorSelect = (color: string) => {
    setRecentColors(prev => {
      if (prev.includes(color)) {
        return prev;
      }
      return [color, ...prev.slice(0, 4)];
    });
    
    handleTextPropertyChange('color', color);
  };

  const isTextElement = selectedElement && selectedElement.startsWith('text-');

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Text Properties</h3>
      <div className={`space-y-4 ${!isTextElement ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="space-y-2">
          <label className="text-xs font-medium">Font Family</label>
          <Select 
            value={textProperties.fontFamily}
            onValueChange={(value) => handleTextPropertyChange('fontFamily', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="oswald">Oswald</SelectItem>
              <SelectItem value="playfair">Playfair Display</SelectItem>
              <SelectItem value="montserrat">Montserrat</SelectItem>
              <SelectItem value="lato">Lato</SelectItem>
              <SelectItem value="opensans">Open Sans</SelectItem>
              <SelectItem value="raleway">Raleway</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium">Font Size</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => {
                const currentSize = parseInt(textProperties.fontSize);
                if (currentSize > 8) {
                  handleTextPropertyChange('fontSize', `${currentSize - 2}px`);
                }
              }}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input 
              value={textProperties.fontSize} 
              onChange={(e) => handleTextPropertyChange('fontSize', e.target.value)}
              className="h-8 text-center" 
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => {
                const currentSize = parseInt(textProperties.fontSize);
                handleTextPropertyChange('fontSize', `${currentSize + 2}px`);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium">Text Color</label>
          <ColorPicker 
            color={textProperties.color}
            onColorChange={handleColorSelect}
            recentColors={recentColors}
          />
        </div>
        
        <div className="flex gap-2 justify-between">
          <Button 
            variant={textProperties.bold ? "default" : "outline"} 
            size="sm" 
            className="flex-1"
            onClick={() => handleTextPropertyChange('bold', !textProperties.bold)}
          >
            B
          </Button>
          <Button 
            variant={textProperties.italic ? "default" : "outline"}  
            size="sm" 
            className="flex-1"
            onClick={() => handleTextPropertyChange('italic', !textProperties.italic)}
          >
            I
          </Button>
          <Button 
            variant={textProperties.underline ? "default" : "outline"}  
            size="sm" 
            className="flex-1"
            onClick={() => handleTextPropertyChange('underline', !textProperties.underline)}
          >
            U
          </Button>
        </div>
        
        <div className="flex gap-2 justify-between">
          <Button 
            variant={textProperties.alignment === "left" ? "default" : "outline"} 
            size="sm" 
            className="flex-1"
            onClick={() => handleTextPropertyChange('alignment', 'left')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant={textProperties.alignment === "center" ? "default" : "outline"} 
            size="sm" 
            className="flex-1"
            onClick={() => handleTextPropertyChange('alignment', 'center')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant={textProperties.alignment === "right" ? "default" : "outline"} 
            size="sm" 
            className="flex-1"
            onClick={() => handleTextPropertyChange('alignment', 'right')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {!isTextElement && (
        <p className="text-xs text-gray-500 italic">Select a text element to edit properties</p>
      )}
    </div>
  );
};

export default TextProperties;
