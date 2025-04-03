
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplatesTab from "./TemplatesTab";
import ElementsTab from "./ElementsTab";
import UploadsTab from "./UploadsTab";

interface EditorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  platform: string;
  selectedElement: string | null;
  setSelectedElement: (elementId: string | null) => void;
}

const EditorSidebar = ({ 
  activeTab, 
  setActiveTab, 
  platform,
  selectedElement,
  setSelectedElement
}: EditorSidebarProps) => {
  return (
    <div className="border-r overflow-y-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="uploads">Images</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="templates" className="m-0">
          <TemplatesTab platform={platform} />
        </TabsContent>
        
        <TabsContent value="elements" className="m-0">
          <ElementsTab setSelectedElement={setSelectedElement} />
        </TabsContent>
        
        <TabsContent value="uploads" className="m-0">
          <UploadsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorSidebar;
