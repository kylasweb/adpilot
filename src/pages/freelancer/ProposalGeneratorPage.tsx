
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Check } from "lucide-react";

const ProposalGeneratorPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Proposal Generator</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Create professional proposals with AI-powered content assistance
            </p>
          </div>
          <Button>
            <span className="mr-2">+</span> New Proposal
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="h-full md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Recent Proposals</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-adpilot-text-muted">
                  No proposals created yet. Click "New Proposal" to create your first proposal.
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Proposal Templates</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">Web Design Proposal</div>
                  <div className="text-xs text-adpilot-text-muted mt-1">Standard web design proposal template</div>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">Marketing Services</div>
                  <div className="text-xs text-adpilot-text-muted mt-1">Digital marketing services proposal</div>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">Graphic Design</div>
                  <div className="text-xs text-adpilot-text-muted mt-1">Branding and graphic design proposal</div>
                </div>
                <div className="mt-3">
                  <Button variant="outline" size="sm" className="w-full">
                    <span className="mr-1">+</span> New Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500 text-white">
                <Check className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">AI Proposal Assistant</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-adpilot-text-secondary mb-4">
              Get AI-powered suggestions to improve your proposal content and increase your chance of winning clients.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-2">Generate Content For:</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="exec-summary" className="mr-2" />
                    <label htmlFor="exec-summary">Executive Summary</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="approach" className="mr-2" />
                    <label htmlFor="approach">Project Approach</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="timeline" className="mr-2" />
                    <label htmlFor="timeline">Timeline & Milestones</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="pricing" className="mr-2" />
                    <label htmlFor="pricing">Pricing & Packages</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Project Type:</h3>
                <select className="w-full p-2 border rounded mb-4">
                  <option>Web Development</option>
                  <option>Graphic Design</option>
                  <option>Content Writing</option>
                  <option>Digital Marketing</option>
                  <option>SEO Services</option>
                </select>
                
                <Button className="w-full">Generate Proposal Content</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProposalGeneratorPage;
