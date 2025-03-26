
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import UserRolesManagement from './UserRolesManagement';
import { ApiConfiguration } from '@/components/api-keys/ApiConfiguration';
import RoleBasedAccessControl from './RoleBasedAccessControl';
import { Shield } from 'lucide-react';

const SettingsPage = () => {
  return (
    <Tabs defaultValue="user-roles" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="user-roles">User Roles</TabsTrigger>
        <TabsTrigger value="access-control">Access Control</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="api-settings">API Settings</TabsTrigger>
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
      <TabsContent value="api-settings">
        <Card>
          <CardContent className="p-6">
            <ApiConfiguration />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsPage;
