
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserCheck, Plus, Mail, Phone, FileText, Clock, Database } from "lucide-react";

const ClientManagerPage = () => {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  
  const clients = [
    {
      id: 1,
      name: "Acme Corporation",
      contact: "John Smith",
      email: "john@acmecorp.com",
      phone: "(555) 123-4567",
      projects: 3,
      status: "Active",
      totalBilled: "$12,450",
      lastContact: "2025-04-26"
    },
    {
      id: 2,
      name: "Globex Industries",
      contact: "Sarah Johnson",
      email: "sarah@globex.com",
      phone: "(555) 987-6543",
      projects: 1,
      status: "Active",
      totalBilled: "$5,200",
      lastContact: "2025-04-20"
    },
    {
      id: 3,
      name: "Oceanic Airlines",
      contact: "Michael Chen",
      email: "michael@oceanic.com",
      phone: "(555) 456-7890",
      projects: 2,
      status: "Inactive",
      totalBilled: "$8,750",
      lastContact: "2025-03-15"
    },
    {
      id: 4,
      name: "Stark Industries",
      contact: "Emily Williams",
      email: "emily@stark.com",
      phone: "(555) 234-5678",
      projects: 4,
      status: "Active",
      totalBilled: "$24,300",
      lastContact: "2025-04-28"
    }
  ];
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold">Client Manager</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Organize and manage your client relationships and communications
            </p>
          </div>
          <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Enter the details of your new client. You can add projects later.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Enter company name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contact-name">Contact Name</Label>
                    <Input id="contact-name" placeholder="Enter contact name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-title">Job Title</Label>
                    <Input id="contact-title" placeholder="Enter job title" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter business address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Any additional information about this client" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddClientOpen(false)}>Add Client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="clients">
          <TabsList className="mb-4">
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Client Directory</CardTitle>
                <CardDescription>Manage your clients and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <Input placeholder="Search clients..." className="max-w-sm" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Client</th>
                        <th className="text-left p-2">Contact Person</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Phone</th>
                        <th className="text-left p-2">Projects</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Total Billed</th>
                        <th className="text-left p-2">Last Contact</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map(client => (
                        <tr key={client.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{client.name}</td>
                          <td className="p-2">{client.contact}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{client.email}</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{client.phone}</span>
                            </div>
                          </td>
                          <td className="p-2">{client.projects}</td>
                          <td className="p-2">
                            <Badge variant={client.status === "Active" ? "default" : "outline"}>
                              {client.status}
                            </Badge>
                          </td>
                          <td className="p-2">{client.totalBilled}</td>
                          <td className="p-2">{client.lastContact}</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-500">Showing 4 of 4 clients</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <CardTitle>Client Communication</CardTitle>
                <CardDescription>Track and manage all client communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-1 border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b">
                      <h3 className="font-medium">Clients</h3>
                      <Input placeholder="Search clients..." className="mt-2" />
                    </div>
                    <div className="h-[400px] overflow-y-auto">
                      {clients.map(client => (
                        <div key={client.id} className="border-b p-3 hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-700 font-medium">{client.name.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-xs text-gray-500">{client.email}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-700 font-medium">A</span>
                        </div>
                        <h3 className="font-medium">Acme Corporation</h3>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                      </div>
                    </div>
                    <div className="h-[350px] p-4 overflow-y-auto">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                            <span className="text-blue-700 font-medium">A</span>
                          </div>
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-sm">Hi, we'd like to discuss the progress on our current project.</p>
                            <p className="text-xs text-gray-500 mt-1">Apr 26, 2025 10:32 AM</p>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-sm">Sure! I can provide an update. We've completed the initial phase and are moving into design.</p>
                            <p className="text-xs text-blue-700 mt-1">Apr 26, 2025 11:15 AM</p>
                          </div>
                          <div className="h-8 w-8 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                            <span className="text-gray-700 font-medium">You</span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                            <span className="text-blue-700 font-medium">A</span>
                          </div>
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-sm">Great! When can we expect to see the design mockups?</p>
                            <p className="text-xs text-gray-500 mt-1">Apr 26, 2025 11:20 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t">
                      <div className="flex gap-2">
                        <Input placeholder="Type your message..." />
                        <Button>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Client Documents</CardTitle>
                <CardDescription>Manage contracts, proposals, and other client documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Input placeholder="Search documents..." className="max-w-sm" />
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Document
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Document Name</th>
                        <th className="text-left p-2">Client</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Created Date</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-2">Website Redesign Contract</td>
                        <td className="p-2">Acme Corporation</td>
                        <td className="p-2">Contract</td>
                        <td className="p-2">2025-04-15</td>
                        <td className="p-2">
                          <Badge>Signed</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-2">Brand Strategy Proposal</td>
                        <td className="p-2">Globex Industries</td>
                        <td className="p-2">Proposal</td>
                        <td className="p-2">2025-04-10</td>
                        <td className="p-2">
                          <Badge variant="outline">Pending</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-2">April 2025 Invoice</td>
                        <td className="p-2">Stark Industries</td>
                        <td className="p-2">Invoice</td>
                        <td className="p-2">2025-04-28</td>
                        <td className="p-2">
                          <Badge variant="outline">Unpaid</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ClientManagerPage;
