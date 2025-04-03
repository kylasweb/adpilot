
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Share2 } from "lucide-react";

interface ExportOptionsProps {
  exportFormat: string;
  setExportFormat: (format: string) => void;
  exportQuality: number[];
  setExportQuality: (quality: number[]) => void;
  handleDownload: () => void;
}

const ExportOptions = ({
  exportFormat,
  setExportFormat,
  exportQuality,
  setExportQuality,
  handleDownload
}: ExportOptionsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Export Options</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium">Format</label>
          <Select
            value={exportFormat}
            onValueChange={setExportFormat}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Quality</label>
            <span className="text-xs">{exportQuality}%</span>
          </div>
          <Slider 
            value={exportQuality} 
            onValueChange={setExportQuality} 
            max={100} 
            step={1} 
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox id="transparent" />
          <label
            htmlFor="transparent"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Transparent background
          </label>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
