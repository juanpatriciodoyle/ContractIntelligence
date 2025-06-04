import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "warning";
  icon: LucideIcon;
  color: "blue" | "green" | "yellow" | "purple";
}

const colorMap = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  purple: "bg-purple-100 text-purple-600",
};

const trendColorMap = {
  up: "text-green-500",
  down: "text-green-500", // For processing time, down is good
  warning: "text-yellow-500",
};

export default function KPICard({ title, value, change, trend, icon: Icon, color }: KPICardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />;
      case "down":
        return <TrendingDown className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ 
        y: -4, 
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                {title}
              </p>
              <motion.p 
                className="text-3xl font-bold text-gray-900 mt-2"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {value}
              </motion.p>
              <div className={`flex items-center mt-2 ${trendColorMap[trend]}`}>
                {getTrendIcon()}
                <span className="text-sm ml-1">{change}</span>
              </div>
            </div>
            <motion.div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="text-xl" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
