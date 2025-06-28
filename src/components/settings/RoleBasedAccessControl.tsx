
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, User, CreditCard, Code } from "lucide-react";
import { useAuth, UserRole } from '@/contexts/AuthContext';

type RoleAccessConfig = {
  [key in UserRole]: {
    icon: React.ElementType;
    color: string;
    description: string;
    permissions: string[];
  };
};

export const RoleBasedAccessControl = () => {
  const { currentRole } = useAuth();
  
  const roleAccessConfig: RoleAccessConfig = {
    admin: {
      icon: Shield,
      color: "text-red-500",
      description: "Full access to all features and settings",
      permissions: [
        "Access all dashboard pages",
        "Manage user roles and permissions",
        "View and modify billing information",
        "Create and manage API keys",
        "Access all API endpoints",
        "Invite new team members"
      ]
    },
    billing: {
      icon: CreditCard,
      color: "text-purple-500",
      description: "Access to billing and usage information",
      permissions: [
        "View dashboard overview",
        "View API usage data",
        "View and download invoices",
        "Update payment methods",
        "View subscription details",
        "Access support"
      ]
    },
    developer: {
      icon: Code,
      color: "text-blue-500",
      description: "Access to technical features and API management",
      permissions: [
        "View dashboard overview",
        "View API usage data",
        "Create and manage API keys",
        "Access all API endpoints",
        "Access API documentation",
        "Access support"
      ]
    },
    viewer: {
      icon: User,
      color: "text-gray-500",
      description: "Read-only access to basic information",
      permissions: [
        "View dashboard overview",
        "View limited API usage data",
        "Access support"
      ]
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Role-Based Access Control</h2>
        <p className="text-muted-foreground">
          This page explains the access levels and permissions for different user roles.
        </p>
      </div>
      
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Your current role: {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}</AlertTitle>
        <AlertDescription>
          You currently have {roleAccessConfig[currentRole as UserRole].description.toLowerCase()}.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(roleAccessConfig).map(([role, config]) => {
          const RoleIcon = config.icon;
          const isAdmin = role === 'admin';
          const isDisabled = !isAdmin;
          
          return (
            <div key={role} className="relative">
              <Card className={isDisabled ? 'opacity-50 cursor-not-allowed' : ''}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <RoleIcon className={`h-5 w-5 ${config.color}`} />
                  <div>
                    <CardTitle>{role.charAt(0).toUpperCase() + role.slice(1)}</CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {config.permissions.map((permission, index) => (
                      <li key={index} className="text-sm">
                        {permission}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              {isDisabled && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-600 border border-gray-300"
                >
                  Coming soon
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleBasedAccessControl;
