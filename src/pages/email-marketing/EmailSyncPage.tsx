
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Inbox, Mail, RefreshCw } from "lucide-react";

const EmailSyncPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Email Sync</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Sync your emails from Gmail, Outlook, and other providers
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <Inbox className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Connected Email Accounts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-adpilot-text-muted">
                No email accounts connected. Connect an email account to get started.
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFF" />
                    <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FFF" />
                  </svg>
                  Connect Gmail
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z" fill="#0078D4" />
                  </svg>
                  Connect Outlook
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6L12 13L2 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Connect IMAP
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500 text-white">
                <Mail className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Sync Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Sync Frequency</h3>
                  <select className="w-full p-2 border rounded" disabled>
                    <option>Every 15 minutes</option>
                    <option>Every 30 minutes</option>
                    <option>Every hour</option>
                    <option>Every day</option>
                    <option>Manual only</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Sync Options</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="sync-sent" className="mr-2" disabled />
                      <label htmlFor="sync-sent">Sync sent emails</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="sync-contacts" className="mr-2" disabled />
                      <label htmlFor="sync-contacts">Sync contacts</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="sync-folders" className="mr-2" disabled />
                      <label htmlFor="sync-folders">Sync folder structure</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Button disabled className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Sync Now
                </Button>
                <p className="text-xs text-adpilot-text-muted mt-1">
                  Connect an email account to enable sync options
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500 text-white">
                <Inbox className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Last Sync Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-adpilot-text-muted">
                No sync activity yet. Connect an email account and sync to see activity here.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EmailSyncPage;
