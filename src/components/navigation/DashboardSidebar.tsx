
import { Home, BarChart, Users, FileText, LifeBuoy, Settings } from "lucide-react";
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

export const DashboardSidebar = () => {
  // Primary navigation items
  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "API Usage",
      href: "/dashboard/usage",
      icon: BarChart,
    },
    {
      title: "API Keys",
      href: "/dashboard/api-keys",
      icon: FileText,
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: Users,
    },
  ];

  // Secondary navigation items
  const secondaryNavItems = [
    {
      title: "Support",
      href: "/dashboard/support",
      icon: LifeBuoy,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarContent className="pt-6">
        <div className="flex items-center px-4 mb-6">
          <img 
            src="/logo.svg" 
            alt="RealEstateAPI" 
            className="h-6 w-auto" 
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/120x30?text=RealEstateAPI";
            }}
          />
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.href}
                      className={({ isActive }) => 
                        isActive ? "text-primary font-medium" : "text-foreground/70 hover:text-foreground"
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
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.href}
                      className={({ isActive }) => 
                        isActive ? "text-primary font-medium" : "text-foreground/70 hover:text-foreground"
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
      
      <SidebarFooter className="pt-2 pb-4">
        <div className="px-3">
          <Button className="w-full justify-start" variant="outline">
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
    </Sidebar>
  );
};
