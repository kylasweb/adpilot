import { FC, useState } from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const CustomReportsPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Analytics', href: '/admin/analytics' },
    { label: 'Custom Reports', href: '/admin/analytics/custom-reports' }
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
      
      <h1 className="text-2xl font-bold mb-4">Custom Reports</h1>
      <p className="text-gray-600 mb-6">
        Create and manage custom analytics reports
      </p>

      <div className="grid gap-6">
        <div>{/* Report builder */}</div>
        <div>{/* Saved reports */}</div>
        <div>{/* Schedule reports */}</div>
        <div>{/* Export formats */}</div>
      </div>
    </div>
  );
};

export default CustomReportsPage;