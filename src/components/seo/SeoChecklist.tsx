import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  Check, 
  Download,
  Upload, 
  Search, 
  Save, 
  Share2, 
  Globe, 
  Code, 
  LayoutGrid, 
  FileText, 
  Image, 
  Smartphone, 
  Database, 
  Zap, 
  Lock, 
  Share, 
  FileSpreadsheet,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Types
interface ChecklistItem {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  checked: boolean;
  notApplicable?: boolean;
  notes?: string;
  resources?: {
    title: string;
    url: string;
  }[];
}

interface ChecklistCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  subcategories: string[];
}

// Mock data - This would be just a subset of the 500 items
const categories: ChecklistCategory[] = [
  { 
    id: "technical-seo", 
    name: "Technical SEO", 
    icon: Code,
    color: "bg-blue-100 text-blue-600",
    subcategories: ["Crawlability", "Indexability", "Site Speed", "Mobile Optimization", "Structured Data"] 
  },
  { 
    id: "on-page-seo", 
    name: "On-Page SEO", 
    icon: FileText,
    color: "bg-green-100 text-green-600",
    subcategories: ["Content Quality", "Keywords", "Meta Tags", "URL Structure", "Internal Linking"] 
  },
  { 
    id: "off-page-seo", 
    name: "Off-Page SEO", 
    icon: Share,
    color: "bg-purple-100 text-purple-600",
    subcategories: ["Backlinks", "Social Signals", "Brand Mentions", "Local SEO", "Reputation"] 
  },
  { 
    id: "content", 
    name: "Content", 
    icon: FileText,
    color: "bg-amber-100 text-amber-600",
    subcategories: ["Blog Posts", "Landing Pages", "Product Pages", "Multimedia", "Content Strategy"] 
  },
  { 
    id: "ux-design", 
    name: "UX Design", 
    icon: LayoutGrid,
    color: "bg-red-100 text-red-600",
    subcategories: ["Navigation", "Layout", "Responsiveness", "Accessibility", "Visual Hierarchy"] 
  },
  { 
    id: "performance", 
    name: "Performance", 
    icon: Zap,
    color: "bg-orange-100 text-orange-600",
    subcategories: ["Loading Speed", "Resource Optimization", "Caching", "Core Web Vitals", "Minification"] 
  },
  { 
    id: "analytics", 
    name: "Analytics & Tracking", 
    icon: FileSpreadsheet,
    color: "bg-indigo-100 text-indigo-600",
    subcategories: ["Setup", "Goals", "Funnels", "Event Tracking", "Reports"] 
  },
  { 
    id: "security", 
    name: "Security", 
    icon: Lock,
    color: "bg-slate-100 text-slate-600",
    subcategories: ["SSL", "Authentication", "Data Protection", "Vulnerability Scanning", "Backup"] 
  }
];

// Generate a subset of the 500 checklist items (one for each subcategory)
const generateChecklist = () => {
  const items: ChecklistItem[] = [];
  let id = 1;
  
  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      // Generate 2-3 items per subcategory
      const itemCount = Math.floor(Math.random() * 2) + 2;
      
      for (let i = 0; i < itemCount; i++) {
        const priorities = ["critical", "high", "medium", "low"] as const;
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        
        items.push({
          id: `item-${id}`,
          category: category.id,
          subcategory,
          title: `${subcategory} Checklist Item ${i + 1}`,
          description: `This is a sample checklist item for ${subcategory} in the ${category.name} category.`,
          priority,
          checked: Math.random() > 0.7,
          resources: i % 2 === 0 ? [
            { title: "Documentation", url: "#" },
            { title: "Tutorial", url: "#" }
          ] : undefined
        });
        
        id++;
      }
    });
  });
  
  return items;
};

// This is a small sample of the checklist items - in a real implementation,
// we'd have all 500 items defined, but for demo purposes we generate a subset
const initialChecklistItems = generateChecklist();

