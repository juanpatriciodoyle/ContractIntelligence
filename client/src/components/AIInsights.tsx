import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bot, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

export default function AIInsights() {
  const aiMetrics = {
    activeAnalysis: 12,
    riskFlags: 3,
    autoApproved: 89,
    processingEfficiency: 94,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-primary to-purple-600 text-white border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Bot className="w-5 h-5 text-white" />
            </motion.div>
            <CardTitle className="text-lg font-semibold">AI Analysis Hub</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <motion.div 
            className="bg-white bg-opacity-10 p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-white opacity-90" />
                <span className="text-sm opacity-90">Active Analysis</span>
              </div>
              <motion.span 
                className="text-lg font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {aiMetrics.activeAnalysis}
              </motion.span>
            </div>
            <Progress value={75} className="h-2 bg-white/20" />
          </motion.div>
          
          <motion.div 
            className="bg-white bg-opacity-10 p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-300" />
                <span className="text-sm opacity-90">Risk Flags</span>
              </div>
              <span className="text-lg font-bold text-yellow-300">{aiMetrics.riskFlags}</span>
            </div>
            <p className="text-xs opacity-75">Unusual clauses detected in 2 contracts</p>
          </motion.div>
          
          <motion.div 
            className="bg-white bg-opacity-10 p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span className="text-sm opacity-90">Auto-Approved</span>
              </div>
              <span className="text-lg font-bold text-green-300">{aiMetrics.autoApproved}%</span>
            </div>
            <p className="text-xs opacity-75">Confidence score above 95%</p>
          </motion.div>

          <motion.div 
            className="bg-white bg-opacity-10 p-4 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-300" />
                <span className="text-sm opacity-90">Processing Efficiency</span>
              </div>
              <span className="text-lg font-bold text-blue-300">{aiMetrics.processingEfficiency}%</span>
            </div>
            <Progress value={aiMetrics.processingEfficiency} className="h-2 bg-white/20" />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="w-full mt-6 bg-white text-primary hover:bg-gray-100 transition-colors font-medium"
              size="lg"
            >
              View AI Dashboard
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
