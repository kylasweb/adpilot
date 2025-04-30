
import React from "react";
import AppSidebar from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import UserProfileDropdown from "@/components/common/UserProfileDropdown";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-adpilot-background">
      <header className="h-16 border-b flex items-center px-4 lg:px-6 bg-white">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-semibold text-adpilot-primary">AdPilot</h1>
          </div>
          <div className="flex items-center gap-4">
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
