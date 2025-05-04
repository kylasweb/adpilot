
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart2, 
  Building2, 
  CheckCircle, 
  ChevronRight, 
  ListChecks, 
  Search, 
  Settings, 
  ShoppingCart,
  Sparkles,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const MarketplaceOptimizationPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Marketplace Optimization</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Advanced tools to optimize your marketplace listings and products
            </p>
          </div>
          <Button>
            <span className="mr-2">+</span> Add Product
          </Button>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="checklist">Optimization Checklist</TabsTrigger>
            <TabsTrigger value="configurators">Configurators</TabsTrigger>
            <TabsTrigger value="seo">Product SEO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Optimization Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Ranking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#14</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Your best performing marketplace listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center gap-4 p-3 rounded-md border">
                        <div className="w-12 h-12 bg-gray-100 rounded"></div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="font-medium">Premium Product {item}</div>
                            <div className="flex items-center">
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800 mr-2">
                                {95 - (item * 5)}% optimized
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">SKU: PRD-{1000 + item}</div>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground mr-4">Rank: #{item}</span>
                            <span className="text-xs text-muted-foreground mr-4">Views: {1200 - (item * 100)}</span>
                            <span className="text-xs text-muted-foreground">Sales: {80 - (item * 10)}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Opportunities</CardTitle>
                  <CardDescription>Actionable insights to boost sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <h3 className="font-medium text-amber-800">Missing Keywords</h3>
                      </div>
                      <p className="text-sm text-amber-700 mt-1">Add relevant keywords to 14 products to improve search visibility.</p>
                      <Button variant="outline" size="sm" className="mt-2 border-amber-300 text-amber-800">
                        Fix Now
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <h3 className="font-medium text-blue-800">Pricing Opportunities</h3>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">8 products may benefit from price adjustments based on market trends.</p>
                      <Button variant="outline" size="sm" className="mt-2 border-blue-300 text-blue-800">
                        Analyze
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <h3 className="font-medium text-purple-800">AI Enhancement</h3>
                      </div>
                      <p className="text-sm text-purple-700 mt-1">Generate improved descriptions for 23 products using AI assistance.</p>
                      <Button variant="outline" size="sm" className="mt-2 border-purple-300 text-purple-800">
                        Generate
                      </Button>
                    </div>
                    
                    <Button className="w-full">View All Opportunities</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" /> SEO Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Keyword Optimization</span>
                        <span className="text-sm">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Description Quality</span>
                        <span className="text-sm">82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Image Optimization</span>
                        <span className="text-sm">93%</span>
                      </div>
                      <Progress value={93} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Review Utilization</span>
                        <span className="text-sm">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    
                    <Button variant="outline" className="w-full">Detailed SEO Analysis</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" /> Performance Analytics
                  </CardTitle>
                  <CardDescription>Last 30 days performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="text-2xl font-bold">10.4k</div>
                        <div className="text-sm text-muted-foreground">Total Views</div>
                        <div className="text-xs text-green-600 mt-1">↑ 12% from previous period</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="text-2xl font-bold">247</div>
                        <div className="text-sm text-muted-foreground">Total Sales</div>
                        <div className="text-xs text-green-600 mt-1">↑ 8% from previous period</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="text-2xl font-bold">$12,480</div>
                        <div className="text-sm text-muted-foreground">Revenue</div>
                        <div className="text-xs text-green-600 mt-1">↑ 15% from previous period</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="text-2xl font-bold">4.3/5</div>
                        <div className="text-sm text-muted-foreground">Avg. Rating</div>
                        <div className="text-xs text-green-600 mt-1">↑ 0.2 from previous period</div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">View Detailed Analytics</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" /> Marketplace Platform Integration
                </CardTitle>
                <CardDescription>Connected platforms and synchronization status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">A</div>
                        <div>
                          <div className="font-medium">Amazon</div>
                          <div className="text-xs text-muted-foreground">Last sync: 2 hours ago</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">E</div>
                        <div>
                          <div className="font-medium">eBay</div>
                          <div className="text-xs text-muted-foreground">Last sync: 4 hours ago</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">W</div>
                        <div>
                          <div className="font-medium">Walmart</div>
                          <div className="text-xs text-muted-foreground">Not connected</div>
                        </div>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">Manage Platform Connections</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="checklist">
            <div className="py-4">
              <p className="text-muted-foreground">Complete these tasks to optimize your marketplace listings.</p>
            </div>
            {/* Checklist content would go here */}
          </TabsContent>
          
          <TabsContent value="configurators">
            <div className="py-4">
              <p className="text-muted-foreground">Configure product variations, bundling options, and more.</p>
            </div>
            {/* Configurators content would go here */}
          </TabsContent>
          
          <TabsContent value="seo">
            <div className="py-4">
              <p className="text-muted-foreground">Optimize your product listings for search engines and marketplaces.</p>
            </div>
            {/* Product SEO content would go here */}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MarketplaceOptimizationPage;
