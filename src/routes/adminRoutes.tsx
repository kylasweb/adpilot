import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Lazy load all admin pages
const SecurityRoutes = {
  AuditLogsPage: lazy(() => import('@/pages/admin/security/AuditLogsPage')),
  RoleManagementPage: lazy(() => import('@/pages/admin/security/RoleManagementPage')),
  SecuritySettingsPage: lazy(() => import('@/pages/admin/security/SecuritySettingsPage')),
};

const BillingRoutes = {
  BillingHistoryPage: lazy(() => import('@/pages/admin/billing/BillingHistoryPage')),
  PaymentSettingsPage: lazy(() => import('@/pages/admin/billing/PaymentSettingsPage')),
  SubscriptionManagementPage: lazy(() => import('@/pages/admin/billing/SubscriptionManagementPage')),
};

const SystemRoutes = {
  BackupRestorePage: lazy(() => import('@/pages/admin/system/BackupRestorePage')),
  MaintenancePage: lazy(() => import('@/pages/admin/system/MaintenancePage')),
  SystemConfigurationPage: lazy(() => import('@/pages/admin/system/SystemConfigurationPage')),
};

const OrganizationRoutes = {
  BulkOperationsPage: lazy(() => import('@/pages/admin/organization/BulkOperationsPage')),
  CustomFieldsPage: lazy(() => import('@/pages/admin/organization/CustomFieldsPage')),
  OrgTemplatesPage: lazy(() => import('@/pages/admin/organization/OrgTemplatesPage')),
};

const UserRoutes = {
  SessionManagementPage: lazy(() => import('@/pages/admin/users/SessionManagementPage')),
  UserBulkOperationsPage: lazy(() => import('@/pages/admin/users/UserBulkOperationsPage')),
  UserMonitoringPage: lazy(() => import('@/pages/admin/users/UserMonitoringPage')),
};

const IntegrationRoutes = {
  IntegrationLogsPage: lazy(() => import('@/pages/admin/integrations/IntegrationLogsPage')),
  OAuthManagementPage: lazy(() => import('@/pages/admin/integrations/OAuthManagementPage')),
  WebhookConfigPage: lazy(() => import('@/pages/admin/integrations/WebhookConfigPage')),
};

const ComplianceRoutes = {
  AuditReportPage: lazy(() => import('@/pages/admin/compliance/AuditReportPage')),
  ComplianceToolsPage: lazy(() => import('@/pages/admin/compliance/ComplianceToolsPage')),
  DataRetentionPage: lazy(() => import('@/pages/admin/compliance/DataRetentionPage')),
};

const ContentRoutes = {
  ContentSettingsPage: lazy(() => import('@/pages/admin/content/ContentSettingsPage')),
  ContentWorkflowPage: lazy(() => import('@/pages/admin/content/ContentWorkflowPage')),
  MediaLibraryPage: lazy(() => import('@/pages/admin/content/MediaLibraryPage')),
};

const HealthRoutes = {
  PerformanceMonitoringPage: lazy(() => import('@/pages/admin/health/PerformanceMonitoringPage')),
};

// Loading component for suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

// Admin route protection component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Define a type that extends RouteObject with our custom properties
type AdminRouteConfig = RouteObject & {
  requiresAdmin?: boolean;
  children?: AdminRouteConfig[];
};

// Admin routes configuration
import AdminLayout from '@/components/layouts/AdminLayout';

