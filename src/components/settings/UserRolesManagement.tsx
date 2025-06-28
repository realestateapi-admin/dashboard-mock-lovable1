
import React, { useState, useEffect } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Users, AlertCircle, CheckCircle, Trash2 } from "lucide-react";

// Define available user roles
const ROLES = {
  ADMIN: { label: "Admin", value: "admin", color: "bg-red-100 text-red-800" },
  BILLING: { label: "Billing", value: "billing", color: "bg-purple-100 text-purple-800" },
  DEVELOPER: { label: "Developer", value: "developer", color: "bg-blue-100 text-blue-800" },
  VIEWER: { label: "Viewer", value: "viewer", color: "bg-gray-100 text-gray-800" },
};

export const UserRolesManagement = () => {
  // Initialize users from localStorage or start with empty array
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem('userRolesManagement_users');
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
      return [];
    }
  });

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    try {
      localStorage.setItem('userRolesManagement_users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }, [users]);

  const [newUser, setNewUser] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    role: ROLES.ADMIN.value 
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const validateName = (name: string) => {
    // Check minimum length
    if (name.length < 1) {
      return { isValid: false, error: "This field is required" };
    }
    
    // Check maximum length
    if (name.length > 50) {
      return { isValid: false, error: "Must be 50 characters or less" };
    }
    
    // Check for at least one alphanumeric character
    const hasAlphanumeric = /[a-zA-Z0-9]/.test(name);
    if (!hasAlphanumeric) {
      return { isValid: false, error: "Must contain at least one letter or number" };
    }
    
    return { isValid: true, error: "" };
  };

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailValue.trim()) {
      return { isValid: false, error: "" };
    }
    
    if (!emailRegex.test(emailValue)) {
      return { isValid: false, error: "Please enter a valid email address" };
    }
    
    return { isValid: true, error: "" };
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser({ ...newUser, firstName: value });
    
    const validation = validateName(value);
    setFirstNameError(validation.error);
    setIsFirstNameValid(validation.isValid);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser({ ...newUser, lastName: value });
    
    const validation = validateName(value);
    setLastNameError(validation.error);
    setIsLastNameValid(validation.isValid);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser({ ...newUser, email: value });
    
    const validation = validateEmail(value);
    setEmailError(validation.error);
    setIsEmailValid(validation.isValid);
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleRemoveUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    setUserToDelete(null);
  };

  const handleAddUser = () => {
    // Validate all fields before submitting
    const firstNameValidation = validateName(newUser.firstName);
    const lastNameValidation = validateName(newUser.lastName);
    const emailValidation = validateEmail(newUser.email);
    
    if (!firstNameValidation.isValid || !lastNameValidation.isValid || !emailValidation.isValid) {
      setFirstNameError(firstNameValidation.error);
      setLastNameError(lastNameValidation.error);
      setEmailError(emailValidation.error);
      setIsFirstNameValid(firstNameValidation.isValid);
      setIsLastNameValid(lastNameValidation.isValid);
      setIsEmailValid(emailValidation.isValid);
      return;
    }

    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const fullName = `${newUser.firstName} ${newUser.lastName}`;
    setUsers([...users, { id, name: fullName, email: newUser.email, role: newUser.role }]);
    setNewUser({ firstName: "", lastName: "", email: "", role: ROLES.ADMIN.value });
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setIsFirstNameValid(false);
    setIsLastNameValid(false);
    setIsEmailValid(false);
    setIsDialogOpen(false);
  };

  const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid;

  return (
    <TooltipProvider>
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
                  <Label htmlFor="firstName" className="text-right">
                    First Name
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <div className="relative">
                      <Input
                        id="firstName"
                        value={newUser.firstName}
                        onChange={handleFirstNameChange}
                        className={`pr-10 ${
                          firstNameError ? 'border-red-500 focus-visible:ring-red-500' : 
                          isFirstNameValid ? 'border-green-500 focus-visible:ring-green-500' : ''
                        }`}
                        maxLength={50}
                      />
                      {newUser.firstName && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          {isFirstNameValid ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : firstNameError ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : null}
                        </div>
                      )}
                    </div>
                    {firstNameError && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {firstNameError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <div className="relative">
                      <Input
                        id="lastName"
                        value={newUser.lastName}
                        onChange={handleLastNameChange}
                        className={`pr-10 ${
                          lastNameError ? 'border-red-500 focus-visible:ring-red-500' : 
                          isLastNameValid ? 'border-green-500 focus-visible:ring-green-500' : ''
                        }`}
                        maxLength={50}
                      />
                      {newUser.lastName && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          {isLastNameValid ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : lastNameError ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : null}
                        </div>
                      )}
                    </div>
                    {lastNameError && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {lastNameError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={handleEmailChange}
                        className={`pr-10 ${
                          emailError ? 'border-red-500 focus-visible:ring-red-500' : 
                          isEmailValid ? 'border-green-500 focus-visible:ring-green-500' : ''
                        }`}
                      />
                      {newUser.email && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          {isEmailValid ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : emailError ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : null}
                        </div>
                      )}
                    </div>
                    {emailError && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value) => {
                      // Only allow Admin role to be selected
                      if (value === ROLES.ADMIN.value) {
                        setNewUser({ ...newUser, role: value });
                      }
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ROLES.ADMIN.value}>
                        {ROLES.ADMIN.label}
                      </SelectItem>
                      {Object.values(ROLES).filter(role => role.value !== ROLES.ADMIN.value).map((role) => (
                        <Tooltip key={role.value}>
                          <TooltipTrigger asChild>
                            <div>
                              <SelectItem 
                                value={role.value} 
                                disabled
                                className="opacity-50 cursor-not-allowed"
                              >
                                {role.label}
                              </SelectItem>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Coming soon</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser} disabled={!isFormValid}>
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
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-center">{user.name}</TableCell>
                  <TableCell className="text-center">{user.email}</TableCell>
                  <TableCell className="text-center">
                    <Select 
                      value={user.role} 
                      onValueChange={(value) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-32 mx-auto">
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
                  <TableCell className="text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setUserToDelete(user.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={userToDelete !== null} onOpenChange={() => setUserToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Please confirm removal</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this user? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => userToDelete && handleRemoveUser(userToDelete)}
                className="bg-red-600 hover:bg-red-700"
              >
                Remove User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};

export default UserRolesManagement;
