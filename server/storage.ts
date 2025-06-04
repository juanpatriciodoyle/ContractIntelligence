import { users, vendors, contracts, aiAnalyses, notifications, type User, type InsertUser, type Vendor, type InsertVendor, type Contract, type InsertContract, type AiAnalysis, type InsertAiAnalysis, type Notification, type InsertNotification, type ContractWithVendor, type VendorWithUser, type DashboardStats } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vendor methods
  getVendor(id: number): Promise<Vendor | undefined>;
  getVendorByUserId(userId: number): Promise<Vendor | undefined>;
  getVendorsWithUser(): Promise<VendorWithUser[]>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  updateVendor(id: number, updates: Partial<Vendor>): Promise<Vendor | undefined>;
  
  // Contract methods
  getContract(id: number): Promise<Contract | undefined>;
  getContracts(): Promise<Contract[]>;
  getContractsWithVendor(): Promise<ContractWithVendor[]>;
  getContractsByVendor(vendorId: number): Promise<Contract[]>;
  createContract(contract: InsertContract): Promise<Contract>;
  updateContract(id: number, updates: Partial<Contract>): Promise<Contract | undefined>;
  deleteContract(id: number): Promise<boolean>;
  
  // AI Analysis methods
  getAiAnalysesByContract(contractId: number): Promise<AiAnalysis[]>;
  createAiAnalysis(analysis: InsertAiAnalysis): Promise<AiAnalysis>;
  
  // Notification methods
  getNotificationsByUser(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<boolean>;
  
  // Dashboard methods
  getDashboardStats(): Promise<DashboardStats>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vendors: Map<number, Vendor>;
  private contracts: Map<number, Contract>;
  private aiAnalyses: Map<number, AiAnalysis>;
  private notifications: Map<number, Notification>;
  private currentUserId: number;
  private currentVendorId: number;
  private currentContractId: number;
  private currentAiAnalysisId: number;
  private currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.vendors = new Map();
    this.contracts = new Map();
    this.aiAnalyses = new Map();
    this.notifications = new Map();
    this.currentUserId = 1;
    this.currentVendorId = 1;
    this.currentContractId = 1;
    this.currentAiAnalysisId = 1;
    this.currentNotificationId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Create admin user
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin123", // In real app, this would be hashed
      role: "admin",
      firstName: "Alex",
      lastName: "Rodriguez",
      email: "admin@contractflow.com",
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create sample vendor users and vendors
    const vendorUsers = [
      { username: "techcorp", company: "TechCorp Solutions", industry: "Technology" },
      { username: "medcorp", company: "MedSupply Corp", industry: "Healthcare" },
      { username: "fincorp", company: "FinConsult LLC", industry: "Finance" },
      { username: "mfgcorp", company: "Manufacturing Inc", industry: "Manufacturing" },
    ];

    vendorUsers.forEach(({ username, company, industry }) => {
      const user: User = {
        id: this.currentUserId++,
        username,
        password: "vendor123",
        role: "vendor",
        firstName: company.split(" ")[0],
        lastName: "Team",
        email: `contact@${username}.com`,
        createdAt: new Date(),
      };
      this.users.set(user.id, user);

      const vendor: Vendor = {
        id: this.currentVendorId++,
        userId: user.id,
        companyName: company,
        contactName: `${user.firstName} ${user.lastName}`,
        contactEmail: user.email,
        contactPhone: "+1-555-0100",
        industry,
        verificationStatus: "verified",
        documents: [],
        createdAt: new Date(),
      };
      this.vendors.set(vendor.id, vendor);
    });

    // Create sample contracts
    const sampleContracts = [
      {
        title: "Cloud Infrastructure Services Agreement",
        vendorId: 1,
        status: "approved" as const,
        value: "2400000",
        industry: "Technology",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2025-12-31"),
      },
      {
        title: "Healthcare Services Contract",
        vendorId: 2,
        status: "approved" as const,
        value: "1800000",
        industry: "Healthcare",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-12-31"),
      },
      {
        title: "Financial Advisory Agreement",
        vendorId: 3,
        status: "ai_review" as const,
        value: "950000",
        industry: "Finance",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-11-30"),
      },
      {
        title: "Manufacturing Partnership Contract",
        vendorId: 4,
        status: "needs_review" as const,
        value: "3200000",
        industry: "Manufacturing",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2025-03-31"),
      },
      {
        title: "Software License Agreement",
        vendorId: 1,
        status: "pending" as const,
        value: "750000",
        industry: "Technology",
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-10-31"),
      },
    ];

    sampleContracts.forEach((contractData) => {
      const contract: Contract = {
        id: this.currentContractId++,
        ...contractData,
        description: `Professional services agreement for ${contractData.title}`,
        currency: "USD",
        submissionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
        contractDocument: `/documents/contract_${this.currentContractId - 1}.pdf`,
        submittedLetter: `/documents/letter_${this.currentContractId - 1}.pdf`,
        sensitiveData: null,
        aiAnalysis: {
          confidence: Math.floor(Math.random() * 40) + 60, // 60-100%
          riskScore: Math.floor(Math.random() * 30) + 10, // 10-40%
          keyTerms: ["payment terms", "liability clauses", "termination conditions"],
        },
        adminNotes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.contracts.set(contract.id, contract);

      // Create AI analysis for each contract
      const aiAnalysis: AiAnalysis = {
        id: this.currentAiAnalysisId++,
        contractId: contract.id,
        analysisType: "content",
        confidenceScore: (Math.random() * 40 + 60).toFixed(2),
        suggestedAction: contract.status === "approved" ? "approve" : contract.status === "needs_review" ? "request_info" : "approve",
        keyFindings: [
          "Standard terms and conditions",
          "Acceptable payment schedule",
          "Clear deliverables defined",
        ],
        riskFlags: contract.status === "needs_review" ? ["Unusual liability clause", "Missing termination clause"] : [],
        recommendations: "Contract appears standard with acceptable terms. Recommend approval.",
        processedAt: new Date(),
      };
      this.aiAnalyses.set(aiAnalysis.id, aiAnalysis);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Vendor methods
  async getVendor(id: number): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }

  async getVendorByUserId(userId: number): Promise<Vendor | undefined> {
    return Array.from(this.vendors.values()).find(vendor => vendor.userId === userId);
  }

  async getVendorsWithUser(): Promise<VendorWithUser[]> {
    const vendorsWithUser: VendorWithUser[] = [];
    for (const vendor of this.vendors.values()) {
      const user = this.users.get(vendor.userId);
      if (user) {
        vendorsWithUser.push({ ...vendor, user });
      }
    }
    return vendorsWithUser;
  }

  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const vendor: Vendor = {
      ...insertVendor,
      id: this.currentVendorId++,
      createdAt: new Date(),
    };
    this.vendors.set(vendor.id, vendor);
    return vendor;
  }

  async updateVendor(id: number, updates: Partial<Vendor>): Promise<Vendor | undefined> {
    const vendor = this.vendors.get(id);
    if (!vendor) return undefined;
    
    const updatedVendor = { ...vendor, ...updates };
    this.vendors.set(id, updatedVendor);
    return updatedVendor;
  }

  // Contract methods
  async getContract(id: number): Promise<Contract | undefined> {
    return this.contracts.get(id);
  }

  async getContracts(): Promise<Contract[]> {
    return Array.from(this.contracts.values());
  }

  async getContractsWithVendor(): Promise<ContractWithVendor[]> {
    const contractsWithVendor: ContractWithVendor[] = [];
    for (const contract of this.contracts.values()) {
      const vendor = this.vendors.get(contract.vendorId);
      if (vendor) {
        const aiAnalyses = Array.from(this.aiAnalyses.values()).filter(
          analysis => analysis.contractId === contract.id
        );
        contractsWithVendor.push({ ...contract, vendor, aiAnalyses });
      }
    }
    return contractsWithVendor.sort((a, b) => b.submissionDate.getTime() - a.submissionDate.getTime());
  }

  async getContractsByVendor(vendorId: number): Promise<Contract[]> {
    return Array.from(this.contracts.values()).filter(contract => contract.vendorId === vendorId);
  }

  async createContract(insertContract: InsertContract): Promise<Contract> {
    const contract: Contract = {
      ...insertContract,
      id: this.currentContractId++,
      submissionDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.contracts.set(contract.id, contract);
    return contract;
  }

  async updateContract(id: number, updates: Partial<Contract>): Promise<Contract | undefined> {
    const contract = this.contracts.get(id);
    if (!contract) return undefined;
    
    const updatedContract = { ...contract, ...updates, updatedAt: new Date() };
    this.contracts.set(id, updatedContract);
    return updatedContract;
  }

  async deleteContract(id: number): Promise<boolean> {
    return this.contracts.delete(id);
  }

  // AI Analysis methods
  async getAiAnalysesByContract(contractId: number): Promise<AiAnalysis[]> {
    return Array.from(this.aiAnalyses.values()).filter(analysis => analysis.contractId === contractId);
  }

  async createAiAnalysis(insertAiAnalysis: InsertAiAnalysis): Promise<AiAnalysis> {
    const aiAnalysis: AiAnalysis = {
      ...insertAiAnalysis,
      id: this.currentAiAnalysisId++,
      processedAt: new Date(),
    };
    this.aiAnalyses.set(aiAnalysis.id, aiAnalysis);
    return aiAnalysis;
  }

  // Notification methods
  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(notification => notification.userId === userId);
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const notification: Notification = {
      ...insertNotification,
      id: this.currentNotificationId++,
      createdAt: new Date(),
    };
    this.notifications.set(notification.id, notification);
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (!notification) return false;
    
    notification.isRead = true;
    this.notifications.set(id, notification);
    return true;
  }

  // Dashboard methods
  async getDashboardStats(): Promise<DashboardStats> {
    const contracts = Array.from(this.contracts.values());
    const totalContracts = contracts.length;
    
    // Calculate status distribution
    const statusDistribution = {
      approved: contracts.filter(c => c.status === "approved").length,
      pending: contracts.filter(c => c.status === "pending").length,
      needsMoreInformation: contracts.filter(c => c.status === "needs_review").length,
      rejected: contracts.filter(c => c.status === "rejected").length,
    };

    // Calculate approval rate
    const approvalRate = totalContracts > 0 ? ((statusDistribution.approved / totalContracts) * 100).toFixed(1) : "0";

    // Calculate total value
    const totalValue = contracts.reduce((sum, contract) => {
      return sum + (parseFloat(contract.value || "0"));
    }, 0);

    // Calculate industry data
    const industryData: { [key: string]: { value: string; contracts: number } } = {};
    contracts.forEach(contract => {
      if (!industryData[contract.industry]) {
        industryData[contract.industry] = { value: "0", contracts: 0 };
      }
      industryData[contract.industry].contracts++;
      industryData[contract.industry].value = (
        parseFloat(industryData[contract.industry].value) + parseFloat(contract.value || "0")
      ).toString();
    });

    // Format industry values
    Object.keys(industryData).forEach(industry => {
      const value = parseFloat(industryData[industry].value);
      if (value >= 1000000000) {
        industryData[industry].value = `$${(value / 1000000000).toFixed(1)}B`;
      } else if (value >= 1000000) {
        industryData[industry].value = `$${(value / 1000000).toFixed(0)}M`;
      } else if (value >= 1000) {
        industryData[industry].value = `$${(value / 1000).toFixed(0)}K`;
      } else {
        industryData[industry].value = `$${value.toFixed(0)}`;
      }
    });

    // Calculate expiring contracts (next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const expiringContracts = contracts.filter(contract => 
      contract.endDate && contract.endDate <= thirtyDaysFromNow && contract.endDate >= new Date()
    ).length;

    return {
      avgProcessingTime: "4.2 days",
      approvalRate: `${approvalRate}%`,
      expiringContracts,
      totalValue: totalValue >= 1000000000 ? `$${(totalValue / 1000000000).toFixed(1)}B` : `$${(totalValue / 1000000).toFixed(0)}M`,
      totalContracts,
      statusDistribution,
      industryData,
    };
  }
}

export const storage = new MemStorage();
