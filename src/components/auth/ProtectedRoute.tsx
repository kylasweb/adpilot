import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { User } from '@/types/auth.types';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user } = await getAuthenticatedUser();
        
        if (!user) {
          router.push('/auth/login');
          return;
        }

        // Check role-based access if roles are specified
        if (allowedRoles && !allowedRoles.includes(user.role)) {
          router.push('/unauthorized');
          return;
        }

      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router, allowedRoles]);

  return <>{children}</>;
};
