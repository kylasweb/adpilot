
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  MessageSquare,
  Globe,
  FileText,
  Mail,
  PieChart,
  Briefcase,
  ListChecks,
  Phone,
  Zap
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-adpilot-primary">AdPilot</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Banner */}
        <section className="py-20 bg-[url('/placeholder.svg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">All-in-One Digital Marketing Platform</h1>
              <p className="text-xl mb-10">
                Your complete toolkit for marketing campaigns, SEO, creative content generation, and audience management.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="text-lg px-8">
                    Start Free Trial
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white hover:text-black">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Marketing Tools</h2>
              <p className="text-xl text-adpilot-text-secondary max-w-3xl mx-auto">
                Everything you need to create, manage, and analyze your marketing campaigns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-adpilot-primary/10 mb-4">
                      <feature.icon className="h-6 w-6 text-adpilot-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Tools Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Specialized Tools</h2>
              <p className="text-xl text-adpilot-text-secondary max-w-3xl mx-auto">
                Advanced solutions for every marketing challenge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <Card key={tool.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className={`w-10 h-10 rounded-full ${tool.color} flex items-center justify-center mb-2`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-adpilot-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of marketers who use AdPilot to scale their business.
            </p>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white hover:text-adpilot-primary">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">AdPilot</h3>
              <p className="mb-4">Your complete marketing toolkit in one platform.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Features</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/campaigns" className="hover:text-white">Campaigns</Link></li>
                <li><Link to="/analytics" className="hover:text-white">Analytics</Link></li>
                <li><Link to="/seo" className="hover:text-white">SEO Tools</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Tutorials</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} AdPilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature cards data
const features = [
  {
    icon: LayoutDashboard,
    title: "Comprehensive Dashboard",
    description: "Get a 360° view of your marketing performance with intuitive analytics."
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Builder",
    description: "Create intelligent chatbots for multiple platforms with our advanced builder."
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "Plan and execute campaigns across multiple digital channels."
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Create, send, and analyze email campaigns with advanced segmentation."
  },
  {
    icon: PieChart,
    title: "SEO Tools",
    description: "Optimize your website's visibility with our comprehensive SEO toolkit."
  },
  {
    icon: Phone,
    title: "WhatsApp Bulk Sender",
    description: "Send personalized messages to customers at scale with WhatsApp integration."
  }
];

// Tools grid data
const tools = [
  {
    icon: FileText,
    title: "Content Creator",
    description: "AI-powered content generation for all your marketing needs.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: MessageSquare,
    title: "Chatbot Builder",
    description: "Build intelligent chatbots for websites and messaging platforms.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Phone,
    title: "WhatsApp Marketing",
    description: "Bulk message sending with advanced targeting and analytics.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: ListChecks,
    title: "SEO Checklist",
    description: "Comprehensive 500-point checklist for website optimization.",
    color: "bg-amber-100 text-amber-600"
  },
  {
    icon: PieChart,
    title: "Analytics Suite",
    description: "In-depth reporting tools to measure campaign performance.",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Globe,
    title: "Social Media Tools",
    description: "Schedule and automate posts across all platforms.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: Mail,
    title: "Email Templates",
    description: "Beautiful, responsive templates for email marketing.",
    color: "bg-teal-100 text-teal-600"
  },
  {
    icon: Zap,
    title: "AI Storytelling",
    description: "Generate engaging marketing narratives powered by AI.",
    color: "bg-orange-100 text-orange-600"
  }
];

export default LandingPage;
