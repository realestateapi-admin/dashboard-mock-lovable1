
import React, { useState } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { CURRENT_ACCOUNT } from './types/userRoles';
import { useUserManagement } from './hooks/useUserManagement';
import { useFormValidation } from './hooks/useFormValidation';
import { AddUserDialog } from './dialogs/AddUserDialog';
import { UserTable } from './components/UserTable';
import { RemoveUserDialog } from './dialogs/RemoveUserDialog';
import { ResendInvitationDialog } from './dialogs/ResendInvitationDialog';

export const UserRolesManagement = () => {
  const {
    users,
    handleRoleChange,
    handleRemoveUser,
    handleResendInvitation,
    handleAddUser
  } = useUserManagement();

  const {
    newUser,
    setNewUser,
    firstNameError,
    lastNameError,
    emailError,
    isFirstNameValid,
    isLastNameValid,
    isEmailValid,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    resetForm,
    validateAllFields
  } = useFormValidation();

  // Combine current account with other users for display
  const allUsers = [CURRENT_ACCOUNT, ...users];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [userToResendInvitation, setUserToResendInvitation] = useState<{ id: number; email: string } | null>(null);

  const onAddUser = () => {
    if (!validateAllFields()) {
      return;
    }

    handleAddUser(newUser);
    resetForm();
    setIsDialogOpen(false);
  };

  const onRemoveUser = (userId: number) => {
    setUserToDelete(userId);
  };

  const confirmRemoveUser = () => {
    if (userToDelete !== null) {
      handleRemoveUser(userToDelete);
      setUserToDelete(null);
    }
  };

  const onResendInvitation = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserToResendInvitation({ id: userId, email: user.email });
    }
  };

  const confirmResendInvitation = () => {
    if (userToResendInvitation) {
      handleResendInvitation(userToResendInvitation.id);
      setUserToResendInvitation(null);
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
            <p className="text-muted-foreground">
              Manage user roles and permissions for your team.
            </p>
          </div>
          <AddUserDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            newUser={newUser}
            onUserChange={setNewUser}
            onAddUser={onAddUser}
            firstNameError={firstNameError}
            lastNameError={lastNameError}
            emailError={emailError}
            isFirstNameValid={isFirstNameValid}
            isLastNameValid={isLastNameValid}
            isEmailValid={isEmailValid}
            onFirstNameChange={handleFirstNameChange}
            onLastNameChange={handleLastNameChange}
            onEmailChange={handleEmailChange}
          />
        </div>
        
        <UserTable
          users={allUsers}
          onRoleChange={handleRoleChange}
          onRemoveUser={onRemoveUser}
          onResendInvitation={onResendInvitation}
        />

        <RemoveUserDialog
          isOpen={userToDelete !== null}
          onOpenChange={() => setUserToDelete(null)}
          onConfirm={confirmRemoveUser}
        />

        <ResendInvitationDialog
          isOpen={userToResendInvitation !== null}
          onOpenChange={() => setUserToResendInvitation(null)}
          onConfirm={confirmResendInvitation}
          userEmail={userToResendInvitation?.email}
        />
      </div>
    </TooltipProvider>
  );
};

export default UserRolesManagement;
