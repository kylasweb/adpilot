
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const campaignData = [
  {
    id: 1,
    name: "Summer Sale 2023",
    impressions: "764,321",
    clicks: "23,456",
    ctr: "3.07%",
    cpc: "$0.38",
    conversions: "1,243",
    conversionRate: "5.30%",
    cpa: "$7.17",
    roas: "4.2x",
  },
  {
    id: 2,
    name: "Brand Awareness Q3",
    impressions: "1,324,567",
    clicks: "32,154",
    ctr: "2.43%",
    cpc: "$0.42",
    conversions: "876",
    conversionRate: "2.72%",
    cpa: "$15.43",
    roas: "2.1x",
  },
  {
    id: 3,
    name: "Product Launch - Pro Series",
    impressions: "567,890",
    clicks: "15,432",
    ctr: "2.72%",
    cpc: "$0.51",
    conversions: "643",
    conversionRate: "4.17%",
    cpa: "$12.24",
    roas: "3.5x",
  },
  {
    id: 4,
    name: "Retargeting Campaign",
    impressions: "234,567",
    clicks: "10,432",
    ctr: "4.45%",
    cpc: "$0.32",
    conversions: "732",
    conversionRate: "7.02%",
    cpa: "$4.56",
    roas: "5.6x",
  },
  {
    id: 5,
    name: "New Year Promotion",
    impressions: "456,789",
    clicks: "13,245",
    ctr: "2.90%",
    cpc: "$0.45",
    conversions: "521",
    conversionRate: "3.93%",
    cpa: "$11.45",
    roas: "2.8x",
  },
];

const CampaignMetrics = ({ dateRange }: { dateRange: string }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredCampaigns = campaignData.filter(campaign => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-adpilot-text-muted" />
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
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="text-right">{campaign.impressions}</TableCell>
                  <TableCell className="text-right">{campaign.clicks}</TableCell>
                  <TableCell className="text-right">{campaign.ctr}</TableCell>
                  <TableCell className="text-right">{campaign.cpc}</TableCell>
                  <TableCell className="text-right">{campaign.conversions}</TableCell>
                  <TableCell className="text-right">{campaign.conversionRate}</TableCell>
                  <TableCell className="text-right">{campaign.cpa}</TableCell>
                  <TableCell className="text-right font-medium">{campaign.roas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adpilot-text-secondary">Avg. CTR</h3>
            <div className="text-2xl font-bold mt-2">2.73%</div>
            <p className="text-xs text-adpilot-text-muted mt-1">Industry avg: 1.91%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adpilot-text-secondary">Avg. CPC</h3>
            <div className="text-2xl font-bold mt-2">$0.42</div>
            <p className="text-xs text-adpilot-text-muted mt-1">Industry avg: $0.57</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adpilot-text-secondary">Avg. Conv. Rate</h3>
            <div className="text-2xl font-bold mt-2">4.31%</div>
            <p className="text-xs text-adpilot-text-muted mt-1">Industry avg: 3.75%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adpilot-text-secondary">Avg. ROAS</h3>
            <div className="text-2xl font-bold mt-2">3.2x</div>
            <p className="text-xs text-adpilot-text-muted mt-1">Industry avg: 2.87x</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignMetrics;
