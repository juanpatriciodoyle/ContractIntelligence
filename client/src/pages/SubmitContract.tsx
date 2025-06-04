import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  Scan, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Shield,
  Brain,
  Building
} from "lucide-react";

export default function SubmitContract() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [contractData, setContractData] = useState({
    title: "",
    description: "",
    value: "",
    currency: "USD",
    startDate: "",
    endDate: "",
    industry: "",
    terms: "",
    deliverables: ""
  });
  const [ocrResults, setOcrResults] = useState({
    extractedText: "",
    confidence: 0,
    keyFields: {},
    suggestions: []
  });
  const [verificationResults, setVerificationResults] = useState({
    companyVerified: false,
    taxIdValid: false,
    registrationValid: false,
    complianceCheck: false
  });

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
      setStep(2);
      simulateOCR();
    }
  };

  const simulateOCR = () => {
    // Simulate OCR processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setOcrProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setOcrResults({
          extractedText: "Cloud Infrastructure Services Agreement\n\nParties: TechCorp Solutions Inc. and Global Enterprises Ltd.\nContract Value: $2,400,000 USD\nTerm: January 1, 2024 to December 31, 2024\nServices: Cloud infrastructure management, 24/7 support, data backup\nPayment Terms: Monthly billing, Net 30 days\nSLA: 99.9% uptime guarantee",
          confidence: 94,
          keyFields: {
            contractTitle: "Cloud Infrastructure Services Agreement",
            parties: "TechCorp Solutions Inc., Global Enterprises Ltd.",
            value: "$2,400,000",
            term: "12 months",
            services: "Cloud infrastructure management"
          },
          suggestions: [
            "Consider adding penalty clauses for SLA violations",
            "Review liability caps in Section 8",
            "Verify data protection compliance requirements"
          ]
        });
        setStep(3);
        simulateGovernmentVerification();
      }
    }, 200);
  };

  const simulateGovernmentVerification = () => {
    // Simulate government API verification
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      setVerificationProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setVerificationResults({
          companyVerified: true,
          taxIdValid: true,
          registrationValid: true,
          complianceCheck: true
        });
        setStep(4);
        
        // Auto-populate form fields based on OCR
        setContractData(prev => ({
          ...prev,
          title: "Cloud Infrastructure Services Agreement",
          value: "2400000",
          industry: "Technology",
          description: "Cloud infrastructure management services with 24/7 support"
        }));
      }
    }, 300);
  };

  const submitContract = () => {
    toast({
      title: "Contract Submitted",
      description: "Your contract has been submitted for review and AI analysis",
    });
    setStep(5);
  };

  const steps = [
    { id: 1, title: "Upload Document", icon: Upload },
    { id: 2, title: "OCR Processing", icon: Scan },
    { id: 3, title: "Government Verification", icon: Shield },
    { id: 4, title: "Review & Submit", icon: Eye },
    { id: 5, title: "Complete", icon: CheckCircle }
  ];

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
          <Upload className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Submit New Contract</h1>
        </div>
        <p className="text-gray-600">Upload and process your contract with AI-powered analysis</p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((stepItem, index) => {
                const Icon = stepItem.icon;
                const isActive = step === stepItem.id;
                const isCompleted = step > stepItem.id;
                
                return (
                  <div key={stepItem.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-primary text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-primary' : 
                        isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {stepItem.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`ml-6 w-16 h-0.5 ${
                        step > stepItem.id ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {step === 1 && "Upload Contract Document"}
                {step === 2 && "OCR Processing"}
                {step === 3 && "Government Verification"}
                {step === 4 && "Review Contract Details"}
                {step === 5 && "Submission Complete"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: File Upload */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Contract Document</h3>
                    <p className="text-gray-500 mb-4">Drag and drop your contract or click to browse</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload">
                      <Button className="cursor-pointer">
                        Choose File
                      </Button>
                    </Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                  </p>
                </div>
              )}

              {/* Step 2: OCR Processing */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Scan className="w-6 h-6 text-primary animate-pulse" />
                    <h3 className="text-lg font-medium">Processing Document with OCR</h3>
                  </div>
                  <Progress value={ocrProgress} className="w-full" />
                  <p className="text-sm text-gray-600">
                    Extracting text and identifying key contract elements...
                  </p>
                  
                  {ocrProgress === 100 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">OCR Complete</span>
                          <Badge className="bg-green-100 text-green-700">
                            {ocrResults.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-green-700">
                          Successfully extracted text and identified key contract fields
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 3: Government Verification */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-primary animate-pulse" />
                    <h3 className="text-lg font-medium">Government API Verification</h3>
                  </div>
                  <Progress value={verificationProgress} className="w-full" />
                  <p className="text-sm text-gray-600">
                    Verifying company registration, tax status, and compliance...
                  </p>
                  
                  {verificationProgress === 100 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Company Verified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Tax ID Valid</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Registration Valid</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Compliance Check</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 4: Review Form */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Contract Title</Label>
                      <Input
                        id="title"
                        value={contractData.title}
                        onChange={(e) => setContractData(prev => ({...prev, title: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={contractData.industry} onValueChange={(value) => 
                        setContractData(prev => ({...prev, industry: value}))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={contractData.description}
                      onChange={(e) => setContractData(prev => ({...prev, description: e.target.value}))}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="value">Contract Value</Label>
                      <Input
                        id="value"
                        value={contractData.value}
                        onChange={(e) => setContractData(prev => ({...prev, value: e.target.value}))}
                        placeholder="Enter value"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={contractData.currency} onValueChange={(value) => 
                        setContractData(prev => ({...prev, currency: value}))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={contractData.startDate}
                        onChange={(e) => setContractData(prev => ({...prev, startDate: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={contractData.endDate}
                        onChange={(e) => setContractData(prev => ({...prev, endDate: e.target.value}))}
                      />
                    </div>
                  </div>

                  <Button onClick={submitContract} className="w-full">
                    Submit Contract for Review
                  </Button>
                </div>
              )}

              {/* Step 5: Complete */}
              {step === 5 && (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-900">Contract Submitted Successfully!</h3>
                  <p className="text-gray-600">
                    Your contract has been submitted and is now being processed by our AI system.
                    You'll receive notifications about the review progress.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Next Steps:</strong> AI analysis is in progress. Expected review time: 2-4 hours.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* OCR Results */}
          {step >= 3 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Extraction Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Confidence Score</Label>
                  <div className="flex items-center space-x-2">
                    <Progress value={ocrResults.confidence} className="flex-1" />
                    <span className="text-sm font-medium">{ocrResults.confidence}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Key Fields Detected</Label>
                  <div className="space-y-1 text-sm">
                    <div>Title: Cloud Infrastructure Services</div>
                    <div>Value: $2,400,000</div>
                    <div>Term: 12 months</div>
                    <div>Parties: 2 entities verified</div>
                  </div>
                </div>

                {ocrResults.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">AI Suggestions</Label>
                    <div className="space-y-1">
                      {ocrResults.suggestions.map((suggestion, index) => (
                        <div key={index} className="text-xs text-amber-700 bg-amber-50 p-2 rounded">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Verification Status */}
          {step >= 4 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Company Registration</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tax ID Verification</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Compliance Check</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Legal Standing</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}