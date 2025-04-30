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
import ContentCreatorPage from "./pages/tools/ContentCreatorPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import UserSettingsPage from "./pages/UserSettingsPage";

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
                
                {/* Tool Routes */}
                <Route 
                  path="/tools/content-creator" 
                  element={
                    <ProtectedRoute>
                      <ContentCreatorPage />
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
