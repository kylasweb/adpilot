
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Download, Share2, Undo2, Redo2 } from "lucide-react";
import { toast } from "sonner";
import PlatformSelector from "./PlatformSelector";
import EditorSidebar from "./sidebar/EditorSidebar";
import Canvas from "./canvas/Canvas";
import PropertiesPanel from "./properties/PropertiesPanel";
import { platforms } from "./constants/platforms";
import { useEditorHistory } from "./hooks/useEditorHistory";

export interface ImageEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImageEditor = ({ open, onOpenChange }: ImageEditorProps) => {
  const [activeTab, setActiveTab] = useState("templates");
  const [platform, setPlatform] = useState("facebook");
  const [selectedDimension, setSelectedDimension] = useState(platforms.facebook.dimensions[0]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [opacity, setOpacity] = useState([100]);
  const [exportFormat, setExportFormat] = useState("png");
  const [exportQuality, setExportQuality] = useState([80]);
  const { history, currentHistoryIndex, handleHistoryAction } = useEditorHistory();

  useEffect(() => {
    if (open) {
      // Reset state when opening the editor
      setSelectedElement(null);
    }
  }, [open]);

  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    // @ts-expect-error - We know that value will be a key of platforms
    setSelectedDimension(platforms[value].dimensions[0]);
  };

  const handleDownload = () => {
    toast.success("Image downloaded successfully");
  };

  const handleSave = () => {
    toast.success("Creative saved to your library");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-hidden p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Creative Studio</DialogTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleHistoryAction('undo')} disabled={currentHistoryIndex <= 0}>
                <Undo2 className="mr-2 h-4 w-4" />
                Undo
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleHistoryAction('redo')} disabled={currentHistoryIndex >= history.length - 1}>
                <Redo2 className="mr-2 h-4 w-4" />
                Redo
              </Button>
              <Button size="sm" variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button size="sm" onClick={handleSave}>Save Creative</Button>
            </div>
          </div>

          <PlatformSelector
            platform={platform}
            onPlatformChange={handlePlatformChange}
            selectedDimension={selectedDimension}
            setSelectedDimension={setSelectedDimension}
          />
        </DialogHeader>

        <div className="grid grid-cols-[280px_1fr_280px] h-[70vh]">
          {/* Left sidebar */}
          <EditorSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            platform={platform}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
          />

          {/* Canvas area */}
          <Canvas
            selectedDimension={selectedDimension}
            backgroundColor={backgroundColor}
            selectedElement={selectedElement}
          />

          {/* Right sidebar */}
          <PropertiesPanel
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            opacity={opacity}
            setOpacity={setOpacity}
            selectedElement={selectedElement}
            exportFormat={exportFormat}
            setExportFormat={setExportFormat}
            exportQuality={exportQuality}
            setExportQuality={setExportQuality}
            handleDownload={handleDownload}
          />
        </div>

        <DialogFooter className="p-4 border-t bg-slate-50">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>
            Save to Library
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
