
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
import { MoreVertical, Edit, Trash, BarChart, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const cohorts = [
  {
    id: 1,
    name: "High-Value Customers",
    description: "Customers with 2+ purchases in the last 30 days",
    audience: "135,244 users",
    source: "CRM Data",
    created: "Jun 12, 2023",
    status: "Active",
    type: "Custom"
  },
  {
    id: 2,
    name: "Tech Enthusiasts",
    description: "Users who engage with tech content",
    audience: "243,876 users",
    source: "Facebook Interest",
    created: "May 28, 2023",
    status: "Active",
    type: "Interest"
  },
  {
    id: 3,
    name: "New Parents",
    description: "Identified as new or expecting parents",
    audience: "87,643 users",
    source: "Custom Audience",
    created: "Apr 15, 2023",
    status: "Active",
    type: "Demographic"
  },
  {
    id: 4,
    name: "Frequent Shoppers",
    description: "Customers who shop weekly",
    audience: "56,327 users",
    source: "eCommerce Data",
    created: "Mar 22, 2023",
    status: "Active",
    type: "Behavioral"
  },
  {
    id: 5,
    name: "Website Visitors",
    description: "Visited website in last 7 days",
    audience: "98,763 users",
    source: "Pixel Data",
    created: "Feb 14, 2023",
    status: "Active",
    type: "Website"
  }
];

const CohortList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cohort Name</TableHead>
          <TableHead>Audience Size</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cohorts.map((cohort) => (
          <TableRow key={cohort.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-adpilot-muted flex items-center justify-center">
                  <Users className="h-4 w-4 text-adpilot-primary" />
                </div>
                <div>
                  {cohort.name}
                  <div className="text-xs text-adpilot-text-muted mt-1">
                    {cohort.description}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{cohort.audience}</TableCell>
            <TableCell>{cohort.source}</TableCell>
            <TableCell>
              <Badge variant="outline">
                {cohort.type}
              </Badge>
            </TableCell>
            <TableCell>{cohort.created}</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {cohort.status}
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
                    <span>View Performance</span>
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
  );
};

export default CohortList;
