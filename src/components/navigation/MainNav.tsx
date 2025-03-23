
import * as React from "react";
import { NavLink } from "react-router-dom";

export function MainNav() {
  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `transition-colors hover:text-[#04c8c8] ${
            isActive ? "text-[#04c8c8]" : "text-muted-foreground"
          }`
        }
      >
        Overview
      </NavLink>
      <NavLink
        to="/dashboard/usage"
        className={({ isActive }) =>
          `transition-colors hover:text-[#04c8c8] ${
            isActive ? "text-[#04c8c8]" : "text-muted-foreground"
          }`
        }
      >
        API Usage
      </NavLink>
      <NavLink
        to="/dashboard/api-keys"
        className={({ isActive }) =>
          `transition-colors hover:text-[#04c8c8] ${
            isActive ? "text-[#04c8c8]" : "text-muted-foreground"
          }`
        }
      >
        API Keys
      </NavLink>
      <NavLink
        to="/dashboard/billing"
        className={({ isActive }) =>
          `transition-colors hover:text-[#04c8c8] ${
            isActive ? "text-[#04c8c8]" : "text-muted-foreground"
          }`
        }
      >
        Billing
      </NavLink>
      <NavLink
        to="/dashboard/support"
        className={({ isActive }) =>
          `transition-colors hover:text-[#04c8c8] ${
            isActive ? "text-[#04c8c8]" : "text-muted-foreground"
          }`
        }
      >
        Support
      </NavLink>
    </nav>
  );
}