const SeoChecklist = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(initialChecklistItems);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("My Website Audit");
  const [projectUrl, setProjectUrl] = useState("");

  // Calculate completion percentages
  const totalItems = checklistItems.length;
  const completedItems = checklistItems.filter(item => item.checked).length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  
  // Filter items based on search query and active tab
  const filteredItems = checklistItems.filter(item => {
    const matchesSearch = 
      searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    
    if (activeTab === "all") {
      return selectedCategory ? item.category === selectedCategory : true;
    } else if (activeTab === "completed") {
      return item.checked && (selectedCategory ? item.category === selectedCategory : true);
    } else if (activeTab === "pending") {
      return !item.checked && (selectedCategory ? item.category === selectedCategory : true);
    } else if (activeTab === "critical") {
      return item.priority === "critical" && (selectedCategory ? item.category === selectedCategory : true);
    } else if (activeTab === "high") {
      return item.priority === "high" && (selectedCategory ? item.category === selectedCategory : true);
    }
    
    return selectedCategory ? item.category === selectedCategory : true;
  });
  
  // Toggle item checked status
  const toggleItemChecked = (itemId: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  // Toggle item "not applicable" status
  const toggleItemNotApplicable = (itemId: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, notApplicable: !item.notApplicable, checked: !item.notApplicable ? false : item.checked } : item
      )
    );
  };
  
  // Update item notes
  const updateItemNotes = (itemId: string, notes: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, notes } : item
      )
    );
  };
  
  // Save checklist
  const saveChecklist = () => {
    console.log("Saving checklist:", { projectName, projectUrl, checklistItems });
    // This would typically save to a database or local storage
  };
  
  // Export checklist
  const exportChecklist = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      projectName,
      projectUrl,
      checklistItems,
      exportedAt: new Date().toISOString()
    }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${projectName.replace(/\s+/g, '-').toLowerCase()}-seo-checklist.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>SEO & Web Design Checklist</CardTitle>
              <CardDescription>Track your website's optimization progress</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={saveChecklist}>
                <Save className="mr-2 h-4 w-4" />
                Save Checklist
              </Button>
              <Button variant="outline" onClick={exportChecklist}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="project-url">Website URL</Label>
              <Input
                id="project-url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className="mt-1"
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-medium">Checklist Progress</h3>
                <p className="text-adsilo-text-secondary text-sm">
                  {completedItems} of {totalItems} items completed
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">{completionPercentage}%</span>
                <Badge variant={
                  completionPercentage < 25 ? "destructive" :
                  completionPercentage < 50 ? "outline" :
                  completionPercentage < 75 ? "secondary" :
                  "default"
                }>
                  {completionPercentage < 25 ? "Just Started" :
                   completionPercentage < 50 ? "In Progress" :
                   completionPercentage < 75 ? "Good Progress" :
                   completionPercentage < 100 ? "Almost There" : "Complete"}
                </Badge>
              </div>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(null)}
              >
                <Globe className="mr-2 h-4 w-4" />
                All Categories
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="space-y-2">
                {selectedCategory && (
                  <>
                    <h4 className="text-sm font-medium">Subcategories</h4>
                    {categories.find(c => c.id === selectedCategory)?.subcategories.map((subcategory) => (
                      <div key={subcategory} className="flex items-center justify-between">
                        <span className="text-sm">{subcategory}</span>
                        <Badge variant="outline">
                          {checklistItems.filter(item => 
                            item.category === selectedCategory && 
                            item.subcategory === subcategory &&
                            item.checked
                          ).length} / {
                            checklistItems.filter(item => 
                              item.category === selectedCategory && 
                              item.subcategory === subcategory
                            ).length
                          }
                        </Badge>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center">
                <Input
                  placeholder="Search checklist items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="sm:max-w-sm"
                />
                <Search className="h-4 w-4 text-muted-foreground -ml-8" />
              </div>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="critical">Critical</TabsTrigger>
                  <TabsTrigger value="high">High Priority</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-10">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No items found</h3>
                <p className="text-adsilo-text-secondary">
                  Try adjusting your search query or filter settings
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[600px] pr-4">
                <Accordion type="multiple" className="space-y-4">
                  {filteredItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Checkbox 
                            checked={item.checked}
                            disabled={item.notApplicable}
                            onCheckedChange={() => toggleItemChecked(item.id)}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`text-base font-medium ${item.notApplicable ? "line-through text-muted-foreground" : ""}`}>
                                {item.title}
                              </span>
                              <Badge 
                                variant={
                                  item.priority === "critical" ? "destructive" :
                                  item.priority === "high" ? "default" :
                                  item.priority === "medium" ? "secondary" : "outline"
                                }
                                className="text-xs"
                              >
                                {item.priority}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.subcategory}
                              </Badge>
                            </div>
                            <div className="flex items-center">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 w-7 p-0"
                                      onClick={() => toggleItemNotApplicable(item.id)}
                                    >
                                      {item.notApplicable ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Mark as {item.notApplicable ? "applicable" : "not applicable"}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <AccordionTrigger />
                            </div>
                          </div>
                          
                          <p className="text-sm text-adsilo-text-secondary mt-1 mb-2">
                            {item.description}
                          </p>
                          
                          <AccordionContent>
                            <div className="pt-3 space-y-4">
                              <div>
                                <Label htmlFor={`notes-${item.id}`}>Notes</Label>
                                <Input
                                  id={`notes-${item.id}`}
                                  value={item.notes || ""}
                                  onChange={(e) => updateItemNotes(item.id, e.target.value)}
                                  className="mt-1"
                                  placeholder="Add notes about this checklist item..."
                                />
                              </div>
                              
                              {item.resources && item.resources.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Resources</h4>
                                  <div className="space-y-1">
                                    {item.resources.map((resource, idx) => (
                                      <div key={idx} className="flex items-center">
                                        <a 
                                          href={resource.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-sm text-blue-600 hover:underline flex items-center"
                                        >
                                          <Globe className="h-3 w-3 mr-1" />
                                          {resource.title}
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </div>
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>SEO Checklist Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Total Items</h3>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{totalItems}</p>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Completed</h3>
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{completedItems}</p>
              <Progress value={completionPercentage} className="h-1 mt-2" />
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Critical Items</h3>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-2xl font-bold">
                {checklistItems.filter(item => item.priority === "critical" && item.checked).length} / {checklistItems.filter(item => item.priority === "critical").length}
              </p>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">High Priority</h3>
                <HelpCircle className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-2xl font-bold">
                {checklistItems.filter(item => item.priority === "high" && item.checked).length} / {checklistItems.filter(item => item.priority === "high").length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoChecklist;
