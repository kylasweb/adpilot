
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  BarChart, 
  Calendar, 
  Settings, 
  Users, 
  LayoutDashboard, 
  FileText, 
  Database, 
  Activity,
  X,
  Edit,
  Lightbulb,
  Image,
  FileText2,
  Search,
  Globe,
  LineChart,
  Link as LinkIcon
} from "lucide-react";

interface AppSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppSidebar = ({ isOpen, setIsOpen }: AppSidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Define navigation items
  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Cohorts & Personas",
      href: "/cohorts",
      icon: Users,
    },
    {
      title: "Campaign Planner",
      href: "/campaigns",
      icon: Calendar,
    },
    {
      title: "Creative Studio",
      href: "/creative",
      icon: FileText,
    },
    {
      title: "SEO Tools",
      href: "/seo",
      icon: Search,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart,
    },
  ];
  
  const creativeTools = [
    {
      title: "AI Content Creator",
      href: "/tools/content-creator",
      icon: Edit,
    },
    {
      title: "Document Creator",
      href: "/tools/document-creator",
      icon: FileText2,
    },
    {
      title: "Image Editor",
      href: "/tools/image-editor",
      icon: Image,
    },
  ];
  
  const seoTools = [
    {
      title: "Keyword Research",
      href: "/seo/keywords",
      icon: Search,
    },
    {
      title: "Content Analyzer",
      href: "/seo/analyzer",
      icon: LineChart,
    },
    {
      title: "SEO Audit",
      href: "/seo/audit",
      icon: Globe,
    },
    {
      title: "Backlink Manager",
      href: "/seo/backlinks",
      icon: LinkIcon,
    },
  ];
  
  const adminNavItems = [
    {
      title: "Users & Teams",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Integrations",
      href: "/admin/integrations",
      icon: Database,
    },
    {
      title: "Activity Log",
      href: "/admin/activity",
      icon: Activity,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  if (!isOpen) {
    return (
      <div className="w-16 border-r bg-white flex flex-col items-center py-4">
        {mainNavItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            size="icon"
            asChild
            className="mb-2"
          >
            <Link to={item.href}>
              <item.icon className={cn(
                "h-5 w-5",
                location.pathname === item.href ? "text-adpilot-primary" : "text-adpilot-text-secondary"
              )} />
            </Link>
          </Button>
        ))}
        <div className="mt-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(true)}
          >
            <Settings className="h-5 w-5 text-adpilot-text-secondary" />
          </Button>
        </div>
      </div>
    );
  }

  const sidebarContent = (
    <div className={cn(
      "flex h-full w-64 flex-col border-r bg-white",
      isMobile && "fixed inset-y-0 left-0 z-50"
    )}>
      <div className="flex items-center justify-between px-4 py-2 h-16 border-b">
        <div className="flex items-center">
          <span className="text-xl font-semibold text-adpilot-primary">AdPilot</span>
        </div>
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="px-3 text-xs font-semibold text-adpilot-text-muted uppercase tracking-wider">
              Main
            </div>
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === item.href
                      ? "bg-adpilot-primary text-white"
                      : "text-adpilot-text-secondary hover:bg-adpilot-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="space-y-2">
            <div className="px-3 text-xs font-semibold text-adpilot-text-muted uppercase tracking-wider">
              Creative Tools
            </div>
            <nav className="space-y-1">
              {creativeTools.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === item.href
                      ? "bg-adpilot-primary text-white"
                      : "text-adpilot-text-secondary hover:bg-adpilot-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-2">
            <div className="px-3 text-xs font-semibold text-adpilot-text-muted uppercase tracking-wider">
              SEO Tools
            </div>
            <nav className="space-y-1">
              {seoTools.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === item.href
                      ? "bg-adpilot-primary text-white"
                      : "text-adpilot-text-secondary hover:bg-adpilot-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="space-y-2">
            <div className="px-3 text-xs font-semibold text-adpilot-text-muted uppercase tracking-wider">
              Admin
            </div>
            <nav className="space-y-1">
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === item.href
                      ? "bg-adpilot-primary text-white"
                      : "text-adpilot-text-secondary hover:bg-adpilot-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          {/* Profile section */}
          <div className="h-8 w-8 rounded-full bg-adpilot-muted flex items-center justify-center">
            <span className="text-sm font-medium text-adpilot-primary">AP</span>
          </div>
          <div>
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-adpilot-text-muted">admin@adpilot.com</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
        )}
        {sidebarContent}
      </>
    );
  }

  return sidebarContent;
};

export default AppSidebar;
