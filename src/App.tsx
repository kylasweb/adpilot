
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CohortPage from "./pages/CohortPage";
import CampaignPage from "./pages/CampaignPage";
import CreativePage from "./pages/CreativePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminIntegrationsPage from "./pages/AdminIntegrationsPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminActivityPage from "./pages/AdminActivityPage";
import ContentCreatorPage from "./pages/tools/ContentCreatorPage";
import DocumentCreatorPage from "./pages/tools/DocumentCreatorPage";
import ImageEditorPage from "./pages/tools/ImageEditorPage";
import SeoPage from "./pages/SeoPage";
import SeoKeywordsPage from "./pages/seo/SeoKeywordsPage";
import SeoAnalyzerPage from "./pages/seo/SeoAnalyzerPage";
import SeoAuditPage from "./pages/seo/SeoAuditPage";
import SeoBacklinksPage from "./pages/seo/SeoBacklinksPage";

// Create a QueryClient instance inside the component
const App = () => {
  // Create a client instance inside the component
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cohorts" element={<CohortPage />} />
              <Route path="/campaigns" element={<CampaignPage />} />
              <Route path="/creative" element={<CreativePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              
              {/* Tool Routes */}
              <Route path="/tools/content-creator" element={<ContentCreatorPage />} />
              <Route path="/tools/document-creator" element={<DocumentCreatorPage />} />
              <Route path="/tools/image-editor" element={<ImageEditorPage />} />
              
              {/* SEO Routes */}
              <Route path="/seo" element={<SeoPage />} />
              <Route path="/seo/keywords" element={<SeoKeywordsPage />} />
              <Route path="/seo/analyzer" element={<SeoAnalyzerPage />} />
              <Route path="/seo/audit" element={<SeoAuditPage />} />
              <Route path="/seo/backlinks" element={<SeoBacklinksPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/integrations" element={<AdminIntegrationsPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="/admin/activity" element={<AdminActivityPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
