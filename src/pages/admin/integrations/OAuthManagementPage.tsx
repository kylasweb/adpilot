import { FC, useState } from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const OAuthManagementPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Integrations', href: '/admin/integrations' },
    { label: 'OAuth Management', href: '/admin/integrations/oauth' }
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
      
      <h1 className="text-2xl font-bold mb-4">OAuth Management</h1>
      <p className="text-gray-600 mb-6">
        Manage OAuth applications, tokens, and permissions
      </p>

      <div className="grid gap-6">
        <div>{/* OAuth applications list */}</div>
        <div>{/* Token management */}</div>
        <div>{/* Permission scopes */}</div>
        <div>{/* Application secrets */}</div>
      </div>
    </div>
  );
};

export default OAuthManagementPage;