
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-adpilot-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-adpilot-text-secondary mb-6">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/auth/login">Switch Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
