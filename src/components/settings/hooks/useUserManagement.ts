import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ROLES, USER_STATUS, User, NewUser } from '../types/userRoles';

export const useUserManagement = () => {
  const { toast } = useToast();
  
  // Initialize users from localStorage or start with test data
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const savedUsers = localStorage.getItem('userRolesManagement_users');
      if (savedUsers) {
        return JSON.parse(savedUsers);
      } else {
        // Create a test user with expired invitation (invited 3 days ago)
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        
        return [{
          id: 1,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: ROLES.ADMIN.value,
          status: USER_STATUS.INVITATION_EXPIRED.value,
          invitedAt: threeDaysAgo.toISOString()
        }];
      }
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

  // Check for expired invitations on component mount and every minute
  useEffect(() => {
    const checkExpiredInvitations = () => {
      const now = new Date();
      const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
      
      setUsers(prevUsers => 
        prevUsers.map(user => {
          if (user.status === USER_STATUS.INVITED.value && user.invitedAt) {
            const invitedDate = new Date(user.invitedAt);
            const timeDiff = now.getTime() - invitedDate.getTime();
            
            if (timeDiff > twoDaysInMs) {
              return { ...user, status: USER_STATUS.INVITATION_EXPIRED.value };
            }
          }
          return user;
        })
      );
    };

    // Check immediately on mount
    checkExpiredInvitations();

    // Check every minute for expired invitations
    const interval = setInterval(checkExpiredInvitations, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRoleChange = (userId: number, newRole: string) => {
    // Don't allow role changes for current account
    if (userId === 0) return;
    
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleRemoveUser = (userId: number) => {
    // Don't allow removal of current account
    if (userId === 0) return;
    
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleResendInvitation = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    // Simulate sending invitation and show success message
    toast({
      title: "Invitation sent",
      description: `Invitation has been resent to ${user.email}`,
    });

    // Update user status to invited with new timestamp
    setUsers(users.map(u => 
      u.id === userId ? { 
        ...u, 
        status: USER_STATUS.INVITED.value,
        invitedAt: new Date().toISOString()
      } : u
    ));
  };

  const handleAddUser = (newUser: NewUser) => {
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const fullName = `${newUser.firstName} ${newUser.lastName}`;
    setUsers([...users, { 
      id, 
      name: fullName, 
      email: newUser.email, 
      role: newUser.role,
      status: USER_STATUS.INVITED.value,
      invitedAt: new Date().toISOString()
    }]);
  };

  return {
    users,
    handleRoleChange,
    handleRemoveUser,
    handleResendInvitation,
    handleAddUser
  };
};
