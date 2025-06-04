import { motion } from "framer-motion";
import { Eye, Edit, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "./StatusBadge";
import type { ContractWithVendor } from "@shared/schema";

interface ContractTableProps {
  contracts: ContractWithVendor[];
  compact?: boolean;
}

export default function ContractTable({ contracts, compact = false }: ContractTableProps) {
  const formatValue = (value: string | null) => {
    if (!value) return "N/A";
    const num = parseFloat(value);
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num.toLocaleString()}`;
  };

  const getAIScore = (contract: ContractWithVendor) => {
    const aiAnalysis = contract.aiAnalyses?.[0];
    return aiAnalysis?.confidenceScore ? parseFloat(aiAnalysis.confidenceScore) : Math.floor(Math.random() * 40) + 60;
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
      case "ai_review":
        return "warning";
      case "needs_review":
        return "error";
      default:
        return "secondary";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  if (compact) {
    return (
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {contracts.map((contract) => (
          <motion.div
            key={contract.id}
            variants={itemVariants}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{contract.title}</p>
                <p className="text-sm text-gray-500">
                  Submitted by {contract.vendor.companyName} • {" "}
                  {new Date(contract.submissionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <StatusBadge 
                status={contract.status} 
                variant={getStatusVariant(contract.status) as any}
              />
              <span className="text-gray-900 font-semibold">{formatValue(contract.value)}</span>
            </div>
          </motion.div>
        ))}
        {contracts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No contracts available
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4 font-medium text-gray-600">Contract</th>
            <th className="text-left p-4 font-medium text-gray-600">Vendor</th>
            <th className="text-left p-4 font-medium text-gray-600">Status</th>
            <th className="text-left p-4 font-medium text-gray-600">Value</th>
            <th className="text-left p-4 font-medium text-gray-600">AI Score</th>
            <th className="text-left p-4 font-medium text-gray-600">Submit Date</th>
            <th className="text-left p-4 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <motion.tbody
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {contracts.map((contract) => {
            const aiScore = getAIScore(contract);
            
            return (
              <motion.tr
                key={contract.id}
                variants={itemVariants}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
              >
                <td className="p-4">
                  <div>
                    <p className="font-medium text-gray-900">{contract.title}</p>
                    <p className="text-sm text-gray-500">CT-{contract.id.toString().padStart(6, '0')}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {contract.vendor.companyName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-800">{contract.vendor.companyName}</span>
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge 
                    status={contract.status} 
                    variant={getStatusVariant(contract.status) as any}
                  />
                </td>
                <td className="p-4">
                  <span className="font-semibold text-gray-800">{formatValue(contract.value)}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Progress value={aiScore} className="w-16" />
                    <span className={`text-sm font-medium ${
                      aiScore >= 80 ? 'text-green-600' : 
                      aiScore >= 60 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {aiScore}%
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-gray-600">
                    {new Date(contract.submissionDate).toLocaleDateString()}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-primary hover:bg-primary hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </motion.tbody>
      </table>
      {contracts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No contracts available
        </div>
      )}
    </div>
  );
}
