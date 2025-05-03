
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
} from "lucide-react";

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
        <div className="px-4 lg:px-6 space-y-6">
          <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
            Core
          </div>
          <nav className="space-y-1">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/cohorts">
              <Button
                variant={isActive("/cohorts") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Audience
              </Button>
            </Link>
            <Link to="/campaigns">
              <Button
                variant={isActive("/campaigns") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Radio className="mr-2 h-4 w-4" />
                Campaigns
              </Button>
            </Link>
            <Link to="/creative">
              <Button
                variant={isActive("/creative") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Creative
              </Button>
            </Link>
            <Link to="/analytics">
              <Button
                variant={isActive("/analytics") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
          </nav>

          <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
            Tools
          </div>
          <nav className="space-y-1">
            <Link to="/tools/content-creator">
              <Button
                variant={isActive("/tools/content-creator") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <FileText className="mr-2 h-4 w-4" />
                Content Creator
              </Button>
            </Link>
            <Link to="/tools/image-editor">
              <Button
                variant={isActive("/tools/image-editor") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Paintbrush className="mr-2 h-4 w-4" />
                Image Editor
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/admin/storytelling">
                <Button
                  variant={isActive("/admin/storytelling") ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  AI Storyteller
                </Button>
              </Link>
            )}
          </nav>

          <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
            Marketing
          </div>
          <nav className="space-y-1">
            <Link to="/digital-marketing/dashboard">
              <Button
                variant={isActive("/digital-marketing") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Globe className="mr-2 h-4 w-4" />
                Digital Marketing
              </Button>
            </Link>
            <Link to="/email-marketing">
              <Button
                variant={isActive("/email-marketing") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Marketing
              </Button>
            </Link>
            <Link to="/seo">
              <Button
                variant={isActive("/seo") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <PieChart className="mr-2 h-4 w-4" />
                SEO Tools
              </Button>
            </Link>
          </nav>

          <Link to="/freelancer">
            <Button
              variant={isActive("/freelancer") ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Freelancer Tools
            </Button>
          </Link>
          
          {/* Show Admin section only for admin users */}
          {isAdmin && (
            <>
              <div className="text-xs font-semibold text-adpilot-text-muted tracking-wider uppercase">
                Administration
              </div>
              <nav className="space-y-1">
                <Link to="/admin/dashboard">
                  <Button
                    variant={isActive("/admin/dashboard") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Layers className="mr-2 h-4 w-4" />
                    SAAS Dashboard
                  </Button>
                </Link>
                <Link to="/admin/users">
                  <Button
                    variant={isActive("/admin/users") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Users & Teams
                  </Button>
                </Link>
                <Link to="/admin/integrations">
                  <Button
                    variant={isActive("/admin/integrations") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Database className="mr-2 h-4 w-4" />
                    Integrations
                  </Button>
                </Link>
                <Link to="/admin/activity">
                  <Button
                    variant={isActive("/admin/activity") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    Activity Log
                  </Button>
                </Link>
                <Link to="/admin/settings">
                  <Button
                    variant={isActive("/admin/settings") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
                <Link to="/admin/storytelling">
                  <Button
                    variant={isActive("/admin/storytelling") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    AI Storyteller
                  </Button>
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
      </ScrollArea>
    </aside>
  );
};

export default AppSidebar;
