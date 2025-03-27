import { Home, BarChart, Users, FileText, LifeBuoy, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth, UserRole } from "@/contexts/AuthContext";

export const DashboardSidebar = () => {
  const { currentRole } = useAuth();
  
  // Define navigation items with role-based access
  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      allowedRoles: ['admin', 'billing', 'developer', 'viewer'],
    },
    {
      title: "API Usage",
      href: "/dashboard/usage",
      icon: BarChart,
      allowedRoles: ['admin', 'billing', 'developer'],
    },
    {
      title: "API Keys",
      href: "/dashboard/api-keys",
      icon: FileText,
      allowedRoles: ['admin', 'developer'],
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: FileText,
      allowedRoles: ['admin', 'billing'],
    },
  ];

  // Secondary navigation items
  const secondaryNavItems = [
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
      allowedRoles: ['admin', 'billing', 'developer', 'viewer'],
    },
    {
      title: "Support",
      href: "/dashboard/support",
      icon: LifeBuoy,
      allowedRoles: ['admin', 'billing', 'developer', 'viewer'],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      allowedRoles: ['admin'],
    },
  ];

  // Filter items based on the user's role
  const filteredMainNavItems = mainNavItems.filter(item => 
    item.allowedRoles.includes(currentRole as UserRole)
  );

  const filteredSecondaryNavItems = secondaryNavItems.filter(item => 
    item.allowedRoles.includes(currentRole as UserRole)
  );

  return (
    <Sidebar className="border-r bg-[#1e1e2e]">
      <SidebarContent className="pt-6">
        <div className="flex items-center px-4 mb-6">
          <img 
            src="https://www.realestateapi.com/assets/img/realestateapi-logo-white.svg?v=08750727ac" 
            alt="RealEstateAPI" 
            className="h-8 w-auto" 
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/160x40?text=RealEstateAPI";
            }}
          />
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.href}
                      className={({ isActive }) => 
                        isActive ? "text-[#5014d0] font-medium" : "text-foreground/70 hover:text-foreground"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Settings & Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredSecondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.href}
                      className={({ isActive }) => 
                        isActive ? "text-[#5014d0] font-medium" : "text-foreground/70 hover:text-foreground"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {currentRole === 'admin' && (
        <SidebarFooter className="pt-2 pb-4">
          <div className="px-3">
            <Button className="w-full justify-start bg-[#5014d0] hover:bg-[#5014d0]/90" variant="default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Invite Team
            </Button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};
