'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Calendar, Plus, Video, Users, Clock, MapPin, Sparkles, Brain, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

const ProjectMeetingsPage = () => {
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [suggestingTime, setSuggestingTime] = useState(false);

  const meetings = [
    {
      title: 'Sprint Planning',
      time: 'Today, 2:00 PM',
      duration: '1 hour',
      attendees: 8,
      type: 'Video',
      status: 'Upcoming',
      location: 'Zoom',
      organizer: 'John Doe'
    },
    {
      title: 'Design Review',
      time: 'Tomorrow, 10:00 AM',
      duration: '45 min',
      attendees: 5,
      type: 'Video',
      status: 'Scheduled',
      location: 'Google Meet',
      organizer: 'Jane Smith'
    },
    {
      title: 'Client Presentation',
      time: 'Jan 25, 3:00 PM',
      duration: '2 hours',
      attendees: 12,
      type: 'In-person',
      status: 'Scheduled',
      location: 'Conference Room A',
      organizer: 'Bob Wilson'
    },
  ];

  const handleAISuggestTime = () => {
    setSuggestingTime(true);
    setTimeout(() => {
      setSuggestingTime(false);
      toast.success('AI suggests: Tuesday, Jan 23 at 2:30 PM - All attendees available');
    }, 2000);
  };

  const handleScheduleMeeting = () => {
    toast.success('Meeting scheduled successfully!');
    setShowScheduleDialog(false);
  };

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Meetings</h1>
            <p className="text-adsilo-text-secondary mt-1">Schedule and manage project meetings with AI assistance</p>
          </div>
          <Button onClick={() => setShowScheduleDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />Schedule Meeting
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {[
          { label: "Today's Meetings", value: '3', icon: Calendar, color: 'bg-blue-500' },
          { label: 'This Week', value: '12', icon: Calendar, color: 'bg-green-500' },
          { label: 'Total Attendees', value: '45', icon: Users, color: 'bg-purple-500' },
          { label: 'Avg Duration', value: '52min', icon: Clock, color: 'bg-orange-500' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <p className="text-sm text-adsilo-text-muted">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Scheduling Assistant */}
      <Card className="mt-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Scheduling Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-blue-900">Optimal Meeting Time</div>
                <div className="text-sm text-blue-800 mt-1">
                  Based on team calendars and productivity patterns, AI suggests scheduling important meetings on Tuesday/Wednesday between 10 AM - 3 PM for best attendance and engagement.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-green-900">Meeting Efficiency Tip</div>
                <div className="text-sm text-green-800 mt-1">
                  Your average meeting duration is 52 minutes. AI analysis shows 78% of meetings could be 15 minutes shorter with better agenda preparation. Try using AI agenda generator.
                </div>
                <Button size="sm" variant="outline" className="mt-3">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Agenda
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Meetings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Meetings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {meetings.map((meeting, i) => (
              <div key={i} className="flex items-start justify-between p-4 border border-adsilo-border rounded-lg hover:border-adsilo-primary transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    {meeting.type === 'Video' ? <Video className="h-6 w-6 text-blue-600" /> : <Users className="h-6 w-6 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{meeting.title}</div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-adsilo-text-muted">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{meeting.time} ({meeting.duration})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{meeting.attendees} attendees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{meeting.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>By {meeting.organizer}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline">{meeting.type}</Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Meeting Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
            <DialogDescription>Create a new meeting with AI-powered scheduling assistance</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Meeting Title *</Label>
              <Input placeholder="e.g., Sprint Planning" className="mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date *</Label>
                <Input type="date" className="mt-2" />
              </div>
              <div>
                <Label>Time *</Label>
                <Input type="time" className="mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Duration</Label>
                <Select defaultValue="60">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Meeting Type</Label>
                <Select defaultValue="video">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="inperson">In-Person</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Location / Meeting Link</Label>
              <Input placeholder="Zoom, Google Meet, or physical location" className="mt-2" />
            </div>

            <div>
              <Label>Attendees</Label>
              <Input placeholder="Enter email addresses separated by commas" className="mt-2" />
            </div>

            <div>
              <Label>Agenda (Optional)</Label>
              <Textarea placeholder="Meeting agenda and discussion points..." rows={3} className="mt-2" />
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleAISuggestTime}
              disabled={suggestingTime}
            >
              {suggestingTime ? 'Finding optimal time...' : <><Sparkles className="h-4 w-4 mr-2" />AI Suggest Best Time</>}
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleMeeting}>
              Schedule Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default ProjectMeetingsPage;