import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import UserRolesManagement from './UserRolesManagement';
import RoleBasedAccessControl from './RoleBasedAccessControl';

const SettingsPage = () => {
  return (
    <Tabs defaultValue="user-roles" className="w-full">
      <TabsList className="mb-6 grid grid-cols-4 max-w-3xl gap-1 h-auto p-1 bg-muted/50 border">
        <TabsTrigger value="user-roles" className="px-3 py-2 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Team Members
        </TabsTrigger>
        <TabsTrigger value="access-control" className="px-3 py-2 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Access Control
        </TabsTrigger>
        <TabsTrigger value="account" className="px-3 py-2 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Account
        </TabsTrigger>
        <TabsTrigger value="notifications" className="px-3 py-2 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="user-roles">
        <Card>
          <CardContent className="p-6">
            <UserRolesManagement />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="access-control">
        <Card>
          <CardContent className="p-6">
            <RoleBasedAccessControl />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="account">
        <Card>
          <CardContent className="p-6">
            <p className="text-lg font-medium">Account settings will be added here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardContent className="p-6">
            <p className="text-lg font-medium">Notification settings will be added here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsPage;
