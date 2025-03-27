
import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Settings = () => {
  const location = useLocation();
  const isProfileSubpath = location.pathname.includes("/settings/profile");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isProfileSubpath ? (
              <div className="flex items-center">
                <Button variant="ghost" size="sm" asChild className="mr-2 -ml-2">
                  <Link to="/dashboard/settings">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Link>
                </Button>
                Profile Settings
              </div>
            ) : (
              "Settings"
            )}
          </h1>
          <p className="text-muted-foreground">
            {isProfileSubpath 
              ? "Manage your personal information and security settings"
              : "Manage your account settings and user roles."}
          </p>
        </div>
      </div>
      
      <Outlet />
    </div>
  );
};

export default Settings;
