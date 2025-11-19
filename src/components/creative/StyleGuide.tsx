
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const StyleGuide = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Brand Style Guide</h2>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Guide
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Primary Colors</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-adsilo-primary rounded-md"></div>
                    <span className="text-xs mt-1 text-adsilo-text-secondary">#4F46E5</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-adsilo-secondary rounded-md"></div>
                    <span className="text-xs mt-1 text-adsilo-text-secondary">#6366F1</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-adsilo-accent rounded-md"></div>
                    <span className="text-xs mt-1 text-adsilo-text-secondary">#8B5CF6</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Secondary Colors</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-adsilo-success rounded-md"></div>
                    <span className="text-xs mt-1 text-adsilo-text-secondary">#10B981</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-adsilo-warning rounded-md"></div>
                    <span className="text-xs mt-1 text-adsilo-text-secondary">#F59E0B</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-adsilo-danger rounded-md"></div>
                    <span className="text-xs mt-1 text-adsilo-text-secondary">#EF4444</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Headings</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold">Heading 1</p>
                    <p className="text-xs text-adsilo-text-secondary mt-1">Inter, 24px, Bold</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">Heading 2</p>
                    <p className="text-xs text-adsilo-text-secondary mt-1">Inter, 20px, Bold</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">Heading 3</p>
                    <p className="text-xs text-adsilo-text-secondary mt-1">Inter, 18px, Bold</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Body Text</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-base">Body Text Regular</p>
                    <p className="text-xs text-adsilo-text-secondary mt-1">Inter, 16px, Regular</p>
                  </div>
                  <div>
                    <p className="text-sm">Body Text Small</p>
                    <p className="text-xs text-adsilo-text-secondary mt-1">Inter, 14px, Regular</p>
                  </div>
                  <div>
                    <p className="text-xs">Caption Text</p>
                    <p className="text-xs text-adsilo-text-secondary mt-1">Inter, 12px, Regular</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Image Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Image Ratios</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-adsilo-text-secondary">
                <li>Facebook Feed: 1200 x 628 pixels (1.91:1)</li>
                <li>Instagram Feed: 1080 x 1080 pixels (1:1)</li>
                <li>Stories: 1080 x 1920 pixels (9:16)</li>
                <li>Carousel: 1080 x 1080 pixels (1:1)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Style Guidelines</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-adsilo-text-secondary">
                <li>Use high-resolution images (at least 72 dpi)</li>
                <li>Maintain consistent color treatment</li>
                <li>Follow the 20% text rule for ad images</li>
                <li>Use lifestyle imagery showing products in context</li>
                <li>Ensure branding elements are visible</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Logo Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white border p-4 rounded-md flex items-center justify-center">
              <div className="h-16 w-32 bg-adsilo-muted flex items-center justify-center text-adsilo-primary font-bold">
                LOGO
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Logo Guidelines</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-adsilo-text-secondary">
                <li>Maintain minimum clear space (equal to height of logo mark)</li>
                <li>Never distort or change logo proportions</li>
                <li>Don't place logo on busy backgrounds</li>
                <li>Use approved color variations only</li>
                <li>Minimum size: 30px height for digital</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StyleGuide;
