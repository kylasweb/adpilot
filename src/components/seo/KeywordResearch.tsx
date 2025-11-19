
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowUpDown, Download } from "lucide-react";
import { toast } from "sonner";

type Keyword = {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  competition: number;
};

const KeywordResearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("results");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [savedKeywords, setSavedKeywords] = useState<Keyword[]>([]);

  const mockKeywordData: Keyword[] = [
    { id: "1", keyword: "digital marketing services", volume: 12500, difficulty: 75, cpc: 8.45, competition: 0.89 },
    { id: "2", keyword: "seo agency", volume: 8900, difficulty: 82, cpc: 12.35, competition: 0.92 },
    { id: "3", keyword: "content marketing strategy", volume: 6500, difficulty: 65, cpc: 6.78, competition: 0.75 },
    { id: "4", keyword: "local seo services", volume: 4800, difficulty: 58, cpc: 9.24, competition: 0.81 },
    { id: "5", keyword: "social media management", volume: 9700, difficulty: 70, cpc: 5.32, competition: 0.85 },
    { id: "6", keyword: "ppc advertising", volume: 5600, difficulty: 68, cpc: 10.89, competition: 0.88 },
    { id: "7", keyword: "email marketing software", volume: 7200, difficulty: 72, cpc: 7.56, competition: 0.79 },
    { id: "8", keyword: "web design services", volume: 11300, difficulty: 80, cpc: 9.78, competition: 0.90 },
  ];

  const handleSearch = () => {
    if (!searchTerm) {
      toast.error("Please enter a keyword to search");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setKeywords(mockKeywordData);
      setLoading(false);
      setActiveTab("results");
    }, 1500);
  };

  const handleSaveKeyword = (keyword: Keyword) => {
    if (!savedKeywords.some(k => k.id === keyword.id)) {
      setSavedKeywords([...savedKeywords, keyword]);
      toast.success(`Added "${keyword.keyword}" to saved keywords`);
    } else {
      toast.info("This keyword is already saved");
    }
  };

  const handleRemoveSaved = (id: string) => {
    setSavedKeywords(savedKeywords.filter(k => k.id !== id));
    toast.success("Keyword removed from saved list");
  };

  const handleExport = () => {
    const dataToExport = activeTab === "results" ? keywords : savedKeywords;
    
    if (dataToExport.length === 0) {
      toast.error("No data to export");
      return;
    }

    const csvContent = "data:text/csv;charset=utf-8," + 
      "Keyword,Volume,Difficulty,CPC,Competition\n" + 
      dataToExport.map(k => `"${k.keyword}",${k.volume},${k.difficulty},${k.cpc},${k.competition}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "keyword_research.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Keywords exported successfully");
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "bg-green-100 text-green-800";
    if (difficulty < 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const renderKeywordTable = (data: Keyword[]) => {
    return (
      <Table>
        <TableCaption>
          {data.length > 0 ? 
            `Found ${data.length} keywords sorted by search volume` : 
            "No keywords found. Try a new search."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Keyword</TableHead>
            <TableHead>
              <div className="flex items-center">
                Volume <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>CPC ($)</TableHead>
            <TableHead>Competition</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((keyword) => (
              <TableRow key={keyword.id}>
                <TableCell className="font-medium">{keyword.keyword}</TableCell>
                <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getDifficultyColor(keyword.difficulty)}>
                    {keyword.difficulty}/100
                  </Badge>
                </TableCell>
                <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
                <TableCell>{(keyword.competition * 100).toFixed(0)}%</TableCell>
                <TableCell>
                  {activeTab === "results" ? (
                    <Button size="sm" variant="ghost" onClick={() => handleSaveKeyword(keyword)}>Save</Button>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => handleRemoveSaved(keyword.id)}>Remove</Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                {activeTab === "results" ? "Search for keywords to see results" : "No saved keywords yet"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter a keyword or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Research"}
            </Button>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Try searching for topics like "digital marketing", "seo services", or "web design"</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="saved">
                Saved Keywords
                {savedKeywords.length > 0 && (
                  <Badge className="ml-2 bg-adsilo-primary text-white" variant="secondary">
                    {savedKeywords.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" onClick={handleExport} disabled={(activeTab === "results" && keywords.length === 0) || (activeTab === "saved" && savedKeywords.length === 0)}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6 overflow-auto">
              <TabsContent value="results" className="m-0">
                {renderKeywordTable(keywords)}
              </TabsContent>
              
              <TabsContent value="saved" className="m-0">
                {renderKeywordTable(savedKeywords)}
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default KeywordResearch;
