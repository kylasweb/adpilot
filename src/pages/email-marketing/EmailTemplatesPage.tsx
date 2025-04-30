
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Plus, Copy, Eye, Trash, Mail, Send, Lightbulb } from "lucide-react";

const EmailTemplatesPage = () => {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  
  const templates = [
    { id: 1, name: "Welcome Email", category: "Onboarding", lastEdited: "2025-04-25", status: "Active" },
    { id: 2, name: "Monthly Newsletter", category: "Newsletter", lastEdited: "2025-04-20", status: "Active" },
    { id: 3, name: "Product Launch", category: "Marketing", lastEdited: "2025-04-15", status: "Draft" },
    { id: 4, name: "Follow-up Email", category: "Sales", lastEdited: "2025-04-10", status: "Active" },
    { id: 5, name: "Customer Feedback", category: "Engagement", lastEdited: "2025-04-05", status: "Draft" },
  ];
  
  const aiSuggestions = [
    "Add a personalized greeting using the recipient's first name",
    "Include a clear call-to-action button with contrasting color",
    "Keep your subject line under 50 characters for better open rates",
    "Include social proof elements like testimonials or user statistics",
    "Add an engaging image near the top of the email"
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold">Email Templates</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Browse and customize AI-generated email templates for various purposes
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
        
        <Tabs defaultValue="templates">
          <TabsList className="mb-4">
            <TabsTrigger value="templates">My Templates</TabsTrigger>
            <TabsTrigger value="ai-templates">AI Template Gallery</TabsTrigger>
            <TabsTrigger value="editor">Template Editor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>My Email Templates</CardTitle>
                <CardDescription>Access and manage your saved email templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <Input placeholder="Search templates..." className="max-w-sm" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="onboarding">Onboarding</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Template Name</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Last Edited</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templates.map(template => (
                        <tr key={template.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{template.name}</td>
                          <td className="p-2">{template.category}</td>
                          <td className="p-2">{template.lastEdited}</td>
                          <td className="p-2">
                            <Badge variant={template.status === "Active" ? "default" : "outline"}>
                              {template.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" title="Preview">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Edit">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Duplicate">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Delete">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai-templates">
            <Card>
              <CardHeader>
                <CardTitle>AI Template Gallery</CardTitle>
                <CardDescription>Browse AI-generated templates for various email marketing purposes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <Input placeholder="Search AI templates..." className="max-w-sm" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="welcome">Welcome Emails</SelectItem>
                        <SelectItem value="newsletter">Newsletters</SelectItem>
                        <SelectItem value="promotion">Promotional</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="announcement">Announcements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Welcome Series", category: "Onboarding", templates: 5 },
                    { title: "Product Launch", category: "Marketing", templates: 3 },
                    { title: "Monthly Newsletter", category: "Newsletter", templates: 4 },
                    { title: "Customer Feedback", category: "Engagement", templates: 2 },
                    { title: "Sales Follow-up", category: "Sales", templates: 3 },
                    { title: "Abandoned Cart", category: "Recovery", templates: 3 }
                  ].map((category, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => setActiveTemplate(idx)}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{category.title}</CardTitle>
                          <Badge variant="outline">{category.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 mb-4">A collection of {category.templates} email templates for {category.title.toLowerCase()} sequences.</p>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm">Preview</Button>
                          <Button size="sm">Use Templates</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="editor">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Email Template Editor</CardTitle>
                      <Select defaultValue="welcome">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Template type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome Email</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="promotion">Promotional</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Email Subject</label>
                        <Input defaultValue="Welcome to [Company Name]!" />
                      </div>
                      
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Preview Text</label>
                        <Input defaultValue="We're excited to have you join us! Here's what you need to know." />
                      </div>
                      
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Email Content</label>
                        <div className="border rounded-lg">
                          <div className="bg-gray-50 border-b p-2 flex items-center gap-2">
                            <Button variant="ghost" size="sm">Text</Button>
                            <Button variant="ghost" size="sm">Image</Button>
                            <Button variant="ghost" size="sm">Button</Button>
                            <Button variant="ghost" size="sm">Divider</Button>
                            <Button variant="ghost" size="sm">Spacer</Button>
                          </div>
                          <div className="p-4 min-h-[400px]">
                            <div className="bg-white border rounded-lg p-4 mb-4">
                              <h2 className="text-xl font-bold">Welcome to [Company Name]!</h2>
                            </div>
                            <div className="bg-white border rounded-lg p-4 mb-4">
                              <p className="text-gray-700">
                                Hi [First Name],<br/><br/>
                                We're thrilled to welcome you to [Company Name]! Thank you for signing up. 
                                We're excited to have you join our community.<br/><br/>
                                Here are a few things you can do to get started:
                              </p>
                            </div>
                            <div className="bg-white border rounded-lg p-4 mb-4">
                              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li>Complete your profile</li>
                                <li>Browse our product catalog</li>
                                <li>Check out our latest features</li>
                              </ul>
                            </div>
                            <div className="bg-white border rounded-lg p-4 mb-4 text-center">
                              <button className="bg-blue-500 text-white px-6 py-2 rounded">Get Started</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline">Save as Draft</Button>
                        <div className="flex gap-2">
                          <Button variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                          <Button>
                            <Send className="mr-2 h-4 w-4" />
                            Save Template
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      <span>Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 p-2 text-sm">
                        <div><strong>Subject:</strong> Welcome to [Company Name]!</div>
                        <div><strong>From:</strong> Your Name &lt;you@company.com&gt;</div>
                      </div>
                      <div className="h-[400px] overflow-auto bg-white p-4">
                        <h2 className="text-xl font-bold">Welcome to [Company Name]!</h2>
                        <p className="my-4">
                          Hi [First Name],<br/><br/>
                          We're thrilled to welcome you to [Company Name]! Thank you for signing up. 
                          We're excited to have you join our community.<br/><br/>
                          Here are a few things you can do to get started:
                        </p>
                        <ul className="list-disc pl-5 my-4 space-y-2">
                          <li>Complete your profile</li>
                          <li>Browse our product catalog</li>
                          <li>Check out our latest features</li>
                        </ul>
                        <div className="my-4 text-center">
                          <button className="bg-blue-500 text-white px-6 py-2 rounded">Get Started</button>
                        </div>
                        <p className="mt-4">
                          If you have any questions, feel free to reply to this email.<br/><br/>
                          Best regards,<br/>
                          The [Company Name] Team
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <span>AI Suggestions</span>
                      </CardTitle>
                      <Button variant="outline" size="sm" onClick={() => setShowAiSuggestions(!showAiSuggestions)}>
                        {showAiSuggestions ? "Hide" : "Get Ideas"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {showAiSuggestions ? (
                      <ul className="space-y-2">
                        {aiSuggestions.map((suggestion, idx) => (
                          <li key={idx} className="bg-blue-50 p-2 rounded-md text-sm flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">Click "Get Ideas" to receive AI-powered suggestions to improve your email template.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default EmailTemplatesPage;
