import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import Contracts from "@/pages/Contracts";
import VendorPortal from "@/pages/VendorPortal";
import VendorDashboard from "@/pages/VendorDashboard";
import Layout from "@/components/Layout";
import NotFound from "@/pages/not-found";
import { useAuth } from "@/lib/auth";

function Router() {
  const { user } = useAuth();

  return (
    <Layout>
      <Switch>
        <Route path="/" component={user?.role === 'vendor' ? VendorDashboard : Dashboard} />
        <Route path="/contracts" component={Contracts} />
        <Route path="/vendor-portal" component={VendorPortal} />
        <Route path="/vendor-dashboard" component={VendorDashboard} />
        <Route path="/ai-analytics">
          <div className="p-6">AI Analytics Page - Coming Soon</div>
        </Route>
        <Route path="/reports">
          <div className="p-6">Reports Page - Coming Soon</div>
        </Route>
        <Route path="/submit-contract">
          <div className="p-6">Submit Contract Page - Coming Soon</div>
        </Route>
        <Route path="/my-contracts">
          <div className="p-6">My Contracts Page - Coming Soon</div>
        </Route>
        <Route path="/verification">
          <div className="p-6">Verification Status Page - Coming Soon</div>
        </Route>
        <Route path="/documents">
          <div className="p-6">Document Portal Page - Coming Soon</div>
        </Route>
        <Route path="/settings">
          <div className="p-6">Settings Page - Coming Soon</div>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
