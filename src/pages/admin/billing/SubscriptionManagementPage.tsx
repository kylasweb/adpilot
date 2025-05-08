import { FC, useState } from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const SubscriptionManagementPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Billing', href: '/admin/billing' },
    { label: 'Subscription Management', href: '/admin/billing/subscriptions' }
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
      
      <h1 className="text-2xl font-bold mb-4">Subscription Management</h1>
      <p className="text-gray-600 mb-6">
        Manage subscription plans, pricing, and billing cycles
      </p>

      <div className="grid gap-6">
        {/* Subscription plans list */}
        {/* Plan editor */}
        {/* Active subscriptions */}
        {/* Usage metrics */}
      </div>
    </div>
  );
};

export default SubscriptionManagementPage;