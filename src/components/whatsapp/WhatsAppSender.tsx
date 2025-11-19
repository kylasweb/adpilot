import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  Upload,
  Download,
  Send,
  Users,
  FileSpreadsheet,
  Settings,
  Calendar,
  BarChart2,
  QrCode,
  FileCog,
  Merge,
  MessageSquare,
  HelpCircle,
  Check,
  AlertTriangle,
  X,
  RefreshCw,
  Plus
} from "lucide-react";

// Type definitions
interface Contact {
  id: string;
  name: string;
  phone: string;
  tags: string[];
  lastMessage?: Date;
  status?: "active" | "inactive";
}

interface Template {
  id: string;
  name: string;
  content: string;
  variables: string[];
  mediaUrl?: string;
  mediaType?: "image" | "video" | "document";
}

interface Campaign {
  id: string;
  name: string;
  templateId: string;
  contacts: string[];
  status: "draft" | "scheduled" | "completed" | "running";
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  createdAt: Date;
  scheduledAt?: Date;
  completedAt?: Date;
}

// Mock data
const mockContacts: Contact[] = [
  { id: "1", name: "John Doe", phone: "+1234567890", tags: ["customer", "VIP"], lastMessage: new Date(2023, 5, 15), status: "active" },
  { id: "2", name: "Jane Smith", phone: "+1987654321", tags: ["lead"], status: "active" },
  { id: "3", name: "Robert Johnson", phone: "+1122334455", tags: ["customer"], lastMessage: new Date(2023, 6, 20), status: "inactive" },
  { id: "4", name: "Mary Williams", phone: "+1567890123", tags: ["prospect"], status: "active" },
  { id: "5", name: "David Brown", phone: "+1456789012", tags: ["customer", "new"], lastMessage: new Date(2023, 7, 10), status: "active" },
  { id: "6", name: "Sarah Miller", phone: "+1345678901", tags: ["lead", "high-priority"], status: "active" },
  { id: "7", name: "Michael Davis", phone: "+1234509876", tags: ["customer"], lastMessage: new Date(2023, 8, 5), status: "active" },
  { id: "8", name: "Jennifer Garcia", phone: "+1234567809", tags: ["prospect"], status: "inactive" },
];

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Welcome Message",
    content: "Hello {{name}}, welcome to our service! We're excited to have you on board.",
    variables: ["name"]
  },
  {
    id: "2",
    name: "Appointment Reminder",
    content: "Hi {{name}}, this is a reminder about your appointment on {{date}} at {{time}}. Please reply 'YES' to confirm.",
    variables: ["name", "date", "time"],
    mediaUrl: "https://example.com/reminder.jpg",
    mediaType: "image"
  },
  {
    id: "3",
    name: "Promotion",
    content: "Dear {{name}}, we're offering a special discount of {{discount}}% on all our products until {{endDate}}. Use code: {{code}} at checkout.",
    variables: ["name", "discount", "endDate", "code"]
  }
];

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Welcome New Customers",
    templateId: "1",
    contacts: ["1", "5", "7"],
    status: "completed",
    sentCount: 3,
    deliveredCount: 3,
    readCount: 2,
    createdAt: new Date(2023, 5, 1),
    completedAt: new Date(2023, 5, 1)
  },
  {
    id: "2",
    name: "July Promotion",
    templateId: "3",
    contacts: ["1", "2", "3", "4", "5", "6", "7", "8"],
    status: "scheduled",
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    createdAt: new Date(2023, 6, 25),
    scheduledAt: new Date(2023, 7, 1)
  },
  {
    id: "3",
    name: "Appointment Reminders",
    templateId: "2",
    contacts: ["1", "4", "6"],
    status: "running",
    sentCount: 2,
    deliveredCount: 2,
    readCount: 1,
    createdAt: new Date(2023, 6, 28)
  }
];

