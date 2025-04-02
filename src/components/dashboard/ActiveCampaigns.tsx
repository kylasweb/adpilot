
import React from "react";
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

const campaignData = [
  {
    id: 1,
    name: "Summer Sale 2023",
    objective: "Conversions",
    audience: "High-Value Customers",
    status: "Active",
    spent: "$1,245.67",
    budget: "$5,000.00",
    progress: 25,
    results: "127 purchases",
    cpa: "$9.81",
  },
  {
    id: 2,
    name: "Brand Awareness Q3",
    objective: "Awareness",
    audience: "New Market Users",
    status: "Active",
    spent: "$2,387.92",
    budget: "$3,500.00",
    progress: 68,
    results: "456k impressions",
    cpa: "$5.24",
  },
  {
    id: 3,
    name: "Product Launch - Pro Series",
    objective: "Traffic",
    audience: "Tech Enthusiasts",
    status: "Active",
    spent: "$876.34",
    budget: "$2,000.00",
    progress: 44,
    results: "12.3k clicks",
    cpa: "$0.71",
  },
];

const ActiveCampaigns = () => {
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
        {campaignData.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell className="font-medium">
              <div>
                {campaign.name}
                <div className="text-xs text-adpilot-text-muted mt-1">
                  {campaign.objective}
                </div>
              </div>
            </TableCell>
            <TableCell>{campaign.audience}</TableCell>
            <TableCell>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{campaign.spent}</span>
                  <span className="text-adpilot-text-muted">{campaign.budget}</span>
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
        ))}
      </TableBody>
    </Table>
  );
};

export default ActiveCampaigns;
