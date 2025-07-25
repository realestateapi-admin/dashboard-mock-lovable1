
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function UserNav() {
  const { currentRole, logout } = useAuth();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('john@example.com');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Check for email and profile image in localStorage whenever the dropdown is opened
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
    
    const storedProfileImage = localStorage.getItem('userProfileImage');
    setProfileImage(storedProfileImage);
  }, []);
  
  const userRoleBadgeColors: Record<UserRole, string> = {
    admin: "bg-red-100 text-red-800",
    billing: "bg-purple-100 text-purple-800",
    developer: "bg-blue-100 text-blue-800",
    viewer: "bg-gray-100 text-gray-800"
  };

  const getRoleLabel = (role: UserRole): string => {
    const roleLabels: Record<UserRole, string> = {
      admin: "Admin",
      billing: "Billing",
      developer: "Developer",
      viewer: "Viewer"
    };
    return roleLabels[role];
  };

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profileImage || "https://github.com/shadcn.png"} alt="Avatar" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
            <Badge className={`mt-2 w-fit ${userRoleBadgeColors[currentRole as UserRole]}`}>
              {getRoleLabel(currentRole as UserRole)}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
            Profile
          </DropdownMenuItem>
          {currentRole === 'admin' && (
            <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
              Settings
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
