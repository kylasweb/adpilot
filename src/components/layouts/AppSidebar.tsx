
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  X,
  PieChart,
  Users,
  MessageSquare,
  BarChart2,
  Settings,
  Shield,
  Radio,
  FileText,
  Paintbrush,
  Globe,
  Mail,
  Briefcase,
  Layers,
  Activity,
  Database,
  LayoutDashboard,
  BookOpen,
  Key,
  Phone,
  ListChecks,
  Calendar,
  Clock,
  Share,
  Search,
  Building2,
  DollarSign,
  UserPlus,
  Lock,
  CreditCard,
  Cog,
  Building,
  Plug,
  ClipboardCheck,
  LineChart,
  File,
  Gauge
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AppSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AppSidebar = ({ isOpen, setIsOpen }: AppSidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin';
  const organizationId = user?.organizationId;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto", 
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold text-adpilot-primary">AdPilot</span>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(false)}
          className="lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)] py-4">
        <TooltipProvider>
          <div className="px-4 lg:px-6 space-y-6">
            <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
              Core
            </div>
            <nav className="space-y-1">
              <Link to="/">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    View your marketing dashboard
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/cohorts">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/cohorts") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Audience
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Manage audience segments and personas
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/campaigns">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/campaigns") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Radio className="mr-2 h-4 w-4" />
                      Campaigns
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Create and manage marketing campaigns
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/creative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/creative") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Creative
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Manage creative assets and content
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/analytics">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/analytics") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Analytics
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    View campaign performance metrics
                  </TooltipContent>
                </Tooltip>
              </Link>
            </nav>

            {/* Advanced Project Management Section */}
            <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
              Project Management
            </div>
            <nav className="space-y-1">
              <Link to="/project-management">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/project-management") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Project Dashboard
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Comprehensive project management dashboard
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/project-management/development">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/project-management/development") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      Project Development
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Manage project development lifecycle
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/project-management/meetings">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/project-management/meetings") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Meetings
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Schedule and manage project meetings
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/project-management/resources">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/project-management/resources") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Database className="mr-2 h-4 w-4" />
                      Resources
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Manage project resources and assets
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/project-management/timelines">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/project-management/timelines") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Timelines
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Project timelines and schedules
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/project-management/team">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/project-management/team") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Team
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Manage project teams
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/project-management/sharing">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/project-management/sharing") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Sharing
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Share projects with stakeholders
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/project-management/collaboration">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/project-management/collaboration") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Collaboration
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Real-time project collaboration tools
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/project-management/ai-assistant">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/project-management/ai-assistant") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      AI Assistant
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    AI-powered project management assistant
                  </TooltipContent>
                </Tooltip>
              </Link>
            </nav>

            <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
              CRM & Business
            </div>
            <nav className="space-y-1">
              <Link to="/crm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/crm") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Advanced CRM
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Customer relationship management suite
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/crm/accounting">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/crm/accounting") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Accounting
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Financial management and accounting
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/crm/hrm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/crm/hrm") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      HRM
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Human resource management
                  </TooltipContent>
                </Tooltip>
              </Link>
            </nav>

            <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
              Tools
            </div>
            <nav className="space-y-1">
              <Link to="/tools/content-creator">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/tools/content-creator") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Content Creator
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    AI-powered marketing content generator
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/tools/image-editor">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/tools/image-editor") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Paintbrush className="mr-2 h-4 w-4" />
                      Image Editor
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Create and edit marketing visuals
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/tools/chatbot-builder">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/tools/chatbot-builder") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chatbot Builder
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Create AI chatbots for multiple platforms
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/tools/whatsapp-sender">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/tools/whatsapp-sender") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      WhatsApp Sender
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Send bulk WhatsApp messages to contacts
                  </TooltipContent>
                </Tooltip>
              </Link>
              {isAdmin && (
                <Link to="/admin/storytelling">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive("/admin/storytelling") ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        AI Storyteller
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Create engaging marketing narratives with AI
                    </TooltipContent>
                  </Tooltip>
                </Link>
              )}
            </nav>

            {isAdmin && (
              <>
                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  Security & Authentication
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/security">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/security") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          Security Settings
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage security configurations
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>

                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  Billing & Subscription
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/billing">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/billing") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Billing Management
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage billing and subscriptions
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>

                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  System Configuration
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/settings">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/settings") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Cog className="mr-2 h-4 w-4" />
                          System Settings
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Configure system settings
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>

                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  Organization Management
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/organizations">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/organizations") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Building className="mr-2 h-4 w-4" />
                          Organizations
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage organizations
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>

                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  Advanced User Management
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/users">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/users") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          User Management
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage system users
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>

                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  Integrations Hub
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/integrations">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/integrations") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Plug className="mr-2 h-4 w-4" />
                          Integrations
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage system integrations
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>

                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  Compliance & Reporting
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/compliance">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/compliance") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <ClipboardCheck className="mr-2 h-4 w-4" />
                          Compliance
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage compliance and reporting
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>

                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  Advanced Analytics
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/analytics">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/analytics") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <LineChart className="mr-2 h-4 w-4" />
                          Analytics
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        View advanced analytics
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>

                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  Content Management
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/content">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/content") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <File className="mr-2 h-4 w-4" />
                          Content
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage system content
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>

                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase mt-6">
                  System Health
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/health">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/health") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Gauge className="mr-2 h-4 w-4" />
                          System Health
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Monitor system health
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>
              </>
            )}

            <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
              Marketplace & SEO
            </div>
            <nav className="space-y-1">
              <Link to="/marketplace">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/marketplace") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      Marketplace Optimization
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Advanced marketplace optimization tools
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/marketplace/checklist">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/marketplace/checklist") ? "default" : "ghost"}
                      className="w-full justify-start pl-9"
                    >
                      <ListChecks className="mr-2 h-4 w-4" />
                      Checklist
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Marketplace optimization checklists
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/marketplace/configurators">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/marketplace/configurators") ? "default" : "ghost"}
                      className="w-full justify-start pl-9"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configurators
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Product configurator settings
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/marketplace/product-seo">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/marketplace/product-seo") ? "default" : "ghost"}
                      className="w-full justify-start pl-9"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Product SEO
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    SEO optimization for marketplace products
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/digital-marketing/dashboard">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/digital-marketing") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Digital Marketing
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Manage digital marketing campaigns
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/email-marketing">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/email-marketing") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email Marketing
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Create and manage email campaigns
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/seo">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/seo") ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <PieChart className="mr-2 h-4 w-4" />
                      SEO Tools
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Optimize your website for search engines
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/seo/technical-analyzer">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/seo/technical-analyzer") ? "default" : "ghost"}
                      className="w-full justify-start pl-9"
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      Technical SEO
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Advanced technical SEO analysis tools
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/seo/local-manager">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/seo/local-manager") ? "default" : "ghost"}
                      className="w-full justify-start pl-9"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Local SEO Manager
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Manage local SEO and business listings
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link to="/seo/checklist">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive("/seo/checklist") ? "default" : "ghost"}
                      className="w-full justify-start pl-9"
                    >
                      <ListChecks className="mr-2 h-4 w-4" />
                      SEO Checklist
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    500-point SEO & web design checklist
                  </TooltipContent>
                </Tooltip>
              </Link>
            </nav>

            <Link to="/freelancer">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive("/freelancer") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Freelancer Tools
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Tools for freelance marketers
                </TooltipContent>
              </Tooltip>
            </Link>
            
            {/* Show Admin section only for admin users */}
            {isAdmin && (
              <>
                <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
                  Administration
                </div>
                <nav className="space-y-1">
                  <Link to="/admin/dashboard">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/dashboard") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Layers className="mr-2 h-4 w-4" />
                          SAAS Dashboard
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Administrative SAAS dashboard
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                  <Link to="/admin/users">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/users") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Users & Teams
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage users and teams
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                  <Link to="/admin/integrations">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/integrations") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Database className="mr-2 h-4 w-4" />
                          Integrations
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage third-party integrations
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                  <Link to="/admin/api-management">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/api-management") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Key className="mr-2 h-4 w-4" />
                          API Management
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Manage API keys and connections
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                  <Link to="/admin/activity">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/activity") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Activity className="mr-2 h-4 w-4" />
                          Activity Log
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        View system activity logs
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                  <Link to="/admin/settings">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/settings") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Configure system settings
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                  <Link to="/admin/storytelling">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive("/admin/storytelling") ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          AI Storyteller
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Create engaging marketing narratives with AI
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </nav>
              </>
            )}
            
            <div className="mt-4">
              <div className="rounded-lg bg-muted p-3">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 mr-2 text-adpilot-primary" />
                  <span className="text-sm font-medium">Organization</span>
                </div>
                <div className="text-xs text-adpilot-text-muted">
                  ID: {organizationId || "Not assigned"}
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </ScrollArea>
    </aside>
  );
};

export default AppSidebar;
