
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  Globe, 
  LineChart, 
  Search, 
  Server,
  Shield,
  Smartphone,
  Wifi
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const TechnicalSeoAnalyzerPage = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(true); // Just for demo

  const performAnalysis = () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Here would be the actual API call to perform the analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResults(true);
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Technical SEO Analyzer</h1>
          <p className="text-adpilot-text-secondary mt-1">
            In-depth technical analysis to improve your website's search engine performance
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Website URL</CardTitle>
            <CardDescription>Enter the website URL you'd like to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input 
                  placeholder="https://example.com" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <Button 
                onClick={performAnalysis}
                disabled={isAnalyzing || !url} 
                className="min-w-[120px]"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {hasResults && (
          <Card>
            <CardHeader className="border-b pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Analysis Results</CardTitle>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Last scan: 2 minutes ago</p>
                  <Button variant="ghost" size="sm">Refresh</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="overview">
                <TabsList className="w-full border-b rounded-none p-0">
                  <TabsTrigger value="overview" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Overview</TabsTrigger>
                  <TabsTrigger value="performance" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Performance</TabsTrigger>
                  <TabsTrigger value="mobile" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Mobile</TabsTrigger>
                  <TabsTrigger value="structure" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Structure</TabsTrigger>
                  <TabsTrigger value="security" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-6 space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Card className="flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">SEO Health Score</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-center">
                          <div className="inline-flex justify-center items-center rounded-full w-24 h-24 border-8 border-amber-200 text-3xl font-bold text-amber-600">
                            74
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Good, but needs improvement</p>
                          <p className="text-xs text-green-600 mt-1">↑ 5 points from last scan</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Issues Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-3 rounded-md bg-red-50">
                            <div className="text-xl font-bold text-red-600">7</div>
                            <div className="text-xs text-muted-foreground">Critical</div>
                          </div>
                          <div className="p-3 rounded-md bg-amber-50">
                            <div className="text-xl font-bold text-amber-600">12</div>
                            <div className="text-xs text-muted-foreground">Warnings</div>
                          </div>
                          <div className="p-3 rounded-md bg-green-50">
                            <div className="text-xl font-bold text-green-600">23</div>
                            <div className="text-xs text-muted-foreground">Passed</div>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">View All Issues</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Top Issues to Fix</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 pb-3 border-b">
                          <div className="rounded-full p-1 bg-red-100 text-red-600">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Site Speed Optimization</h3>
                            <p className="text-sm text-muted-foreground">Your site takes 5.2s to load on mobile, which is slower than the recommended 3s.</p>
                            <Button variant="link" size="sm" className="pl-0">How to fix</Button>
                          </div>
                          <div>
                            <Button size="sm">Fix</Button>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 pb-3 border-b">
                          <div className="rounded-full p-1 bg-red-100 text-red-600">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Missing Meta Descriptions</h3>
                            <p className="text-sm text-muted-foreground">14 pages have missing or duplicate meta descriptions.</p>
                            <Button variant="link" size="sm" className="pl-0">How to fix</Button>
                          </div>
                          <div>
                            <Button size="sm">Fix</Button>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="rounded-full p-1 bg-amber-100 text-amber-600">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Mobile Responsiveness</h3>
                            <p className="text-sm text-muted-foreground">3 pages have elements that overflow on mobile devices.</p>
                            <Button variant="link" size="sm" className="pl-0">How to fix</Button>
                          </div>
                          <div>
                            <Button size="sm">Fix</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Server className="h-5 w-5" /> Server Health
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Server Response Time</TableCell>
                              <TableCell>420ms</TableCell>
                              <TableCell>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">HTTPS</TableCell>
                              <TableCell>Enabled</TableCell>
                              <TableCell>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Compression</TableCell>
                              <TableCell>GZIP enabled</TableCell>
                              <TableCell>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">CDN Usage</TableCell>
                              <TableCell>Not detected</TableCell>
                              <TableCell>
                                <AlertCircle className="h-4 w-4 text-amber-600" />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Globe className="h-5 w-5" /> Crawlability
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Robots.txt</TableCell>
                              <TableCell>Valid</TableCell>
                              <TableCell>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">XML Sitemap</TableCell>
                              <TableCell>Found, 247 URLs</TableCell>
                              <TableCell>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Internal Links</TableCell>
                              <TableCell>12 broken links</TableCell>
                              <TableCell>
                                <AlertCircle className="h-4 w-4 text-red-600" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Canonical Tags</TableCell>
                              <TableCell>8 issues found</TableCell>
                              <TableCell>
                                <AlertCircle className="h-4 w-4 text-amber-600" />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Page Load Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3.2s</div>
                        <div className="text-xs text-amber-600">Needs improvement</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">First Contentful Paint</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1.8s</div>
                        <div className="text-xs text-green-600">Good</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Largest Contentful Paint</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2.7s</div>
                        <div className="text-xs text-amber-600">Needs improvement</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Cumulative Layout Shift</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">0.12</div>
                        <div className="text-xs text-amber-600">Needs improvement</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Resource Optimization</CardTitle>
                      <CardDescription>Analysis of page resources and potential optimizations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Images (1.2MB)</span>
                            <span className="text-sm text-red-600">45% savings possible</span>
                          </div>
                          <Progress value={55} className="h-2" />
                          <p className="text-xs text-muted-foreground">8 images need compression, 3 are not in next-gen formats</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">JavaScript (860KB)</span>
                            <span className="text-sm text-amber-600">32% savings possible</span>
                          </div>
                          <Progress value={68} className="h-2" />
                          <p className="text-xs text-muted-foreground">Minification and bundling recommended</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">CSS (240KB)</span>
                            <span className="text-sm text-green-600">8% savings possible</span>
                          </div>
                          <Progress value={92} className="h-2" />
                          <p className="text-xs text-muted-foreground">Remove unused CSS rules</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Fonts (160KB)</span>
                            <span className="text-sm text-green-600">Well optimized</span>
                          </div>
                          <Progress value={95} className="h-2" />
                          <p className="text-xs text-muted-foreground">Consider subsetting for further optimization</p>
                        </div>
                        
                        <Button className="w-full">Generate Optimization Report</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional performance content would go here */}
                </TabsContent>

                <TabsContent value="mobile" className="p-6 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5" /> Mobile-Friendliness Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex gap-4 p-4 border rounded-lg">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600">
                              <LineChart className="h-8 w-8" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-lg">72/100</h3>
                              <p className="text-muted-foreground">Your site is reasonably mobile-friendly, but some issues need attention.</p>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm">Fix Issues</Button>
                                <Button variant="outline" size="sm">View Details</Button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 mt-4">
                            <div className="flex gap-3 pb-3 border-b">
                              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Tap targets too small</h4>
                                <p className="text-sm text-muted-foreground">Some buttons and links are too close together or too small for mobile users.</p>
                              </div>
                            </div>
                            <div className="flex gap-3 pb-3 border-b">
                              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Content wider than screen</h4>
                                <p className="text-sm text-muted-foreground">Content on 3 pages requires horizontal scrolling on mobile devices.</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Viewport properly configured</h4>
                                <p className="text-sm text-muted-foreground">Your site uses the viewport meta tag correctly.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Device Testing Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2 p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <span className="font-medium">iPhone 13</span>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <p className="text-xs text-muted-foreground">No issues detected</p>
                          </div>
                          
                          <div className="space-y-2 p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <span className="font-medium">Samsung Galaxy S21</span>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <p className="text-xs text-muted-foreground">Minor layout issues</p>
                          </div>
                          
                          <div className="space-y-2 p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <span className="font-medium">iPad Pro</span>
                              <AlertCircle className="h-4 w-4 text-amber-600" />
                            </div>
                            <p className="text-xs text-muted-foreground">Content width issues</p>
                          </div>
                          
                          <div className="space-y-2 p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <span className="font-medium">Google Pixel 6</span>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <p className="text-xs text-muted-foreground">No issues detected</p>
                          </div>
                          
                          <Button variant="outline" className="w-full">Test More Devices</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Additional mobile content would go here */}
                </TabsContent>

                <TabsContent value="structure" className="p-6 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" /> Content Structure Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Element</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Issues</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Headings (H1-H6)</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                                  <span>Needs attention</span>
                                </div>
                              </TableCell>
                              <TableCell>3 pages missing H1, 8 with improper hierarchy</TableCell>
                              <TableCell>
                                <Button size="sm">Fix</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Meta Titles & Descriptions</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                                  <span>Critical issues</span>
                                </div>
                              </TableCell>
                              <TableCell>14 missing, 6 duplicate, 9 too long</TableCell>
                              <TableCell>
                                <Button size="sm">Fix</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">URL Structure</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Good</span>
                                </div>
                              </TableCell>
                              <TableCell>SEO-friendly URLs, well-organized</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">Review</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Alt Text for Images</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                                  <span>Needs attention</span>
                                </div>
                              </TableCell>
                              <TableCell>42 images missing alt text</TableCell>
                              <TableCell>
                                <Button size="sm">Fix</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Structured Data</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                                  <span>Needs attention</span>
                                </div>
                              </TableCell>
                              <TableCell>Implemented but has 5 validation errors</TableCell>
                              <TableCell>
                                <Button size="sm">Fix</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Internal Linking</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold">247</div>
                            <div className="text-sm text-muted-foreground">Total internal links</div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Issues Found</h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                                <span>12 broken internal links</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                                <span>8 pages with no inbound links</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                                <span>5 redirect chains detected</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Most Linked Pages</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>/products</span>
                                <span>42 links</span>
                              </div>
                              <div className="flex justify-between">
                                <span>/about</span>
                                <span>28 links</span>
                              </div>
                              <div className="flex justify-between">
                                <span>/contact</span>
                                <span>24 links</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="outline" className="w-full">View Full Link Analysis</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Additional structure content would go here */}
                </TabsContent>

                <TabsContent value="security" className="p-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" /> Security Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <h3 className="font-medium">HTTPS Enabled</h3>
                            </div>
                            <p className="text-sm text-green-800">Your site is properly secured with HTTPS.</p>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <h3 className="font-medium">SSL Certificate</h3>
                            </div>
                            <p className="text-sm text-green-800">Valid for 10 more months.</p>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="h-5 w-5 text-amber-600" />
                              <h3 className="font-medium">Mixed Content</h3>
                            </div>
                            <p className="text-sm text-amber-800">3 instances of HTTP content on HTTPS pages.</p>
                          </div>
                        </div>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Security Feature</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Recommendation</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Content Security Policy</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                                  <span>Not implemented</span>
                                </div>
                              </TableCell>
                              <TableCell>Add a CSP header to prevent XSS attacks.</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">HTTP Strict Transport Security</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Implemented</span>
                                </div>
                              </TableCell>
                              <TableCell>Current implementation is good.</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">X-Frame-Options</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Implemented</span>
                                </div>
                              </TableCell>
                              <TableCell>Current implementation is good.</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">CORS Policy</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                                  <span>Too permissive</span>
                                </div>
                              </TableCell>
                              <TableCell>Restrict CORS to only required origins.</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        
                        <Button className="w-full">Generate Security Report</Button>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Additional security content would go here */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default TechnicalSeoAnalyzerPage;
