
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreativeLibrary from "@/components/creative/CreativeLibrary";
import StyleGuide from "@/components/creative/StyleGuide";
import MessageFrameworks from "@/components/creative/MessageFrameworks";
import NewCreativeForm from "@/components/creative/NewCreativeForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, FileText, Image } from "lucide-react";
import { Link } from "react-router-dom";

const CreativePage = () => {
  const [activeTab, setActiveTab] = useState("library");
  const [newCreativeOpen, setNewCreativeOpen] = useState(false);

  const creativeTools = [
    {
      title: "AI Content Creator",
      description: "Generate professional marketing content with AI assistance",
      href: "/tools/content-creator",
      icon: Edit,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Document Creator",
      description: "Create quotes, proposals, and invoices for your business",
      href: "/tools/document-creator",
      icon: FileText,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Image Editor",
      description: "Design and edit marketing images for social media and ads",
      href: "/tools/image-editor",
      icon: Image,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Creative Studio</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Create, manage, and organize your marketing creative assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creativeTools.map((tool) => (
            <Link key={tool.title} to={tool.href}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className={`w-10 h-10 rounded-full ${tool.color} flex items-center justify-center mb-2`}>
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between mb-6">
            <TabsList className="inline-flex w-auto">
              <TabsTrigger value="library">Creative Library</TabsTrigger>
              <TabsTrigger value="styleguide">Style Guide</TabsTrigger>
              <TabsTrigger value="frameworks">Message Frameworks</TabsTrigger>
            </TabsList>
            <NewCreativeForm open={newCreativeOpen} onOpenChange={setNewCreativeOpen} />
          </div>

          <div>
            <TabsContent value="library" className="mt-0">
              <CreativeLibrary />
            </TabsContent>

            <TabsContent value="styleguide" className="mt-0">
              <StyleGuide />
            </TabsContent>

            <TabsContent value="frameworks" className="mt-0">
              <MessageFrameworks />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CreativePage;
