
import React from "react";
import { Separator } from "@/components/ui/separator";
import DesignProperties from "./DesignProperties";
import TextProperties from "./TextProperties";
import ExportOptions from "./ExportOptions";

interface PropertiesPanelProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  opacity: number[];
  setOpacity: (opacity: number[]) => void;
  selectedElement: string | null;
  exportFormat: string;
  setExportFormat: (format: string) => void;
  exportQuality: number[];
  setExportQuality: (quality: number[]) => void;
  handleDownload: () => void;
}

const PropertiesPanel = ({
  backgroundColor,
  setBackgroundColor,
  opacity,
  setOpacity,
  selectedElement,
  exportFormat,
  setExportFormat,
  exportQuality,
  setExportQuality,
  handleDownload
}: PropertiesPanelProps) => {
  return (
    <div className="border-l p-4 space-y-4 overflow-y-auto">
      <DesignProperties 
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        opacity={opacity}
        setOpacity={setOpacity}
      />
      
      <Separator />
      
      <TextProperties selectedElement={selectedElement} />
      
      <Separator />
      
      <ExportOptions 
        exportFormat={exportFormat}
        setExportFormat={setExportFormat}
        exportQuality={exportQuality}
        setExportQuality={setExportQuality}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default PropertiesPanel;
