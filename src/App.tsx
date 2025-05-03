
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

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

// Digital Marketing Pages
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

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminIntegrationsPage from "./pages/admin/AdminIntegrationsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminActivityPage from "./pages/admin/AdminActivityPage";
import StorytellingPage from "./pages/admin/storytelling/StorytellingPage";
import ApiManagementPage from "./pages/admin/ApiManagementPage";

// Freelancer Pages
import FreelancerPage from "./pages/FreelancerPage";
import ClientManagerPage from "./pages/freelancer/ClientManagerPage";
import ProjectManagementPage from "./pages/freelancer/ProjectManagementPage";
import ProposalGeneratorPage from "./pages/freelancer/ProposalGeneratorPage";
import InvoiceCreatorPage from "./pages/freelancer/InvoiceCreatorPage";
import TimeTrackingPage from "./pages/freelancer/TimeTrackingPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Main Dashboard */}
            <Route path="/" element={<Index />} />
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
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
