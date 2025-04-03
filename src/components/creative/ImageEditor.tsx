
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { 
  Facebook, 
  Instagram, 
  Image as ImageIcon, 
  Type, 
  StickyNote, 
  Grid, 
  SquareStack,
  Download,
  Share2,
  Brush,
  Search,
  Layers,
  Circle,
  Square,
  Triangle,
  Star,
  Heart,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Check,
  Trash2,
  Undo2,
  Redo2,
  RotateCw,
  Crop,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Pencil,
  Palette,
  Text,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface ImageEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock API key for Pexels
const PEXELS_API_KEY = "YOUR_PEXELS_API_KEY"; // In a real app, use environment variables

const ImageEditor = ({ open, onOpenChange }: ImageEditorProps) => {
  const [activeTab, setActiveTab] = useState("templates");
  const [platform, setPlatform] = useState("facebook");
  const [templateCategory, setTemplateCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pexelsImages, setPexelsImages] = useState<any[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [textProperties, setTextProperties] = useState({
    fontFamily: "inter",
    fontSize: "16px",
    color: "#000000",
    bold: false,
    italic: false,
    underline: false,
    alignment: "left"
  });
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [opacity, setOpacity] = useState([100]);
  const [exportFormat, setExportFormat] = useState("png");
  const [exportQuality, setExportQuality] = useState([80]);
  const [history, setHistory] = useState<any[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [recentColors, setRecentColors] = useState(["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"]);

  const platforms = {
    facebook: {
      name: "Facebook",
      icon: <Facebook size={16} className="text-blue-600" />,
      dimensions: [
        { name: "Feed Post", width: 1200, height: 630 },
        { name: "Square Post", width: 1080, height: 1080 },
        { name: "Story", width: 1080, height: 1920 },
        { name: "Cover Photo", width: 851, height: 315 },
        { name: "Event Cover", width: 1920, height: 1080 },
        { name: "Link Image", width: 1200, height: 628 },
      ]
    },
    instagram: {
      name: "Instagram",
      icon: <Instagram size={16} className="text-pink-600" />,
      dimensions: [
        { name: "Square Post", width: 1080, height: 1080 },
        { name: "Portrait Post", width: 1080, height: 1350 },
        { name: "Story", width: 1080, height: 1920 },
        { name: "Reel Cover", width: 1080, height: 1920 },
        { name: "IGTV Cover", width: 420, height: 654 },
        { name: "Profile Picture", width: 320, height: 320 },
      ]
    },
    whatsapp: {
      name: "WhatsApp",
      icon: <MessageSquare size={16} className="text-green-600" />,
      dimensions: [
        { name: "Status", width: 1080, height: 1920 },
        { name: "Profile Picture", width: 500, height: 500 },
        { name: "Channel Banner", width: 1600, height: 800 },
      ]
    }
  };

  const [selectedDimension, setSelectedDimension] = useState(platforms.facebook.dimensions[0]);

  // Extended templates with more options
  const templates = [
    // Facebook templates
    { id: "fb-template1", name: "Product Showcase", category: "product", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["product", "showcase"] },
    { id: "fb-template2", name: "Special Offer", category: "promotion", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["offer", "promotion"] },
    { id: "fb-template3", name: "Event Announcement", category: "event", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["event"] },
    { id: "fb-template4", name: "Testimonial", category: "branding", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["testimonial"] },
    { id: "fb-template5", name: "Quote Post", category: "content", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["quote"] },
    { id: "fb-template6", name: "Company Update", category: "branding", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["update", "company"] },
    
    // Instagram templates
    { id: "ig-template1", name: "Product Gallery", category: "product", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["product", "gallery"] },
    { id: "ig-template2", name: "Story Highlight", category: "content", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["story", "highlight"] },
    { id: "ig-template3", name: "Carousel Post", category: "content", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["carousel"] },
    { id: "ig-template4", name: "Fashion Showcase", category: "product", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["fashion"] },
    { id: "ig-template5", name: "Quote Card", category: "content", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["quote"] },
    { id: "ig-template6", name: "Before-After", category: "product", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["comparison"] },
    
    // WhatsApp templates
    { id: "wa-template1", name: "Sale Announcement", category: "promotion", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["sale"] },
    { id: "wa-template2", name: "Product Showcase", category: "product", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["product"] },
    { id: "wa-template3", name: "Store Hours", category: "information", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["hours", "info"] },
    { id: "wa-template4", name: "Contact Card", category: "information", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["contact"] },
    { id: "wa-template5", name: "FAQ Card", category: "information", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["faq"] },
    { id: "wa-template6", name: "Location Map", category: "information", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["location"] },
  ];

  // Expanded elements collection
  const elements = [
    // Shapes
    { id: "shape-rectangle", name: "Rectangle", type: "shape", icon: <Square className="h-6 w-6" /> },
    { id: "shape-circle", name: "Circle", type: "shape", icon: <Circle className="h-6 w-6" /> },
    { id: "shape-triangle", name: "Triangle", type: "shape", icon: <Triangle className="h-6 w-6" /> },
    { id: "shape-star", name: "Star", type: "shape", icon: <Star className="h-6 w-6" /> },
    { id: "shape-heart", name: "Heart", type: "shape", icon: <Heart className="h-6 w-6" /> },
    { id: "shape-line", name: "Line", type: "shape", icon: <Minus className="h-6 w-6" /> },
    
    // Images
    { id: "image-placeholder", name: "Placeholder", type: "image", icon: <ImageIcon className="h-6 w-6" /> },
    { id: "image-frame", name: "Frame", type: "image", icon: <Square className="h-6 w-6" /> },
    { id: "image-masking", name: "Mask", type: "image", icon: <Layers className="h-6 w-6" /> },
    
    // Text
    { id: "text-heading", name: "Heading", type: "text", icon: <Type className="h-4 w-4" /> },
    { id: "text-subheading", name: "Subheading", type: "text", icon: <Type className="h-4 w-4" /> },
    { id: "text-paragraph", name: "Paragraph", type: "text", icon: <Text className="h-4 w-4" /> },
    { id: "text-caption", name: "Caption", type: "text", icon: <Text className="h-4 w-4" /> },
    { id: "text-quote", name: "Quote", type: "text", icon: <Text className="h-4 w-4" /> },
    
    // Stickers
    { id: "sticker-star", name: "Star Rating", type: "sticker", icon: <Star className="h-6 w-6" /> },
    { id: "sticker-heart", name: "Heart", type: "sticker", icon: <Heart className="h-6 w-6" /> },
    { id: "sticker-arrow", name: "Arrow", type: "sticker", icon: <ArrowRight className="h-6 w-6" /> },
    { id: "sticker-check", name: "Checkmark", type: "sticker", icon: <Check className="h-6 w-6" /> },
    { id: "sticker-plus", name: "Plus", type: "sticker", icon: <Plus className="h-6 w-6" /> },
  ];

  // Search Pexels for images
  const searchPexelsImages = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoadingImages(true);
    try {
      // In a real implementation, this would be a server-side API call to protect your API key
      const response = await fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=12`, {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch images');
      
      const data = await response.json();
      setPexelsImages(data.photos || []);
    } catch (error) {
      console.error("Error fetching Pexels images:", error);
      // For demo purposes, provide mock data when API key isn't available
      setPexelsImages([
        { id: 1, src: { medium: "/placeholder.svg" }, photographer: "Photographer 1" },
        { id: 2, src: { medium: "/placeholder.svg" }, photographer: "Photographer 2" },
        { id: 3, src: { medium: "/placeholder.svg" }, photographer: "Photographer 3" },
        { id: 4, src: { medium: "/placeholder.svg" }, photographer: "Photographer 4" },
      ]);
      toast.error("Could not load images. Using placeholders instead.");
    } finally {
      setIsLoadingImages(false);
    }
  };

  useEffect(() => {
    if (open) {
      // Reset state when opening the editor
      setSelectedElement(null);
      setHistory([]);
      setCurrentHistoryIndex(-1);
    }
  }, [open]);

  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    // @ts-ignore - We know that value will be a key of platforms
    setSelectedDimension(platforms[value].dimensions[0]);
  };

  const handleDownload = () => {
    toast.success("Image downloaded successfully");
  };

  const handleSave = () => {
    toast.success("Creative saved to your library");
    onOpenChange(false);
  };

  const handleTextPropertyChange = (property: string, value: any) => {
    setTextProperties(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const handleAddToCanvas = (elementId: string) => {
    setSelectedElement(elementId);
    toast.success(`Added ${elements.find(e => e.id === elementId)?.name || "element"} to canvas`);
    // In a real app, this would add the element to the canvas through a canvas library like Fabric.js
  };

  const handleAddImageToCanvas = (imageUrl: string) => {
    toast.success("Added image to canvas");
    // In a real app, this would add the image to the canvas
  };

  const handleApplyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast.success(`Applied ${template.name} template`);
      // In a real app, this would apply the template to the canvas
    }
  };

  const handleHistoryAction = (action: 'undo' | 'redo') => {
    if (action === 'undo' && currentHistoryIndex > 0) {
      setCurrentHistoryIndex(prev => prev - 1);
      toast.info("Undo successful");
    } else if (action === 'redo' && currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(prev => prev + 1);
      toast.info("Redo successful");
    }
  };

  const handleColorSelect = (color: string) => {
    setRecentColors(prev => {
      if (prev.includes(color)) {
        return prev;
      }
      return [color, ...prev.slice(0, 4)];
    });
    
    // Apply the color to the selected element or background
    if (selectedElement) {
      toast.success(`Applied color to element`);
    } else {
      setBackgroundColor(color);
      toast.success(`Applied background color`);
    }
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
                      <MessageSquare size={16} className="text-green-600" />
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
                  <TabsTrigger value="uploads">Images</TabsTrigger>
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
              </TabsContent>
              
              <TabsContent value="elements" className="m-0 p-4 space-y-4">
                <Input 
                  placeholder="Search elements..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Shapes</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {elements.filter(e => e.type === "shape").map((element) => (
                      <div
                        key={element.id}
                        className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors aspect-square"
                        onClick={() => handleAddToCanvas(element.id)}
                      >
                        <div className="h-full flex items-center justify-center">
                          {element.icon}
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
                        className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors aspect-square"
                        onClick={() => handleAddToCanvas(element.id)}
                      >
                        <div className="h-full flex items-center justify-center">
                          {element.icon}
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
                        className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleAddToCanvas(element.id)}
                      >
                        <div className="h-8 flex items-center">
                          {element.icon}
                          <span className="text-sm ml-2">{element.name}</span>
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
                        className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors aspect-square"
                        onClick={() => handleAddToCanvas(element.id)}
                      >
                        <div className="h-full flex items-center justify-center">
                          {element.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="uploads" className="m-0 p-4 space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Pexels Stock Photos</h3>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Search stock photos..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={searchPexelsImages} disabled={isLoadingImages}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {isLoadingImages ? (
                    <div className="flex justify-center my-4">
                      <div className="animate-pulse">Loading images...</div>
                    </div>
                  ) : (
                    pexelsImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {pexelsImages.map(photo => (
                          <div 
                            key={photo.id}
                            className="border rounded-md p-1 cursor-pointer hover:border-primary transition-colors"
                            onClick={() => handleAddImageToCanvas(photo.src.medium)}
                          >
                            <div className="aspect-square bg-gray-100 rounded-sm mb-1 overflow-hidden">
                              <img 
                                src={photo.src.medium} 
                                alt={`Photo by ${photo.photographer}`} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="text-xs truncate text-gray-500">by {photo.photographer}</p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
                
                <Separator />
                
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
                    <div className="border rounded-md p-1 cursor-pointer hover:border-primary transition-colors">
                      <div className="aspect-square bg-gray-100"></div>
                    </div>
                    <div className="border rounded-md p-1 cursor-pointer hover:border-primary transition-colors">
                      <div className="aspect-square bg-gray-100"></div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Canvas area */}
          <div className="flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Button variant="outline" size="sm">
                <Crop className="mr-2 h-4 w-4" />
                Crop
              </Button>
              <Button variant="outline" size="sm">
                <RotateCw className="mr-2 h-4 w-4" />
                Rotate
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
            
            <div
              className="bg-white shadow-md relative"
              style={{
                width: selectedDimension.width / 2,
                height: selectedDimension.height / 2,
                backgroundColor: backgroundColor,
              }}
            >
              {/* Canvas content would be rendered here */}
              {!selectedElement && (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <SquareStack className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">Select a template or add elements to get started</p>
                  </div>
                </div>
              )}
              
              {/* If an element is selected, we would show it here */}
              {selectedElement && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  Element selected: {elements.find(e => e.id === selectedElement)?.name}
                </div>
              )}
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              Canvas: {selectedDimension.width} x {selectedDimension.height} px • Scale: 50%
            </div>
          </div>
          
          {/* Right sidebar */}
          <div className="border-l p-4 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Design Properties</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Background Color</label>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline" 
                          className="w-full justify-start"
                          style={{ backgroundColor: backgroundColor }}
                        >
                          <div 
                            className="w-4 h-4 rounded mr-2 border"
                            style={{ backgroundColor: backgroundColor }}
                          ></div>
                          {backgroundColor}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Select Color</h4>
                          <div className="grid grid-cols-6 gap-2">
                            {["#FFFFFF", "#F8FAF0", "#F0F4FA", "#FFF0F0", "#F0FFF4", "#FAF0FF", 
                              "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"].map(color => (
                              <div
                                key={color}
                                className="w-full aspect-square rounded-md cursor-pointer border hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorSelect(color)}
                              ></div>
                            ))}
                          </div>
                          
                          <h4 className="text-sm font-medium mt-2">Recent Colors</h4>
                          <div className="flex flex-wrap gap-2">
                            {recentColors.map(color => (
                              <div
                                key={color}
                                className="w-6 h-6 rounded-md cursor-pointer border hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorSelect(color)}
                              ></div>
                            ))}
                          </div>
                          
                          <div className="pt-2">
                            <label className="text-xs font-medium">Custom Color</label>
                            <Input 
                              type="color" 
                              value={backgroundColor}
                              onChange={(e) => handleColorSelect(e.target.value)}
                              className="h-8 p-1"
                            />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium">Opacity</label>
                    <span className="text-xs">{opacity}%</span>
                  </div>
                  <Slider 
                    value={opacity} 
                    onValueChange={setOpacity} 
                    max={100} 
                    step={1} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Effects</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <Layers className="mr-2 h-4 w-4" />
                      Drop Shadow
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Brush className="mr-2 h-4 w-4" />
                      Blur
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Text Properties</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Font Family</label>
                  <Select 
                    value={textProperties.fontFamily}
                    onValueChange={(value) => handleTextPropertyChange('fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="oswald">Oswald</SelectItem>
                      <SelectItem value="playfair">Playfair Display</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="raleway">Raleway</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Font Size</label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => {
                        const currentSize = parseInt(textProperties.fontSize);
                        if (currentSize > 8) {
                          handleTextPropertyChange('fontSize', `${currentSize - 2}px`);
                        }
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input 
                      value={textProperties.fontSize} 
                      onChange={(e) => handleTextPropertyChange('fontSize', e.target.value)}
                      className="h-8 text-center" 
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => {
                        const currentSize = parseInt(textProperties.fontSize);
                        handleTextPropertyChange('fontSize', `${currentSize + 2}px`);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Text Color</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <div 
                          className="w-4 h-4 rounded mr-2 border"
                          style={{ backgroundColor: textProperties.color }}
                        ></div>
                        {textProperties.color}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="grid grid-cols-6 gap-2">
                        {["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", 
                          "#FF00FF", "#00FFFF", "#999999", "#555555", "#111111", "#DDDDDD"].map(color => (
                          <div
                            key={color}
                            className="w-full aspect-square rounded-md cursor-pointer border hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => handleTextPropertyChange('color', color)}
                          ></div>
                        ))}
                      </div>
                      <div className="pt-2">
                        <Input 
                          type="color" 
                          value={textProperties.color}
                          onChange={(e) => handleTextPropertyChange('color', e.target.value)}
                          className="h-8 p-1"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex gap-2 justify-between">
                  <Button 
                    variant={textProperties.bold ? "default" : "outline"} 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleTextPropertyChange('bold', !textProperties.bold)}
                  >
                    B
                  </Button>
                  <Button 
                    variant={textProperties.italic ? "default" : "outline"}  
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleTextPropertyChange('italic', !textProperties.italic)}
                  >
                    I
                  </Button>
                  <Button 
                    variant={textProperties.underline ? "default" : "outline"}  
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleTextPropertyChange('underline', !textProperties.underline)}
                  >
                    U
                  </Button>
                </div>
                
                <div className="flex gap-2 justify-between">
                  <Button 
                    variant={textProperties.alignment === "left" ? "default" : "outline"} 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleTextPropertyChange('alignment', 'left')}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={textProperties.alignment === "center" ? "default" : "outline"} 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleTextPropertyChange('alignment', 'center')}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={textProperties.alignment === "right" ? "default" : "outline"} 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleTextPropertyChange('alignment', 'right')}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
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

