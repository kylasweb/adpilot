'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Plus, Star } from "lucide-react";

const SEOLocalManagerPage = () => {
  const listings = [
    { platform: 'Google Business', status: 'Active', rating: 4.8, reviews: 124 },
    { platform: 'Bing Places', status: 'Active', rating: 4.6, reviews: 45 },
    { platform: 'Yelp', status: 'Needs Update', rating: 4.5, reviews: 89 },
  ];

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Local SEO Manager</h1>
            <p className="text-adsilo-text-secondary mt-1">Manage local business listings</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />Add Listing</Button>
        </div>
      </motion.div>
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Business Listings</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {listings.map((listing, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-adsilo-border rounded-lg">
                <div>
                  <div className="font-semibold">{listing.platform}</div>
                  <div className="text-sm text-adsilo-text-muted flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{listing.rating} ({listing.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-sm">{listing.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default SEOLocalManagerPage;