
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Calendar, Users, Clock, Share2, MessagesSquare, Bot, Briefcase } from "lucide-react";

const AdvancedProjectPage = () => {
  const projectFeatures = [
    {
      title: "Project Development",
      description: "Create and manage project tasks, milestones, and progress",
      href: "/project-management/development",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Meetings",
      description: "Schedule and organize project meetings with your team",
      href: "/project-management/meetings",
      icon: Calendar,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Resources",
      description: "Manage project resources and assets",
      href: "/project-management/resources",
      icon: Briefcase,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Timelines",
      description: "Plan and visualize project timelines and deadlines",
      href: "/project-management/timelines",
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Team",
      description: "Manage team members and their roles",
      href: "/project-management/team",
      icon: Users,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Sharing",
      description: "Share projects and set permissions",
      href: "/project-management/sharing",
      icon: Share2,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Collaboration",
      description: "Real-time collaboration tools for teams",
      href: "/project-management/collaboration",
      icon: MessagesSquare,
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "AI Assistant",
      description: "AI-powered project management assistance",
      href: "/project-management/ai-assistant",
      icon: Bot,
      color: "bg-red-100 text-red-600",
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Advanced Project Management</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Comprehensive tools for efficient project management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectFeatures.map((feature) => (
            <Link key={feature.title} to={feature.href}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center mb-2`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdvancedProjectPage;
