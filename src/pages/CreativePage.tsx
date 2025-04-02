
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CreativeLibrary from "@/components/creative/CreativeLibrary";
import MessageFrameworks from "@/components/creative/MessageFrameworks";
import StyleGuide from "@/components/creative/StyleGuide";
import { Plus } from "lucide-react";

const CreativePage = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creative Studio</h1>
          <p className="text-adpilot-text-secondary mt-1">Design and manage your campaign creative assets</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Creative
          </Button>
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
            <TabsContent value="library" className="m-0">
              <CreativeLibrary />
            </TabsContent>
            <TabsContent value="message-frameworks" className="m-0">
              <MessageFrameworks />
            </TabsContent>
            <TabsContent value="style-guide" className="m-0">
              <StyleGuide />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </AppLayout>
  );
};

export default CreativePage;
