
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import { initializeDefaultProviders } from "./services/apiKeyManager";

// Landing Page
import LandingPage from "./pages/LandingPage";

// Authentication Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Main Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import UserSettingsPage from "./pages/UserSettingsPage";

// Core App Pages
import CohortPage from "./pages/CohortPage";
import CampaignPage from "./pages/CampaignPage";
import CreativePage from "./pages/CreativePage";
import AnalyticsPage from "./pages/AnalyticsPage";

// Tool Pages
import ContentCreatorPage from "./pages/tools/ContentCreatorPage";
import ImageEditorPage from "./pages/tools/ImageEditorPage";
import DocumentCreatorPage from "./pages/tools/DocumentCreatorPage";
import ChatbotBuilderPage from "./pages/tools/ChatbotBuilderPage";
// Tool Pages
import WhatsAppBulkSenderPage from "./pages/tools/WhatsAppBulkSenderPage";

// Digital Marketing Pages
import SocialMediaSchedulerPage from "./pages/tools/SocialMediaSchedulerPage";
import EmailMarketingAutomationPage from "./pages/tools/EmailMarketingAutomationPage";
import SeoKeywordResearchToolPage from "./pages/tools/SeoKeywordResearchToolPage";
import CompetitorAnalysisToolPage from "./pages/tools/CompetitorAnalysisToolPage";
import DigitalMarketingPage from "./pages/DigitalMarketingPage";
import DigitalMarketingDashboardPage from "./pages/digital-marketing/DigitalMarketingDashboardPage";
import AdManagerPage from "./pages/digital-marketing/AdManagerPage";
import MarketingAnalyticsPage from "./pages/digital-marketing/MarketingAnalyticsPage";
import MarketingAutomationPage from "./pages/digital-marketing/MarketingAutomationPage";
import SocialPlannerPage from "./pages/digital-marketing/SocialPlannerPage";

// Email Marketing Pages
import EmailMarketingPage from "./pages/EmailMarketingPage";
import EmailCampaignsPage from "./pages/email-marketing/EmailCampaignsPage";
import EmailTemplatesPage from "./pages/email-marketing/EmailTemplatesPage";
import EmailListsPage from "./pages/email-marketing/EmailListsPage";
import WebScrapingPage from "./pages/email-marketing/WebScrapingPage";
import EmailAnalyticsPage from "./pages/email-marketing/EmailAnalyticsPage";
import EmailSyncPage from "./pages/email-marketing/EmailSyncPage";

// SEO Pages
import SeoPage from "./pages/SeoPage";
import SeoAnalyzerPage from "./pages/seo/SeoAnalyzerPage";
import SeoAuditPage from "./pages/seo/SeoAuditPage";
import SeoBacklinksPage from "./pages/seo/SeoBacklinksPage";
import SeoKeywordsPage from "./pages/seo/SeoKeywordsPage";
import SeoChecklistPage from "./pages/seo/SeoChecklistPage";
import LocalSeoManagerPage from "./pages/seo/LocalSeoManagerPage";
import TechnicalSeoAnalyzerPage from "./pages/seo/TechnicalSeoAnalyzerPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/AdminUsersPage"; 
import AdminIntegrationsPage from "./pages/AdminIntegrationsPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminActivityPage from "./pages/AdminActivityPage";
import StorytellingPage from "./pages/admin/storytelling/StorytellingPage";
import ApiManagementPage from "./pages/admin/ApiManagementPage";

// Freelancer Pages
import FreelancerPage from "./pages/FreelancerPage";
import ClientManagerPage from "./pages/freelancer/ClientManagerPage";
import ProjectManagementPage from "./pages/freelancer/ProjectManagementPage";
import ProposalGeneratorPage from "./pages/freelancer/ProposalGeneratorPage";
import InvoiceCreatorPage from "./pages/freelancer/InvoiceCreatorPage";
import TimeTrackingPage from "./pages/freelancer/TimeTrackingPage";

// Advanced Project Management Pages
import AdvancedProjectPage from "./pages/project-management/AdvancedProjectPage";
import ProjectDevelopmentPage from "./pages/project-management/ProjectDevelopmentPage";
import ProjectMeetingsPage from "./pages/project-management/ProjectMeetingsPage";
import ProjectResourcesPage from "./pages/project-management/ProjectResourcesPage";
import ProjectTimelinesPage from "./pages/project-management/ProjectTimelinesPage";
import ProjectTeamPage from "./pages/project-management/ProjectTeamPage";
import ProjectSharingPage from "./pages/project-management/ProjectSharingPage";
import ProjectCollaborationPage from "./pages/project-management/ProjectCollaborationPage";
import ProjectAIAssistantPage from "./pages/project-management/ProjectAIAssistantPage";

// Marketplace Optimization Pages
import MarketplaceOptimizationPage from "./pages/marketplace/MarketplaceOptimizationPage";
import ChecklistPage from "./pages/marketplace/ChecklistPage";
import ConfiguratorsPage from "./pages/marketplace/ConfiguratorsPage";
import ProductSeoPage from "./pages/marketplace/ProductSeoPage";

