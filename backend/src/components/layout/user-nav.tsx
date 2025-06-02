import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/auth-store";
import { useNavigate } from "react-router-dom";
import { getInitials } from "@/lib/utils";

export function UserNav() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex flex-col items-end">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
      </div>
      
      <div className="relative group">
        <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
        
        <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-2 bg-popover border rounded-md shadow-md glassmorphism">
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            
            <div className="px-2 py-2">
              <Button variant="ghost" className="w-full justify-start text-sm px-4 py-2 h-9">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm px-4 py-2 h-9">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm px-4 py-2 h-9 text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}