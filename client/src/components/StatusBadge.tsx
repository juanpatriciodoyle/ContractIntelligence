import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, AlertTriangle, Brain } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  variant: "success" | "warning" | "error" | "secondary";
}

export default function StatusBadge({ status, variant }: StatusBadgeProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case "pending":
        return <Clock className="w-3 h-3 mr-1" />;
      case "ai_review":
        return <Brain className="w-3 h-3 mr-1" />;
      case "rejected":
        return <XCircle className="w-3 h-3 mr-1" />;
      case "needs_review":
        return <AlertTriangle className="w-3 h-3 mr-1" />;
      case "verified":
        return <CheckCircle className="w-3 h-3 mr-1" />;
      default:
        return <Clock className="w-3 h-3 mr-1" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "approved":
        return "Approved";
      case "pending":
        return "Pending";
      case "ai_review":
        return "AI Review";
      case "rejected":
        return "Rejected";
      case "needs_review":
        return "Needs Review";
      case "verified":
        return "Verified";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
      case "error":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        y: -2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Badge 
        className={`inline-flex items-center text-xs font-medium transition-all duration-200 ${getVariantClass()}`}
      >
        {getStatusIcon()}
        {getStatusText()}
      </Badge>
    </motion.div>
  );
}
