
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { 
  MoreVertical, 
  Edit,
  Copy,
  Trash,
  Search,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const campaigns = [
  {
    id: 1,
    name: "Summer Sale 2023",
    objective: "Conversions",
    audience: "High-Value Customers",
    dateRange: "Jun 1 - Jul 31, 2023",
    budget: "$5,000.00",
    status: "Active",
  },
  {
    id: 2,
    name: "Brand Awareness Q3",
    objective: "Awareness",
    audience: "New Market Users",
    dateRange: "Jul 1 - Sep 30, 2023",
    budget: "$3,500.00",
    status: "Active",
  },
  {
    id: 3,
    name: "Product Launch - Pro Series",
    objective: "Traffic",
    audience: "Tech Enthusiasts",
    dateRange: "Aug 15 - Sep 15, 2023",
    budget: "$2,000.00",
    status: "Active",
  },
  {
    id: 4,
    name: "Holiday Promotion",
    objective: "Conversions",
    audience: "Frequent Shoppers",
    dateRange: "Nov 15 - Dec 25, 2023",
    budget: "$8,000.00",
    status: "Draft",
  },
  {
    id: 5,
    name: "Spring Collection",
    objective: "Conversions",
    audience: "Fashion Enthusiasts",
    dateRange: "Feb 1 - Mar 15, 2023",
    budget: "$4,500.00",
    status: "Completed",
  },
];

const CampaignList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.audience.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex items-center space-x-2 pb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-adpilot-text-muted" />
          <Input
            placeholder="Search campaigns..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Objective</TableHead>
            <TableHead>Target Audience</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCampaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>{campaign.objective}</TableCell>
              <TableCell>{campaign.audience}</TableCell>
              <TableCell>{campaign.dateRange}</TableCell>
              <TableCell>{campaign.budget}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    campaign.status === "Active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : campaign.status === "Draft"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }
                >
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
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicate</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignList;
