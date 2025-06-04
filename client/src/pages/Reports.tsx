import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp,
  FileText,
  DollarSign,
  Clock,
  Users,
  Filter
} from "lucide-react";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-month");
  const [selectedReport, setSelectedReport] = useState("overview");

  const reportData = {
    overview: {
      totalContracts: 347,
      totalValue: "$45.2M",
      averageProcessingTime: "3.2 days",
      approvalRate: "84.2%",
      trends: {
        contracts: "+12%",
        value: "+18%",
        processing: "-15%",
        approval: "+3%"
      }
    },
    monthlyData: [
      { month: "Jan", contracts: 28, value: 3.2, approved: 24 },
      { month: "Feb", contracts: 35, value: 4.1, approved: 29 },
      { month: "Mar", contracts: 42, value: 5.8, approved: 36 },
      { month: "Apr", contracts: 38, value: 4.9, approved: 32 },
      { month: "May", contracts: 45, value: 6.2, approved: 38 },
      { month: "Jun", contracts: 52, value: 7.3, approved: 44 }
    ],
    topVendors: [
      { name: "TechCorp Solutions", contracts: 24, value: "$8.2M", approval: "92%" },
      { name: "Global Manufacturing", contracts: 18, value: "$6.8M", approval: "88%" },
      { name: "Healthcare Partners", contracts: 15, value: "$5.1M", approval: "94%" },
      { name: "Innovation Labs", contracts: 12, value: "$3.9M", approval: "85%" },
      { name: "Digital Services", contracts: 9, value: "$2.7M", approval: "91%" }
    ],
    riskAnalysis: [
      { category: "Financial Risk", low: 65, medium: 25, high: 10 },
      { category: "Compliance Risk", low: 70, medium: 20, high: 10 },
      { category: "Operational Risk", low: 55, medium: 35, high: 10 },
      { category: "Legal Risk", low: 80, medium: 15, high: 5 }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const downloadReport = (format: string) => {
    // Mock download functionality
    console.log(`Downloading report in ${format} format for period: ${selectedPeriod}`);
    alert(`Report downloaded in ${format.toUpperCase()} format!`);
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
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          </div>
          <p className="text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={() => downloadReport('pdf')}
            className="bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Contracts</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{reportData.overview.totalContracts}</p>
                  <p className="text-green-600 text-sm mt-1">{reportData.overview.trends.contracts} vs last period</p>
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
                  <p className="text-gray-500 text-sm font-medium">Total Value</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{reportData.overview.totalValue}</p>
                  <p className="text-green-600 text-sm mt-1">{reportData.overview.trends.value} vs last period</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
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
                  <p className="text-gray-500 text-sm font-medium">Avg. Processing Time</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{reportData.overview.averageProcessingTime}</p>
                  <p className="text-green-600 text-sm mt-1">{reportData.overview.trends.processing} improvement</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
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
                  <p className="text-gray-500 text-sm font-medium">Approval Rate</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">{reportData.overview.approvalRate}</p>
                  <p className="text-green-600 text-sm mt-1">{reportData.overview.trends.approval} vs last period</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Monthly Contract Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.monthlyData.map((month, index) => (
                  <div key={month.month} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{month.month}</span>
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <span>{month.contracts} contracts</span>
                        <span>${month.value}M</span>
                        <span>{month.approved} approved</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${(month.approved / month.contracts) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Vendors */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Top Performing Vendors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportData.topVendors.map((vendor, index) => (
                <motion.div
                  key={vendor.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{vendor.name}</p>
                      <p className="text-sm text-gray-500">{vendor.contracts} contracts • {vendor.value}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {vendor.approval} approval
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Risk Analysis */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Risk Analysis by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reportData.riskAnalysis.map((risk, index) => (
                <div key={risk.category} className="space-y-3">
                  <h4 className="font-medium text-gray-900">{risk.category}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Low</span>
                      <span>{risk.low}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${risk.low}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-600">Medium</span>
                      <span>{risk.medium}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-yellow-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${risk.medium}%` }}
                        transition={{ duration: 1, delay: index * 0.2 + 0.1 }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">High</span>
                      <span>{risk.high}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${risk.high}%` }}
                        transition={{ duration: 1, delay: index * 0.2 + 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Export Options */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={() => downloadReport('pdf')}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export as PDF</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => downloadReport('excel')}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export as Excel</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => downloadReport('csv')}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export as CSV</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}