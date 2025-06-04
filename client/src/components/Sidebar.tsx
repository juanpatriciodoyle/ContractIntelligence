import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Bot, 
  Settings,
  File,
  UserCheck,
  Upload,
  BarChart3,
  Bell,
  Layers
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

const getNavigationForRole = (role: 'admin' | 'vendor') => {
  if (role === 'admin') {
    return [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Contracts", href: "/contracts", icon: FileText, badge: "23" },
      { name: "Vendor Portal", href: "/vendor-portal", icon: Users },
      { name: "AI Analytics", href: "/ai-analytics", icon: Bot },
      { name: "Reports", href: "/reports", icon: BarChart3 },
      { name: "Settings", href: "/settings", icon: Settings },
    ];
  } else {
    return [
      { name: "My Dashboard", href: "/vendor-dashboard", icon: LayoutDashboard },
      { name: "Submit Contract", href: "/submit-contract", icon: Upload },
      { name: "My Contracts", href: "/my-contracts", icon: FileText, badge: "3" },
      { name: "Verification Status", href: "/verification", icon: UserCheck },
      { name: "Document Portal", href: "/documents", icon: Layers },
      { name: "Settings", href: "/settings", icon: Settings },
    ];
  }
};

export default function Sidebar() {
  const [location] = useLocation();
  const { user, switchToAdmin, switchToVendor } = useAuth();
  const navigation = getNavigationForRole(user?.role || 'admin');

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const hoverVariants = {
    hover: {
      x: 8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Section */}
      <motion.div 
        className="p-6 border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <File className="text-white text-lg" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ContractFlow</h1>
            <p className="text-xs text-gray-500">AI-Powered Management</p>
          </div>
        </div>
      </motion.div>

      {/* Role Switcher */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={user?.role === 'admin' ? 'default' : 'outline'}
            onClick={switchToAdmin}
            className="flex-1 text-xs"
          >
            Admin (Sarah)
          </Button>
          <Button
            size="sm"
            variant={user?.role === 'vendor' ? 'default' : 'outline'}
            onClick={switchToVendor}
            className="flex-1 text-xs"
          >
            Vendor (Alex)
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item, index) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <motion.div
              key={item.name}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <motion.div
                  className={`
                    flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                  variants={hoverVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="text-lg w-5 h-5" />
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge 
                      variant={isActive ? "secondary" : "destructive"}
                      className={`text-xs ${isActive ? 'bg-white/20 text-white' : ''}`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User Profile */}
      <motion.div 
        className="p-4 border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500">
              {user?.role === 'admin' ? 'Contract Administrator' : 'Vendor Representative'}
            </p>
          </div>
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Settings className="w-4 h-4 text-gray-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
