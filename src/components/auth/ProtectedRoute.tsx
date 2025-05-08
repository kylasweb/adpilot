import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getAuthenticatedUser } from '@/lib/auth';
import { User } from '@/types/auth.types';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user } = await getAuthenticatedUser();
        
        if (!user) {
          navigate('/login', { 
            replace: true,
            state: { from: window.location.pathname }
          });
          return;
        }

        // Check role-based access if roles are specified
        if (allowedRoles && !allowedRoles.includes(user.role)) {
          navigate('/unauthorized', { replace: true });
          return;
        }

      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/login', { 
          replace: true,
          state: { from: window.location.pathname }
        });
      }
    };

    checkAuth();
  }, [navigate, allowedRoles]);

  return <Outlet />;
};
