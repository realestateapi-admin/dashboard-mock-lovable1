
// Define available user roles
export const ROLES = {
  ADMIN: { label: "Admin", value: "admin", color: "bg-red-100 text-red-800" },
  BILLING: { label: "Billing", value: "billing", color: "bg-purple-100 text-purple-800" },
  DEVELOPER: { label: "Developer", value: "developer", color: "bg-blue-100 text-blue-800" },
  VIEWER: { label: "Viewer", value: "viewer", color: "bg-gray-100 text-gray-800" },
};

// Define user statuses
export const USER_STATUS = {
  INVITED: { label: "Invited", value: "invited", color: "text-blue-600 hover:text-blue-800" },
  INVITATION_EXPIRED: { label: "Invitation Expired", value: "invitation_expired", color: "text-red-600 hover:text-red-800" },
  ACTIVE: { label: "Active", value: "active", color: "text-green-600" },
};

// Current account (always first in the list)
export const CURRENT_ACCOUNT = {
  id: 0,
  name: "John Doe (You)",
  email: "john.doe@example.com",
  role: ROLES.ADMIN.value,
  status: USER_STATUS.ACTIVE.value,
  isCurrentAccount: true
};

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  isCurrentAccount?: boolean;
  invitedAt?: string;
}

export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
