
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { templates } from "../constants/platforms";

interface TemplatesTabProps {
  platform: string;
}

const TemplatesTab = ({ platform }: TemplatesTabProps) => {
  const [templateCategory, setTemplateCategory] = useState("all");
  
  const handleApplyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast.success(`Applied ${template.name} template`);
      // In a real app, this would apply the template to the canvas
    }
  };
  
  const filteredTemplates = templates.filter(template => {
    if (templateCategory === "all") return template.platform === platform;
    return template.platform === platform && template.category === templateCategory;
  });
  
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select value={templateCategory} onValueChange={setTemplateCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="product">Product</SelectItem>
            <SelectItem value="promotion">Promotion</SelectItem>
            <SelectItem value="branding">Branding</SelectItem>
            <SelectItem value="content">Content</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="information">Information</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Templates</h3>
          <Badge variant="outline" className="text-xs">
            {filteredTemplates.length} templates
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleApplyTemplate(template.id)}
            >
              <div className="aspect-square bg-gray-100 rounded-sm flex items-center justify-center mb-1">
                <img 
                  src={template.imageUrl} 
                  alt={template.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-xs truncate">{template.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesTab;
