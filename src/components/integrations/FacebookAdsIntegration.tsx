
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Facebook, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";

interface Account {
  id: string;
  name: string;
  status: string;
}

const FacebookAdsIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([
    { id: "act_12345", name: "Main Business Account", status: "active" },
    { id: "act_67890", name: "Brand Marketing", status: "active" },
    { id: "act_24680", name: "Product Promotions", status: "paused" },
  ]);

  const handleConnect = () => {
    if (!accessToken.trim()) {
      toast.error("Please enter a valid access token");
      return;
    }
    
    // Simulate connection process
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setIsConnected(true);
          resolve(true);
        }, 1500);
      }),
      {
        loading: "Connecting to Facebook Ads...",
        success: "Successfully connected to Facebook Ads!",
        error: "Failed to connect. Please check your access token."
      }
    );
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAccessToken("");
    toast.success("Disconnected from Facebook Ads");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2 w-10 h-10 flex items-center justify-center">
              <Facebook className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>Facebook Ads</CardTitle>
              <CardDescription>Connect your Facebook Ads account</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <p className="text-sm">
                Connect your Facebook Ads account to create and manage campaigns directly from AdPilot.
              </p>
              <div className="space-y-2">
                <label htmlFor="access-token" className="text-sm font-medium">
                  Access Token
                </label>
                <Input 
                  id="access-token" 
                  placeholder="Enter your Facebook Ads access token"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  type="password"
                />
                <p className="text-xs text-muted-foreground">
                  You can find your access token in the Facebook Ads Manager.{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Learn how to get an access token
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert variant="default" className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-600">Connected</AlertTitle>
                <AlertDescription>
                  Your Facebook Ads account is connected and working properly.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Connected Ad Accounts</h3>
                <div className="space-y-2">
                  {accounts.map((account) => (
                    <div 
                      key={account.id} 
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-xs text-muted-foreground">{account.id}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          account.status === "active" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {account.status === "active" ? "Active" : "Paused"}
                        </span>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Permission Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Read Campaign Data</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Manage Campaigns</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Manage Ads</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span>Business Manager Access</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isConnected ? (
            <>
              <Button variant="outline">Learn More</Button>
              <Button onClick={handleConnect}>Connect</Button>
            </>
          ) : (
            <>
              <Button variant="outline">Refresh Token</Button>
              <Button variant="destructive" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
            <CardDescription>Configure your Facebook Ads integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Data Sync Settings</h3>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Auto-sync campaign data</p>
                  <p className="text-xs text-muted-foreground">
                    Automatically pull campaign performance data every 6 hours
                  </p>
                </div>
                <Button size="sm">Configure</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Default Settings</h3>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Default ad account</p>
                  <p className="text-xs text-muted-foreground">
                    Set which account to use by default when creating campaigns
                  </p>
                </div>
                <Button size="sm" variant="outline">Change</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FacebookAdsIntegration;
