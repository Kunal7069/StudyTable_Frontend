import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthMiddlewareProps {
  children: ReactNode;
  requireAuth: boolean;
}

export const AuthMiddleware = ({ children, requireAuth }: AuthMiddlewareProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          throw new Error('No access token');
        }

        const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/student/verifyToken`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const verifyData = await verifyResponse.json();

        if (!verifyResponse.ok || !verifyData.valid) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token');
          }

          const refreshResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/refreshToken`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accessToken, refreshToken })
          });

          if (!refreshResponse.ok) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            throw new Error('Token refresh failed');
          }

          const { accessToken: newAccessToken } = await refreshResponse.json();
          localStorage.setItem('accessToken', newAccessToken);
        }

        if (requireAuth) {
          setIsVerifying(false);
        } else {
          const isAuthRoute = location.pathname === '/signin' || location.pathname === '/signup';
          const isPublicRoute = location.pathname === '/blog' || location.pathname === '/notice';
          const isRootRoute = location.pathname === '/';
          
          if ((isAuthRoute || isRootRoute) && !isPublicRoute) {
            navigate('/dashboard');
          } else {
            setIsVerifying(false);
          }
        }
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        if (requireAuth && location.pathname !== '/blog' && location.pathname !== '/notice') {
          navigate('/signin');
        } else {
          setIsVerifying(false);
        }
      }
    };

    verifyAuth();
  }, [navigate, requireAuth, location.pathname]);

  if (isVerifying) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};