import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Globe, 
  BarChart2, 
  TrendingUp, 
  Users, 
  Eye, 
  Share2,
  ExternalLink,
  Star
} from 'lucide-react';

const CompetitorAnalysisTool = () => {
  const [competitors, setCompetitors] = useState([
    {
      id: 1,
      name: 'Competitor A',
      domain: 'competitor-a.com',
      category: 'E-commerce',
      traffic: 1250000,
      trafficChange: 12.5,
      keywords: 8420,
      keywordsChange: 8.2,
      backlinks: 42500,
      backlinksChange: 5.7,
      socialFollowers: 185000,
      socialFollowersChange: 15.3,
      rating: 4.2
    },
    {
      id: 2,
      name: 'Competitor B',
      domain: 'competitor-b.com',
      category: 'SaaS',
      traffic: 980000,
      trafficChange: -3.2,
      keywords: 6210,
      keywordsChange: 2.1,
      backlinks: 38200,
      backlinksChange: 1.8,
      socialFollowers: 142000,
      socialFollowersChange: 8.7,
      rating: 3.8
    },
    {
      id: 3,
      name: 'Competitor C',
      domain: 'competitor-c.com',
      category: 'Digital Agency',
      traffic: 750000,
      trafficChange: 18.7,
      keywords: 5680,
      keywordsChange: 12.4,
      backlinks: 29800,
      backlinksChange: 9.2,
      socialFollowers: 98000,
      socialFollowersChange: 22.1,
      rating: 4.5
    }
  ]);
  
  const [newCompetitor, setNewCompetitor] = useState('');
  
  const addCompetitor = () => {
    if (newCompetitor.trim()) {
      const competitor = {
        id: competitors.length + 1,
        name: `Competitor ${String.fromCharCode(65 + competitors.length)}`,
        domain: newCompetitor,
        category: 'Unknown',
        traffic: Math.floor(Math.random() * 1000000) + 500000,
        trafficChange: parseFloat((Math.random() * 30 - 10).toFixed(1)),
        keywords: Math.floor(Math.random() * 10000) + 3000,
        keywordsChange: parseFloat((Math.random() * 20 - 5).toFixed(1)),
        backlinks: Math.floor(Math.random() * 50000) + 20000,
        backlinksChange: parseFloat((Math.random() * 15 - 3).toFixed(1)),
        socialFollowers: Math.floor(Math.random() * 200000) + 50000,
        socialFollowersChange: parseFloat((Math.random() * 30 - 5).toFixed(1)),
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1))
      };
      
      setCompetitors([...competitors, competitor]);
      setNewCompetitor('');
    }
  };
  
  const getChangeColor = (change: string) => {
    const value = parseFloat(change);
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-adsilo-text-muted';
  };
  
  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-current text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-current text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Competitor Analysis Tool</h1>
        <p className="text-adsilo-text-secondary mt-1">
          Analyze competitor websites and marketing strategies.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Competitor Analysis</CardTitle>
          <CardDescription>
            Compare your performance against key competitors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-adsilo-text-muted" />
              <Input
                placeholder="Enter competitor domain (e.g., competitor.com)..."
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={addCompetitor}>
              <Search className="mr-2 h-4 w-4" />
              Add Competitor
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                  <div className="text-center">
                    <BarChart2 className="h-12 w-12 mx-auto text-adsilo-text-muted mb-2" />
                    <p className="text-adsilo-text-muted">Traffic comparison chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Keyword Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto text-adsilo-text-muted mb-2" />
                    <p className="text-adsilo-text-muted">Keyword ranking chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Competitor Metrics</CardTitle>
              <CardDescription>
                Detailed performance metrics for each competitor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 bg-gray-50 px-4 py-2 text-sm font-medium border-b">
                  <div className="md:col-span-3">Competitor</div>
                  <div className="md:col-span-2">Traffic</div>
                  <div className="md:col-span-2">Keywords</div>
                  <div className="md:col-span-2">Backlinks</div>
                  <div className="md:col-span-2">Social</div>
                  <div className="md:col-span-1">Rating</div>
                </div>
                
                <div className="divide-y">
                  {competitors.map(competitor => (
                    <div key={competitor.id} className="grid grid-cols-1 md:grid-cols-12 px-4 py-3 hover:bg-gray-50">
                      <div className="md:col-span-3">
                        <div className="font-medium">{competitor.name}</div>
                        <div className="text-sm text-adsilo-text-muted flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {competitor.domain}
                        </div>
                        <Badge variant="secondary" className="mt-1">
                          {competitor.category}
                        </Badge>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div>{competitor.traffic.toLocaleString()}</div>
                        <div className={`text-sm flex items-center gap-1 ${getChangeColor(competitor.trafficChange.toString())}`}>
                          <TrendingUp className="h-3 w-3" />
                          {competitor.trafficChange}%
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div>{competitor.keywords.toLocaleString()}</div>
                        <div className={`text-sm flex items-center gap-1 ${getChangeColor(competitor.keywordsChange.toString())}`}>
                          <TrendingUp className="h-3 w-3" />
                          {competitor.keywordsChange}%
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div>{competitor.backlinks.toLocaleString()}</div>
                        <div className={`text-sm flex items-center gap-1 ${getChangeColor(competitor.backlinksChange.toString())}`}>
                          <TrendingUp className="h-3 w-3" />
                          {competitor.backlinksChange}%
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div>{competitor.socialFollowers.toLocaleString()}</div>
                        <div className={`text-sm flex items-center gap-1 ${getChangeColor(competitor.socialFollowersChange.toString())}`}>
                          <Users className="h-3 w-3" />
                          {competitor.socialFollowersChange}%
                        </div>
                      </div>
                      
                      <div className="md:col-span-1">
                        <div className="flex items-center gap-1">
                          {getRatingStars(competitor.rating)}
                        </div>
                        <div className="text-sm text-adsilo-text-muted">
                          {competitor.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Avg. Traffic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">993K</div>
                <div className="text-sm text-adsilo-text-muted">Across competitors</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Avg. Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6,770</div>
                <div className="text-sm text-adsilo-text-muted">Across competitors</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Avg. Backlinks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36,833</div>
                <div className="text-sm text-adsilo-text-muted">Across competitors</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Avg. Followers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">141K</div>
                <div className="text-sm text-adsilo-text-muted">Across competitors</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorAnalysisTool;