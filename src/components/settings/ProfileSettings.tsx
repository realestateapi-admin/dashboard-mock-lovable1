
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileInfo from '@/components/profile/ProfileInfo';
import PasswordChange from '@/components/profile/PasswordChange';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileSettings = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your personal information and security settings
        </p>
      </div>
      
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="info">Profile Information</TabsTrigger>
          <TabsTrigger value="password">Security</TabsTrigger>
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

export default ProfileSettings;
