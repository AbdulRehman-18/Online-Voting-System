import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuthStore } from "@/context/auth-store";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export function DashboardLayout() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // Set page title based on the current path
    const path = location.pathname.split("/").pop() || "";
    let title = path.charAt(0).toUpperCase() + path.slice(1);
    
    // Handle root dashboard paths
    if (location.pathname.endsWith("/admin") || 
        location.pathname.endsWith("/candidate") || 
        location.pathname.endsWith("/voter")) {
      title = "Overview";
    }
    
    if (title === "") title = "Overview";
    
    setPageTitle(title);
  }, [isAuthenticated, navigate, location]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-col md:pl-80">
        <Header title={pageTitle} />
        
        <motion.main 
          className="flex-1 p-6 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}