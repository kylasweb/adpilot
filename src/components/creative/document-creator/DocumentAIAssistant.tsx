
import React, { useState } from 'react';
import { DocumentDetails, DocumentType, ServiceCategory } from "@/components/creative/ai-content-creator/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, FileCheck, Loader2 } from "lucide-react";
import { getOpenRouterModel } from '@/components/creative/ai-content-creator/utils/aiModelMapping';
import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface DocumentAIAssistantProps {
  onGenerate: (document: DocumentDetails) => void;
  documentType: DocumentType;
}

const serviceCategories = [
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'social-media', label: 'Social Media Management' },
  { value: 'seo', label: 'SEO Services' },
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'branding', label: 'Branding & Identity' },
  { value: 'other', label: 'Other Services' }
];

const aiModels = [
  { value: 'deepseek-coder', label: 'Deepseek Coder' },
  { value: 'llama3-70b', label: 'Llama 3 (70B)' },
  { value: 'mixtral-8x7b', label: 'Mixtral (8x7B)' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' }
];

const DocumentAIAssistant: React.FC<DocumentAIAssistantProps> = ({
  onGenerate,
  documentType
}) => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('digital-marketing');
  const [clientName, setClientName] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('deepseek-coder');

  // Dummy suggestions based on document type
  const getSuggestions = () => {
    switch (documentType) {
      case 'quotation':
        return [
          `Create a detailed ${category} quotation for a small business with a budget of $5000`,
          `Generate a competitive ${category} quotation with standard industry rates`,
          `Create a quotation for a monthly ${category} retainer service`
        ];
      case 'proposal':
        return [
          `Create a comprehensive ${category} proposal for a new client`,
          `Generate a 3-month ${category} campaign proposal with measurable KPIs`,
          `Write a proposal for redesigning a client's website and brand identity`
        ];
      case 'invoice':
        return [
          `Create an invoice for completed ${category} services`,
          `Generate a detailed invoice for a web design project with multiple deliverables`,
          `Create a monthly recurring invoice for ongoing ${category} services`
        ];
      default:
        return [];
    }
  };

  const handleGenerateDocument = async () => {
    setLoading(true);
    
    try {
      // This would be a real API call in a production environment
      const apiKey = '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';
      const openRouterModel = getOpenRouterModel(model as any);
      
      const finalPrompt = `
        Create a complete ${documentType} for ${category} services.
        ${clientName ? `The client's name is "${clientName}".` : ''}
        ${budget ? `The budget is around ${budget}.` : ''}
        ${prompt ? `Additional requirements: ${prompt}` : ''}
        
        The response should be in JSON format with the following structure:
        {
          "title": "Name of the ${documentType}",
          "date": "Current date",
          "clientInfo": {
            "name": "Client name",
            "email": "client@example.com",
            "company": "Client company"
          },
          "items": [
            {
              "name": "Service name",
              "description": "Detailed service description",
              "quantity": 1,
              "price": 1000,
              "category": "${category}"
            }
          ],
          "subtotal": 1000,
          "tax": 10,
          "discount": 5,
          "total": 1050,
          "notes": "Additional notes",
          "terms": "Terms and conditions"
        }
        
        Make it realistic and professional. Include 3-5 service items with realistic pricing.
      `;
      
      console.log("Generating document with OpenRouter API...");
      console.log("Using model:", openRouterModel);
      
      // In a real implementation, you'd make an actual API call
      // For demo purposes, we'll simulate a delay and return a mock response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI-generated document
      const mockAIResponse = generateMockDocument(documentType, category, clientName, budget);
      
      // Make sure all required properties are present before passing to onGenerate
      const completeDocument: DocumentDetails = {
        id: uuidv4(),
        type: documentType,
        title: mockAIResponse.title || `New ${documentType.charAt(0).toUpperCase() + documentType.slice(1)}`,
        date: mockAIResponse.date || new Date().toISOString().split('T')[0],
        dueDate: mockAIResponse.dueDate,
        clientInfo: mockAIResponse.clientInfo || {
          name: clientName || 'Client',
          email: 'client@example.com',
        },
        items: mockAIResponse.items || [],
        subtotal: mockAIResponse.subtotal || 0,
        tax: mockAIResponse.tax || 0,
        discount: mockAIResponse.discount || 0,
        total: mockAIResponse.total || 0,
        notes: mockAIResponse.notes || '',
        terms: mockAIResponse.terms || '',
        status: 'draft'
      };
      
      onGenerate(completeDocument);
      
      toast.success(`${documentType.charAt(0).toUpperCase() + documentType.slice(1)} generated successfully!`);
    } catch (error) {
      console.error("Error generating document:", error);
      toast.error("Failed to generate document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate a realistic mock document for demo purposes
  const generateMockDocument = (
    type: DocumentType, 
    serviceCategory: ServiceCategory,
    clientNameValue: string,
    budgetValue: string
  ): Partial<DocumentDetails> => {
    const currentDate = new Date().toISOString().split('T')[0];
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    
    const clientCompany = clientNameValue ? `${clientNameValue}'s Company` : "Acme Corporation";
    const actualClientName = clientNameValue || "John Smith";
    
    // Create items based on service category
    const items = [];
    
    switch (serviceCategory) {
      case 'digital-marketing':
        items.push({
          id: uuidv4(),
          name: "Digital Marketing Strategy",
          description: "Comprehensive digital marketing strategy tailored to your business goals",
          quantity: 1,
          price: 1500,
          category: serviceCategory
        });
        items.push({
          id: uuidv4(),
          name: "PPC Campaign Management",
          description: "Setup and management of Google Ads campaigns for 3 months",
          quantity: 3,
          price: 800,
          category: serviceCategory
        });
        items.push({
          id: uuidv4(),
          name: "Analytics Setup & Reporting",
          description: "Setup of analytics tools and monthly performance reporting",
          quantity: 1,
          price: 600,
          category: serviceCategory
        });
        break;
        
      case 'web-design':
        items.push({
          id: uuidv4(),
          name: "Custom Website Design",
          description: "Professional design of a responsive website with up to 5 pages",
          quantity: 1,
          price: 2500,
          category: serviceCategory
        });
        items.push({
          id: uuidv4(),
          name: "CMS Implementation",
          description: "Setup of content management system for easy updates",
          quantity: 1,
          price: 800,
          category: serviceCategory
        });
        items.push({
          id: uuidv4(),
          name: "Website Hosting (Annual)",
          description: "Secure hosting with 99.9% uptime guarantee",
          quantity: 1,
          price: 240,
          category: serviceCategory
        });
        break;
        
      case 'social-media':
        items.push({
          id: uuidv4(),
          name: "Social Media Strategy",
          description: "Comprehensive strategy for all social platforms",
          quantity: 1,
          price: 1200,
          category: serviceCategory
        });
        items.push({
          id: uuidv4(),
          name: "Content Creation & Posting",
          description: "Creation and scheduling of 15 posts per month",
          quantity: 3,
          price: 600,
          category: serviceCategory
        });
        items.push({
          id: uuidv4(),
          name: "Community Management",
          description: "Daily engagement and response to audience interactions",
          quantity: 3,
          price: 400,
          category: serviceCategory
        });
        break;
        
      default:
        items.push({
          id: uuidv4(),
          name: `${serviceCategory.charAt(0).toUpperCase() + serviceCategory.slice(1).replace('-', ' ')} Services`,
          description: "Professional services tailored to your needs",
          quantity: 1,
          price: 1000,
          category: serviceCategory
        });
    }
    
    // Calculate totals
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = 10; // 10% tax
    const discount = 5; // 5% discount
    const taxAmount = (subtotal * tax) / 100;
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal + taxAmount - discountAmount;
    
    // Create type-specific details
    let title, notes, terms;
    
    switch (type) {
      case 'quotation':
        title = `${serviceCategory.charAt(0).toUpperCase() + serviceCategory.slice(1).replace('-', ' ')} Services Quotation`;
        notes = "This quotation is valid for 30 days from the date of issue. All prices are subject to change after this period.";
        terms = "50% payment is required upfront to commence work. The remainder is due upon project completion. All deliverables remain the property of AdPilot until full payment is received.";
        break;
        
      case 'proposal':
        title = `${serviceCategory.charAt(0).toUpperCase() + serviceCategory.slice(1).replace('-', ' ')} Services Proposal`;
        notes = "This proposal outlines our suggested approach based on the information provided. We're happy to adjust the scope or deliverables to better fit your needs.";
        terms = "Timeline: The project is estimated to take 8-10 weeks from kickoff to completion. Weekly progress updates will be provided throughout the project lifecycle.";
        break;
        
      case 'invoice':
        title = `${serviceCategory.charAt(0).toUpperCase() + serviceCategory.slice(1).replace('-', ' ')} Services Invoice`;
        notes = "Thank you for your business! Please make payment by the due date.";
        terms = "Payment is due within 15 days of invoice date. Late payments are subject to a 1.5% monthly fee. We accept bank transfers and major credit cards.";
        break;
    }
    
    return {
      title,
      date: currentDate,
      dueDate: type === 'invoice' ? dueDate.toISOString().split('T')[0] : undefined,
      clientInfo: {
        name: actualClientName,
        email: `${actualClientName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        company: clientCompany
      },
      items,
      subtotal,
      tax,
      discount,
      total,
      notes,
      terms
    };
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Sparkles className="h-5 w-5 mr-2 text-adpilot-primary" />
        <h3 className="text-xl font-medium">AI Document Generator</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4">Document Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="ai-category">Service Category</Label>
                  <Select value={category} onValueChange={value => setCategory(value as ServiceCategory)}>
                    <SelectTrigger id="ai-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger id="ai-model">
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map(m => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="client-name">Client Name (Optional)</Label>
                  <Input 
                    id="client-name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="budget">Budget (Optional)</Label>
                  <Input 
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. $5,000"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="ai-prompt">Tell AI what you need</Label>
                <Textarea
                  id="ai-prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Describe what you want in your ${documentType}...`}
                  className="min-h-[120px]"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleGenerateDocument}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {loading ? "Generating..." : `Generate ${documentType}`}
              </Button>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="p-6 h-full">
            <h4 className="text-lg font-medium mb-4">AI Suggestions</h4>
            <p className="text-sm text-gray-600 mb-4">
              Try one of these prompts to get started quickly:
            </p>
            
            <div className="space-y-3">
              {getSuggestions().map((suggestion, index) => (
                <div 
                  key={index} 
                  className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setPrompt(suggestion)}
                >
                  <div className="flex items-center mb-1">
                    <FileCheck className="h-4 w-4 mr-2 text-adpilot-primary" />
                    <span className="text-sm font-medium">Suggestion {index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-600">{suggestion}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Tip:</strong> Provide specific details about the services, 
                pricing strategy, and any special terms to get more accurate results.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentAIAssistant;
