
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { MainNav } from "@/components/navigation/MainNav";
import { DashboardSidebar } from "@/components/navigation/DashboardSidebar";
import { UserNav } from "@/components/navigation/UserNav";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { AccountExecutiveWidget } from "@/components/support/AccountExecutiveWidget";
import { NeedHelpButton } from "@/components/support/NeedHelpButton";

export const DashboardLayout = () => {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex flex-col flex-1 min-h-screen">
          <header className="sticky top-0 z-40 border-b backdrop-blur-sm bg-background/80">
            <div className="container flex items-center justify-between h-16 px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <MainNav />
              </div>
              <div className="flex items-center gap-4">
                <UserNav />
              </div>
            </div>
          </header>
          <main className="flex-1 container px-4 py-6">
            <Outlet />
          </main>
        </div>
        
        {/* Account Executive components */}
        <NeedHelpButton />
        <AccountExecutiveWidget />
      </div>
    </SidebarProvider>
  );
};
