
import * as React from "react";
import { NavLink } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

export function MainNav() {
  const { currentRole } = useAuth();
  const { isOnPaidPlan, isFreeUser } = useTrialAlert();

  // Define navigation items with role-based access
  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      allowedRoles: ['admin', 'billing', 'developer', 'viewer'],
    },
    {
      title: "API Usage",
      href: "/dashboard/usage",
      allowedRoles: ['admin', 'billing', 'developer'],
    },
    {
      title: "API Keys",
      href: "/dashboard/api-keys",
      allowedRoles: ['admin', 'developer'],
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      allowedRoles: ['admin', 'billing'],
      // Only show billing for paid plan users or admin users
      hideCondition: (isFreeUser && !isOnPaidPlan) || (currentRole !== 'admin' && !isOnPaidPlan)
    },
    {
      title: "Support",
      href: "/dashboard/support",
      allowedRoles: ['admin', 'billing', 'developer', 'viewer'],
    },
  ];

  // Filter items based on the user's role and hide condition
  const filteredNavItems = navItems.filter(item => 
    item.allowedRoles.includes(currentRole as UserRole) && 
    !item.hideCondition
  );

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {filteredNavItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.href}
          end={item.href === "/dashboard"}
          className={({ isActive }) =>
            `transition-colors ${
              isActive 
                ? "text-[#5014d0] font-medium" 
                : "text-muted-foreground hover:text-[#5014d0]"
            }`
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}
