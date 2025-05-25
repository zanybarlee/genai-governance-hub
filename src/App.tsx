
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/contexts/RoleContext";

import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Policies from "@/pages/Policies";
import Compliance from "@/pages/Compliance";
import Settings from "@/pages/Settings";
import CICD from "@/pages/CICD";
import Audit from "@/pages/Audit";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RoleProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/cicd" element={<CICD />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </RoleProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
