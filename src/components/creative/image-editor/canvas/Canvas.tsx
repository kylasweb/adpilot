
import React from "react";
import { Button } from "@/components/ui/button";
import { Crop, RotateCw, Trash2, SquareStack } from "lucide-react";
import { elements } from "../constants/platforms";

interface CanvasProps {
  selectedDimension: { name: string; width: number; height: number };
  backgroundColor: string;
  selectedElement: string | null;
}

const Canvas = ({
  selectedDimension,
  backgroundColor,
  selectedElement
}: CanvasProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Button variant="outline" size="sm">
          <Crop className="mr-2 h-4 w-4" />
          Crop
        </Button>
        <Button variant="outline" size="sm">
          <RotateCw className="mr-2 h-4 w-4" />
          Rotate
        </Button>
        <Button variant="outline" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      <div
        className="bg-card shadow-md relative"
        style={{
          width: selectedDimension.width / 2,
          height: selectedDimension.height / 2,
          backgroundColor: backgroundColor,
        }}
      >
        {/* Canvas content would be rendered here */}
        {!selectedElement && (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <SquareStack className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Select a template or add elements to get started</p>
            </div>
          </div>
        )}

        {/* If an element is selected, we would show it here */}
        {selectedElement && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            Element selected: {elements.find(e => e.id === selectedElement)?.name}
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Canvas: {selectedDimension.width} x {selectedDimension.height} px • Scale: 50%
      </div>
    </div>
  );
};

export default Canvas;
