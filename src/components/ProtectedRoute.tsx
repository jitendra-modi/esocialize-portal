"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import AccessDenied from './AccessDenied';
import PendingApproval from './PendingApproval';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'core_member' | 'team_member';
  pageKey?: string;
}

const ProtectedRoute = ({ children, requiredRole, pageKey }: ProtectedRouteProps) => {
  const { user, loading, error, clearError } = useAuth();
  const router = useRouter();
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    // If not logged in, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
    
    // Handle Firebase permission errors
    if (error && error.includes('Firebase permissions error')) {
      setPermissionError(error);
    }
  }, [user, loading, router, error]);

  // Handle "Continue Anyway" with demo data
  const handleContinueAnyway = () => {
    clearError();
    setPermissionError(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // If permission error, display a more helpful message
  if (permissionError) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Firebase Permission Error
            </h1>
            <p className="text-white/60 mb-6">
              There was a problem accessing the Firebase database. This is likely due to security rules. Please contact your administrator or continue in demo mode.
            </p>
            <div className="text-xs text-left bg-black/30 p-3 rounded-lg mb-4 overflow-auto max-h-36">
              <code className="text-red-300">{permissionError}</code>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push('/login')}
                className="bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all"
              >
                Return to Login
              </button>
              <button
                onClick={handleContinueAnyway}
                className="bg-indigo-600/70 text-white py-2 px-4 rounded-lg hover:bg-indigo-600/90 transition-all"
              >
                Continue in Demo Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, don't render children
  if (!user) {
    return null;
  }

  // If user is pending approval
  if (user.role === 'pending') {
    return <PendingApproval />;
  }

  // If admin role is required
  if (requiredRole === 'admin' && user.role !== 'admin') {
    return <AccessDenied />;
  }

  // For core members, grant access to everything
  if (user.role === 'core_member') {
    return <>{children}</>;
  }

  // For team members, check permissions if pageKey is provided
  if (pageKey && user.role === 'team_member') {
    // Handle potential null or undefined permissions
    const permissions = user.permissions || {};
    const hasAccess = permissions[pageKey];
    
    if (!hasAccess) {
      return <AccessDenied />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 