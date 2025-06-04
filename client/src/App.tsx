import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import Contracts from "@/pages/Contracts";
import VendorPortal from "@/pages/VendorPortal";
import VendorDashboard from "@/pages/VendorDashboard";
import AIAnalytics from "@/pages/AIAnalytics";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import SubmitContract from "@/pages/SubmitContract";
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
        <Route path="/ai-analytics" component={AIAnalytics} />
        <Route path="/reports" component={Reports} />
        <Route path="/submit-contract" component={SubmitContract} />
        <Route path="/my-contracts" component={Contracts} />
        <Route path="/verification" component={SubmitContract} />
        <Route path="/documents" component={VendorPortal} />
        <Route path="/settings" component={Settings} />
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
