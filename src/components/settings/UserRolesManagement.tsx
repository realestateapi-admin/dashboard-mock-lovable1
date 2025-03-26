
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Users } from "lucide-react";

// Define available user roles
const ROLES = {
  ADMIN: { label: "Admin", value: "admin", color: "bg-red-100 text-red-800" },
  BILLING: { label: "Billing", value: "billing", color: "bg-purple-100 text-purple-800" },
  DEVELOPER: { label: "Developer", value: "developer", color: "bg-blue-100 text-blue-800" },
  VIEWER: { label: "Viewer", value: "viewer", color: "bg-gray-100 text-gray-800" },
};

// Mock data for demonstration
const INITIAL_USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: ROLES.ADMIN.value },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: ROLES.BILLING.value },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: ROLES.DEVELOPER.value },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: ROLES.VIEWER.value },
];

export const UserRolesManagement = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: ROLES.VIEWER.value });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleAddUser = () => {
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ name: "", email: "", role: ROLES.VIEWER.value });
    setIsDialogOpen(false);
  };

  const getRoleBadge = (role: string) => {
    const roleObj = Object.values(ROLES).find(r => r.value === role);
    return roleObj ? roleObj.color : "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Roles</h2>
          <p className="text-muted-foreground">
            Manage user roles and permissions for your team.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Enter the details of the new user to add to your team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ROLES).map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleBadge(user.role)}>
                    {Object.values(ROLES).find(r => r.value === user.role)?.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Select 
                    value={user.role} 
                    onValueChange={(value) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ROLES).map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserRolesManagement;
