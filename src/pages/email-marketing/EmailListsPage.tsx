
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Users, Upload, Info, Plus, Download, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SubscriberMetrics {
  totalSubscribers: number;
  activeSubscribers: number;
  newThisMonth: number;
  averageOpenRate: number;
}

interface EmailList {
  id: string;
  name: string;
  description: string;
  subscriberCount: number;
  lastUpdated: string;
}

interface Segment {
  id: string;
  name: string;
  description: string;
  subscriberCount: number;
  criteria: string;
}

interface ListsData {
  metrics: SubscriberMetrics;
  lists: EmailList[];
  segments: Segment[];
}

const EmailListsPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ListsData | null>(null);
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");

  const fetchListsData = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an actual API call
      // Example: const response = await fetch('/api/email-marketing/lists');
      
      // Simulating API response for demo
      setTimeout(() => {
        const apiData: ListsData = {
          metrics: {
            totalSubscribers: 12547,
            activeSubscribers: 10892,
            newThisMonth: 347,
            averageOpenRate: 24.3
          },
          lists: [
            { id: "1", name: "Main Newsletter", description: "Primary audience for monthly newsletter", subscriberCount: 8453, lastUpdated: "2025-04-28" },
            { id: "2", name: "Product Updates", description: "Customers interested in product updates", subscriberCount: 5621, lastUpdated: "2025-04-30" },
            { id: "3", name: "Blog Subscribers", description: "Users who subscribed via the blog", subscriberCount: 3254, lastUpdated: "2025-05-01" }
          ],
          segments: [
            { id: "1", name: "High Engagement", description: "Subscribers with >40% open rate", subscriberCount: 3421, criteria: "Open rate > 40%" },
            { id: "2", name: "Recent Customers", description: "Purchased in last 30 days", subscriberCount: 1245, criteria: "Purchase date < 30 days" }
          ]
        };
        setData(apiData);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching email lists data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch email lists data. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListsData();
  }, []);

  const handleCreateList = () => {
    if (!newListName) {
      toast({
        title: "Error",
        description: "Please enter a list name",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call to create a new list
    toast({
      title: "Success",
      description: `List "${newListName}" created successfully`,
    });

    // Update the local state with the new list
    if (data) {
      const newList: EmailList = {
        id: `new-${Date.now()}`,
        name: newListName,
        description: newListDescription,
        subscriberCount: 0,
        lastUpdated: new Date().toISOString().split("T")[0]
      };
      setData({
        ...data,
        lists: [...data.lists, newList]
      });
    }

    setNewListName("");
    setNewListDescription("");
    setIsCreateListOpen(false);
  };

  const handleRefresh = () => {
    fetchListsData();
    toast({
      title: "Refreshing data",
      description: "Email lists data is being updated"
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Email List Manager</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Manage your email lists, segments, and subscriber data
            </p>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handleRefresh}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Refresh lists data
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" /> Import List
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Import contacts from CSV, Excel or vCard
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Dialog open={isCreateListOpen} onOpenChange={setIsCreateListOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> New List
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Email List</DialogTitle>
                  <DialogDescription>
                    Create a new list to organize your subscribers
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">List Name</Label>
                    <Input 
                      id="name" 
                      value={newListName} 
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="E.g. Newsletter Subscribers"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Input 
                      id="description" 
                      value={newListDescription} 
                      onChange={(e) => setNewListDescription(e.target.value)}
                      placeholder="E.g. Main list for newsletter subscribers"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateListOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateList}>Create List</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <Filter className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">My Email Lists</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : data && data.lists.length > 0 ? (
                <div className="space-y-4">
                  {data.lists.map((list) => (
                    <div key={list.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{list.name}</h3>
                          <p className="text-sm text-adpilot-text-muted mt-1">{list.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{list.subscriberCount.toLocaleString()} subscribers</p>
                          <p className="text-xs text-adpilot-text-muted mt-1">Last updated: {new Date(list.lastUpdated).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-adpilot-text-muted">
                  No email lists created yet. Click "New List" to create your first email list.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl flex items-center">
                  Subscribers Overview
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        High-level metrics about your subscriber base
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : data?.metrics.totalSubscribers.toLocaleString()}
                  </div>
                  <div className="text-sm text-adpilot-text-muted">Total Subscribers</div>
                </div>
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : data?.metrics.activeSubscribers.toLocaleString()}
                  </div>
                  <div className="text-sm text-adpilot-text-muted">Active Subscribers</div>
                </div>
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : data?.metrics.newThisMonth.toLocaleString()}
                  </div>
                  <div className="text-sm text-adpilot-text-muted">New This Month</div>
                </div>
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : `${data?.metrics.averageOpenRate}%`}
                  </div>
                  <div className="text-sm text-adpilot-text-muted">Avg. Open Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500 text-white">
                    <Filter className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl flex items-center">
                    Segmentation
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-2 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Create targeted subscriber groups based on custom criteria
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                </div>
                <Button size="sm" variant="outline">Create Segment</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="border rounded-lg p-4 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : data && data.segments.length > 0 ? (
                  <div className="space-y-4">
                    {data.segments.map((segment) => (
                      <div key={segment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-base">{segment.name}</h3>
                            <p className="text-xs text-adpilot-text-muted mt-1">{segment.description}</p>
                            <div className="mt-2 inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">
                              {segment.criteria}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{segment.subscriberCount.toLocaleString()}</p>
                            <p className="text-xs text-adpilot-text-muted mt-1">subscribers</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-adpilot-text-muted">
                    No segments created yet. Create segments to target specific subscriber groups.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmailListsPage;
