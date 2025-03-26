
import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AccessDenied = () => {
  const navigate = useNavigate();
  const { currentRole } = useAuth();

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] space-y-6 text-center px-4">
      <div className="bg-red-100 p-4 rounded-full">
        <Shield className="w-12 h-12 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
      <p className="text-muted-foreground max-w-md">
        Your current role ({currentRole}) does not have permission to access this page.
        Please contact an administrator if you believe this is an error.
      </p>
      <Button onClick={handleGoBack} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
    </div>
  );
};

export default AccessDenied;
