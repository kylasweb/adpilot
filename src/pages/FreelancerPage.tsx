
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
  BarChart2 
} from "lucide-react";
import { Link } from "react-router-dom";

const FreelancerPage: React.FC = () => {
  const tools = [
    {
      icon: Users,
      title: "Client Manager",
      description: "Manage your clients, contacts, and communication in one place",
      path: "/freelancer/client-manager",
      color: "text-blue-500"
    },
    {
      icon: Briefcase,
      title: "Project Management",
      description: "Track project progress, deadlines, and deliverables",
      path: "/freelancer/project-management",
      color: "text-purple-500"
    },
    {
      icon: FileCheck,
      title: "Proposal Generator",
      description: "Create professional proposals with customizable templates",
      path: "/freelancer/proposal-generator",
      color: "text-green-500"
    },
    {
      icon: FileText,
      title: "Invoice Creator",
      description: "Generate and track invoices and payments",
      path: "/freelancer/invoice-creator",
      color: "text-amber-500"
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Track billable hours and project time allocation",
      path: "/freelancer/time-tracking",
      color: "text-red-500"
    },
    {
      icon: BarChart2,
      title: "Freelance Analytics",
      description: "Visualize earnings, client distribution, and work patterns",
      path: "/freelancer/analytics",
      color: "text-teal-500"
    },
  ];
  
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Freelancer Tools</h1>
          <p className="text-adpilot-text-secondary mt-1">Manage your freelance business with these specialized tools</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <tool.icon className={`h-6 w-6 ${tool.color}`} />
                <CardTitle>{tool.title}</CardTitle>
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to={tool.path}>Open Tool</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default FreelancerPage;
