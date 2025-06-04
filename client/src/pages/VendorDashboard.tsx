import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Award,
  Calendar
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import type { Contract } from "@shared/schema";

export default function VendorDashboard() {
  // Mock vendor-specific data (would normally be filtered by vendor ID)
  const vendorStats = {
    submittedContracts: 8,
    approvedContracts: 5,
    pendingContracts: 2,
    rejectedContracts: 1,
    totalValue: "$12.5M",
    averageApprovalTime: "3.2 days",
    verificationStatus: "verified",
    nextPayment: "Dec 15, 2024"
  };

  const recentContracts = [
    {
      id: 1,
      title: "Cloud Infrastructure Services Q4",
      status: "approved",
      value: "$2.4M",
      submissionDate: new Date("2024-11-15"),
      aiConfidence: 95
    },
    {
      id: 2,
      title: "Software License Renewal",
      status: "pending",
      value: "$750K",
      submissionDate: new Date("2024-11-20"),
      aiConfidence: 88
    },
    {
      id: 3,
      title: "Security Audit Services",
      status: "needs_review",
      value: "$320K",
      submissionDate: new Date("2024-11-22"),
      aiConfidence: 72
    }
  ];

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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      case "needs_review":
        return "error";
      default:
        return "secondary";
    }
  };

  return (
    <motion.div 
      className="p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Dashboard</h1>
          <p className="text-gray-600">Track your contract submissions and business performance</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="w-4 h-4 mr-2" />
            Submit New Contract
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Submitted</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{vendorStats.submittedContracts}</p>
                  <p className="text-green-600 text-sm mt-1">+2 this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Approved</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{vendorStats.approvedContracts}</p>
                  <p className="text-green-600 text-sm mt-1">85% approval rate</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Value</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{vendorStats.totalValue}</p>
                  <p className="text-green-600 text-sm mt-1">+$3.2M this quarter</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Avg. Approval Time</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{vendorStats.averageApprovalTime}</p>
                  <p className="text-green-600 text-sm mt-1">20% faster</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contracts */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">Recent Contract Submissions</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentContracts.map((contract) => (
                <motion.div
                  key={contract.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contract.title}</p>
                      <p className="text-sm text-gray-500">
                        Submitted {contract.submissionDate.toLocaleDateString()} • AI Score: {contract.aiConfidence}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusBadge 
                      status={contract.status} 
                      variant={getStatusVariant(contract.status) as any}
                    />
                    <span className="text-gray-900 font-semibold">{contract.value}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Status & Actions */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Verification Status */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Award className="w-5 h-5 mr-2 text-green-600" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <StatusBadge status="verified" variant="success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Document Review</span>
                  <StatusBadge status="verified" variant="success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Compliance Check</span>
                  <StatusBadge status="verified" variant="success" />
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-green-600 font-medium">✓ Fully verified vendor</p>
                  <p className="text-xs text-gray-500 mt-1">Last updated: Nov 10, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Submit New Contract
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                View Contract Templates
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-primary to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Next Payment</span>
                  <span className="font-semibold">{vendorStats.nextPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Outstanding</span>
                  <span className="font-semibold">$1.2M</span>
                </div>
                <div className="pt-3 border-t border-white/20">
                  <Button className="w-full bg-white text-primary hover:bg-gray-100">
                    View Payment History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}