import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getCampaignMetrics } from "@/services/analyticsService";
import { Skeleton } from "@/components/ui/skeleton";

const CampaignMetrics = ({ dateRange }: { dateRange: string }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCampaignMetrics({ dateRange });
        setData(result);
      } catch (err) {
        setError("Failed to fetch campaign metrics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="relative">
          <Skeleton className="h-10 w-full pl-8" />
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-4 w-20" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-16 mt-2" />
                <Skeleton className="h-3 w-20 mt-3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const filteredCampaigns = data.campaignMetrics.filter((campaign: any) => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate averages
  const avgCtr = data.campaignMetrics.length > 0 
    ? (data.campaignMetrics.reduce((sum: number, campaign: any) => sum + campaign.ctr, 0) / data.campaignMetrics.length).toFixed(2)
    : "0.00";
    
  const avgCpc = data.campaignMetrics.length > 0 
    ? (data.campaignMetrics.reduce((sum: number, campaign: any) => sum + campaign.cpc, 0) / data.campaignMetrics.length).toFixed(2)
    : "0.00";
    
  const avgConversionRate = data.campaignMetrics.length > 0 
    ? (data.campaignMetrics.reduce((sum: number, campaign: any) => sum + campaign.conversionRate, 0) / data.campaignMetrics.length).toFixed(2)
    : "0.00";
    
  const avgRoas = data.campaignMetrics.length > 0 
    ? (data.campaignMetrics.reduce((sum: number, campaign: any) => sum + campaign.roas, 0) / data.campaignMetrics.length).toFixed(2)
    : "0.00";

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-adsilo-text-muted" />
        <Input
          placeholder="Search campaigns..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">CPC</TableHead>
                <TableHead className="text-right">Conv.</TableHead>
                <TableHead className="text-right">Conv. Rate</TableHead>
                <TableHead className="text-right">CPA</TableHead>
                <TableHead className="text-right">ROAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign: any) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="text-right">{campaign.impressions?.toLocaleString() || "0"}</TableCell>
                  <TableCell className="text-right">{campaign.clicks?.toLocaleString() || "0"}</TableCell>
                  <TableCell className="text-right">{campaign.ctr ? `${campaign.ctr}%` : "0%"}</TableCell>
                  <TableCell className="text-right">${campaign.cpc?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell className="text-right">{campaign.conversions?.toLocaleString() || "0"}</TableCell>
                  <TableCell className="text-right">{campaign.conversionRate ? `${campaign.conversionRate}%` : "0%"}</TableCell>
                  <TableCell className="text-right">${campaign.cpa?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell className="text-right font-medium">{campaign.roas ? `${campaign.roas}x` : "0x"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adsilo-text-secondary">Avg. CTR</h3>
            <div className="text-2xl font-bold mt-2">{avgCtr}%</div>
            <p className="text-xs text-adsilo-text-muted mt-1">Industry avg: 1.91%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adsilo-text-secondary">Avg. CPC</h3>
            <div className="text-2xl font-bold mt-2">${avgCpc}</div>
            <p className="text-xs text-adsilo-text-muted mt-1">Industry avg: $0.57</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adsilo-text-secondary">Avg. Conv. Rate</h3>
            <div className="text-2xl font-bold mt-2">{avgConversionRate}%</div>
            <p className="text-xs text-adsilo-text-muted mt-1">Industry avg: 3.75%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adsilo-text-secondary">Avg. ROAS</h3>
            <div className="text-2xl font-bold mt-2">{avgRoas}x</div>
            <p className="text-xs text-adsilo-text-muted mt-1">Industry avg: 2.87x</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignMetrics;