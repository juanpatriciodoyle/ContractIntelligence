import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContractSchema, insertVendorSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication middleware (simplified for demo)
  const requireAuth = (req: any, res: any, next: any) => {
    // In a real app, this would validate JWT tokens
    req.user = { id: 1, role: "admin" }; // Mock admin user
    next();
  };

  // Dashboard endpoints
  app.get("/api/dashboard/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Contract endpoints
  app.get("/api/contracts", requireAuth, async (req, res) => {
    try {
      const contracts = await storage.getContractsWithVendor();
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contracts" });
    }
  });

  app.get("/api/contracts/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contract = await storage.getContract(id);
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      res.json(contract);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contract" });
    }
  });

  app.post("/api/contracts", requireAuth, async (req, res) => {
    try {
      const validatedData = insertContractSchema.parse(req.body);
      const contract = await storage.createContract(validatedData);
      
      // Simulate AI analysis
      setTimeout(async () => {
        await storage.createAiAnalysis({
          contractId: contract.id,
          analysisType: "content",
          confidenceScore: (Math.random() * 40 + 60).toFixed(2),
          suggestedAction: Math.random() > 0.8 ? "request_info" : "approve",
          keyFindings: ["Standard contract terms", "Acceptable risk level"],
          riskFlags: [],
          recommendations: "Contract analysis completed. Review suggested action.",
        });
      }, 2000);
      
      res.status(201).json(contract);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contract" });
    }
  });

  app.patch("/api/contracts/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const contract = await storage.updateContract(id, updates);
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      res.json(contract);
    } catch (error) {
      res.status(500).json({ message: "Failed to update contract" });
    }
  });

  app.delete("/api/contracts/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteContract(id);
      if (!deleted) {
        return res.status(404).json({ message: "Contract not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete contract" });
    }
  });

  // Vendor endpoints
  app.get("/api/vendors", requireAuth, async (req, res) => {
    try {
      const vendors = await storage.getVendorsWithUser();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });

  app.post("/api/vendors", async (req, res) => {
    try {
      const { user, vendor } = req.body;
      
      // Validate input
      const validatedUser = insertUserSchema.parse(user);
      const validatedVendor = insertVendorSchema.parse(vendor);
      
      // Create user first
      const createdUser = await storage.createUser(validatedUser);
      
      // Create vendor with user ID
      const createdVendor = await storage.createVendor({
        ...validatedVendor,
        userId: createdUser.id,
      });
      
      res.status(201).json({ user: createdUser, vendor: createdVendor });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create vendor" });
    }
  });

  app.patch("/api/vendors/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const vendor = await storage.updateVendor(id, updates);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to update vendor" });
    }
  });

  // AI Analysis endpoints
  app.get("/api/contracts/:id/ai-analysis", requireAuth, async (req, res) => {
    try {
      const contractId = parseInt(req.params.id);
      const analyses = await storage.getAiAnalysesByContract(contractId);
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI analysis" });
    }
  });

  app.post("/api/contracts/:id/ai-analysis", requireAuth, async (req, res) => {
    try {
      const contractId = parseInt(req.params.id);
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiAnalysis = await storage.createAiAnalysis({
        contractId,
        analysisType: "content",
        confidenceScore: (Math.random() * 40 + 60).toFixed(2),
        suggestedAction: Math.random() > 0.7 ? "request_info" : "approve",
        keyFindings: [
          "Contract structure is standard",
          "Payment terms are acceptable",
          "Liability clauses reviewed",
        ],
        riskFlags: Math.random() > 0.8 ? ["Unusual termination clause"] : [],
        recommendations: "AI analysis completed successfully. Review suggested actions.",
      });
      
      res.status(201).json(aiAnalysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to create AI analysis" });
    }
  });

  // Notification endpoints
  app.get("/api/notifications", async (req, res) => {
    try {
      const userId = 1; // Mock user ID for now
      const notifications = await storage.getNotificationsByUser(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch("/api/notifications/:id/read", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.markNotificationAsRead(id);
      if (!success) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
