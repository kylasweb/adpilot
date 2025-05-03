
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  FileText, 
  Clock, 
  FileCheck, 
  BarChart2,
  Info 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FreelancerPage: React.FC = () => {
  const tools = [
    {
      icon: Users,
      title: "Client Manager",
      description: "Manage your clients, contacts, and communication in one place",
      path: "/freelancer/client-manager",
      color: "text-blue-500",
      tooltip: "Organize client information, track communication history, and manage relationships efficiently"
    },
    {
      icon: Briefcase,
      title: "Project Management",
      description: "Track project progress, deadlines, and deliverables",
      path: "/freelancer/project-management",
      color: "text-purple-500",
      tooltip: "Plan projects with Gantt charts, set milestones, assign tasks, and monitor progress in real-time"
    },
    {
      icon: FileCheck,
      title: "Proposal Generator",
      description: "Create professional proposals with customizable templates",
      path: "/freelancer/proposal-generator",
      color: "text-green-500",
      tooltip: "Generate winning proposals with AI-powered content suggestions and customizable templates"
    },
    {
      icon: FileText,
      title: "Invoice Creator",
      description: "Generate and track invoices and payments",
      path: "/freelancer/invoice-creator",
      color: "text-amber-500",
      tooltip: "Create professional invoices, track payments, and send automated reminders for overdue invoices"
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Track billable hours and project time allocation",
      path: "/freelancer/time-tracking",
      color: "text-red-500",
      tooltip: "Record time spent on projects and tasks with detailed reporting and client billing integration"
    },
    {
      icon: BarChart2,
      title: "Freelance Analytics",
      description: "Visualize earnings, client distribution, and work patterns",
      path: "/freelancer/analytics",
      color: "text-teal-500",
      tooltip: "Get insights into your business performance with advanced analytics and customizable reports"
    },
  ];
  
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Freelancer Tools</h1>
          <p className="text-adpilot-text-secondary mt-1">Manage your freelance business with these specialized tools</p>
        </div>
        <Button>
          <span className="mr-2">+</span> Quick Start Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TooltipProvider delayDuration={300}>
          {tools.map((tool, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <tool.icon className={`h-6 w-6 ${tool.color}`} />
                      <CardTitle className="flex items-center">
                        {tool.title}
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </CardTitle>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={tool.path}>Open Tool</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] p-2">
                {tool.tooltip}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </AppLayout>
  );
};

export default FreelancerPage;
