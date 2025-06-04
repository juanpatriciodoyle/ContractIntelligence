import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"), // admin, vendor
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  industry: text("industry").notNull(),
  verificationStatus: text("verification_status").notNull().default("pending"), // pending, verified, rejected
  documents: jsonb("documents"), // Array of document URLs/IDs
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  vendorId: integer("vendor_id").references(() => vendors.id).notNull(),
  status: text("status").notNull().default("pending"), // pending, ai_review, approved, rejected, needs_review, archived
  value: decimal("value", { precision: 15, scale: 2 }),
  currency: text("currency").default("USD"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  submissionDate: timestamp("submission_date").defaultNow().notNull(),
  contractDocument: text("contract_document"), // File path/URL
  submittedLetter: text("submitted_letter"), // File path/URL
  sensitiveData: text("sensitive_data"), // Encrypted or file path
  industry: text("industry").notNull(),
  aiAnalysis: jsonb("ai_analysis"), // AI analysis results
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiAnalyses = pgTable("ai_analyses", {
  id: serial("id").primaryKey(),
  contractId: integer("contract_id").references(() => contracts.id).notNull(),
  analysisType: text("analysis_type").notNull(), // content, risk, compliance
  confidenceScore: decimal("confidence_score", { precision: 5, scale: 2 }),
  suggestedAction: text("suggested_action"), // approve, reject, request_info
  keyFindings: jsonb("key_findings"), // Array of findings
  riskFlags: jsonb("risk_flags"), // Array of risks
  recommendations: text("recommendations"),
  processedAt: timestamp("processed_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // info, warning, error, success
  isRead: boolean("is_read").default(false),
  relatedEntityType: text("related_entity_type"), // contract, vendor
  relatedEntityId: integer("related_entity_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
  createdAt: true,
});

export const insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  submissionDate: true,
});

export const insertAiAnalysisSchema = createInsertSchema(aiAnalyses).omit({
  id: true,
  processedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Vendor = typeof vendors.$inferSelect;
export type InsertVendor = z.infer<typeof insertVendorSchema>;

export type Contract = typeof contracts.$inferSelect;
export type InsertContract = z.infer<typeof insertContractSchema>;

export type AiAnalysis = typeof aiAnalyses.$inferSelect;
export type InsertAiAnalysis = z.infer<typeof insertAiAnalysisSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

// Extended types for API responses
export type ContractWithVendor = Contract & {
  vendor: Vendor;
  aiAnalyses?: AiAnalysis[];
};

export type VendorWithUser = Vendor & {
  user: User;
};

export type DashboardStats = {
  avgProcessingTime: string;
  approvalRate: string;
  expiringContracts: number;
  totalValue: string;
  totalContracts: number;
  statusDistribution: {
    approved: number;
    pending: number;
    needsMoreInformation: number;
    rejected: number;
  };
  industryData: {
    [key: string]: {
      value: string;
      contracts: number;
    };
  };
};
