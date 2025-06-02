import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, 
  Users, 
  Vote, 
  Calendar, 
  FileText, 
  Award, 
  Settings, 
  Menu, 
  X,
  Home,
  LogOut,
  User
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/context/auth-store";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const role = user.role;
  
  const sidebarItems = {
    admin: [
      { name: "Overview", href: "/dashboard/admin", icon: Home },
      { name: "Elections", href: "/dashboard/admin/elections", icon: Calendar },
      { name: "Users", href: "/dashboard/admin/users", icon: Users },
      { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
    candidate: [
      { name: "Overview", href: "/dashboard/candidate", icon: Home },
      { name: "Profile", href: "/dashboard/candidate/profile", icon: User },
      { name: "Elections", href: "/dashboard/candidate/elections", icon: Calendar },
      { name: "Campaign", href: "/dashboard/candidate/campaign", icon: FileText },
      { name: "Settings", href: "/dashboard/candidate/settings", icon: Settings },
    ],
    voter: [
      { name: "Home", href: "/dashboard/voter", icon: Home },
      { name: "Vote", href: "/dashboard/voter/vote", icon: Vote },
      { name: "Results", href: "/dashboard/voter/results", icon: Award },
      { name: "Settings", href: "/dashboard/voter/settings", icon: Settings },
    ],
  };

  const currentItems = sidebarItems[role] || [];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "80px" },
  };

  const mobileSidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  const overlayVariants = {
    open: { opacity: 1, display: "block" },
    closed: { opacity: 0, transitionEnd: { display: "none" } },
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={toggleMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full glassmorphism md:hidden",
          className
        )}
        initial="closed"
        animate={mobileOpen ? "open" : "closed"}
        variants={mobileSidebarVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <img 
                src="https://api.dicebear.com/7.x/shapes/svg?seed=votera" 
                alt="Votera Logo"
                className="h-8 w-8 mr-2"
              />
              <h1 className="text-2xl font-light">Votera</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1">
              {currentItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                    location.pathname === item.href && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="w-full justify-start mt-4 text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-30 h-full glassmorphism hidden md:block",
          className
        )}
        initial="expanded"
        animate={expanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/shapes/svg?seed=votera" 
                alt="Votera Logo"
                className="h-8 w-8 mr-2 flex-shrink-0"
              />
              {expanded && (
                <motion.h1 
                  className="text-2xl font-light truncate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Votera
                </motion.h1>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1">
              {currentItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                    location.pathname === item.href && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <ThemeToggle />
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start mt-4 text-destructive hover:text-destructive",
                !expanded && "justify-center px-0"
              )}
              onClick={handleLogout}
            >
              <LogOut className={cn("h-5 w-5", expanded && "mr-2")} />
              {expanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Logout
                </motion.span>
              )}
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}