
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, Plus, Image, FileText, Instagram, Facebook, Send, Lightbulb } from "lucide-react";

const SocialPlannerPage = () => {
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  
  const scheduledPosts = [
    { id: 1, title: "Weekend Sale Announcement", platform: "Instagram", type: "Image", date: "2025-05-02 10:00", status: "Scheduled" },
    { id: 2, title: "Product Feature Video", platform: "Facebook", type: "Video", date: "2025-05-03 14:30", status: "Scheduled" },
    { id: 3, title: "Customer Testimonial", platform: "Instagram", type: "Carousel", date: "2025-05-04 09:15", status: "Draft" },
    { id: 4, title: "Industry News Update", platform: "LinkedIn", type: "Article", date: "2025-05-05 11:00", status: "Scheduled" },
  ];
  
  const aiSuggestions = [
    "Share a behind-the-scenes look at your team working on product development",
    "Create a carousel post highlighting 5 customer testimonials with product images",
    "Schedule your promotional posts between 5-7pm for maximum engagement",
    "Try using more questions in your captions to increase comment engagement",
    "Consider creating a video tutorial showing how to use your product"
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold">Social Media Planner</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Plan, schedule, and analyze your social media content with AI assistance
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
        
        <Tabs defaultValue="calendar">
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
            <TabsTrigger value="create">Create Content</TabsTrigger>
            <TabsTrigger value="library">Content Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>View and manage your scheduled social media posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Post Title</th>
                        <th className="text-left p-2">Platform</th>
                        <th className="text-left p-2">Content Type</th>
                        <th className="text-left p-2">Scheduled Date</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduledPosts.map(post => (
                        <tr key={post.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">{post.title}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              {post.platform === "Instagram" && <Instagram className="h-4 w-4 text-pink-600" />}
                              {post.platform === "Facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                              <span>{post.platform}</span>
                            </div>
                          </td>
                          <td className="p-2">{post.type}</td>
                          <td className="p-2">{post.date}</td>
                          <td className="p-2">
                            <Badge variant={post.status === "Scheduled" ? "default" : "outline"}>
                              {post.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Month View</h3>
                    <Select defaultValue="may">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="april">April 2025</SelectItem>
                        <SelectItem value="may">May 2025</SelectItem>
                        <SelectItem value="june">June 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="min-h-[400px] bg-white border rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Calendar view will render here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="create">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                    <CardDescription>Design and schedule your social media content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Select defaultValue="instagram">
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Input placeholder="Post title" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Textarea placeholder="Write your post caption here..." className="min-h-[120px]" />
                      </div>
                      
                      <div className="border border-dashed rounded-lg p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Image className="h-10 w-10 text-gray-400" />
                          <p className="text-sm text-gray-500">Drag and drop media files here</p>
                          <p className="text-xs text-gray-400">or</p>
                          <Button variant="outline" size="sm">Browse Files</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Schedule Date</label>
                          <Input type="date" />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Schedule Time</label>
                          <Input type="time" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="outline">Save as Draft</Button>
                        <Button>Schedule Post</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Post Preview</CardTitle>
                      <Select defaultValue="instagram">
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                        <p className="text-sm font-medium">Your Brand Name</p>
                      </div>
                      <div className="bg-gray-200 h-60 rounded flex items-center justify-center">
                        <p className="text-gray-500">Preview Image</p>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm">Your caption will appear here. This is where your post message will be displayed.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <span>AI Content Suggestions</span>
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
                      <p className="text-sm text-gray-500">Click "Get Ideas" to receive AI-powered post suggestions and content recommendations.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="library">
            <Card>
              <CardHeader>
                <CardTitle>Content Library</CardTitle>
                <CardDescription>Browse and manage your social media assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Content Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="images">Images</SelectItem>
                        <SelectItem value="videos">Videos</SelectItem>
                        <SelectItem value="text">Text Posts</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Search content..." className="w-64" />
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                    <div key={item} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-200 h-40 flex items-center justify-center">
                        <p className="text-gray-500">Asset {item}</p>
                      </div>
                      <div className="p-2 bg-white">
                        <p className="text-sm font-medium truncate">Content Item {item}</p>
                        <p className="text-xs text-gray-500">Added on May 1, 2025</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SocialPlannerPage;
