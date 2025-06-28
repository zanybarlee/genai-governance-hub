import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient } from "@/lib/query-client";
import { RoleProvider } from "@/contexts/RoleContext";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Policies from "./pages/Policies";
import Compliance from "./pages/Compliance";
import CICD from "./pages/CICD";
import Audit from "./pages/Audit";
import SystemAudit from "./pages/SystemAudit";
import Settings from "./pages/Settings";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import Documentation from "./pages/Documentation";
import Demo from "./pages/Demo";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import ExternalAuditorDashboard from "./pages/ExternalAuditorDashboard";

function App() {
  return (
    <QueryClient>
      <RoleProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/index" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/external-auditor" element={<ExternalAuditorDashboard />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/cicd" element={<CICD />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="/system-audit" element={<SystemAudit />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/support" element={<Support />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </RoleProvider>
    </QueryClient>
  );
}

export default App;
