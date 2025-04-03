
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Instagram, 
  Image as ImageIcon, 
  Type, 
  StickyNote, 
  Grid, 
  SquareStack,
  Download,
  Share2
} from "lucide-react";
import { toast } from "sonner";

interface ImageEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImageEditor = ({ open, onOpenChange }: ImageEditorProps) => {
  const [activeTab, setActiveTab] = useState("templates");
  const [platform, setPlatform] = useState("facebook");
  const [templateCategory, setTemplateCategory] = useState("all");

  const platforms = {
    facebook: {
      name: "Facebook",
      icon: <Facebook size={16} className="text-blue-600" />,
      dimensions: [
        { name: "Feed Post", width: 1200, height: 630 },
        { name: "Square Post", width: 1080, height: 1080 },
        { name: "Story", width: 1080, height: 1920 },
      ]
    },
    instagram: {
      name: "Instagram",
      icon: <Instagram size={16} className="text-pink-600" />,
      dimensions: [
        { name: "Square Post", width: 1080, height: 1080 },
        { name: "Portrait Post", width: 1080, height: 1350 },
        { name: "Story", width: 1080, height: 1920 },
      ]
    },
    whatsapp: {
      name: "WhatsApp",
      icon: <ImageIcon size={16} className="text-green-600" />,
      dimensions: [
        { name: "Status", width: 1080, height: 1920 },
        { name: "Profile Picture", width: 500, height: 500 },
      ]
    }
  };

  const [selectedDimension, setSelectedDimension] = useState(platforms.facebook.dimensions[0]);

  const templates = [
    { id: "template1", name: "Product Showcase", category: "product", platform: "facebook", imageUrl: "/placeholder.svg" },
    { id: "template2", name: "Special Offer", category: "promotion", platform: "facebook", imageUrl: "/placeholder.svg" },
    { id: "template3", name: "Brand Story", category: "branding", platform: "instagram", imageUrl: "/placeholder.svg" },
    { id: "template4", name: "Product Gallery", category: "product", platform: "instagram", imageUrl: "/placeholder.svg" },
    { id: "template5", name: "Sale Announcement", category: "promotion", platform: "whatsapp", imageUrl: "/placeholder.svg" },
    { id: "template6", name: "Testimonial Card", category: "branding", platform: "facebook", imageUrl: "/placeholder.svg" },
  ];

  const elements = [
    { id: "shape1", name: "Rectangle", type: "shape" },
    { id: "shape2", name: "Circle", type: "shape" },
    { id: "shape3", name: "Triangle", type: "shape" },
    { id: "image1", name: "Placeholder Image", type: "image" },
    { id: "text1", name: "Heading", type: "text" },
    { id: "text2", name: "Subheading", type: "text" },
    { id: "sticker1", name: "Star", type: "sticker" },
    { id: "sticker2", name: "Heart", type: "sticker" },
  ];

  const handleDownload = () => {
    toast.success("Image downloaded successfully");
  };

