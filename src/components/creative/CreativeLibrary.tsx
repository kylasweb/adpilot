import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreVertical, Edit, Copy, Trash, Download } from "lucide-react";
import { getCreatives, deleteCreative } from "@/services/creativeService";
import { Skeleton } from "@/components/ui/skeleton";

const CreativeLibrary = () => {
  const [creatives, setCreatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("newest");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCreatives({ 
          search: searchQuery,
          sortBy 
        });
        setCreatives(result.data);
      } catch (err) {
        setError("Failed to fetch creatives");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, sortBy]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCreative(id);
      setCreatives(creatives.filter(creative => creative.id !== id));
    } catch (err) {
      setError("Failed to delete creative");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Skeleton className="h-10 w-full pl-8" />
          </div>
          <div className="flex items-center gap-2 self-end">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-adsilo-muted flex items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <div className="flex items-center gap-2 mt-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <div className="mt-3">
                  <Skeleton className="h-3 w-24 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-12 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </div>
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-adsilo-text-muted" />
          <Input
            placeholder="Search creatives..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 self-end">
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
              <DropdownMenuItem onSelect={() => setSortBy("newest")}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortBy("oldest")}>
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortBy("alphabetical")}>
                A-Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creatives.map((creative) => (
          <Card key={creative.id} className="overflow-hidden">
            <div className="aspect-video bg-adsilo-muted flex items-center justify-center">
              {creative.previewUrl ? (
                <img
                  src={creative.previewUrl}
                  alt={creative.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-adsilo-text-muted">
                  {creative.type} Preview
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{creative.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{creative.type}</Badge>
                    <span className="text-xs text-adsilo-text-muted">{creative.size}</span>
                  </div>
                </div>
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
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600"
                      onSelect={() => handleDelete(creative.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3">
                {creative.campaignName && (
                  <div className="text-xs text-adsilo-text-muted">{creative.campaignName}</div>
                )}
                <div className="text-xs text-adsilo-text-muted">Updated {new Date(creative.lastUpdated).toLocaleDateString()}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {creative.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="text-xs bg-adsilo-muted px-2 py-1 rounded-full text-adsilo-text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreativeLibrary;