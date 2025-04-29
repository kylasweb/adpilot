
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreativeLibrary from "@/components/creative/CreativeLibrary";
import StyleGuide from "@/components/creative/StyleGuide";
import MessageFrameworks from "@/components/creative/MessageFrameworks";
import NewCreativeForm from "@/components/creative/NewCreativeForm";
import ContentCreator from "@/components/creative/ai-content-creator";
import ImageEditor from "@/components/creative/image-editor";
import DocumentCreator from "@/components/creative/document-creator";

const CreativePage = () => {
  const [activeTab, setActiveTab] = useState("library");
  // Add states for modal control
  const [newCreativeOpen, setNewCreativeOpen] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Creative Studio</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Create, manage, and organize your marketing creative assets.
          </p>
        </div>

        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex overflow-auto pb-2">
            <TabsList className="inline-flex w-auto">
              <TabsTrigger value="library">Creative Library</TabsTrigger>
              <TabsTrigger value="styleguide">Style Guide</TabsTrigger>
              <TabsTrigger value="frameworks">Message Frameworks</TabsTrigger>
              <TabsTrigger value="content-creator">AI Content Creator</TabsTrigger>
              <TabsTrigger value="image-editor">Image Editor</TabsTrigger>
              <TabsTrigger value="document-creator">Document Creator</TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-6">
            <TabsContent value="library" className="mt-0">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">Creative Assets</h2>
                <NewCreativeForm open={newCreativeOpen} onOpenChange={setNewCreativeOpen} />
              </div>
              <CreativeLibrary />
            </TabsContent>

            <TabsContent value="styleguide" className="mt-0">
              <StyleGuide />
            </TabsContent>

            <TabsContent value="frameworks" className="mt-0">
              <MessageFrameworks />
            </TabsContent>

            <TabsContent value="content-creator" className="mt-0">
              <ContentCreator open={false} onOpenChange={() => {}} />
            </TabsContent>

            <TabsContent value="image-editor" className="mt-0">
              <ImageEditor open={false} onOpenChange={() => {}} />
            </TabsContent>

            <TabsContent value="document-creator" className="mt-0">
              <DocumentCreator />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CreativePage;
