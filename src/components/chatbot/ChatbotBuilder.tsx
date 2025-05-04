import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; 
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  MessageSquare,
  Globe,
  Phone,
  Plus,
  Trash2,
  Save,
  Download,
  Upload,
  PlayCircle,
  Settings,
  Layers,
  PanelLeft,
  PanelRight,
  HelpCircle
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ChatbotPreview from "./ChatbotPreview";
import ChatbotNodeEditor from "./ChatbotNodeEditor";
import { useToast } from "@/hooks/use-toast";

// Type definitions
export type ChatbotPlatform = "website" | "whatsapp" | "telegram" | "facebook";
export type NodeType = "message" | "question" | "condition" | "api" | "action";

export interface ChatbotNode {
  id: string;
  type: NodeType;
  content: string;
  next?: string[];
  conditions?: Record<string, string>;
  x: number;
  y: number;
}

export interface Chatbot {
  id: string;
  name: string;
  description: string;
  platform: ChatbotPlatform;
  welcomeMessage: string;
  nodes: ChatbotNode[];
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  useAI: boolean;
  aiModel?: string;
  aiTemperature?: number;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

// Mock data for platforms and AI models
const platforms = [
  { id: "website", label: "Website", icon: Globe },
  { id: "whatsapp", label: "WhatsApp", icon: Phone },
  { id: "telegram", label: "Telegram", icon: MessageSquare },
  { id: "facebook", label: "Facebook Messenger", icon: MessageSquare },
];

const aiModels = [
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4o-mini", label: "GPT-4o Mini" },
  { id: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet" },
  { id: "gemini-pro", label: "Gemini Pro" },
];

// Sample empty chatbot template
const emptyChatbot: Chatbot = {
  id: "",
  name: "New Chatbot",
  description: "A helpful assistant",
  platform: "website",
  welcomeMessage: "Hello! How can I help you today?",
  nodes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  isPublished: false,
  useAI: false,
  theme: {
    primaryColor: "#3b82f6",
    secondaryColor: "#f3f4f6",
    fontFamily: "Inter, sans-serif",
  },
};

const ChatbotBuilder = () => {
  const [chatbot, setChatbot] = useState<Chatbot>(emptyChatbot);
  const [activeTab, setActiveTab] = useState("builder");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Handle chatbot settings change
  const handleSettingsChange = (field: keyof Chatbot, value: any) => {
    setChatbot((prev) => ({ ...prev, [field]: value }));
  };

  // Handle theme settings change
  const handleThemeChange = (field: keyof Chatbot["theme"], value: string) => {
    setChatbot((prev) => ({
      ...prev,
      theme: { ...prev.theme, [field]: value },
    }));
  };

  // Save chatbot
  const saveChatbot = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Chatbot saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save chatbot",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new chatbot node
  const createNode = (type: NodeType) => {
    const newNode: ChatbotNode = {
      id: `node-${Date.now()}`,
      type,
      content: type === 'message' ? 'Hello there!' : 'What can I help you with?',
      x: 200,
      y: 200,
    };

    setChatbot((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
    }));
    
    setSelectedNodeId(newNode.id);
    
    toast({
      title: "Node created",
      description: `New ${type} node added to the flow`,
    });
  };

  // Delete node
  const deleteNode = (nodeId: string) => {
    setChatbot((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((node) => node.id !== nodeId),
    }));
    
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
    
    toast({
      description: "Node deleted",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="chatbot-name">Chatbot Name</Label>
                <Input
                  id="chatbot-name"
                  value={chatbot.name}
                  onChange={(e) => handleSettingsChange("name", e.target.value)}
                  placeholder="My awesome chatbot"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="chatbot-description">Description</Label>
                <Textarea
                  id="chatbot-description"
                  value={chatbot.description}
                  onChange={(e) => handleSettingsChange("description", e.target.value)}
                  placeholder="What this chatbot does..."
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={chatbot.platform}
                  onValueChange={(value) => handleSettingsChange("platform", value as ChatbotPlatform)}
                >
                  <SelectTrigger id="platform" className="mt-1">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        <div className="flex items-center">
                          <platform.icon className="mr-2 h-4 w-4" />
                          {platform.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Input
                  id="welcome-message"
                  value={chatbot.welcomeMessage}
                  onChange={(e) => handleSettingsChange("welcomeMessage", e.target.value)}
                  placeholder="Hello! How can I help you today?"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="ai-toggle"
                  checked={chatbot.useAI}
                  onCheckedChange={(checked) => handleSettingsChange("useAI", checked)}
                />
                <Label htmlFor="ai-toggle">Enable AI</Label>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enable AI to make your chatbot more intelligent and responsive</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="publish-toggle"
                  checked={chatbot.isPublished}
                  onCheckedChange={(checked) => handleSettingsChange("isPublished", checked)}
                />
                <Label htmlFor="publish-toggle">Published</Label>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChatbot(emptyChatbot)}
              >
                <Plus className="mr-2 h-4 w-4" /> New
              </Button>
              
              <Button
                variant="outline"
                size="sm"
              >
                <Upload className="mr-2 h-4 w-4" /> Import
              </Button>
              
              <Button
                variant="outline"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={saveChatbot}
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="builder">
              <Layers className="mr-2 h-4 w-4" /> Flow Builder
            </TabsTrigger>
            <TabsTrigger value="preview">
              <PlayCircle className="mr-2 h-4 w-4" /> Preview
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" /> Advanced Settings
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="builder" className="space-y-4">
          <div className="grid grid-cols-12 gap-4 h-[600px]">
            <div className="col-span-12 md:col-span-3 lg:col-span-2 border rounded-md p-4">
              <h3 className="text-sm font-medium mb-3">Node Types</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => createNode("message")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => createNode("question")}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Question
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => createNode("condition")}
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Condition
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => createNode("api")}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  API Call
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => createNode("action")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Action
                </Button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Templates</h3>
                <Select defaultValue="blank">
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blank">Blank Chatbot</SelectItem>
                    <SelectItem value="customer-service">Customer Service</SelectItem>
                    <SelectItem value="lead-gen">Lead Generation</SelectItem>
                    <SelectItem value="faq">FAQ Bot</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="w-full mt-2" size="sm">
                  Apply Template
                </Button>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-6 lg:col-span-7 border rounded-md bg-slate-50 p-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {chatbot.nodes.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    <p>Your chatbot flow will appear here</p>
                    <p className="text-sm">Add nodes from the left panel</p>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    {/* This would be replaced with a real flow editor component */}
                    <div className="absolute inset-0 p-4">
                      <div className="flex flex-wrap gap-4">
                        {chatbot.nodes.map((node) => (
                          <div 
                            key={node.id}
                            className={`p-3 rounded-md border-2 cursor-move ${
                              selectedNodeId === node.id ? "border-primary" : "border-gray-200"
                            } ${
                              node.type === "message" ? "bg-blue-50" :
                              node.type === "question" ? "bg-green-50" :
                              node.type === "condition" ? "bg-yellow-50" :
                              node.type === "api" ? "bg-purple-50" : "bg-gray-50"
                            }`}
                            onClick={() => setSelectedNodeId(node.id)}
                            style={{
                              position: 'absolute',
                              left: `${node.x}px`,
                              top: `${node.y}px`,
                              width: '200px',
                            }}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                {node.type === "message" && <MessageSquare className="h-4 w-4 mr-1" />}
                                {node.type === "question" && <HelpCircle className="h-4 w-4 mr-1" />}
                                {node.type === "condition" && <Layers className="h-4 w-4 mr-1" />}
                                {node.type === "api" && <Globe className="h-4 w-4 mr-1" />}
                                {node.type === "action" && <Settings className="h-4 w-4 mr-1" />}
                                <span className="text-xs font-medium capitalize">{node.type}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNode(node.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs truncate">{node.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-3 border rounded-md p-4">
              <h3 className="text-sm font-medium mb-3">Properties</h3>
              
              {selectedNodeId ? (
                <ChatbotNodeEditor 
                  node={chatbot.nodes.find(n => n.id === selectedNodeId)!}
                  updateNode={(updatedNode) => {
                    setChatbot(prev => ({
                      ...prev,
                      nodes: prev.nodes.map(n => 
                        n.id === selectedNodeId ? updatedNode : n
                      )
                    }));
                  }}
                />
              ) : (
                <div className="text-sm text-muted-foreground">
                  Select a node to edit its properties
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Chatbot Preview</h3>
              <div className="border rounded-md h-[500px] bg-slate-50 flex items-center justify-center overflow-hidden">
                <ChatbotPreview chatbot={chatbot} />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Test Console</h3>
              <div className="border rounded-md h-[500px] p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Test your chatbot</h4>
                  <Button variant="outline" size="sm">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Reset Conversation
                  </Button>
                </div>
                
                <div className="h-[350px] overflow-y-auto border rounded-md mb-4 p-3 bg-slate-50">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-primary text-primary-foreground rounded-lg p-2 text-sm">
                        {chatbot.welcomeMessage}
                      </div>
                    </div>
                    
                    {/* Sample conversation */}
                    <div className="flex items-start gap-2 max-w-[80%] self-end">
                      <div className="bg-secondary text-secondary-foreground rounded-lg p-2 text-sm">
                        Hello, I need some help
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-primary text-primary-foreground rounded-lg p-2 text-sm">
                        I'd be happy to help! What do you need assistance with?
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button>Send</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">AI Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Select
                    value={chatbot.aiModel}
                    onValueChange={(value) => handleSettingsChange("aiModel", value)}
                    disabled={!chatbot.useAI}
                  >
                    <SelectTrigger id="ai-model" className="mt-1">
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="ai-temperature">
                    AI Temperature
                    <span className="ml-1 text-sm text-muted-foreground">
                      ({chatbot.aiTemperature || 0.7})
                    </span>
                  </Label>
                  <Input
                    id="ai-temperature"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={chatbot.aiTemperature || 0.7}
                    onChange={(e) => handleSettingsChange("aiTemperature", parseFloat(e.target.value))}
                    className="mt-1"
                    disabled={!chatbot.useAI}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Precise (0.0)</span>
                    <span>Creative (1.0)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Label htmlFor="system-prompt">System Prompt</Label>
                <Textarea
                  id="system-prompt"
                  placeholder="You are a helpful assistant..."
                  className="mt-1"
                  rows={3}
                  disabled={!chatbot.useAI}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This prompt guides how the AI behaves when responding to users.
                </p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Appearance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex mt-1">
                    <Input
                      id="primary-color"
                      type="color"
                      value={chatbot.theme.primaryColor}
                      onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={chatbot.theme.primaryColor}
                      onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                      className="flex-1 ml-2"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex mt-1">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={chatbot.theme.secondaryColor}
                      onChange={(e) => handleThemeChange("secondaryColor", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={chatbot.theme.secondaryColor}
                      onChange={(e) => handleThemeChange("secondaryColor", e.target.value)}
                      className="flex-1 ml-2"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select
                    value={chatbot.theme.fontFamily}
                    onValueChange={(value) => handleThemeChange("fontFamily", value)}
                  >
                    <SelectTrigger id="font-family" className="mt-1">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                      <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                      <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                      <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Widget Position</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">
                    <PanelRight className="mr-2 h-4 w-4" />
                    Right Side
                  </Button>
                  <Button variant="outline">
                    <PanelLeft className="mr-2 h-4 w-4" />
                    Left Side
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Integration</h3>
              
              <div className="mb-6">
                <Label htmlFor="embed-code">Embed Code</Label>
                <pre className="mt-2 p-4 bg-slate-100 rounded-md text-xs overflow-x-auto">
                  {`<script src="https://adpilot.example/chatbot.js?id=${chatbot.id}" defer></script>
<div id="adpilot-chatbot"></div>`}
                </pre>
                <Button variant="outline" size="sm" className="mt-2">
                  Copy Code
                </Button>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Webhook (Advanced)</h4>
                <Input
                  placeholder="https://your-api.example/webhook"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Send chatbot conversations to your API endpoint
                </p>
              </div>
              
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      API Integration Guide
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>API Integration Guide</DialogTitle>
                      <DialogDescription>
                        Learn how to integrate this chatbot with your existing systems.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>Documentation coming soon.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotBuilder;
