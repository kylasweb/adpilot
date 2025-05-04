
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Calendar,
  Clock,
  Database,
  FileText,
  Plus,
  Users,
  MessageSquare,
  Share
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AdvancedProjectPage = () => {
  const projects = [
    { 
      id: 1, 
      name: "Website Redesign", 
      progress: 75, 
      status: "In Progress", 
      team: 4, 
      tasks: 24, 
      completedTasks: 18,
      nextMeeting: "Tomorrow, 10:00 AM",
      dueDate: "2023-06-30"
    },
    { 
      id: 2, 
      name: "Marketing Campaign", 
      progress: 30, 
      status: "Planning", 
      team: 6, 
      tasks: 18, 
      completedTasks: 5,
      nextMeeting: "Today, 3:30 PM",
      dueDate: "2023-07-15"
    },
    { 
      id: 3, 
      name: "Mobile App Development", 
      progress: 10, 
      status: "Just Started", 
      team: 8, 
      tasks: 36, 
      completedTasks: 4,
      nextMeeting: "Friday, 11:00 AM",
      dueDate: "2023-09-01"
    }
  ];

  const activities = [
    { id: 1, user: "Alex Johnson", action: "completed task", target: "Homepage wireframes", time: "2 hours ago" },
    { id: 2, user: "Maria Garcia", action: "commented on", target: "Brand guidelines document", time: "4 hours ago" },
    { id: 3, user: "Raj Patel", action: "updated", target: "Project timeline", time: "6 hours ago" },
    { id: 4, user: "Emma Wilson", action: "added new task", target: "User testing", time: "yesterday" }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Advanced Project Management</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Comprehensive project management suite with AI assistance
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Your most recently updated projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projects.map(project => (
                      <div key={project.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{project.name}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{project.status}</span>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{project.team} team members</span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{project.completedTasks}/{project.tasks} tasks</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Due: {project.dueDate}</span>
                          </div>
                        </div>
                        
                        <div className="pt-2 flex justify-end gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm">Edit Project</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Activity</CardTitle>
                  <CardDescription>Recent activity across all projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map(activity => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="font-medium text-blue-600">
                            {activity.user.split(' ').map(name => name[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                            <span className="font-medium text-blue-600">{activity.target}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="ghost" className="w-full text-sm">View All Activity</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> Upcoming Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="font-medium">Website Design Review</div>
                      <div className="text-sm text-muted-foreground">Today, 2:00 PM</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="font-medium">Sprint Planning</div>
                      <div className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="font-medium">Client Presentation</div>
                      <div className="text-sm text-muted-foreground">Friday, 9:30 AM</div>
                    </div>
                    <Button variant="outline" className="w-full">Schedule Meeting</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" /> Timeline Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-blue-500 pl-4 py-1">
                      <div className="font-medium">Design Phase Complete</div>
                      <div className="text-sm text-muted-foreground">Yesterday</div>
                    </div>
                    <div className="border-l-2 border-green-500 pl-4 py-1">
                      <div className="font-medium">Development Started</div>
                      <div className="text-sm text-muted-foreground">2 days ago</div>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-4 py-1">
                      <div className="font-medium">Client Approval</div>
                      <div className="text-sm text-muted-foreground">1 week ago</div>
                    </div>
                    <Button variant="outline" className="w-full">View Full Timeline</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" /> AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm">How can I help you with your projects today?</p>
                      <ul className="mt-3 space-y-2 text-sm">
                        <li className="bg-background p-2 rounded cursor-pointer hover:bg-blue-50">Generate project timeline</li>
                        <li className="bg-background p-2 rounded cursor-pointer hover:bg-blue-50">Create meeting agenda</li>
                        <li className="bg-background p-2 rounded cursor-pointer hover:bg-blue-50">Suggest task priorities</li>
                        <li className="bg-background p-2 rounded cursor-pointer hover:bg-blue-50">Analyze project bottlenecks</li>
                      </ul>
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full border rounded-lg pl-3 pr-10 py-2 text-sm" 
                        placeholder="Ask AI assistant..."
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M14.6666 1.33334L7.33329 8.66668M14.6666 1.33334L10 14.6667L7.33329 8.66668L1.33329 6.00001L14.6666 1.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" /> Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 mr-3">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Project Plan Document</div>
                          <div className="text-xs text-muted-foreground">PDF • 2.4MB</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center text-green-600 mr-3">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Design Assets</div>
                          <div className="text-xs text-muted-foreground">ZIP • 16.8MB</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-amber-100 rounded-md flex items-center justify-center text-amber-600 mr-3">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Meeting Notes</div>
                          <div className="text-xs text-muted-foreground">DOCX • 842KB</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <Button variant="outline" className="w-full">Upload New Resource</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share className="h-5 w-5" /> Collaboration & Sharing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-3">
                      <div className="text-sm font-medium">Team Members</div>
                      <div className="flex -space-x-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs border-2 border-white">
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-white">
                          +3
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <div className="text-sm font-medium">Recent Shares</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                          <div className="text-sm">Marketing Team</div>
                          <div className="text-xs text-muted-foreground">Full access</div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                          <div className="text-sm">Client (External)</div>
                          <div className="text-xs text-muted-foreground">View only</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">Invite Collaborators</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="py-4">
              <p className="text-muted-foreground">Viewing all active projects. You can filter and sort them using the controls above.</p>
            </div>
            {/* Active projects content would go here */}
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="py-4">
              <p className="text-muted-foreground">These projects have been completed and archived.</p>
            </div>
            {/* Completed projects content would go here */}
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="py-4">
              <p className="text-muted-foreground">Project analytics and performance metrics.</p>
            </div>
            {/* Analytics content would go here */}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdvancedProjectPage;
