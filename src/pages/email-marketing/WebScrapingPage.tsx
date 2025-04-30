
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Search, Download } from "lucide-react";

const WebScrapingPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Web Scraping Tool</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Find and extract email addresses and contacts from websites
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <Globe className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Scrape Website for Contacts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Target URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 p-2 border rounded" 
                    placeholder="https://example.com" 
                  />
                  <Button>
                    <Search className="h-4 w-4 mr-2" /> Scan
                  </Button>
                </div>
                <p className="text-xs text-adpilot-text-muted mt-1">
                  Enter the website URL you want to scan for contact information
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Scan Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="scan-pages" className="mr-2" checked />
                    <label htmlFor="scan-pages">Scan linked pages</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="scan-depth" className="mr-2" checked />
                    <label htmlFor="scan-depth">Set scan depth</label>
                    <select className="ml-2 p-1 border rounded text-sm">
                      <option>1 level</option>
                      <option>2 levels</option>
                      <option>3 levels</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="extract-phones" className="mr-2" checked />
                    <label htmlFor="extract-phones">Extract phone numbers</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="extract-social" className="mr-2" checked />
                    <label htmlFor="extract-social">Extract social media profiles</label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <Search className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Scan Results</CardTitle>
              </div>
              <Button variant="outline" disabled>
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-adpilot-text-muted">
                No scan results yet. Use the scraper above to scan a website for contact information.
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500 text-white">
                <Globe className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Recent Scans</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-adpilot-text-muted">
                No recent scans. Your scan history will appear here.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default WebScrapingPage;
