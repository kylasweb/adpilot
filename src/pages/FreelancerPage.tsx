
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Clock, Clipboard, FileText, Database } from "lucide-react";
import { Link } from "react-router-dom";

const FreelancerPage = () => {
  const freelancerTools = [
    {
      title: "Client Manager",
      description: "Organize and manage your client relationships and communications",
      icon: UserCheck,
      href: "/freelancer/clients",
      color: "bg-blue-500",
    },
    {
      title: "Time Tracking",
      description: "Track time spent on projects and tasks with detailed reporting",
      icon: Clock,
      href: "/freelancer/time-tracking",
      color: "bg-green-500",
    },
    {
      title: "Project Management",
      description: "Manage your projects with tasks, milestones, and deadlines",
      icon: Clipboard,
      href: "/freelancer/projects",
      color: "bg-purple-500",
    },
    {
      title: "Proposal Generator",
      description: "Create professional proposals with AI-powered content assistance",
      icon: FileText,
      href: "/freelancer/proposals",
      color: "bg-orange-500",
    },
    {
      title: "Invoice Creator",
      description: "Generate invoices and track payments from your clients",
      icon: Database,
      href: "/freelancer/invoices",
      color: "bg-pink-500",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Freelancer Hub</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Comprehensive tools for freelancers to manage clients, projects, time, and finances
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {freelancerTools.map((tool) => (
            <Link key={tool.href} to={tool.href} className="group">
              <Card className="h-full hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default FreelancerPage;
