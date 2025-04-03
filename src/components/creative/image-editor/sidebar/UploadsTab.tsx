
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, ImageIcon } from "lucide-react";
import { toast } from "sonner";

// Mock API key for Pexels
const PEXELS_API_KEY = "YOUR_PEXELS_API_KEY"; // In a real app, use environment variables

const UploadsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pexelsImages, setPexelsImages] = useState<any[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  // Search Pexels for images
  const searchPexelsImages = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoadingImages(true);
    try {
      // In a real implementation, this would be a server-side API call to protect your API key
      const response = await fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=12`, {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch images');
      
      const data = await response.json();
      setPexelsImages(data.photos || []);
    } catch (error) {
      console.error("Error fetching Pexels images:", error);
      // For demo purposes, provide mock data when API key isn't available
      setPexelsImages([
        { id: 1, src: { medium: "/placeholder.svg" }, photographer: "Photographer 1" },
        { id: 2, src: { medium: "/placeholder.svg" }, photographer: "Photographer 2" },
        { id: 3, src: { medium: "/placeholder.svg" }, photographer: "Photographer 3" },
        { id: 4, src: { medium: "/placeholder.svg" }, photographer: "Photographer 4" },
      ]);
      toast.error("Could not load images. Using placeholders instead.");
    } finally {
      setIsLoadingImages(false);
    }
  };

  const handleAddImageToCanvas = (imageUrl: string) => {
    toast.success("Added image to canvas");
    // In a real app, this would add the image to the canvas
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Pexels Stock Photos</h3>
        <div className="flex gap-2">
          <Input 
            placeholder="Search stock photos..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={searchPexelsImages} disabled={isLoadingImages}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {isLoadingImages ? (
          <div className="flex justify-center my-4">
            <div className="animate-pulse">Loading images...</div>
          </div>
        ) : (
          pexelsImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {pexelsImages.map(photo => (
                <div 
                  key={photo.id}
                  className="border rounded-md p-1 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleAddImageToCanvas(photo.src.medium)}
                >
                  <div className="aspect-square bg-gray-100 rounded-sm mb-1 overflow-hidden">
                    <img 
                      src={photo.src.medium} 
                      alt={`Photo by ${photo.photographer}`} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-xs truncate text-gray-500">by {photo.photographer}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      
      <Separator />
      
      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
        <ImageIcon className="h-10 w-10 text-gray-300 mb-2" />
        <h3 className="text-sm font-medium">Upload Images</h3>
        <p className="text-xs text-gray-500 mb-3">
          Drag and drop or click to upload
        </p>
        <Button size="sm">Upload</Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Recent Uploads</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="border rounded-md p-1 cursor-pointer hover:border-primary transition-colors">
            <div className="aspect-square bg-gray-100"></div>
          </div>
          <div className="border rounded-md p-1 cursor-pointer hover:border-primary transition-colors">
            <div className="aspect-square bg-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadsTab;