  const handleSave = () => {
    toast.success("Creative saved to your library");
    onOpenChange(false);
  };

  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    // @ts-ignore - We know that value will be a key of platforms
    setSelectedDimension(platforms[value].dimensions[0]);
  };

  const filteredTemplates = templates.filter(template => {
    if (templateCategory === "all") return template.platform === platform;
    return template.platform === platform && template.category === templateCategory;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-hidden p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Creative Studio</DialogTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button size="sm" onClick={handleSave}>Save Creative</Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Platform:</span>
              <Select value={platform} onValueChange={handlePlatformChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">
                    <div className="flex items-center gap-2">
                      <Facebook size={16} className="text-blue-600" />
                      Facebook
                    </div>
                  </SelectItem>
                  <SelectItem value="instagram">
                    <div className="flex items-center gap-2">
                      <Instagram size={16} className="text-pink-600" />
                      Instagram
                    </div>
                  </SelectItem>
                  <SelectItem value="whatsapp">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={16} className="text-green-600" />
                      WhatsApp
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Size:</span>
              <Select 
                value={`${selectedDimension.width}x${selectedDimension.height}`}
                onValueChange={(value) => {
                  // @ts-ignore - We know that platform will be a key of platforms
                  const dimension = platforms[platform].dimensions.find(
                    d => `${d.width}x${d.height}` === value
                  );
                  if (dimension) setSelectedDimension(dimension);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {/* @ts-ignore - We know that platform will be a key of platforms */}
                  {platforms[platform].dimensions.map((d) => (
                    <SelectItem key={`${d.width}x${d.height}`} value={`${d.width}x${d.height}`}>
                      {d.name} ({d.width}x{d.height})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogHeader>
          
        <div className="grid grid-cols-[280px_1fr_280px] h-[70vh]">
          {/* Left sidebar */}
          <div className="border-r overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-4 pt-4">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="elements">Elements</TabsTrigger>
                  <TabsTrigger value="uploads">Uploads</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="templates" className="m-0 p-4 space-y-4">
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
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Templates</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="border rounded-md p-2 cursor-pointer hover:border-primary"
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
              </TabsContent>
              
              <TabsContent value="elements" className="m-0 p-4 space-y-4">
                <Input placeholder="Search elements..." />
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Shapes</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {elements.filter(e => e.type === "shape").map((element) => (
                      <div
                        key={element.id}
                        className="border rounded-md p-2 cursor-pointer hover:border-primary aspect-square"
                      >
                        <div className="h-full flex items-center justify-center">
                          <Grid className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Images</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {elements.filter(e => e.type === "image").map((element) => (
                      <div
                        key={element.id}
                        className="border rounded-md p-2 cursor-pointer hover:border-primary aspect-square"
                      >
                        <div className="h-full flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Text</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {elements.filter(e => e.type === "text").map((element) => (
                      <div
                        key={element.id}
                        className="border rounded-md p-2 cursor-pointer hover:border-primary"
                      >
                        <div className="h-8 flex items-center">
                          <Type className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">{element.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Stickers</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {elements.filter(e => e.type === "sticker").map((element) => (
                      <div
                        key={element.id}
                        className="border rounded-md p-2 cursor-pointer hover:border-primary aspect-square"
                      >
                        <div className="h-full flex items-center justify-center">
                          <StickyNote className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="uploads" className="m-0 p-4 space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                  <ImageIcon className="h-10 w-10 text-gray-300 mb-2" />
                  <h3 className="text-sm font-medium">Upload Images</h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Drag and drop or click to upload
                  </p>
                  <Button size="sm">Upload</Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent Uploads</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border rounded-md p-1">
                      <div className="aspect-square bg-gray-100"></div>
                    </div>
                    <div className="border rounded-md p-1">
                      <div className="aspect-square bg-gray-100"></div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Canvas area */}
          <div className="flex items-center justify-center bg-gray-50">
            <div
              className="bg-white shadow-md"
              style={{
                width: selectedDimension.width / 2,
                height: selectedDimension.height / 2,
              }}
            >
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <SquareStack className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">Select a template or add elements to get started</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right sidebar */}
          <div className="border-l p-4 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Design Properties</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Background Color</label>
                  <div className="grid grid-cols-6 gap-1">
                    {["#FFFFFF", "#F8FAF0", "#F0F4FA", "#FFF0F0", "#F0FFF4", "#FAF0FF"].map(color => (
                      <div
                        key={color}
                        className="w-full aspect-square rounded-md cursor-pointer"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Opacity</label>
                  <Slider defaultValue={[100]} max={100} step={1} />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Text Properties</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Font Family</label>
                  <Select defaultValue="inter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="oswald">Oswald</SelectItem>
                      <SelectItem value="playfair">Playfair Display</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Font Size</label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">-</Button>
                    <Input value="16px" className="h-8 text-center" />
                    <Button variant="outline" size="icon" className="h-8 w-8">+</Button>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-between">
                  <Button variant="outline" size="sm" className="flex-1">B</Button>
                  <Button variant="outline" size="sm" className="flex-1">I</Button>
                  <Button variant="outline" size="sm" className="flex-1">U</Button>
                  <Button variant="outline" size="sm" className="flex-1">A</Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Export Options</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Format</label>
                  <Select defaultValue="png">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPG</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Quality</label>
                  <Slider defaultValue={[80]} max={100} step={1} />
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
          </div>
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

export default ImageEditor;
