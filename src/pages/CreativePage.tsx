
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CreativeLibrary from "@/components/creative/CreativeLibrary";
import MessageFrameworks from "@/components/creative/MessageFrameworks";
import StyleGuide from "@/components/creative/StyleGuide";
import NewCreativeForm from "@/components/creative/NewCreativeForm";
import ImageEditor from "@/components/creative/ImageEditor";
import { Plus, Image, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const CreativePage = () => {
  const [showNewCreativeForm, setShowNewCreativeForm] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creative Studio</h1>
          <p className="text-adpilot-text-secondary mt-1">Design and manage your campaign creative assets</p>
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Creative
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowNewCreativeForm(true)}>
                <FileText className="mr-2 h-4 w-4" />
                New Creative Asset
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowImageEditor(true)}>
                <Image className="mr-2 h-4 w-4" />
                Create Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="library">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Creative Assets</CardTitle>
              <TabsList>
                <TabsTrigger value="library">Library</TabsTrigger>
                <TabsTrigger value="message-frameworks">Message Frameworks</TabsTrigger>
                <TabsTrigger value="style-guide">Style Guide</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Manage and organize your creative assets</CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="library">
              <CreativeLibrary />
            </TabsContent>
            <TabsContent value="message-frameworks">
              <MessageFrameworks />
            </TabsContent>
            <TabsContent value="style-guide">
              <StyleGuide />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      <NewCreativeForm 
        open={showNewCreativeForm} 
        onOpenChange={setShowNewCreativeForm} 
      />
      
      <ImageEditor 
        open={showImageEditor} 
        onOpenChange={setShowImageEditor} 
      />
    </AppLayout>
  );
};

export default CreativePage;
