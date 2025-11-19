
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart,
  Type,
  Search,
  Link as LinkIcon,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const ContentAnalyzer = () => {
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [analysisResults, setAnalysisResults] = useState<{
    readability: {
      score: number;
      level: string;
      suggestions: string[];
    };
    seo: {
      score: number;
      keywordDensity: number;
      issues: string[];
    };
    metrics: {
      wordCount: number;
      sentenceCount: number;
      paragraphCount: number;
      readingTime: number;
    };
  }>({
    readability: {
      score: 0,
      level: "",
      suggestions: []
    },
    seo: {
      score: 0,
      keywordDensity: 0,
      issues: []
    },
    metrics: {
      wordCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      readingTime: 0
    }
  });

  const handleAnalyze = () => {
    if (!content.trim()) {
      toast.error("Please enter content to analyze");
      return;
    }

    if (!keyword.trim()) {
      toast.error("Please enter a target keyword");
      return;
    }

    setAnalyzing(true);

    // Simulate API call
    setTimeout(() => {
      // Calculate basic metrics
      const wordCount = content.split(/\s+/).filter(Boolean).length;
      const sentenceCount = content.split(/[.!?]+/).filter(Boolean).length;
      const paragraphCount = content.split(/\n\s*\n/).filter(Boolean).length;
      const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

      // Calculate keyword metrics
      const keywordRegex = new RegExp(keyword, 'gi');
      const keywordMatches = (content.match(keywordRegex) || []).length;
      const keywordDensity = (keywordMatches / wordCount) * 100;

      // Mock readability score (Flesch-Kincaid like)
      const readabilityScore = Math.min(Math.floor(Math.random() * 50) + 50, 100);
      let readabilityLevel = "Difficult";
      if (readabilityScore >= 80) readabilityLevel = "Easy";
      else if (readabilityScore >= 60) readabilityLevel = "Standard";

      // Generate mock analysis results
      const results = {
        readability: {
          score: readabilityScore,
          level: readabilityLevel,
          suggestions: [
            "Consider using shorter sentences for better readability",
            "Reduce the use of passive voice",
            "Use simpler words where appropriate"
          ]
        },
        seo: {
          score: Math.min(Math.floor(Math.random() * 40) + 60, 100),
          keywordDensity: parseFloat(keywordDensity.toFixed(2)),
          issues: [
            keywordDensity < 0.5 ? "Keyword density is too low (aim for 1-3%)" : null,
            keywordDensity > 3 ? "Keyword density is too high (aim for 1-3%)" : null,
            !content.toLowerCase().includes(keyword.toLowerCase()) ? "Keyword is missing from the first paragraph" : null,
            sentenceCount < 10 ? "Content may be too short for good SEO performance" : null
          ].filter((issue): issue is string => issue !== null)
        },
        metrics: {
          wordCount,
          sentenceCount,
          paragraphCount,
          readingTime
        }
      };

      setAnalysisResults(results);
      setAnalyzing(false);
      setAnalyzed(true);
      setActiveTab("analysis");
      toast.success("Content analysis complete!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!analyzed}>Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Content for Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="target-keyword" className="block text-sm font-medium mb-1">Target Keyword</label>
                <Input
                  id="target-keyword"
                  placeholder="Enter target keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
                <Textarea
                  id="content"
                  placeholder="Paste your content here for analysis..."
                  rows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="resize-none"
                />
              </div>

              <Button onClick={handleAnalyze} disabled={analyzing}>
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Content"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6 mt-4">
          {analyzed && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <BarChart className="mr-2 h-5 w-5" />
                      SEO Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={analysisResults.seo.score} className="h-2" />
                      <div className="text-2xl font-bold">{analysisResults.seo.score}/100</div>

                      <div>
                        <div className="text-sm font-medium mb-1">Keyword Density</div>
                        <div className="flex items-center">
                          <Progress
                            value={Math.min(analysisResults.seo.keywordDensity * 33, 100)}
                            className="h-2 flex-1 mr-2"
                          />
                          <span className="text-sm font-medium">{analysisResults.seo.keywordDensity}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Issues to Address</div>
                        {analysisResults.seo.issues.length > 0 ? (
                          <ul className="space-y-2">
                            {analysisResults.seo.issues.map((issue, index) => (
                              <li key={index} className="flex items-start">
                                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
                                <span className="text-sm">{issue}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            No major SEO issues detected
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Type className="mr-2 h-5 w-5" />
                      Readability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={analysisResults.readability.score} className="h-2" />
                      <div className="flex justify-between">
                        <div className="text-2xl font-bold">{analysisResults.readability.score}/100</div>
                        <div className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
                          {analysisResults.readability.level}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Improvement Suggestions</div>
                        <ul className="space-y-2">
                          {analysisResults.readability.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
                              <span className="text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Content Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Word Count</div>
                      <div className="text-2xl font-bold">{analysisResults.metrics.wordCount}</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Sentences</div>
                      <div className="text-2xl font-bold">{analysisResults.metrics.sentenceCount}</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Paragraphs</div>
                      <div className="text-2xl font-bold">{analysisResults.metrics.paragraphCount}</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Reading Time</div>
                      <div className="text-2xl font-bold">{analysisResults.metrics.readingTime} min</div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setActiveTab("content")}>
                      Edit Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentAnalyzer;