const WhatsAppSender = () => {
  // States
  const [activeTab, setActiveTab] = useState("messaging");
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [messagePreview, setMessagePreview] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState<"qr" | "business" | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [isBulkSending, setIsBulkSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateContent, setNewTemplateContent] = useState("");
  
  const { toast } = useToast();
  
  // Handle connecting via QR code
  const handleQrConnect = () => {
    setConnectionMethod("qr");
    setShowQr(true);
    
    // Simulate connection after 4 seconds
    setTimeout(() => {
      setIsConnected(true);
      setShowQr(false);
      toast({
        title: "Connected",
        description: "WhatsApp connection successful!",
      });
    }, 4000);
  };
  
  // Handle connecting via Business API
  const handleBusinessConnect = () => {
    setConnectionMethod("business");
    // Implement business API authentication
    setIsConnected(true);
    toast({
      title: "Connected",
      description: "WhatsApp Business API connected successfully!",
    });
  };
  
  // Handle disconnect
  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectionMethod(null);
    toast({
      description: "WhatsApp disconnected",
    });
  };
  
  // Handle contact selection
  const toggleContactSelection = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };
  
  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
    
    // Generate message preview
    if (template) {
      let preview = template.content;
      template.variables.forEach(variable => {
        preview = preview.replace(`{{${variable}}}`, `[${variable}]`);
      });
      setMessagePreview(preview);
    } else {
      setMessagePreview("");
    }
  };
  
  // Handle sending messages
  const handleSendMessages = () => {
    if (!selectedTemplate || selectedContacts.length === 0) {
      toast({
        title: "Error",
        description: "Please select a template and at least one contact",
        variant: "destructive",
      });
      return;
    }
    
    // Create a new campaign
    const newCampaign: Campaign = {
      id: `campaign-${Date.now()}`,
      name: campaignName || `Campaign ${campaigns.length + 1}`,
      templateId: selectedTemplate.id,
      contacts: [...selectedContacts],
      status: "running",
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      createdAt: new Date(),
    };
    
    setCampaigns([...campaigns, newCampaign]);
    
    // Start sending animation
    setIsBulkSending(true);
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += 5;
      setSendProgress(progress);
      
      // Update counts in real-time
      if (progress % 20 === 0) {
        setCampaigns(prev => 
          prev.map(c => 
            c.id === newCampaign.id 
              ? {
                  ...c, 
                  sentCount: Math.floor(progress / 100 * selectedContacts.length),
                  deliveredCount: Math.floor(progress / 150 * selectedContacts.length)
                }
              : c
          )
        );
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsBulkSending(false);
        setSendProgress(0);
        
        // Update campaign as completed
        setCampaigns(prev => 
          prev.map(c => 
            c.id === newCampaign.id 
              ? {
                  ...c, 
                  status: "completed",
                  sentCount: selectedContacts.length,
                  deliveredCount: selectedContacts.length,
                  readCount: Math.floor(selectedContacts.length * 0.7),
                  completedAt: new Date()
                }
              : c
          )
        );
        
        // Reset selections
        setSelectedContacts([]);
        setSelectedTemplate(null);
        setCampaignName("");
        
        toast({
          title: "Success",
          description: `Sent ${selectedContacts.length} messages successfully!`,
        });
      }
    }, 200);
  };
  
  // Add new contact
  const handleAddContact = () => {
    if (!newContactName || !newContactPhone) {
      toast({
        title: "Error",
        description: "Please enter both name and phone number",
        variant: "destructive",
      });
      return;
    }
    
    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      name: newContactName,
      phone: newContactPhone,
      tags: ["new"],
      status: "active",
    };
    
    setContacts([...contacts, newContact]);
    setNewContactName("");
    setNewContactPhone("");
    
    toast({
      description: "Contact added successfully",
    });
  };
  
  // Add new template
  const handleAddTemplate = () => {
    if (!newTemplateName || !newTemplateContent) {
      toast({
        title: "Error",
        description: "Please enter both template name and content",
        variant: "destructive",
      });
      return;
    }
    
    // Extract variables from content ({{variableName}})
    const variableRegex = /\{\{([^}]+)\}\}/g;
    const matches = newTemplateContent.matchAll(variableRegex);
    const variables = Array.from(matches, m => m[1]);
    
    const newTemplate: Template = {
      id: `template-${Date.now()}`,
      name: newTemplateName,
      content: newTemplateContent,
      variables: [...new Set(variables)],
    };
    
    setTemplates([...templates, newTemplate]);
    setNewTemplateName("");
    setNewTemplateContent("");
    
    toast({
      description: "Template added successfully",
    });
  };

  return (
    <div className="space-y-6">
      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect to WhatsApp</CardTitle>
            <CardDescription>
              Connect to WhatsApp to start sending messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-md p-6">
                <div className="flex items-center mb-4">
                  <QrCode className="h-6 w-6 mr-3 text-green-600" />
                  <h3 className="text-lg font-medium">QR Code Login</h3>
                </div>
                <p className="text-adsilo-text-secondary mb-6">
                  Connect using WhatsApp Web by scanning a QR code with your phone.
                </p>
                <Button onClick={handleQrConnect}>
                  Connect with QR Code
                </Button>
              </div>
              
              <div className="border rounded-md p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 mr-3 text-blue-600" />
                  <h3 className="text-lg font-medium">Business API</h3>
                </div>
                <p className="text-adsilo-text-secondary mb-6">
                  Connect using WhatsApp Business API credentials (requires approval).
                </p>
                <Button onClick={handleBusinessConnect}>
                  Connect with Business API
                </Button>
              </div>
            </div>
            
            {showQr && (
              <div className="flex flex-col items-center justify-center p-6 border rounded-md">
                <div className="mb-6">
                  <QrCode className="h-32 w-32 text-adsilo-primary animate-pulse" />
                </div>
                <p className="mb-2 text-center">Scan the QR code with your phone</p>
                <p className="text-sm text-adsilo-text-secondary text-center">
                  Open WhatsApp on your phone &gt; Settings &gt; WhatsApp Web/Desktop &gt; Scan the QR code
                </p>
              </div>
            )}
            
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Important Notice</h4>
                  <p className="text-sm">
                    Using WhatsApp for bulk messaging should comply with WhatsApp's Business Policy. 
                    Sending spam or unsolicited messages may result in your number being blocked.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>WhatsApp Connection</CardTitle>
                  <CardDescription>
                    You're connected to WhatsApp via {connectionMethod === "qr" ? "QR Code" : "Business API"}
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-green-50 text-green-700 mr-3">
                    <Check className="h-3 w-3 mr-1" /> Connected
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleDisconnect}>
                    <X className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <Tabs defaultValue="messaging" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="messaging">
                <Send className="h-4 w-4 mr-2" />
                Bulk Messaging
              </TabsTrigger>
              <TabsTrigger value="contacts">
                <Users className="h-4 w-4 mr-2" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="templates">
                <FileCog className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="campaigns">
                <BarChart2 className="h-4 w-4 mr-2" />
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="messaging" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Bulk Messaging Campaign</CardTitle>
                  <CardDescription>
                    Select contacts and a message template to send
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-2 block">Campaign Name</Label>
                      <Input 
                        placeholder="Enter campaign name"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Selected Contacts</Label>
                        <span className="text-sm text-adsilo-text-muted">{selectedContacts.length} selected</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <Users className="mr-2 h-4 w-4" />
                            Select Contacts
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Select Contacts</DialogTitle>
                            <DialogDescription>
                              Choose contacts to send your message to
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <Input placeholder="Search contacts..." className="max-w-sm" />
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  Select All
                                </Button>
                                <Button variant="outline" size="sm">
                                  Clear Selection
                                </Button>
                              </div>
                            </div>
                            
                            <ScrollArea className="h-96 rounded-md border">
                              <div className="p-4">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-[40px]"></TableHead>
                                      <TableHead>Name</TableHead>
                                      <TableHead>Phone</TableHead>
                                      <TableHead>Tags</TableHead>
                                      <TableHead>Status</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {contacts.map((contact) => (
                                      <TableRow key={contact.id} onClick={() => toggleContactSelection(contact.id)} className="cursor-pointer">
                                        <TableCell>
                                          <input
                                            type="checkbox"
                                            checked={selectedContacts.includes(contact.id)}
                                            onChange={() => {}}
                                            className="h-4 w-4 rounded border-gray-300"
                                          />
                                        </TableCell>
                                        <TableCell>{contact.name}</TableCell>
                                        <TableCell>{contact.phone}</TableCell>
                                        <TableCell>
                                          <div className="flex flex-wrap gap-1">
                                            {contact.tags.map(tag => (
                                              <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                              </Badge>
                                            ))}
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <Badge variant={contact.status === "active" ? "default" : "secondary"}>
                                            {contact.status}
                                          </Badge>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </ScrollArea>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Select Message Template</Label>
                    <div className="grid grid-cols-1 gap-4">
                      {templates.map((template) => (
                        <div 
                          key={template.id}
                          className={`border rounded-md p-4 cursor-pointer ${
                            selectedTemplate?.id === template.id ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => handleTemplateSelect(template.id)}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{template.name}</h4>
                            <div className="flex items-center gap-2">
                              {template.mediaType && (
                                <Badge variant="outline" className="text-xs">
                                  {template.mediaType}
                                </Badge>
                              )}
                              {template.variables.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {template.variables.length} variables
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-adsilo-text-secondary">{template.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {messagePreview && (
                    <div className="border rounded-md p-4 bg-slate-50">
                      <h4 className="font-medium mb-2">Message Preview</h4>
                      <p className="text-sm">{messagePreview}</p>
                      
                      {selectedTemplate?.variables && selectedTemplate.variables.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2">Variables</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {selectedTemplate.variables.map(varName => (
                              <div key={varName}>
                                <Label className="text-xs">{varName}</Label>
                                <Input placeholder={`Enter ${varName}`} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Sending
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Schedule your messages to be sent at a later time</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <div className="flex gap-3">
                        <Input type="date" className="flex-1" />
                        <Input type="time" className="w-32" />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="flex items-center mb-2">
                        <Settings className="h-4 w-4 mr-2" />
                        Sending Options
                      </Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch id="stagger-sending" />
                          <Label htmlFor="stagger-sending">Stagger sending (avoid detection)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="track-delivery" defaultChecked />
                          <Label htmlFor="track-delivery">Track message delivery</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {isBulkSending ? (
                    <div className="space-y-3">
                      <Progress value={sendProgress} className="w-full" />
                      <div className="flex justify-between text-sm text-adsilo-text-muted">
                        <span>Sending messages...</span>
                        <span>{sendProgress}%</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSendMessages}
                        disabled={!selectedTemplate || selectedContacts.length === 0}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Messages
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>WhatsApp Web</CardTitle>
                  <CardDescription>
                    Access WhatsApp Web directly in the dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md h-[500px] flex items-center justify-center bg-slate-50 relative overflow-hidden">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 mb-4 text-adsilo-primary mx-auto" />
                      <p className="font-semibold mb-2">WhatsApp Web Embeddable</p>
                      <p className="text-sm text-adsilo-text-secondary max-w-md mx-auto mb-4">
                        For security and privacy reasons, WhatsApp Web is not embedded by default. 
                        Click the button below to load WhatsApp Web in this panel.
                      </p>
                      <Button>Load WhatsApp Web</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contacts" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Contact Management</CardTitle>
                      <CardDescription>
                        Manage your WhatsApp contacts
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Contact
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Add New Contact</DrawerTitle>
                          </DrawerHeader>
                          <div className="p-4 space-y-4">
                            <div>
                              <Label htmlFor="contact-name">Name</Label>
                              <Input 
                                id="contact-name" 
                                placeholder="Enter contact name"
                                value={newContactName}
                                onChange={(e) => setNewContactName(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="contact-phone">Phone Number</Label>
                              <Input 
                                id="contact-phone" 
                                placeholder="Enter phone number with country code"
                                value={newContactPhone}
                                onChange={(e) => setNewContactPhone(e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground mt-1">Format: +1234567890</p>
                            </div>
                            <div>
                              <Label htmlFor="contact-tags">Tags (comma-separated)</Label>
                              <Input id="contact-tags" placeholder="customer, lead, etc." />
                            </div>
                            <Button onClick={handleAddContact} className="w-full">
                              Add Contact
                            </Button>
                          </div>
                        </DrawerContent>
                      </Drawer>
                      <Button variant="outline">
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Import
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead>Last Message</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {contact.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              {contact.lastMessage ? new Date(contact.lastMessage).toLocaleDateString() : "-"}
                            </TableCell>
                            <TableCell>
                              <Badge variant={contact.status === "active" ? "default" : "secondary"}>
                                {contact.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Send className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contact Groups</CardTitle>
                  <CardDescription>
                    Organize your contacts into groups for easier messaging
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Customers</CardTitle>
                        <CardDescription>
                          Active customers
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-sm text-adsilo-text-muted">contacts</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Leads</CardTitle>
                        <CardDescription>
                          Potential customers
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-sm text-adsilo-text-muted">contacts</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Prospects</CardTitle>
                        <CardDescription>
                          Qualified leads
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-sm text-adsilo-text-muted">contacts</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Message Templates</CardTitle>
                      <CardDescription>
                        Create and manage reusable message templates
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Template
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Create Message Template</DrawerTitle>
                          </DrawerHeader>
                          <div className="p-4 space-y-4">
                            <div>
                              <Label htmlFor="template-name">Template Name</Label>
                              <Input 
                                id="template-name" 
                                placeholder="Enter template name"
                                value={newTemplateName}
                                onChange={(e) => setNewTemplateName(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="template-content">Message Content</Label>
                              <Textarea 
                                id="template-content"
                                placeholder="Enter your message with {{variables}}"
                                rows={5}
                                value={newTemplateContent}
                                onChange={(e) => setNewTemplateContent(e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Use {"{{variable_name}}"} for dynamic content (e.g., {"{{name}}"}, {"{{date}}"})
                              </p>
                            </div>
                            <div>
                              <Label htmlFor="template-media">Media URL (Optional)</Label>
                              <Input id="template-media" placeholder="https://example.com/image.jpg" />
                            </div>
                            <div>
                              <Label>Media Type</Label>
                              <Select defaultValue="none">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select media type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">No Media</SelectItem>
                                  <SelectItem value="image">Image</SelectItem>
                                  <SelectItem value="video">Video</SelectItem>
                                  <SelectItem value="document">Document</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleAddTemplate} className="w-full">
                              Create Template
                            </Button>
                          </div>
                        </DrawerContent>
                      </Drawer>
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Import
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {templates.map((template) => (
                      <Card key={template.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <div className="flex items-center gap-2">
                              {template.mediaType && (
                                <Badge variant="outline">
                                  {template.mediaType}
                                </Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-adsilo-text-secondary mb-4">{template.content}</p>
                          
                          {template.variables.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Variables:</p>
                              <div className="flex flex-wrap gap-2">
                                {template.variables.map(variable => (
                                  <Badge key={variable} variant="secondary">
                                    {variable}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Campaign History</CardTitle>
                      <CardDescription>
                        Track and manage your WhatsApp messaging campaigns
                      </CardDescription>
                    </div>
                    <Button variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Sent</TableHead>
                          <TableHead>Delivered</TableHead>
                          <TableHead>Read</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {campaigns.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  campaign.status === "completed" ? "default" : 
                                  campaign.status === "running" ? "default" : 
                                  campaign.status === "scheduled" ? "outline" : 
                                  "secondary"
                                }
                              >
                                {campaign.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{campaign.sentCount}</TableCell>
                            <TableCell>{campaign.deliveredCount}</TableCell>
                            <TableCell>{campaign.readCount}</TableCell>
                            <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <BarChart2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center bg-slate-50">
                    {/* Placeholder for chart */}
                    <p className="text-adsilo-text-secondary">Campaign performance chart will appear here</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Message Delivery Rate</h4>
                        <div className="flex items-center">
                          <div className="w-full mr-4">
                            <Progress value={92} className="h-2" />
                          </div>
                          <span className="font-bold text-lg">92%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Message Read Rate</h4>
                        <div className="flex items-center">
                          <div className="w-full mr-4">
                            <Progress value={78} className="h-2" />
                          </div>
                          <span className="font-bold text-lg">78%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Response Rate</h4>
                        <div className="flex items-center">
                          <div className="w-full mr-4">
                            <Progress value={45} className="h-2" />
                          </div>
                          <span className="font-bold text-lg">45%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>WhatsApp Settings</CardTitle>
                  <CardDescription>
                    Configure your WhatsApp integration settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Connection Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Auto-reconnect</Label>
                            <p className="text-sm text-adsilo-text-muted">
                              Automatically attempt to reconnect if connection is lost
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Keep session alive</Label>
                            <p className="text-sm text-adsilo-text-muted">
                              Prevent WhatsApp Web from logging out due to inactivity
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Message Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Delay between messages</Label>
                            <p className="text-sm text-adsilo-text-muted">
                              Add a random delay between sending bulk messages (recommended)
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Minimum delay (seconds)</Label>
                            <Input type="number" defaultValue={3} min={1} />
                          </div>
                          <div>
                            <Label>Maximum delay (seconds)</Label>
                            <Input type="number" defaultValue={8} min={1} />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Auto-retry failed messages</Label>
                            <p className="text-sm text-adsilo-text-muted">
                              Automatically retry sending messages that fail to deliver
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div>
                          <Label>Maximum retry attempts</Label>
                          <Input type="number" defaultValue={3} min={1} max={10} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Business API Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Business API Key</Label>
                          <Input type="password" placeholder="Enter your WhatsApp Business API key" />
                        </div>
                        <div>
                          <Label>Business Phone Number ID</Label>
                          <Input placeholder="Enter your WhatsApp Business Phone Number ID" />
                        </div>
                        <div>
                          <Label>Webhook URL</Label>
                          <Input placeholder="https://your-webhook-url.com" />
                        </div>
                        <Button variant="outline">
                          Verify Business API Connection
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button>
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default WhatsAppSender;
