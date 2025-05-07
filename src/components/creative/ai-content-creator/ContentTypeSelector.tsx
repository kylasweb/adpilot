import React from "react";
import { ContentType, ContentTemplate, contentTemplates } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentTypeSelectorProps {
  selectedType: ContentType;
  onSelectType: (type: ContentType) => void;
  selectedTemplate: ContentTemplate | null;
  onSelectTemplate: (template: ContentTemplate) => void;
}

const ContentTypeSelector = ({
  selectedType,
  onSelectType,
  selectedTemplate,
  onSelectTemplate
}: ContentTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Content Type</h3>
      
      <Tabs 
        value={selectedType} 
        onValueChange={(value) => onSelectType(value as ContentType)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full h-auto">
          <TabsTrigger value="social" className="py-1 text-xs">Social Media</TabsTrigger>
          <TabsTrigger value="website" className="py-1 text-xs">Website</TabsTrigger>
        </TabsList>
        <TabsList className="grid grid-cols-2 w-full h-auto mt-1">
          <TabsTrigger value="seo" className="py-1 text-xs">SEO</TabsTrigger>
          <TabsTrigger value="branding" className="py-1 text-xs">Branding</TabsTrigger>
        </TabsList>
        <TabsList className="grid grid-cols-2 w-full h-auto mt-1">
          <TabsTrigger value="marketing" className="py-1 text-xs">Marketing</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Templates</h3>
          
          <TabsContent value="social" className="m-0 p-0">
            <div className="grid grid-cols-1 gap-2">
              {contentTemplates.social.map((template) => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => onSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="website" className="m-0 p-0">
            <div className="grid grid-cols-1 gap-2">
              {contentTemplates.website.map((template) => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => onSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="seo" className="m-0 p-0">
            <div className="grid grid-cols-1 gap-2">
              {contentTemplates.seo.map((template) => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => onSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="branding" className="m-0 p-0">
            <div className="grid grid-cols-1 gap-2">
              {contentTemplates.branding.map((template) => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => onSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="m-0 p-0">
            <div className="grid grid-cols-1 gap-2">
              {contentTemplates.marketing.map((template) => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => onSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

interface TemplateCardProps {
  key: string;
  template: ContentTemplate;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard = ({ template, isSelected, onSelect }: TemplateCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:border-primary",
        isSelected && "border-primary bg-primary/5"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-3">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">{template.name}</h4>
          <p className="text-xs text-muted-foreground">{template.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentTypeSelector;
