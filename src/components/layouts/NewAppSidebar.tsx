import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Radio,
  FileText,
  Paintbrush,
  Mail,
  Briefcase,
  Layers,
  Activity,
  Database,
  LayoutDashboard,
  BookOpen,
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
  Gauge,
  Bot,
  Sparkles,
  Wrench,
  Target,
  TrendingUp,
  ShoppingCart,
  Globe,
  Zap
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NewAppSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NewAppSidebar = ({ isOpen, setIsOpen }: NewAppSidebarProps) => {
  const pathname = usePathname() || '';
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin';
  const organizationId = user?.organizationId;

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Restructured menu with logical grouping
  const menuGroups = [
    {
      title: "Core",
      items: [
        { href: "/", icon: LayoutDashboard, label: "Dashboard", tooltip: "View your marketing dashboard" },
        { href: "/cohorts", icon: Users, label: "Audience", tooltip: "Manage audience segments and personas" },
        { href: "/campaigns", icon: Radio, label: "Campaigns", tooltip: "Create and manage marketing campaigns" },
        { href: "/creative", icon: MessageSquare, label: "Creative", tooltip: "Manage creative assets and content" },
        { href: "/analytics", icon: BarChart2, label: "Analytics", tooltip: "View campaign performance metrics" },
      ]
    },
    {
      title: "AI Tools",
      items: [
        { href: "/tools/content-creator", icon: FileText, label: "Content Creator", tooltip: "AI-powered marketing content generator" },
        { href: "/tools/image-editor", icon: Paintbrush, label: "Image Editor", tooltip: "Create and edit marketing visuals" },
        { href: "/tools/chatbot-builder", icon: MessageSquare, label: "Chatbot Builder", tooltip: "Create AI chatbots for multiple platforms" },
        { href: "/tools/whatsapp-sender", icon: Phone, label: "WhatsApp Sender", tooltip: "Send bulk WhatsApp messages to contacts" },
        { href: "/tools/ai-assistant", icon: Bot, label: "AI Assistant", tooltip: "AI-powered marketing assistant" },
        ...(isAdmin ? [{ href: "/admin/storytelling", icon: BookOpen, label: "AI Storyteller", tooltip: "Create engaging marketing narratives with AI" }] : [])
      ]
    },
    {
      title: "Project Management",
      items: [
        { href: "/project-management", icon: Layers, label: "Dashboard", tooltip: "Project management dashboard" },
        { href: "/project-management/development", icon: Activity, label: "Development", tooltip: "Manage project development lifecycle" },
        { href: "/project-management/meetings", icon: Calendar, label: "Meetings", tooltip: "Schedule and manage project meetings" },
        { href: "/project-management/resources", icon: Database, label: "Resources", tooltip: "Manage project resources and assets" },
        { href: "/project-management/timelines", icon: Clock, label: "Timelines", tooltip: "Project timelines and schedules" },
        { href: "/project-management/team", icon: Users, label: "Team", tooltip: "Manage project teams" },
        { href: "/project-management/sharing", icon: Share, label: "Sharing", tooltip: "Share projects with stakeholders" },
        { href: "/project-management/collaboration", icon: Users, label: "Collaboration", tooltip: "Real-time project collaboration tools" },
      ]
    },
    {
      title: "Business Tools",
      items: [
        { href: "/crm", icon: Briefcase, label: "CRM", tooltip: "Customer relationship management" },
        { href: "/crm/accounting", icon: DollarSign, label: "Accounting", tooltip: "Financial management and accounting" },
        { href: "/crm/hrm", icon: UserPlus, label: "HRM", tooltip: "Human resource management" },
        { href: "/email-marketing", icon: Mail, label: "Email Marketing", tooltip: "Create and manage email campaigns" },
        { href: "/marketplace", icon: ShoppingCart, label: "Marketplace", tooltip: "Marketplace optimization tools" },
        { href: "/seo", icon: Search, label: "SEO Tools", tooltip: "Optimize your website for search engines" },
      ]
    },
    {
      title: "Administration",
      condition: isAdmin,
      items: [
        { href: "/admin/dashboard", icon: LayoutDashboard, label: "Admin Dashboard", tooltip: "Administrative dashboard" },
        { href: "/admin/users", icon: Users, label: "User Management", tooltip: "Manage system users" },
        { href: "/admin/organizations", icon: Building, label: "Organizations", tooltip: "Manage organizations" },
        { href: "/admin/integrations", icon: Plug, label: "Integrations", tooltip: "Manage system integrations" },
        { href: "/admin/api-management", icon: Database, label: "API Management", tooltip: "Manage API keys and connections" },
        { href: "/admin/security", icon: Lock, label: "Security", tooltip: "Manage security configurations" },
        { href: "/admin/billing", icon: CreditCard, label: "Billing", tooltip: "Manage billing and subscriptions" },
        { href: "/admin/settings", icon: Cog, label: "System Settings", tooltip: "Configure system settings" },
        { href: "/admin/compliance", icon: ClipboardCheck, label: "Compliance", tooltip: "Manage compliance and reporting" },
        { href: "/admin/analytics", icon: LineChart, label: "System Analytics", tooltip: "View advanced analytics" },
        { href: "/admin/content", icon: File, label: "Content", tooltip: "Manage system content" },
        { href: "/admin/health", icon: Gauge, label: "System Health", tooltip: "Monitor system health" },
      ]
    }
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto", 
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-adsilo-border px-4 lg:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-semibold text-adsilo-primary">Adsilo</span>
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
            {menuGroups.filter(group => !group.condition || group.condition).map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="text-xs font-semibold text-adsilo-text-muted tracking-wider uppercase">
                  {group.title}
                </div>
                <nav className="space-y-1 mt-2">
                  {group.items.map((item, itemIndex) => (
                    <Link key={itemIndex} href={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isActive(item.href) ? "default" : "ghost"}
                            className="w-full justify-start"
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
            
            <div className="mt-4">
              <div className="rounded-lg bg-muted p-3">
                <div className="flex items-center mb-2">
                  <Building2 className="h-5 w-5 mr-2 text-adsilo-primary" />
                  <span className="text-sm font-medium">Organization</span>
                </div>
                <div className="text-xs text-adsilo-text-muted">
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

export default NewAppSidebar;