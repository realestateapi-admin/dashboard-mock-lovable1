
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfo from '@/components/profile/ProfileInfo';
import PasswordChange from '@/components/profile/PasswordChange';
import { useSubscriptionData } from '@/hooks/useSubscriptionData';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { subscription, isLoading } = useSubscriptionData();
  
  // Format the subscription start date
  const memberSince = subscription?.contract_start_date 
    ? format(new Date(subscription.contract_start_date), 'MMMM d, yyyy')
    : 'Not available';
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile information and password
        </p>
      </div>
      
      <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Member since</h2>
          <p className="text-lg font-medium">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
            ) : (
              memberSince
            )}
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="mb-6 gap-1 h-auto p-1 bg-muted/50 border">
          <TabsTrigger value="info" className="px-3 py-2 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">Profile Information</TabsTrigger>
          <TabsTrigger value="password" className="px-3 py-2 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">Change Password</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile details and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileInfo />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to secure your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordChange />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
