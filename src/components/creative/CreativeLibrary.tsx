
import React from "react";
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

// Sample creative items
const creatives = [
  {
    id: 1,
    title: "Summer Collection Banner",
    type: "Image",
    size: "1200x628",
    campaign: "Summer Sale 2023",
    lastUpdated: "2 days ago",
    preview: "https://via.placeholder.com/300x150?text=Summer+Collection",
    tags: ["summer", "banner", "sale"]
  },
  {
    id: 2,
    title: "Product Showcase Video",
    type: "Video",
    size: "1080x1080",
    campaign: "Product Launch",
    lastUpdated: "5 days ago",
    preview: "https://via.placeholder.com/300x150?text=Product+Video",
    tags: ["product", "video", "showcase"]
  },
  {
    id: 3,
    title: "Holiday Discount Carousel",
    type: "Carousel",
    size: "1080x1080",
    campaign: "Holiday Promotion",
    lastUpdated: "1 week ago",
    preview: "https://via.placeholder.com/300x150?text=Holiday+Carousel",
    tags: ["holiday", "carousel", "discount"]
  },
  {
    id: 4,
    title: "Brand Awareness Story",
    type: "Story",
    size: "1080x1920",
    campaign: "Brand Awareness Q3",
    lastUpdated: "2 weeks ago",
    preview: "https://via.placeholder.com/300x150?text=Brand+Story",
    tags: ["brand", "story", "awareness"]
  },
  {
    id: 5,
    title: "Limited Offer Banner",
    type: "Image",
    size: "1200x628",
    campaign: "Flash Sale",
    lastUpdated: "3 weeks ago",
    preview: "https://via.placeholder.com/300x150?text=Limited+Offer",
    tags: ["limited", "offer", "banner"]
  },
  {
    id: 6,
    title: "Customer Testimonial Video",
    type: "Video",
    size: "1080x1080",
    campaign: "Social Proof Campaign",
    lastUpdated: "1 month ago",
    preview: "https://via.placeholder.com/300x150?text=Testimonial+Video",
    tags: ["testimonial", "video", "social-proof"]
  }
];

const CreativeLibrary = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredCreatives = creatives.filter(creative => 
    creative.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    creative.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-adpilot-text-muted" />
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
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>A-Z</DropdownMenuItem>
              <DropdownMenuItem>Type</DropdownMenuItem>
              <DropdownMenuItem>Campaign</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreatives.map((creative) => (
          <Card key={creative.id} className="overflow-hidden">
            <div className="aspect-video bg-adpilot-muted flex items-center justify-center">
              <img
                src={creative.preview}
                alt={creative.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{creative.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{creative.type}</Badge>
                    <span className="text-xs text-adpilot-text-muted">{creative.size}</span>
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
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3">
                <div className="text-xs text-adpilot-text-muted">{creative.campaign}</div>
                <div className="text-xs text-adpilot-text-muted">Updated {creative.lastUpdated}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {creative.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-adpilot-muted px-2 py-1 rounded-full text-adpilot-text-secondary"
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
