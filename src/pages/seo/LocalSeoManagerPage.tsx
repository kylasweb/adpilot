
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  CheckCircle, 
  Edit, 
  Globe, 
  MapPin, 
  Search, 
  Star, 
  ThumbsUp, 
  Users,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const LocalSeoManagerPage = () => {
  const [businessName, setBusinessName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasResults, setHasResults] = useState(true); // For demo purposes

  const performSearch = () => {
    if (!businessName) return;
    
    setIsSearching(true);
    
    // Here would be the API call to fetch business data
    setTimeout(() => {
      setIsSearching(false);
      setHasResults(true);
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Local SEO Manager</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Optimize your local search presence and manage business listings across platforms
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Business Lookup</CardTitle>
            <CardDescription>Enter your business name to analyze local SEO performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input 
                  placeholder="Business name or URL" 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <Button 
                onClick={performSearch}
                disabled={isSearching || !businessName} 
                className="min-w-[120px]"
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {hasResults && (
          <>
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Building2 className="h-6 w-6 text-blue-600" />
                      Acme Digital Solutions
                    </CardTitle>
                    <CardDescription>Web design and digital marketing agency</CardDescription>
                  </div>
                  <Button>Edit Business Info</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-blue-800 text-lg font-bold mb-1">72/100</div>
                    <div className="text-sm text-blue-700">Local SEO Score</div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="text-amber-800 text-lg font-bold mb-1">12/24</div>
                    <div className="text-sm text-amber-700">Business Listings</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-green-800 text-lg font-bold mb-1">4.3/5</div>
                    <div className="text-sm text-green-700">Average Rating</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-purple-800 text-lg font-bold mb-1">#4</div>
                    <div className="text-sm text-purple-700">Local Pack Position</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <h3 className="text-sm font-medium mb-2">Business Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm">123 Main Street</p>
                          <p className="text-sm">Suite 101</p>
                          <p className="text-sm">San Francisco, CA 94105</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <a href="#" className="text-sm text-blue-600 hover:underline">www.acmedigital.com</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm">info@acmedigital.com</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm">10-49 employees</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Edit className="mr-2 h-4 w-4" /> Edit Information
                    </Button>
                  </div>
                  
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium mb-2">Business Categories</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Web Design
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Digital Marketing
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        SEO Agency
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Advertising Agency
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Web Development
                      </Badge>
                    </div>
                    
                    <h3 className="text-sm font-medium mb-2">Business Hours</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Monday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tuesday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wednesday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thursday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>Closed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="listings">
              <TabsList className="w-full grid grid-cols-5">
                <TabsTrigger value="listings">Business Listings</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="citations">Citations</TabsTrigger>
                <TabsTrigger value="keywords">Local Keywords</TabsTrigger>
                <TabsTrigger value="competitors">Competitors</TabsTrigger>
              </TabsList>
              
              <TabsContent value="listings" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Listing Completeness</CardTitle>
                    <CardDescription>Status of your business listings across major platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="font-bold text-blue-700">G</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Google Business Profile</h4>
                              <p className="text-xs text-muted-foreground">Last updated: 2 weeks ago</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Verified</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Profile completeness</span>
                            <span className="text-sm">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex gap-2 text-muted-foreground">
                            <span>⭐ 4.7/5 (124 reviews)</span>
                            <span>|</span>
                            <span>1,240 views/month</span>
                          </div>
                          <Button size="sm" variant="outline">Edit Listing</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                              <span className="font-bold text-amber-700">Y</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Yelp</h4>
                              <p className="text-xs text-muted-foreground">Last updated: 1 month ago</p>
                            </div>
                          </div>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Needs attention</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Profile completeness</span>
                            <span className="text-sm">68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex gap-2 text-muted-foreground">
                            <span>⭐ 4.2/5 (57 reviews)</span>
                            <span>|</span>
                            <span>320 views/month</span>
                          </div>
                          <Button size="sm" variant="outline">Edit Listing</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="font-bold text-blue-700">F</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Facebook</h4>
                              <p className="text-xs text-muted-foreground">Last updated: 3 days ago</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Verified</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Profile completeness</span>
                            <span className="text-sm">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex gap-2 text-muted-foreground">
                            <span>⭐ 4.5/5 (86 reviews)</span>
                            <span>|</span>
                            <span>780 views/month</span>
                          </div>
                          <Button size="sm" variant="outline">Edit Listing</Button>
                        </div>
                      </div>
                      
                      <Button className="w-full">Add New Listing</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Listing Inconsistencies</CardTitle>
                    <CardDescription>Address, phone, and business information discrepancies across platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Platform</TableHead>
                          <TableHead>Issue Type</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                                <span className="text-xs font-bold text-amber-700">Y</span>
                              </div>
                              <span>Yelp</span>
                            </div>
                          </TableCell>
                          <TableCell>Address</TableCell>
                          <TableCell>Missing suite number (101)</TableCell>
                          <TableCell>
                            <Button size="sm">Fix Now</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                <span className="text-xs font-bold text-yellow-700">Y</span>
                              </div>
                              <span>Yellow Pages</span>
                            </div>
                          </TableCell>
                          <TableCell>Business Hours</TableCell>
                          <TableCell>Incorrect Friday hours listed (9-6 instead of 9-5)</TableCell>
                          <TableCell>
                            <Button size="sm">Fix Now</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                <span className="text-xs font-bold text-red-700">M</span>
                              </div>
                              <span>Manta</span>
                            </div>
                          </TableCell>
                          <TableCell>Categories</TableCell>
                          <TableCell>Missing "Web Development" category</TableCell>
                          <TableCell>
                            <Button size="sm">Fix Now</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">3 inconsistencies found across directories</p>
                      <Button variant="outline">Fix All Issues</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Review Management</CardTitle>
                        <CardDescription>Monitor and respond to customer reviews</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <ThumbsUp className="mr-2 h-4 w-4" /> Request Reviews
                        </Button>
                        <Button>
                          <MessageSquare className="mr-2 h-4 w-4" /> Response Templates
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xl font-bold">4.3</span>
                          </div>
                          <div className="text-sm text-center text-muted-foreground">Average Rating</div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-xl font-bold text-center mb-1">267</div>
                          <div className="text-sm text-center text-muted-foreground">Total Reviews</div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-xl font-bold text-center mb-1">92%</div>
                          <div className="text-sm text-center text-muted-foreground">Response Rate</div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-xl font-bold text-center mb-1">3.2h</div>
                          <div className="text-sm text-center text-muted-foreground">Avg. Response Time</div>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted px-4 py-2 flex justify-between items-center">
                          <h3 className="text-sm font-medium">Recent Reviews</h3>
                          <Button variant="ghost" size="sm">View All</Button>
                        </div>
                        
                        <div className="divide-y">
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="font-medium text-blue-700">JD</span>
                                </div>
                                <div>
                                  <div className="font-medium">John Doe</div>
                                  <div className="text-xs text-muted-foreground">2 days ago • Google</div>
                                </div>
                              </div>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">
                              Acme Digital transformed our online presence. The team was professional, responsive, and delivered exactly what we needed. Highly recommend their services!
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Responded
                              </div>
                              <Button size="sm" variant="ghost">View Response</Button>
                            </div>
                          </div>
                          
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                  <span className="font-medium text-purple-700">MS</span>
                                </div>
                                <div>
                                  <div className="font-medium">Maria Smith</div>
                                  <div className="text-xs text-muted-foreground">1 week ago • Yelp</div>
                                </div>
                              </div>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`h-4 w-4 ${i < 3 ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">
                              The service was okay, but the project took longer than initially promised. The final result was good though.
                            </p>
                            <div className="flex justify-end items-center">
                              <Button size="sm">Respond Now</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* More review management content would go here */}
              </TabsContent>
              
              <TabsContent value="citations" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Citation Management</CardTitle>
                    <CardDescription>Track and manage your business citations across the web</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Citations content would go here */}
                    <div className="py-8 text-center text-muted-foreground">
                      Citations audit in progress. Check back soon for results.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="keywords" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Local Keywords Performance</CardTitle>
                    <CardDescription>Track your ranking for local search terms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Keywords content would go here */}
                    <div className="py-8 text-center text-muted-foreground">
                      Local keyword analysis in progress. Results will be available in 24 hours.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="competitors" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Local Competitors Analysis</CardTitle>
                    <CardDescription>Compare your local presence with competitors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Competitors content would go here */}
                    <div className="py-8 text-center text-muted-foreground">
                      Competitive analysis in progress. Results will be available soon.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" /> Action Items
                </CardTitle>
                <CardDescription>Recommended tasks to improve your local SEO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md flex items-start gap-3">
                    <div className="bg-red-100 text-red-700 p-1 rounded-full">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Address inconsistency on Yelp</h4>
                      <p className="text-sm text-muted-foreground">Your business address on Yelp is missing the suite number.</p>
                    </div>
                    <Button size="sm">Fix Now</Button>
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-700 p-1 rounded-full">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Add more photos to Google Business Profile</h4>
                      <p className="text-sm text-muted-foreground">Businesses with 10+ photos get 42% more requests for directions.</p>
                    </div>
                    <Button size="sm">Upload</Button>
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-700 p-1 rounded-full">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Respond to 2 recent reviews</h4>
                      <p className="text-sm text-muted-foreground">You have 2 unresponded reviews on Yelp from the last week.</p>
                    </div>
                    <Button size="sm">Respond</Button>
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-700 p-1 rounded-full">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Create Google Posts for upcoming event</h4>
                      <p className="text-sm text-muted-foreground">Promote your "Digital Marketing Workshop" using Google Posts.</p>
                    </div>
                    <Button size="sm">Create Post</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default LocalSeoManagerPage;
