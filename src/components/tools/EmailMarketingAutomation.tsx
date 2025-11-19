import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Copy, 
  BarChart2, 
  Users, 
  Calendar, 
  Send,
  Clock
} from 'lucide-react';

const EmailMarketingAutomation = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Welcome Series',
      status: 'active',
      recipients: 1242,
      openRate: 42.5,
      clickRate: 18.2,
      lastSent: '2023-06-15',
      nextSend: '2023-06-20'
    },
    {
      id: 2,
      name: 'Product Launch Announcement',
      status: 'draft',
      recipients: 0,
      openRate: 0,
      clickRate: 0,
      lastSent: '-',
      nextSend: '2023-07-01'
    },
    {
      id: 3,
      name: 'Monthly Newsletter',
      status: 'paused',
      recipients: 3560,
      openRate: 38.7,
      clickRate: 12.4,
      lastSent: '2023-06-01',
      nextSend: '-'
    }
  ]);
  
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    content: '',
    scheduleType: 'immediate',
    sendDate: '',
    sendTime: '',
    segment: 'all'
  });
  
  const segments = [
    { id: 'all', name: 'All Subscribers' },
    { id: 'new', name: 'New Subscribers' },
    { id: 'active', name: 'Active Users' },
    { id: 'inactive', name: 'Inactive Users' }
  ];
  
  const createCampaign = () => {
    if (newCampaign.name.trim()) {
      const campaign = {
        id: campaigns.length + 1,
        name: newCampaign.name,
        status: 'draft',
        recipients: 0,
        openRate: 0,
        clickRate: 0,
        lastSent: '-',
        nextSend: newCampaign.scheduleType === 'scheduled' ? newCampaign.sendDate : '-'
      };
      
      setCampaigns([campaign, ...campaigns]);
      
      // Reset form
      setNewCampaign({
        name: '',
        subject: '',
        content: '',
        scheduleType: 'immediate',
        sendDate: '',
        sendTime: '',
        segment: 'all'
      });
    }
  };
  
  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        const newStatus = campaign.status === 'active' ? 'paused' : 'active';
        return { ...campaign, status: newStatus };
      }
      return campaign;
    }));
  };
  
  const duplicateCampaign = (id) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      const newCampaign = {
        ...campaign,
        id: campaigns.length + 1,
        name: `${campaign.name} (Copy)`,
        status: 'draft'
      };
      setCampaigns([newCampaign, ...campaigns]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Email Marketing Automation</h1>
        <p className="text-adsilo-text-secondary mt-1">
          Create and automate email marketing campaigns.
        </p>
      </div>
      
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Email Campaigns</CardTitle>
                  <CardDescription>
                    Manage your email marketing campaigns
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{campaign.name}</h3>
                          <Badge 
                            variant={campaign.status === 'active' ? 'default' : campaign.status === 'draft' ? 'secondary' : 'outline'}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-adsilo-text-muted">Recipients</div>
                            <div className="font-medium">{campaign.recipients.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-adsilo-text-muted">Open Rate</div>
                            <div className="font-medium">{campaign.openRate}%</div>
                          </div>
                          <div>
                            <div className="text-adsilo-text-muted">Click Rate</div>
                            <div className="font-medium">{campaign.clickRate}%</div>
                          </div>
                          <div>
                            <div className="text-adsilo-text-muted">Next Send</div>
                            <div className="font-medium">{campaign.nextSend}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toggleCampaignStatus(campaign.id)}
                        >
                          {campaign.status === 'active' ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => duplicateCampaign(campaign.id)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>
                Set up a new email marketing campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input 
                  id="campaign-name"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  placeholder="e.g. Welcome Series, Product Launch"
                />
              </div>
              
              <div>
                <Label htmlFor="email-subject">Email Subject</Label>
                <Input 
                  id="email-subject"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                  placeholder="e.g. Welcome to Our Service!"
                />
              </div>
              
              <div>
                <Label htmlFor="email-content">Email Content</Label>
                <Textarea 
                  id="email-content"
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                  placeholder="Write your email content here..."
                  rows={8}
                />
              </div>
              
              <div>
                <Label>Target Audience</Label>
                <Select 
                  value={newCampaign.segment} 
                  onValueChange={(value) => setNewCampaign({...newCampaign, segment: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {segments.map(segment => (
                      <SelectItem key={segment.id} value={segment.id}>
                        {segment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Schedule</Label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="schedule-type"
                      checked={newCampaign.scheduleType === 'scheduled'}
                      onCheckedChange={(checked) => setNewCampaign({...newCampaign, scheduleType: checked ? 'scheduled' : 'immediate'})}
                    />
                    <Label htmlFor="schedule-type">Schedule for later</Label>
                  </div>
                  
                  {newCampaign.scheduleType === 'scheduled' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Input 
                          type="date"
                          value={newCampaign.sendDate}
                          onChange={(e) => setNewCampaign({...newCampaign, sendDate: e.target.value})}
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-adsilo-text-muted" />
                      </div>
                      <div className="relative">
                        <Input 
                          type="time"
                          value={newCampaign.sendTime}
                          onChange={(e) => setNewCampaign({...newCampaign, sendTime: e.target.value})}
                        />
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-adsilo-text-muted" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Button onClick={createCampaign} className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
              <CardDescription>
                Performance metrics for your email campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4 text-center">
                  <BarChart2 className="h-8 w-8 mx-auto text-adsilo-primary mb-2" />
                  <div className="text-2xl font-bold">42.5%</div>
                  <div className="text-adsilo-text-muted">Average Open Rate</div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <BarChart2 className="h-8 w-8 mx-auto text-adsilo-primary mb-2" />
                  <div className="text-2xl font-bold">18.2%</div>
                  <div className="text-adsilo-text-muted">Average Click Rate</div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <Users className="h-8 w-8 mx-auto text-adsilo-primary mb-2" />
                  <div className="text-2xl font-bold">4,802</div>
                  <div className="text-adsilo-text-muted">Total Subscribers</div>
                </div>
              </div>
              
              <div className="mt-6 h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                <div className="text-center">
                  <BarChart2 className="h-12 w-12 mx-auto text-adsilo-text-muted mb-2" />
                  <p className="text-adsilo-text-muted">Campaign performance chart will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailMarketingAutomation;