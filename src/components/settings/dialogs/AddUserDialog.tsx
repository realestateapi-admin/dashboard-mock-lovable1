
import React from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, AlertCircle, CheckCircle } from "lucide-react";
import { ROLES, NewUser } from '../types/userRoles';

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newUser: NewUser;
  onUserChange: (user: NewUser) => void;
  onAddUser: () => void;
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  isFirstNameValid: boolean;
  isLastNameValid: boolean;
  isEmailValid: boolean;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddUserDialog = ({
  isOpen,
  onOpenChange,
  newUser,
  onUserChange,
  onAddUser,
  firstNameError,
  lastNameError,
  emailError,
  isFirstNameValid,
  isLastNameValid,
  isEmailValid,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange
}: AddUserDialogProps) => {
  const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                  onChange={onFirstNameChange}
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
                  onChange={onLastNameChange}
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
                  onChange={onEmailChange}
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
                if (value === ROLES.ADMIN.value) {
                  onUserChange({ ...newUser, role: value });
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onAddUser} disabled={!isFormValid}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