export const adminRoutes: AdminRouteConfig[] = [
  {
    path: '/admin',
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    children: [
      {
        path: 'security/*',
        children: [
          { path: 'audit', element: <Suspense fallback={<LoadingSpinner />}><SecurityRoutes.AuditLogsPage /></Suspense> },
          { path: 'roles', element: <Suspense fallback={<LoadingSpinner />}><SecurityRoutes.RoleManagementPage /></Suspense> },
          { path: 'settings', element: <Suspense fallback={<LoadingSpinner />}><SecurityRoutes.SecuritySettingsPage /></Suspense> },
        ],
      },
      {
        path: 'billing/*',
        children: [
          { path: 'history', element: <Suspense fallback={<LoadingSpinner />}><BillingRoutes.BillingHistoryPage /></Suspense> },
          { path: 'payment', element: <Suspense fallback={<LoadingSpinner />}><BillingRoutes.PaymentSettingsPage /></Suspense> },
          { path: 'subscription', element: <Suspense fallback={<LoadingSpinner />}><BillingRoutes.SubscriptionManagementPage /></Suspense> },
        ],
      },
      {
        path: 'system/*',
        children: [
          { path: 'backup', element: <Suspense fallback={<LoadingSpinner />}><SystemRoutes.BackupRestorePage /></Suspense> },
          { path: 'maintenance', element: <Suspense fallback={<LoadingSpinner />}><SystemRoutes.MaintenancePage /></Suspense> },
          { path: 'configuration', element: <Suspense fallback={<LoadingSpinner />}><SystemRoutes.SystemConfigurationPage /></Suspense> },
        ],
      },
      {
        path: 'organization/*',
        children: [
          { path: 'bulk', element: <Suspense fallback={<LoadingSpinner />}><OrganizationRoutes.BulkOperationsPage /></Suspense> },
          { path: 'fields', element: <Suspense fallback={<LoadingSpinner />}><OrganizationRoutes.CustomFieldsPage /></Suspense> },
          { path: 'templates', element: <Suspense fallback={<LoadingSpinner />}><OrganizationRoutes.OrgTemplatesPage /></Suspense> },
        ],
      },
      {
        path: 'users/*',
        children: [
          { path: 'sessions', element: <Suspense fallback={<LoadingSpinner />}><UserRoutes.SessionManagementPage /></Suspense> },
          { path: 'bulk', element: <Suspense fallback={<LoadingSpinner />}><UserRoutes.UserBulkOperationsPage /></Suspense> },
          { path: 'monitoring', element: <Suspense fallback={<LoadingSpinner />}><UserRoutes.UserMonitoringPage /></Suspense> },
        ],
      },
      {
        path: 'integrations/*',
        children: [
          { path: 'logs', element: <Suspense fallback={<LoadingSpinner />}><IntegrationRoutes.IntegrationLogsPage /></Suspense> },
          { path: 'oauth', element: <Suspense fallback={<LoadingSpinner />}><IntegrationRoutes.OAuthManagementPage /></Suspense> },
          { path: 'webhooks', element: <Suspense fallback={<LoadingSpinner />}><IntegrationRoutes.WebhookConfigPage /></Suspense> },
        ],
      },
      {
        path: 'compliance/*',
        children: [
          { path: 'audit', element: <Suspense fallback={<LoadingSpinner />}><ComplianceRoutes.AuditReportPage /></Suspense> },
          { path: 'tools', element: <Suspense fallback={<LoadingSpinner />}><ComplianceRoutes.ComplianceToolsPage /></Suspense> },
          { path: 'retention', element: <Suspense fallback={<LoadingSpinner />}><ComplianceRoutes.DataRetentionPage /></Suspense> },
        ],
      },
      {
        path: 'content/*',
        children: [
          { path: 'settings', element: <Suspense fallback={<LoadingSpinner />}><ContentRoutes.ContentSettingsPage /></Suspense> },
          { path: 'workflow', element: <Suspense fallback={<LoadingSpinner />}><ContentRoutes.ContentWorkflowPage /></Suspense> },
          { path: 'media', element: <Suspense fallback={<LoadingSpinner />}><ContentRoutes.MediaLibraryPage /></Suspense> },
        ],
      },
      {
        path: 'health',
        element: <Suspense fallback={<LoadingSpinner />}><HealthRoutes.PerformanceMonitoringPage /></Suspense>,
      }
    ],
  },
];

export default adminRoutes;