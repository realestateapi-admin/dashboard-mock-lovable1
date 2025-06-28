
import React from 'react';
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { ROLES, USER_STATUS, User } from '../types/userRoles';

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: number, newRole: string) => void;
  onRemoveUser: (userId: number) => void;
  onResendInvitation: (userId: number) => void;
}

export const UserTable = ({ users, onRoleChange, onRemoveUser, onResendInvitation }: UserTableProps) => {
  const renderStatusCell = (user: User) => {
    const status = Object.values(USER_STATUS).find(s => s.value === user.status);
    if (!status) return null;

    const isClickable = user.status === USER_STATUS.INVITED.value || user.status === USER_STATUS.INVITATION_EXPIRED.value;

    if (isClickable && !user.isCurrentAccount) {
      return (
        <button
          onClick={() => onResendInvitation(user.id)}
          className={`${status.color} underline cursor-pointer transition-colors`}
        >
          {status.label}
        </button>
      );
    }

    return (
      <span className={status.color}>
        {status.label}
      </span>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Status</TableHead>
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
                  onValueChange={(value) => {
                    if (value === ROLES.ADMIN.value && user.id !== 0) {
                      onRoleChange(user.id, value);
                    }
                  }}
                  disabled={user.isCurrentAccount}
                >
                  <SelectTrigger className="w-32 mx-auto">
                    <SelectValue />
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
              </TableCell>
              <TableCell className="text-center">
                {renderStatusCell(user)}
              </TableCell>
              <TableCell className="text-center">
                {user.isCurrentAccount ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled
                        className="text-gray-400 cursor-not-allowed opacity-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cannot remove current account</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onRemoveUser(user.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
