import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Globe, 
  Smartphone, 
  Lock, 
  Loader2, 
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

type IssueType = "error" | "warning" | "success";

interface AuditIssue {
  id: string;
  category: string;
  type: IssueType;
  title: string;
  description: string;
  solution: string;
}

interface AuditCategory {
  name: string;
  score: number;
  issues: AuditIssue[];
}

interface AuditResult {
  url: string;
  date: string;
  categories: {
    performance: AuditCategory;
    seo: AuditCategory;
    accessibility: AuditCategory;
    bestPractices: AuditCategory;
    security: AuditCategory;
  };
}

const SeoAudit = () => {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // URL Validation
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }
    
    // Simple URL validation
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    
    if (!urlPattern.test(url)) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    setScanning(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate mock audit result
      const mockAuditResult: AuditResult = {
        url: url.startsWith('http') ? url : `https://${url}`,
        date: new Date().toISOString(),
        categories: {
          performance: {
            name: "Performance",
            score: Math.floor(Math.random() * 40) + 60,
            issues: [
              {
                id: "p1",
                category: "performance",
                type: "warning",
                title: "Large JavaScript bundles",
                description: "Large JavaScript files can slow down page load time.",
                solution: "Consider code splitting and lazy loading for non-critical JavaScript."
              },
              {
                id: "p2",
                category: "performance",
                type: "error",
                title: "Unoptimized images",
                description: "Images are not properly compressed and sized.",
                solution: "Use WebP format and implement responsive images with appropriate sizes."
              }
            ]
          },
          seo: {
            name: "SEO",
            score: Math.floor(Math.random() * 30) + 70,
            issues: [
              {
                id: "s1",
                category: "seo",
                type: "error",
                title: "Missing meta descriptions",
                description: "Some pages are missing meta descriptions, which are important for SEO.",
                solution: "Add unique, descriptive meta descriptions to all pages."
              },
              {
                id: "s2",
                category: "seo",
                type: "warning",
                title: "Duplicate content",
                description: "Multiple pages have similar content which may confuse search engines.",
                solution: "Use canonical tags to indicate the preferred version of duplicate content."
              },
              {
                id: "s3",
                category: "seo",
                type: "success",
                title: "Mobile-friendly layout",
                description: "Your site adapts well to different screen sizes.",
                solution: "Continue maintaining responsive design as you update your site."
              }
            ]
          },
          accessibility: {
            name: "Accessibility",
            score: Math.floor(Math.random() * 30) + 65,
            issues: [
              {
                id: "a1",
                category: "accessibility",
                type: "warning",
                title: "Low contrast text",
                description: "Some text has insufficient contrast with its background.",
                solution: "Ensure all text meets WCAG AA contrast ratio requirements."
              }
            ]
          },
          bestPractices: {
            name: "Best Practices",
            score: Math.floor(Math.random() * 20) + 75,
            issues: [
              {
                id: "b1",
                category: "bestPractices",
                type: "warning",
                title: "Console errors",
                description: "JavaScript errors detected in the console.",
                solution: "Fix JavaScript errors to ensure proper functionality."
              }
            ]
          },
          security: {
            name: "Security",
            score: Math.floor(Math.random() * 15) + 80,
            issues: [
              {
                id: "sec1",
                category: "security",
                type: url.includes('https') ? "success" : "error",
                title: url.includes('https') ? "HTTPS is enabled" : "HTTPS not enabled",
                description: url.includes('https') ? "Your site is securely served over HTTPS." : "Your site is not using HTTPS, which is important for security.",
                solution: url.includes('https') ? "Continue using HTTPS for all connections." : "Enable HTTPS for all traffic to your website."
              }
            ]
          }
        }
      };
      
      setAuditResult(mockAuditResult);
      setScanning(false);
      setScanned(true);
      setActiveTab("overview");
      toast.success("Site audit completed successfully!");
    }, 3000);
  };

  const getIssueIcon = (type: IssueType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getIssueTypeText = (type: IssueType) => {
    switch (type) {
      case "success": return "Good";
      case "warning": return "To improve";
      case "error": return "Critical";
    }
  };

  const getStatusColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  // Get all issues across categories for the Issues tab
  const getAllIssues = () => {
    if (!auditResult) return [];
    
    const allIssues: AuditIssue[] = [
      ...auditResult.categories.performance.issues,
      ...auditResult.categories.seo.issues,
      ...auditResult.categories.accessibility.issues,
      ...auditResult.categories.bestPractices.issues,
      ...auditResult.categories.security.issues
    ];
    
    return allIssues;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter a website URL (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit" disabled={scanning}>
              {scanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Audit Website"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {scanned && auditResult && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" onClick={handleSubmit} disabled={scanning}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Audit
            </Button>
          </div>
          
          <TabsContent value="overview" className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">URL Audited</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a 
                      href={auditResult.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {auditResult.url}
                    </a>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Audit completed on {new Date(auditResult.date).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Security Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {auditResult.url.includes('https') ? (
                      <>
                        <Lock className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-700">Secure (HTTPS)</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <span className="font-medium text-amber-700">Not Secure (HTTP)</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Mobile Friendliness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-green-700">Mobile Compatible</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(auditResult.categories).map(([key, category]) => (
                <Card key={key}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{category.name}</CardTitle>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(category.score)}`}>
                        <span className="text-white font-bold">{category.score}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={category.score} className="h-2 mb-4" />
                    
                    <div className="space-y-2">
                      {category.issues.length > 0 ? (
                        <>
                          <div className="text-sm font-medium">
                            {category.issues.length} issue{category.issues.length !== 1 ? 's' : ''} found
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs flex items-center px-0"
                            onClick={() => setActiveTab(key)}
                          >
                            View details <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </>
                      ) : (
                        <div className="text-sm text-green-600 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" /> No issues found
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="issues" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Issues ({getAllIssues().length})</CardTitle>
                <CardDescription>Complete list of all issues found during the audit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getAllIssues().map((issue) => (
                    <div key={issue.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-start gap-3">
                        {getIssueIcon(issue.type)}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{issue.title}</h4>
                            <Badge variant={issue.type === "error" ? "destructive" : issue.type === "warning" ? "outline" : "secondary"}>
                              {getIssueTypeText(issue.type)}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{issue.description}</div>
                          <div className="text-sm mt-2">
                            <span className="font-medium">Recommendation: </span> 
                            {issue.solution}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>Detailed performance metrics and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-sm font-medium mb-2">Overall Performance Score</div>
                  <div className="flex items-center gap-4">
                    <Progress value={auditResult.categories.performance.score} className="h-3 flex-1" />
                    <div className={`px-3 py-1 rounded-md ${getStatusColor(auditResult.categories.performance.score)} text-white font-medium`}>
                      {auditResult.categories.performance.score}/100
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {auditResult.categories.performance.issues.map((issue) => (
                    <div key={issue.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-start gap-3">
                        {getIssueIcon(issue.type)}
                        <div>
                          <h4 className="font-medium">{issue.title}</h4>
                          <div className="text-sm text-muted-foreground mt-1">{issue.description}</div>
                          <div className="text-sm mt-2">
                            <span className="font-medium">Recommendation: </span>
                            {issue.solution}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seo" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Analysis</CardTitle>
                <CardDescription>Search engine optimization findings and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-sm font-medium mb-2">Overall SEO Score</div>
                  <div className="flex items-center gap-4">
                    <Progress value={auditResult.categories.seo.score} className="h-3 flex-1" />
                    <div className={`px-3 py-1 rounded-md ${getStatusColor(auditResult.categories.seo.score)} text-white font-medium`}>
                      {auditResult.categories.seo.score}/100
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {auditResult.categories.seo.issues.map((issue) => (
                    <div key={issue.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-start gap-3">
                        {getIssueIcon(issue.type)}
                        <div>
                          <h4 className="font-medium">{issue.title}</h4>
                          <div className="text-sm text-muted-foreground mt-1">{issue.description}</div>
                          <div className="text-sm mt-2">
                            <span className="font-medium">Recommendation: </span>
                            {issue.solution}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SeoAudit;
