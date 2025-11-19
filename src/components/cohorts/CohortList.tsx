
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
import { MoreVertical, Edit, Trash, BarChart, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCohorts } from "@/services/cohortService";



const CohortList = () => {
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await getCohorts({});
        setCohorts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cohorts:", error);
        setLoading(false);
      }
    };
    
    fetchCohorts();
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
          <TableHead>Cohort Name</TableHead>
          <TableHead>Audience Size</TableHead>
          <TableHead>Criteria</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cohorts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-adsilo-text-muted">
              No cohorts found
            </TableCell>
          </TableRow>
        ) : (
          cohorts.map((cohort) => (
            <TableRow key={cohort.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-adsilo-muted flex items-center justify-center">
                    <Users className="h-4 w-4 text-adsilo-primary" />
                  </div>
                  <div>
                    {cohort.name}
                    <div className="text-xs text-adsilo-text-muted mt-1">
                      {cohort.description || 'No description'}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{cohort.audienceSize.toLocaleString()} users</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {cohort.criteria || 'Custom'}
                </Badge>
              </TableCell>
              <TableCell>{new Date(cohort.createdAt).toLocaleDateString()}</TableCell>
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
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CohortList;
