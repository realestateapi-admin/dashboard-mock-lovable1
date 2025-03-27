
import { Home, BarChart, FileText, LifeBuoy, Settings, User, BookOpen, FileCode } from "lucide-react";
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
} from "@/components/ui/sidebar";
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
  
  // New internal navigation items
  const internalNavItems = [
    {
      title: "Implementation Notes on Demo",
      href: "/dashboard/implementation-notes",
      icon: BookOpen,
      allowedRoles: ['admin', 'billing', 'developer', 'viewer'],
    },
  ];

  // Filter items based on the user's role
  const filteredMainNavItems = mainNavItems.filter(item => 
    item.allowedRoles.includes(currentRole as UserRole)
  );

  const filteredSecondaryNavItems = secondaryNavItems.filter(item => 
    item.allowedRoles.includes(currentRole as UserRole)
  );
  
  const filteredInternalNavItems = internalNavItems.filter(item => 
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
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Internal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredInternalNavItems.map((item) => (
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
    </Sidebar>
  );
};
