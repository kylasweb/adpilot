
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Target, Plus, Facebook, Instagram, Lightbulb, Eye, Users } from "lucide-react";

const AdManagerPage = () => {
  const [adPlatform, setAdPlatform] = useState<string>("facebook");
  const [adFormat, setAdFormat] = useState<string>("image");
  const [showAiSuggestions, setShowAiSuggestions] = useState<boolean>(false);
  
  const adCampaigns = [
    { id: 1, name: "Summer Sale 2025", platform: "Facebook", budget: "$1,500", status: "Active", performance: "Good", reach: "45,320", conversions: "234" },
    { id: 2, name: "New Product Launch", platform: "Instagram", budget: "$2,000", status: "Scheduled", performance: "Pending", reach: "0", conversions: "0" },
    { id: 3, name: "Holiday Promotion", platform: "Facebook", budget: "$1,200", status: "Draft", performance: "Pending", reach: "0", conversions: "0" },
    { id: 4, name: "Retargeting Campaign", platform: "Google Ads", budget: "$800", status: "Active", performance: "Excellent", reach: "12,450", conversions: "98" },
  ];
  
  const aiSuggestions = [
    "Target users aged 25-34 interested in fitness and wellness",
    "Increase budget allocation for weekend ad placements",
    "Try carousel format to showcase multiple product features",
    "Add social proof elements to ad copy for higher conversion",
    "Test video ads targeting the same audience segment"
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold">Ad Campaign Manager</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Create, manage, and optimize advertising campaigns across multiple platforms
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
        
        <Tabs defaultValue="campaigns">
          <TabsList className="mb-4">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="create">Create Ad</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Manage your existing ad campaigns across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Campaign Name</th>
                        <th className="text-left p-2">Platform</th>
                        <th className="text-left p-2">Budget</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Performance</th>
                        <th className="text-left p-2">Reach</th>
                        <th className="text-left p-2">Conversions</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adCampaigns.map(campaign => (
                        <tr key={campaign.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">{campaign.name}</td>
                          <td className="p-2">{campaign.platform}</td>
                          <td className="p-2">{campaign.budget}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              campaign.status === "Active" ? "bg-green-100 text-green-800" :
                              campaign.status === "Draft" ? "bg-gray-100 text-gray-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="p-2">{campaign.performance}</td>
                          <td className="p-2">{campaign.reach}</td>
                          <td className="p-2">{campaign.conversions}</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="create">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Ad</CardTitle>
                    <CardDescription>Design your ad creative and set targeting options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="ad-name">Campaign Name</Label>
                        <Input id="ad-name" placeholder="Enter campaign name" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="ad-platform">Ad Platform</Label>
                        <Select value={adPlatform} onValueChange={setAdPlatform}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="google">Google Ads</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="ad-format">Ad Format</Label>
                        <Select value={adFormat} onValueChange={setAdFormat}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="image">Image Ad</SelectItem>
                            <SelectItem value="video">Video Ad</SelectItem>
                            <SelectItem value="carousel">Carousel Ad</SelectItem>
                            <SelectItem value="story">Story Ad</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="ad-headline">Ad Headline</Label>
                        <Input id="ad-headline" placeholder="Enter compelling headline" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="ad-text">Ad Text</Label>
                        <Textarea id="ad-text" placeholder="Enter ad copy" />
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="outline">Save Draft</Button>
                        <Button>Create Campaign</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Ad Preview</CardTitle>
                      <Select defaultValue="facebook">
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Your Brand Name</p>
                          <p className="text-xs text-gray-500">Sponsored</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium">Ad Headline Will Appear Here</p>
                        <p className="text-sm text-gray-700 mt-1">Your ad text will appear here. This is where your message to your audience will be displayed.</p>
                      </div>
                      <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
                        <p className="text-gray-500">Ad Creative</p>
                      </div>
                      <div className="mt-3 flex gap-3">
                        <div className="flex gap-1 items-center text-sm text-gray-600">
                          <Eye className="h-4 w-4" />
                          <span>Preview</span>
                        </div>
                        <div className="flex gap-1 items-center text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>Audience</span>
                        </div>
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
                      <p className="text-sm text-gray-500">Click "Get Ideas" to receive AI-powered suggestions to improve your ad campaign.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Analytics</CardTitle>
                <CardDescription>Performance metrics and analytics for your campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Impressions</p>
                    <p className="text-2xl font-semibold">245,320</p>
                    <p className="text-xs text-green-600">+12.5% vs last month</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Conversions</p>
                    <p className="text-2xl font-semibold">1,243</p>
                    <p className="text-xs text-green-600">+8.2% vs last month</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Avg. Cost Per Click</p>
                    <p className="text-2xl font-semibold">$0.42</p>
                    <p className="text-xs text-red-600">+0.05 vs last month</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Performance Chart</h3>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Performance chart will render here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdManagerPage;
