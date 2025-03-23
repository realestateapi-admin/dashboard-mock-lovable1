
import * as React from "react";
import { NavLink } from "react-router-dom";

export function MainNav() {
  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `transition-colors hover:text-foreground ${
            isActive ? "text-foreground" : "text-muted-foreground"
          }`
        }
      >
        Overview
      </NavLink>
      <NavLink
        to="/dashboard/usage"
        className={({ isActive }) =>
          `transition-colors hover:text-foreground ${
            isActive ? "text-foreground" : "text-muted-foreground"
          }`
        }
      >
        API Usage
      </NavLink>
      <NavLink
        to="/dashboard/support"
        className={({ isActive }) =>
          `transition-colors hover:text-foreground ${
            isActive ? "text-foreground" : "text-muted-foreground"
          }`
        }
      >
        Support
      </NavLink>
    </nav>
  );
}
