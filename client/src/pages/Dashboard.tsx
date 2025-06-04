import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import KPICard from "@/components/KPICard";
import ContractTable from "@/components/ContractTable";
import AIInsights from "@/components/AIInsights";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Laptop,
  Heart,
  TrendingUpIcon,
  Factory
} from "lucide-react";
import type { DashboardStats, ContractWithVendor } from "@shared/schema";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: contracts, isLoading: contractsLoading } = useQuery<ContractWithVendor[]>({
    queryKey: ["/api/contracts"],
  });

  const recentContracts = contracts?.slice(0, 5) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (statsLoading || contractsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Comprehensive contract management and AI insights</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <KPICard
            title="Avg. Processing Time"
            value={stats?.avgProcessingTime || "0 days"}
            change="-12% from last month"
            trend="down"
            icon={Clock}
            color="blue"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard
            title="Approval Rate"
            value={stats?.approvalRate || "0%"}
            change="+5% from last month"
            trend="up"
            icon={CheckCircle}
            color="green"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard
            title="Expiring (30 days)"
            value={stats?.expiringContracts?.toString() || "0"}
            change="Needs attention"
            trend="warning"
            icon={Calendar}
            color="yellow"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard
            title="Total Contract Value"
            value={stats?.totalValue || "$0"}
            change="+18% from last quarter"
            trend="up"
            icon={DollarSign}
            color="purple"
          />
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contract Status Overview */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">Contract Status Overview</CardTitle>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg">This Month</button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Last Month</button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <span className="text-gray-700">Approved</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={65} className="w-32" />
                    <span className="text-gray-900 font-medium w-12 text-right">
                      {stats?.statusDistribution.approved || 0}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                    <span className="text-gray-700">Pending Review</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={25} className="w-32" />
                    <span className="text-gray-900 font-medium w-12 text-right">
                      {stats?.statusDistribution.pending || 0}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full" />
                    <span className="text-gray-700">Need More Information</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={15} className="w-32" />
                    <span className="text-gray-900 font-medium w-12 text-right">
                      {stats?.statusDistribution.needsMoreInformation || 0}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full" />
                    <span className="text-gray-700">Rejected</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={8} className="w-32" />
                    <span className="text-gray-900 font-medium w-12 text-right">
                      {stats?.statusDistribution.rejected || 0}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contracts by Industry */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Contracts by Industry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats?.industryData && Object.entries(stats.industryData).map(([industry, data]) => {
                const iconMap: { [key: string]: any } = {
                  Technology: Laptop,
                  Healthcare: Heart,
                  Finance: TrendingUpIcon,
                  Manufacturing: Factory,
                };
                const Icon = iconMap[industry] || Laptop;
                
                return (
                  <div key={industry} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">{industry}</p>
                        <p className="text-gray-500 text-sm">{data.contracts} contracts</p>
                      </div>
                    </div>
                    <span className="text-gray-900 font-bold">{data.value}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Contracts & AI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contracts */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">Recent Contracts</CardTitle>
              <button className="text-primary hover:text-purple-600 font-medium text-sm transition-colors">
                View All
              </button>
            </CardHeader>
            <CardContent>
              <ContractTable contracts={recentContracts} compact />
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div variants={itemVariants}>
          <AIInsights />
        </motion.div>
      </div>
    </motion.div>
  );
}
