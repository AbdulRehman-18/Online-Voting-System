import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { applyTheme, useThemeStore } from "@/context/theme-store";

// Layouts
import { DashboardLayout } from "@/components/layout/dashboard-layout";

// Landing Pages
import { LoginPage } from "@/pages/landing/login-page";

// Admin Pages
import { AdminOverview } from "@/pages/dashboard/admin/admin-overview";

// Candidate Pages
import { CandidateOverview } from "@/pages/dashboard/candidate/candidate-overview";

// Voter Pages
import { VoterHome } from "@/pages/dashboard/voter/voter-home";
import { VoterVote } from "@/pages/dashboard/voter/voter-vote";

// Auth Store
import { useAuthStore } from "@/context/auth-store";

function App() {
  const { theme } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to={`/dashboard/${user?.role}`} /> : <LoginPage />} 
        />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Admin Routes */}
          <Route path="admin" element={<AdminOverview />} />
          <Route path="admin/elections" element={<div>Elections Management</div>} />
          <Route path="admin/users" element={<div>User Management</div>} />
          <Route path="admin/analytics" element={<div>Analytics</div>} />
          <Route path="admin/settings" element={<div>Settings</div>} />
          
          {/* Candidate Routes */}
          <Route path="candidate" element={<CandidateOverview />} />
          <Route path="candidate/profile" element={<div>Candidate Profile</div>} />
          <Route path="candidate/elections" element={<div>Elections</div>} />
          <Route path="candidate/campaign" element={<div>Campaign</div>} />
          <Route path="candidate/settings" element={<div>Settings</div>} />
          
          {/* Voter Routes */}
          <Route path="voter" element={<VoterHome />} />
          <Route path="voter/vote" element={<VoterVote />} />
          <Route path="voter/results" element={<div>Election Results</div>} />
          <Route path="voter/settings" element={<div>Settings</div>} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </Router>
  );
}

export default App;