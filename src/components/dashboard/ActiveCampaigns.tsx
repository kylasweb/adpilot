
import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Edit,
  Pause,
  BarChart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { getActiveCampaigns } from "@/services/dashboardService";



const ActiveCampaigns = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getActiveCampaigns(5);
        // Transform the data to match the expected format
        const transformedCampaigns = response.data.map((campaign: any) => ({
          id: campaign.id,
          name: campaign.name,
          objective: campaign.objective || 'N/A',
          audience: 'Target Audience', // This would come from actual data
          status: campaign.status,
          spent: '$0.00', // This would come from actual data
          budget: `$${campaign.budget.toFixed(2)}`,
          progress: Math.floor(Math.random() * 100), // This would come from actual data
          results: '0 results', // This would come from actual data
          cpa: '$0.00' // This would come from actual data
        }));
        setCampaigns(transformedCampaigns);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch active campaigns:", error);
        setLoading(false);
      }
    };
    
    fetchCampaigns();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-adsilo-primary"></div>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign</TableHead>
          <TableHead>Audience</TableHead>
          <TableHead>Budget Spent</TableHead>
          <TableHead>Results</TableHead>
          <TableHead>Cost Per Result</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-adsilo-text-muted">
              No active campaigns
            </TableCell>
          </TableRow>
        ) : (
          campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">
                <div>
                  {campaign.name}
                  <div className="text-xs text-adsilo-text-muted mt-1">
                    {campaign.objective}
                  </div>
                </div>
              </TableCell>
              <TableCell>{campaign.audience}</TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{campaign.spent}</span>
                    <span className="text-adsilo-text-muted">{campaign.budget}</span>
                  </div>
                  <Progress value={campaign.progress} />
                </div>
              </TableCell>
              <TableCell>{campaign.results}</TableCell>
              <TableCell>{campaign.cpa}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>View Report</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pause className="mr-2 h-4 w-4" />
                      <span>Pause Campaign</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ActiveCampaigns;
