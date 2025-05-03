
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Provider
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Main Pages
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
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import StorytellingPage from "./pages/admin/storytelling/StorytellingPage";
import ContentCreatorPage from "./pages/tools/ContentCreatorPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import UserSettingsPage from "./pages/UserSettingsPage";

// Digital Marketing Pages
import DigitalMarketingDashboardPage from "./pages/digital-marketing/DigitalMarketingDashboardPage";
import AdManagerPage from "./pages/digital-marketing/AdManagerPage";
import MarketingAnalyticsPage from "./pages/digital-marketing/MarketingAnalyticsPage";
import SocialPlannerPage from "./pages/digital-marketing/SocialPlannerPage";
import MarketingAutomationPage from "./pages/digital-marketing/MarketingAutomationPage";

// Email Marketing Pages
import EmailCampaignsPage from "./pages/email-marketing/EmailCampaignsPage";
import EmailListsPage from "./pages/email-marketing/EmailListsPage";
import EmailTemplatesPage from "./pages/email-marketing/EmailTemplatesPage";
import EmailAnalyticsPage from "./pages/email-marketing/EmailAnalyticsPage";
import EmailSyncPage from "./pages/email-marketing/EmailSyncPage";

// SEO Pages
import SeoPage from "./pages/SeoPage";
import SeoAnalyzerPage from "./pages/seo/SeoAnalyzerPage";
import SeoAuditPage from "./pages/seo/SeoAuditPage";
import SeoKeywordsPage from "./pages/seo/SeoKeywordsPage";
import SeoBacklinksPage from "./pages/seo/SeoBacklinksPage";

// Freelancer Pages
import FreelancerPage from "./pages/FreelancerPage";
import ClientManagerPage from "./pages/freelancer/ClientManagerPage";
import ProjectManagementPage from "./pages/freelancer/ProjectManagementPage";
import InvoiceCreatorPage from "./pages/freelancer/InvoiceCreatorPage";
import ProposalGeneratorPage from "./pages/freelancer/ProposalGeneratorPage";
import TimeTrackingPage from "./pages/freelancer/TimeTrackingPage";

// Tool Pages
import ImageEditorPage from "./pages/tools/ImageEditorPage";
import DocumentCreatorPage from "./pages/tools/DocumentCreatorPage";

// Create a QueryClient instance inside the component
const App = () => {
  // Create a client instance inside the component
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Auth Routes */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/cohorts" 
                  element={
                    <ProtectedRoute>
                      <CohortPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/campaigns" 
                  element={
                    <ProtectedRoute>
                      <CampaignPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/creative" 
                  element={
                    <ProtectedRoute>
                      <CreativePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <ProtectedRoute>
                      <AnalyticsPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Digital Marketing Routes */}
                <Route 
                  path="/digital-marketing" 
                  element={
                    <ProtectedRoute>
                      <DigitalMarketingDashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/digital-marketing/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DigitalMarketingDashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/digital-marketing/ad-manager" 
                  element={
                    <ProtectedRoute>
                      <AdManagerPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/digital-marketing/analytics" 
                  element={
                    <ProtectedRoute>
                      <MarketingAnalyticsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/digital-marketing/social-planner" 
                  element={
                    <ProtectedRoute>
                      <SocialPlannerPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/digital-marketing/automation" 
                  element={
                    <ProtectedRoute>
                      <MarketingAutomationPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Email Marketing Routes */}
                <Route 
                  path="/email-marketing" 
                  element={
                    <ProtectedRoute>
                      <EmailCampaignsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/email-marketing/campaigns" 
                  element={
                    <ProtectedRoute>
                      <EmailCampaignsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/email-marketing/lists" 
                  element={
                    <ProtectedRoute>
                      <EmailListsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/email-marketing/templates" 
                  element={
                    <ProtectedRoute>
                      <EmailTemplatesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/email-marketing/analytics" 
                  element={
                    <ProtectedRoute>
                      <EmailAnalyticsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/email-marketing/sync" 
                  element={
                    <ProtectedRoute>
                      <EmailSyncPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* SEO Routes */}
                <Route 
                  path="/seo" 
                  element={
                    <ProtectedRoute>
                      <SeoPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/seo/analyzer" 
                  element={
                    <ProtectedRoute>
                      <SeoAnalyzerPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/seo/audit" 
                  element={
                    <ProtectedRoute>
                      <SeoAuditPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/seo/keywords" 
                  element={
                    <ProtectedRoute>
                      <SeoKeywordsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/seo/backlinks" 
                  element={
                    <ProtectedRoute>
                      <SeoBacklinksPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Freelancer Routes */}
                <Route 
                  path="/freelancer" 
                  element={
                    <ProtectedRoute>
                      <FreelancerPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/freelancer/client-manager" 
                  element={
                    <ProtectedRoute>
                      <ClientManagerPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/freelancer/project-management" 
                  element={
                    <ProtectedRoute>
                      <ProjectManagementPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/freelancer/invoice-creator" 
                  element={
                    <ProtectedRoute>
                      <InvoiceCreatorPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/freelancer/proposal-generator" 
                  element={
                    <ProtectedRoute>
                      <ProposalGeneratorPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/freelancer/time-tracking" 
                  element={
                    <ProtectedRoute>
                      <TimeTrackingPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Tool Routes */}
                <Route 
                  path="/tools/content-creator" 
                  element={
                    <ProtectedRoute>
                      <ContentCreatorPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/tools/image-editor" 
                  element={
                    <ProtectedRoute>
                      <ImageEditorPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/tools/document-creator" 
                  element={
                    <ProtectedRoute>
                      <DocumentCreatorPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* User Settings */}
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <UserSettingsPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin Routes - Require admin role */}
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminUsersPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/integrations" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminIntegrationsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/settings" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminSettingsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/activity" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminActivityPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/storytelling" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <StorytellingPage />
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
