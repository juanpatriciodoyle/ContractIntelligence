// Re-export types from shared schema for convenience
export type {
  User,
  InsertUser,
  Vendor,
  InsertVendor,
  Contract,
  InsertContract,
  AiAnalysis,
  InsertAiAnalysis,
  Notification,
  InsertNotification,
  ContractWithVendor,
  VendorWithUser,
  DashboardStats,
} from "@shared/schema";

// Additional frontend-specific types
export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

export interface KPIMetric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "warning";
  icon: React.ComponentType<any>;
  color: "blue" | "green" | "yellow" | "purple";
}

export interface StatusBadgeVariant {
  variant: "success" | "warning" | "error" | "secondary";
  className: string;
}
