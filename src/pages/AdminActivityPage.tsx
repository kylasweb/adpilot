
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Search, Download, CalendarIcon, Filter, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample activity data
const activityLogs = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      email: "alex@adpilot.com",
      avatar: "AJ"
    },
    action: "created",
    resourceType: "campaign",
    resourceName: "Summer Sale 2023",
    timestamp: "2023-06-15T14:30:00",
    ip: "192.168.1.1"
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      email: "sarah@adpilot.com",
      avatar: "SW"
    },
    action: "updated",
    resourceType: "creative",
    resourceName: "Product Banner v2",
    timestamp: "2023-06-15T12:45:00",
    ip: "192.168.1.2"
  },
  {
    id: 3,
    user: {
      name: "Michael Brown",
      email: "michael@adpilot.com",
      avatar: "MB"
    },
    action: "deleted",
    resourceType: "cohort",
    resourceName: "High Value Users",
    timestamp: "2023-06-14T16:20:00",
    ip: "192.168.1.3"
  },
  {
    id: 4,
    user: {
      name: "Jessica Chen",
      email: "jessica@adpilot.com",
      avatar: "JC"
    },
    action: "exported",
    resourceType: "analytics",
    resourceName: "Q2 Performance Report",
    timestamp: "2023-06-14T10:15:00",
    ip: "192.168.1.4"
  },
  {
    id: 5,
    user: {
      name: "Alex Johnson",
      email: "alex@adpilot.com",
      avatar: "AJ"
    },
    action: "invited",
    resourceType: "user",
    resourceName: "David Wilson",
    timestamp: "2023-06-13T09:30:00",
    ip: "192.168.1.1"
  }
];

const AdminActivityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>([]);
  
  // Filter activity logs based on search query and filters
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = !selectedDate || format(new Date(log.timestamp), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
    
    const matchesAction = selectedActions.length === 0 || selectedActions.includes(log.action);
    
    const matchesResourceType = selectedResourceTypes.length === 0 || selectedResourceTypes.includes(log.resourceType);
    
    return matchesSearch && matchesDate && matchesAction && matchesResourceType;
  });

  // Get unique actions and resource types for filters
  const uniqueActions = [...new Set(activityLogs.map(log => log.action))];
  const uniqueResourceTypes = [...new Set(activityLogs.map(log => log.resourceType))];
  
  // Function to clear all filters
  const clearFilters = () => {
    setSelectedDate(undefined);
    setSelectedActions([]);
    setSelectedResourceTypes([]);
    setSearchQuery("");
  };

  // Function to toggle action selection
  const toggleAction = (action: string) => {
    setSelectedActions(prev => 
      prev.includes(action) 
        ? prev.filter(a => a !== action) 
        : [...prev, action]
    );
  };
  
  // Function to toggle resource type selection
  const toggleResourceType = (type: string) => {
    setSelectedResourceTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  // Get action badge variant based on action type
  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case "created": return "default";
      case "updated": return "outline";
      case "deleted": return "destructive";
      case "exported": return "secondary";
      case "invited": return "default";
      default: return "outline";
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
          <p className="text-adpilot-text-secondary mt-1">Track user actions and system events</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>View and search user actions across the platform</CardDescription>
            </div>
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PP") : "Date Range"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search activity logs..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    {(selectedActions.length > 0 || selectedResourceTypes.length > 0) && (
                      <Badge variant="secondary" className="ml-2 rounded-full h-5 min-w-5 px-1">
                        {selectedActions.length + selectedResourceTypes.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {uniqueActions.map(action => (
                          <div key={action} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`action-${action}`} 
                              checked={selectedActions.includes(action)}
                              onCheckedChange={() => toggleAction(action)}
                            />
                            <label 
                              htmlFor={`action-${action}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {action.charAt(0).toUpperCase() + action.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Resource Types</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {uniqueResourceTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type}`} 
                              checked={selectedResourceTypes.includes(type)}
                              onCheckedChange={() => toggleResourceType(type)}
                            />
                            <label 
                              htmlFor={`type-${type}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Resource</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Timestamp</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="h-24 text-center text-muted-foreground">
                          No activity logs found for the current filters
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{log.user.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{log.user.name}</div>
                                <div className="text-xs text-muted-foreground">{log.user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge variant={getActionBadgeVariant(log.action)}>
                              {log.action}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div>
                              <span className="font-medium">{log.resourceName}</span>
                              <div className="text-xs text-muted-foreground">
                                {log.resourceType}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div>
                              <div>{format(new Date(log.timestamp), "MMM d, yyyy")}</div>
                              <div className="text-xs text-muted-foreground">
                                {format(new Date(log.timestamp), "h:mm a")}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="font-mono text-xs">{log.ip}</div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredLogs.length} of {activityLogs.length} activities
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default AdminActivityPage;
