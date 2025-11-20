'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Shield, Lock, Key, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const AdminSecurityPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordExpiry, setPasswordExpiry] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  const handleToggle = (setting: string, value: boolean) => {
    toast.success(`${setting} ${value ? 'enabled' : 'disabled'}`);
  };

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Security Settings</h1>
            <p className="text-adsilo-text-secondary mt-1">Manage system security and access controls</p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="general" className="mt-6">
        <TabsList>
          <TabsTrigger value="general"><Shield className="h-4 w-4 mr-2" />General</TabsTrigger>
          <TabsTrigger value="authentication"><Lock className="h-4 w-4 mr-2" />Authentication</TabsTrigger>
          <TabsTrigger value="audit"><Activity className="h-4 w-4 mr-2" />Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Policies</CardTitle>
              <CardDescription>Configure system-wide security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-adsilo-text-muted">Require 2FA for all admin users</p>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={(v) => { setTwoFactorEnabled(v); handleToggle('2FA', v); }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Password Expiry</Label>
                  <p className="text-sm text-adsilo-text-muted">Force password reset every 90 days</p>
                </div>
                <Switch checked={passwordExpiry} onCheckedChange={(v) => { setPasswordExpiry(v); handleToggle('Password Expiry', v); }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>IP Whitelist</Label>
                  <p className="text-sm text-adsilo-text-muted">Restrict access to whitelisted IPs</p>
                </div>
                <Switch checked={ipWhitelist} onCheckedChange={(v) => { setIpWhitelist(v); handleToggle('IP Whitelist', v); }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-adsilo-text-muted">Auto-logout after 30 minutes of inactivity</p>
                </div>
                <Switch checked={sessionTimeout} onCheckedChange={(v) => { setSessionTimeout(v); handleToggle('Session Timeout', v); }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Status</CardTitle>
              <CardDescription>Current security configuration overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border border-adsilo-border rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-medium">SSL Certificate</div>
                    <div className="text-sm text-adsilo-text-muted">Valid until Dec 2025</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-adsilo-border rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-medium">Firewall</div>
                    <div className="text-sm text-adsilo-text-muted">Active & configured</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-adsilo-border rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="font-medium">Security Scan</div>
                    <div className="text-sm text-adsilo-text-muted">Last: 2 days ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-adsilo-border rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-medium">Data Encryption</div>
                    <div className="text-sm text-adsilo-text-muted">AES-256 enabled</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Methods</CardTitle>
              <CardDescription>Configure how users authenticate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {['Email/Password', 'Google OAuth', 'Microsoft Azure AD', 'SAML SSO'].map((method, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-adsilo-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-adsilo-primary" />
                      <div>
                        <div className="font-medium">{method}</div>
                        <div className="text-sm text-adsilo-text-muted">
                          {i === 0 ? 'Primary authentication method' : 'Available for enterprise users'}
                        </div>
                      </div>
                    </div>
                    <Badge variant={i === 0 ? 'default' : 'outline'}>{i === 0 ? 'Active' : 'Available'}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Security Audit Log</CardTitle>
              <CardDescription>Recent security events and access attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { event: 'Admin login successful', user: 'admin@example.com', time: '2 minutes ago', status: 'success' },
                  { event: 'Failed login attempt', user: 'unknown@test.com', time: '15 minutes ago', status: 'warning' },
                  { event: 'Password changed', user: 'user@example.com', time: '1 hour ago', status: 'info' },
                  { event: '2FA enabled', user: 'admin@example.com', time: '2 hours ago', status: 'success' },
                  { event: 'API key generated', user: 'dev@example.com', time: '3 hours ago', status: 'info' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-adsilo-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${log.status === 'success' ? 'bg-green-500' :
                          log.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                      <div>
                        <div className="font-medium text-sm">{log.event}</div>
                        <div className="text-xs text-adsilo-text-muted">{log.user}</div>
                      </div>
                    </div>
                    <div className="text-xs text-adsilo-text-muted">{log.time}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View Full Audit Log</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default AdminSecurityPage;