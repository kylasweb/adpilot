
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { elements } from "../constants/platforms";

interface ElementsTabProps {
  setSelectedElement: (elementId: string | null) => void;
}

const ElementsTab = ({ setSelectedElement }: ElementsTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleAddToCanvas = (elementId: string) => {
    setSelectedElement(elementId);
    toast.success(`Added ${elements.find(e => e.id === elementId)?.name || "element"} to canvas`);
    // In a real app, this would add the element to the canvas through a canvas library like Fabric.js
  };

  return (
    <div className="p-4 space-y-4">
      <Input 
        placeholder="Search elements..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Shapes</h3>
        <div className="grid grid-cols-3 gap-2">
          {elements.filter(e => e.type === "shape").map((element) => (
            <div
              key={element.id}
              className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors aspect-square"
              onClick={() => handleAddToCanvas(element.id)}
            >
              <div className="h-full flex items-center justify-center">
                {element.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Images</h3>
        <div className="grid grid-cols-3 gap-2">
          {elements.filter(e => e.type === "image").map((element) => (
            <div
              key={element.id}
              className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors aspect-square"
              onClick={() => handleAddToCanvas(element.id)}
            >
              <div className="h-full flex items-center justify-center">
                {element.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Text</h3>
        <div className="grid grid-cols-1 gap-2">
          {elements.filter(e => e.type === "text").map((element) => (
            <div
              key={element.id}
              className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleAddToCanvas(element.id)}
            >
              <div className="h-8 flex items-center">
                {element.icon}
                <span className="text-sm ml-2">{element.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Stickers</h3>
        <div className="grid grid-cols-3 gap-2">
          {elements.filter(e => e.type === "sticker").map((element) => (
            <div
              key={element.id}
              className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors aspect-square"
              onClick={() => handleAddToCanvas(element.id)}
            >
              <div className="h-full flex items-center justify-center">
                {element.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementsTab;
