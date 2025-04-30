
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

// Digital Marketing Pages
import DigitalMarketingPage from "./pages/DigitalMarketingPage";
import AdManagerPage from "./pages/digital-marketing/AdManagerPage";
import SocialPlannerPage from "./pages/digital-marketing/SocialPlannerPage";
import MarketingAnalyticsPage from "./pages/digital-marketing/MarketingAnalyticsPage";
import MarketingAutomationPage from "./pages/digital-marketing/MarketingAutomationPage";

// Freelancer Pages
import FreelancerPage from "./pages/FreelancerPage";
import ClientManagerPage from "./pages/freelancer/ClientManagerPage";
import TimeTrackingPage from "./pages/freelancer/TimeTrackingPage";
import ProjectManagementPage from "./pages/freelancer/ProjectManagementPage";
import ProposalGeneratorPage from "./pages/freelancer/ProposalGeneratorPage";
import InvoiceCreatorPage from "./pages/freelancer/InvoiceCreatorPage";

// Email Marketing Pages
import EmailMarketingPage from "./pages/EmailMarketingPage";
import EmailCampaignsPage from "./pages/email-marketing/EmailCampaignsPage";
import EmailTemplatesPage from "./pages/email-marketing/EmailTemplatesPage";
import EmailListsPage from "./pages/email-marketing/EmailListsPage";
import WebScrapingPage from "./pages/email-marketing/WebScrapingPage";
import EmailAnalyticsPage from "./pages/email-marketing/EmailAnalyticsPage";
import EmailSyncPage from "./pages/email-marketing/EmailSyncPage";

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
              
              {/* Digital Marketing Routes */}
              <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
              <Route path="/digital-marketing/ad-manager" element={<AdManagerPage />} />
              <Route path="/digital-marketing/social-planner" element={<SocialPlannerPage />} />
              <Route path="/digital-marketing/analytics" element={<MarketingAnalyticsPage />} />
              <Route path="/digital-marketing/automation" element={<MarketingAutomationPage />} />
              
              {/* Freelancer Routes */}
              <Route path="/freelancer" element={<FreelancerPage />} />
              <Route path="/freelancer/clients" element={<ClientManagerPage />} />
              <Route path="/freelancer/time-tracking" element={<TimeTrackingPage />} />
              <Route path="/freelancer/projects" element={<ProjectManagementPage />} />
              <Route path="/freelancer/proposals" element={<ProposalGeneratorPage />} />
              <Route path="/freelancer/invoices" element={<InvoiceCreatorPage />} />
              
              {/* Email Marketing Routes */}
              <Route path="/email-marketing" element={<EmailMarketingPage />} />
              <Route path="/email-marketing/campaigns" element={<EmailCampaignsPage />} />
              <Route path="/email-marketing/templates" element={<EmailTemplatesPage />} />
              <Route path="/email-marketing/lists" element={<EmailListsPage />} />
              <Route path="/email-marketing/scraping" element={<WebScrapingPage />} />
              <Route path="/email-marketing/analytics" element={<EmailAnalyticsPage />} />
              <Route path="/email-marketing/sync" element={<EmailSyncPage />} />
              
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
