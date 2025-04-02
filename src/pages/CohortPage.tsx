
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CohortList from "@/components/cohorts/CohortList";
import PersonaList from "@/components/cohorts/PersonaList";
import { Plus, Filter, MoreVertical, Download } from "lucide-react";

const CohortPage = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cohorts & Personas</h1>
          <p className="text-adpilot-text-secondary mt-1">Manage your audience segments and customer personas</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Cohort
          </Button>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="cohorts">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Audience Management</CardTitle>
              <TabsList>
                <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
                <TabsTrigger value="personas">Personas</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Sort By
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                    <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                    <DropdownMenuItem>Date Created (Newest)</DropdownMenuItem>
                    <DropdownMenuItem>Date Created (Oldest)</DropdownMenuItem>
                    <DropdownMenuItem>Size (Largest)</DropdownMenuItem>
                    <DropdownMenuItem>Size (Smallest)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Import from CSV</DropdownMenuItem>
                    <DropdownMenuItem>Sync with Facebook</DropdownMenuItem>
                    <DropdownMenuItem>Bulk Actions</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="cohorts" className="m-0">
              <CohortList />
            </TabsContent>
            <TabsContent value="personas" className="m-0">
              <PersonaList />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </AppLayout>
  );
};

export default CohortPage;