// CRM Pages
import AdvancedCrmPage from "./pages/crm/AdvancedCrmPage";
import CrmDashboardPage from "./pages/crm/CrmDashboardPage";
import AccountingPage from "./pages/crm/AccountingPage";
import HrmPage from "./pages/crm/HrmPage";

const App = () => {
  useEffect(() => {
    // Initialize API providers when app starts
    initializeDefaultProviders();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Landing Page - now the default route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          
          {/* Authentication Routes - fixed login path */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Main Dashboard - now at /dashboard */}
            <Route path="/dashboard" element={<Index />} />
            <Route path="/settings" element={<UserSettingsPage />} />
            
            {/* Core App Routes */}
            <Route path="/cohorts" element={<CohortPage />} />
            <Route path="/campaigns" element={<CampaignPage />} />
            <Route path="/creative" element={<CreativePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            
            {/* Tools Routes */}
            <Route path="/tools/content-creator" element={<ContentCreatorPage />} />
            <Route path="/tools/image-editor" element={<ImageEditorPage />} />
            <Route path="/tools/document-creator" element={<DocumentCreatorPage />} />
            <Route path="/tools/chatbot-builder" element={<ChatbotBuilderPage />} />
            <Route path="/tools/whatsapp-sender" element={<WhatsAppBulkSenderPage />} />
            <Route path="/tools/social-media-scheduler" element={<SocialMediaSchedulerPage />} />
            <Route path="/tools/email-marketing-automation" element={<EmailMarketingAutomationPage />} />
            <Route path="/tools/seo-keyword-research" element={<SeoKeywordResearchToolPage />} />
            <Route path="/tools/competitor-analysis" element={<CompetitorAnalysisToolPage />} />
            
            {/* Digital Marketing Routes */}
            <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
            <Route path="/digital-marketing/dashboard" element={<DigitalMarketingDashboardPage />} />
            <Route path="/digital-marketing/ad-manager" element={<AdManagerPage />} />
            <Route path="/digital-marketing/analytics" element={<MarketingAnalyticsPage />} />
            <Route path="/digital-marketing/automation" element={<MarketingAutomationPage />} />
            <Route path="/digital-marketing/social-planner" element={<SocialPlannerPage />} />
            
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
            <Route path="/seo/analyzer" element={<SeoAnalyzerPage />} />
            <Route path="/seo/audit" element={<SeoAuditPage />} />
            <Route path="/seo/backlinks" element={<SeoBacklinksPage />} />
            <Route path="/seo/keywords" element={<SeoKeywordsPage />} />
            <Route path="/seo/checklist" element={<SeoChecklistPage />} />
            <Route path="/seo/local-manager" element={<LocalSeoManagerPage />} />
            <Route path="/seo/technical-analyzer" element={<TechnicalSeoAnalyzerPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/integrations" element={<AdminIntegrationsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/activity" element={<AdminActivityPage />} />
            <Route path="/admin/storytelling" element={<StorytellingPage />} />
            <Route path="/admin/api-management" element={<ApiManagementPage />} />
            
            {/* Freelancer Routes */}
            <Route path="/freelancer" element={<FreelancerPage />} />
            <Route path="/freelancer/client-manager" element={<ClientManagerPage />} />
            <Route path="/freelancer/project-management" element={<ProjectManagementPage />} />
            <Route path="/freelancer/proposal-generator" element={<ProposalGeneratorPage />} />
            <Route path="/freelancer/invoice-creator" element={<InvoiceCreatorPage />} />
            <Route path="/freelancer/time-tracking" element={<TimeTrackingPage />} />
            
            {/* Advanced Project Management Routes */}
            <Route path="/project-management" element={<AdvancedProjectPage />} />
            <Route path="/project-management/development" element={<ProjectDevelopmentPage />} />
            <Route path="/project-management/meetings" element={<ProjectMeetingsPage />} />
            <Route path="/project-management/resources" element={<ProjectResourcesPage />} />
            <Route path="/project-management/timelines" element={<ProjectTimelinesPage />} />
            <Route path="/project-management/team" element={<ProjectTeamPage />} />
            <Route path="/project-management/sharing" element={<ProjectSharingPage />} />
            <Route path="/project-management/collaboration" element={<ProjectCollaborationPage />} />
            <Route path="/project-management/ai-assistant" element={<ProjectAIAssistantPage />} />
            
            {/* Marketplace Optimization Routes */}
            <Route path="/marketplace" element={<MarketplaceOptimizationPage />} />
            <Route path="/marketplace/checklist" element={<ChecklistPage />} />
            <Route path="/marketplace/configurators" element={<ConfiguratorsPage />} />
            <Route path="/marketplace/product-seo" element={<ProductSeoPage />} />
            
            {/* CRM Routes */}
            <Route path="/crm" element={<AdvancedCrmPage />} />
            <Route path="/crm/dashboard" element={<CrmDashboardPage />} />
            <Route path="/crm/accounting" element={<AccountingPage />} />
            <Route path="/crm/hrm" element={<HrmPage />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
