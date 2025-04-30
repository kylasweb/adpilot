
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Globe, LinkIcon, ExternalLink, Loader2, ArrowUpDown, LineChart } from "lucide-react";
import { toast } from "sonner";

type Backlink = {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  dateSeen: string;
  trustScore: number;
  dofollow: boolean;
};

const BacklinkManager = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [activeTab, setActiveTab] = useState("backlinks");

  // Mock backlink data
  const mockBacklinks: Backlink[] = [
    {
      id: "1",
      sourceDomain: "example.com",
      sourceUrl: "https://example.com/blog/top-seo-tools",
      targetUrl: "https://yourdomain.com/features",
      anchorText: "best SEO tool",
      dateSeen: "2023-08-15",
      trustScore: 78,
      dofollow: true
    },
    {
      id: "2",
      sourceDomain: "techblog.org",
      sourceUrl: "https://techblog.org/marketing/digital-strategies",
      targetUrl: "https://yourdomain.com",
      anchorText: "marketing automation platform",
      dateSeen: "2023-09-02",
      trustScore: 85,
      dofollow: true
    },
    {
      id: "3",
      sourceDomain: "digitalmarketer.com",
      sourceUrl: "https://digitalmarketer.com/resources",
      targetUrl: "https://yourdomain.com/pricing",
      anchorText: "affordable marketing tools",
      dateSeen: "2023-07-28",
      trustScore: 92,
      dofollow: false
    },
    {
      id: "4",
      sourceDomain: "marketingnews.net",
      sourceUrl: "https://marketingnews.net/top-tools-2023",
      targetUrl: "https://yourdomain.com/blog/case-studies",
      anchorText: "impressive results",
      dateSeen: "2023-08-30",
      trustScore: 65,
      dofollow: true
    },
    {
      id: "5",
      sourceDomain: "businessgrowth.io",
      sourceUrl: "https://businessgrowth.io/marketing-essentials",
      targetUrl: "https://yourdomain.com",
      anchorText: "essential marketing tool",
      dateSeen: "2023-09-10",
      trustScore: 88,
      dofollow: true
    }
  ];

  const handleSearch = () => {
    if (!domain) {
      toast.error("Please enter a domain");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add domain to target URLs in mock data for realism
      const customizedBacklinks = mockBacklinks.map(backlink => ({
        ...backlink,
        targetUrl: backlink.targetUrl.replace("yourdomain.com", domain)
      }));
      
      setBacklinks(customizedBacklinks);
      setLoading(false);
      toast.success(`Found ${customizedBacklinks.length} backlinks for ${domain}`);
    }, 2000);
  };

  const handleExport = () => {
    if (backlinks.length === 0) {
      toast.error("No data to export");
      return;
    }
    
    const headers = ["Source Domain", "Source URL", "Target URL", "Anchor Text", "Date Seen", "Trust Score", "DoFollow"];
    const csvContent = "data:text/csv;charset=utf-8," + 
      headers.join(",") + "\n" +
      backlinks.map(b => 
        [
          b.sourceDomain,
          `"${b.sourceUrl}"`,
          `"${b.targetUrl}"`,
          `"${b.anchorText}"`,
          b.dateSeen,
          b.trustScore,
          b.dofollow ? "Yes" : "No"
        ].join(",")
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `backlinks-${domain}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Backlink data exported successfully");
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter a domain (e.g., example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="pl-9"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Find Backlinks"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {backlinks.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleExport}>
              Export Data
            </Button>
          )}
        </div>
        
        <TabsContent value="backlinks" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Backlink Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {backlinks.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Source Domain</TableHead>
                        <TableHead>Anchor Text</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Trust Score <ArrowUpDown className="ml-1 h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date Seen</TableHead>
                        <TableHead className="w-[100px]">View</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {backlinks.map((backlink) => (
                        <TableRow key={backlink.id}>
                          <TableCell className="font-medium">{backlink.sourceDomain}</TableCell>
                          <TableCell>{backlink.anchorText}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getTrustScoreColor(backlink.trustScore)}>
                              {backlink.trustScore}/100
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={backlink.dofollow ? "default" : "secondary"}>
                              {backlink.dofollow ? "dofollow" : "nofollow"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(backlink.dateSeen).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <a 
                              href={backlink.sourceUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline inline-flex items-center"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Visit</span>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  {loading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <p>Searching for backlinks...</p>
                    </div>
                  ) : (
                    <>
                      <LinkIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Enter a domain to find backlinks</p>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Backlink Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {backlinks.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">Total Backlinks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{backlinks.length}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">Average Trust Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {(backlinks.reduce((sum, b) => sum + b.trustScore, 0) / backlinks.length).toFixed(1)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">Dofollow Links</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {backlinks.filter(b => b.dofollow).length}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-muted-foreground">
                        Detailed backlink analytics charts will appear here in a future update
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <LinkIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No backlink data available for analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BacklinkManager;
