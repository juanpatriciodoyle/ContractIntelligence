import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  FileText,
  BarChart3
} from "lucide-react";

export default function AIAnalytics() {
  const aiMetrics = {
    totalAnalyses: 347,
    averageConfidence: 94.2,
    automationRate: 78.5,
    timeReduction: 65.3
  };

  const riskDistribution = [
    { level: "Low Risk", count: 156, percentage: 45, color: "bg-green-500" },
    { level: "Medium Risk", count: 134, percentage: 39, color: "bg-yellow-500" },
    { level: "High Risk", count: 57, percentage: 16, color: "bg-red-500" }
  ];

  const recentAnalyses = [
    {
      id: 1,
      contractTitle: "Cloud Infrastructure Services Q4",
      confidence: 96,
      riskLevel: "Low",
      keyFindings: ["Standard terms", "Competitive pricing", "Clear deliverables"],
      recommendation: "Approve with standard review"
    },
    {
      id: 2,
      contractTitle: "Software License Renewal",
      confidence: 88,
      riskLevel: "Medium",
      keyFindings: ["Price increase noted", "Terms change required", "Compliance review needed"],
      recommendation: "Request negotiation on pricing terms"
    },
    {
      id: 3,
      contractTitle: "Security Audit Services",
      confidence: 72,
      riskLevel: "High",
      keyFindings: ["Unusual liability terms", "Missing SLA definitions", "Unclear scope"],
      recommendation: "Require legal review before approval"
    }
  ];

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

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "High": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
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
      <motion.div variants={itemVariants}>
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">AI Analytics Dashboard</h1>
        </div>
        <p className="text-gray-600">Advanced insights and automated contract analysis</p>
      </motion.div>

      {/* AI Metrics Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Analyses</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{aiMetrics.totalAnalyses}</p>
                  <p className="text-green-600 text-sm mt-1">+23 this week</p>
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
                  <p className="text-gray-500 text-sm font-medium">Avg. Confidence</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{aiMetrics.averageConfidence}%</p>
                  <p className="text-green-600 text-sm mt-1">+2.3% this month</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
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
                  <p className="text-gray-500 text-sm font-medium">Automation Rate</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{aiMetrics.automationRate}%</p>
                  <p className="text-green-600 text-sm mt-1">+5.7% improvement</p>
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
                  <p className="text-gray-500 text-sm font-medium">Time Reduction</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">{aiMetrics.timeReduction}%</p>
                  <p className="text-green-600 text-sm mt-1">vs manual review</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Risk Distribution & Recent Analyses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Risk Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {riskDistribution.map((risk, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{risk.level}</span>
                    <span className="text-sm text-gray-500">{risk.count} contracts</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${risk.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${risk.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">{risk.percentage}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent AI Analyses */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Recent AI Analyses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <motion.div
                  key={analysis.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{analysis.contractTitle}</h4>
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-gray-500">Confidence:</span>
                          <span className="font-semibold text-primary">{analysis.confidence}%</span>
                        </div>
                        <Badge className={getRiskColor(analysis.riskLevel)}>
                          {analysis.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Key Findings:</span>
                      <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                        {analysis.keyFindings.map((finding, index) => (
                          <li key={index}>{finding}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-700">AI Recommendation:</span>
                      <p className="text-sm text-gray-600 mt-1">{analysis.recommendation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Performance Trends */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">AI Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">92.4%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
                <div className="text-xs text-green-600 mt-1">+3.2% vs last month</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">2.3 min</div>
                <div className="text-sm text-gray-600">Avg. Processing Time</div>
                <div className="text-xs text-green-600 mt-1">-45 sec improvement</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">98.7%</div>
                <div className="text-sm text-gray-600">Risk Detection Rate</div>
                <div className="text-xs text-green-600 mt-1">+1.8% improvement</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}