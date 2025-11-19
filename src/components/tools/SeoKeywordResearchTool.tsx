import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  TrendingUp, 
  BarChart2, 
  Filter, 
  Download, 
  Star,
  ExternalLink
} from 'lucide-react';

const SeoKeywordResearchTool = () => {
  const [keywords, setKeywords] = useState([
    {
      id: 1,
      keyword: 'digital marketing',
      volume: 135000,
      difficulty: 72,
      cpc: 3.45,
      trend: [65, 70, 75, 80, 85, 90, 88, 92, 95, 100],
      competition: 'High'
    },
    {
      id: 2,
      keyword: 'seo services',
      volume: 90500,
      difficulty: 68,
      cpc: 5.20,
      trend: [55, 58, 60, 62, 65, 68, 70, 72, 75, 78],
      competition: 'High'
    },
    {
      id: 3,
      keyword: 'social media marketing',
      volume: 110000,
      difficulty: 65,
      cpc: 2.80,
      trend: [70, 72, 75, 78, 80, 82, 85, 88, 90, 92],
      competition: 'Medium'
    },
    {
      id: 4,
      keyword: 'content marketing',
      volume: 74000,
      difficulty: 58,
      cpc: 4.10,
      trend: [45, 48, 50, 52, 55, 58, 60, 62, 65, 68],
      competition: 'Medium'
    },
    {
      id: 5,
      keyword: 'email marketing',
      volume: 82000,
      difficulty: 52,
      cpc: 2.95,
      trend: [60, 62, 65, 68, 70, 72, 75, 78, 80, 82],
      competition: 'Low'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minVolume: 0,
    maxDifficulty: 100,
    minCpc: 0
  });
  
  const filteredKeywords = keywords.filter(keyword => {
    const matchesSearch = keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVolume = keyword.volume >= filters.minVolume;
    const matchesDifficulty = keyword.difficulty <= filters.maxDifficulty;
    const matchesCpc = keyword.cpc >= filters.minCpc;
    
    return matchesSearch && matchesVolume && matchesDifficulty && matchesCpc;
  });
  
  const getDifficultyColor = (difficulty) => {
    if (difficulty >= 70) return 'bg-red-100 text-red-800';
    if (difficulty >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };
  
  const getCompetitionColor = (competition) => {
    if (competition === 'High') return 'bg-red-100 text-red-800';
    if (competition === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">SEO Keyword Research Tool</h1>
        <p className="text-adsilo-text-secondary mt-1">
          Discover valuable keywords for your content and SEO strategy.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Keyword Research</CardTitle>
          <CardDescription>
            Find relevant keywords with search volume, competition, and CPC data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-adsilo-text-muted" />
              <Input
                placeholder="Enter a keyword or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search Keywords
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-adsilo-text-muted" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <div>
              <Label className="text-xs">Min. Volume</Label>
              <Select onValueChange={(value) => setFilters({...filters, minVolume: parseInt(value)})}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="1000">1,000+</SelectItem>
                  <SelectItem value="10000">10,000+</SelectItem>
                  <SelectItem value="50000">50,000+</SelectItem>
                  <SelectItem value="100000">100,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs">Max. Difficulty</Label>
              <Select onValueChange={(value) => setFilters({...filters, maxDifficulty: parseInt(value)})}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">Any</SelectItem>
                  <SelectItem value="30">30 or less</SelectItem>
                  <SelectItem value="50">50 or less</SelectItem>
                  <SelectItem value="70">70 or less</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs">Min. CPC</Label>
              <Select onValueChange={(value) => setFilters({...filters, minCpc: parseFloat(value)})}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="1">$1+</SelectItem>
                  <SelectItem value="2">$2+</SelectItem>
                  <SelectItem value="5">$5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm" className="ml-auto">
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-gray-50 px-4 py-2 text-sm font-medium border-b">
              <div className="md:col-span-4">Keyword</div>
              <div className="md:col-span-2">Volume</div>
              <div className="md:col-span-2">Difficulty</div>
              <div className="md:col-span-2">CPC</div>
              <div className="md:col-span-2">Competition</div>
            </div>
            
            <div className="divide-y">
              {filteredKeywords.map(keyword => (
                <div key={keyword.id} className="grid grid-cols-1 md:grid-cols-12 px-4 py-3 hover:bg-gray-50">
                  <div className="md:col-span-4 font-medium">
                    {keyword.keyword}
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-adsilo-text-muted" />
                      <div className="flex h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="bg-adsilo-primary h-full" 
                          style={{ width: `${keyword.trend[keyword.trend.length - 1]}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    {keyword.volume.toLocaleString()}
                  </div>
                  <div className="md:col-span-2">
                    <Badge className={getDifficultyColor(keyword.difficulty)}>
                      {keyword.difficulty}
                    </Badge>
                  </div>
                  <div className="md:col-span-2">
                    ${keyword.cpc.toFixed(2)}
                  </div>
                  <div className="md:col-span-2">
                    <Badge className={getCompetitionColor(keyword.competition)}>
                      {keyword.competition}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredKeywords.length === 0 && (
              <div className="text-center py-8 text-adsilo-text-muted">
                <Search className="h-12 w-12 mx-auto mb-2" />
                <p>No keywords found matching your criteria.</p>
                <p className="text-sm mt-1">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Keyword Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">135K</div>
                <div className="text-sm text-adsilo-text-muted">Highest volume keyword</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Competition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72</div>
                <div className="text-sm text-adsilo-text-muted">Highest difficulty score</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">CPC Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5.20</div>
                <div className="text-sm text-adsilo-text-muted">Highest cost per click</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoKeywordResearchTool;