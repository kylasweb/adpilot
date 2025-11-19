import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Image as ImageIcon, Link, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const SocialMediaScheduler = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      platform: 'twitter',
      content: 'Exciting news! Our new product is launching next week. Stay tuned for more updates! #productlaunch #innovation',
      scheduledDate: new Date(),
      media: '',
      link: ''
    }
  ]);
  
  const [newPost, setNewPost] = useState({
    platform: 'twitter',
    content: '',
    scheduledDate: new Date(),
    media: '',
    link: ''
  });
  
  const platforms = [
    { id: 'twitter', name: 'Twitter', characterLimit: 280 },
    { id: 'facebook', name: 'Facebook', characterLimit: 63206 },
    { id: 'instagram', name: 'Instagram', characterLimit: 2200 },
    { id: 'linkedin', name: 'LinkedIn', characterLimit: 3000 }
  ];
  
  const addPost = () => {
    if (newPost.content.trim()) {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          ...newPost,
          scheduledDate: new Date(newPost.scheduledDate)
        }
      ]);
      
      // Reset form
      setNewPost({
        platform: 'twitter',
        content: '',
        scheduledDate: new Date(),
        media: '',
        link: ''
      });
    }
  };
  
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };
  
  const getCharacterCount = (content, platformId) => {
    const platform = platforms.find(p => p.id === platformId);
    return {
      current: content.length,
      limit: platform ? platform.characterLimit : 280
    };
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Social Media Scheduler</h1>
        <p className="text-adsilo-text-secondary mt-1">
          Schedule and manage your social media posts across multiple platforms.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post Creation Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>
                Schedule a new social media post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select 
                  value={newPost.platform} 
                  onValueChange={(value) => setNewPost({...newPost, platform: value})}
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map(platform => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="What's on your mind?"
                  rows={4}
                />
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-adsilo-text-muted">
                    {getCharacterCount(newPost.content, newPost.platform).current} characters
                  </span>
                  <span className={getCharacterCount(newPost.content, newPost.platform).current > getCharacterCount(newPost.content, newPost.platform).limit ? "text-red-500" : "text-adsilo-text-muted"}>
                    {getCharacterCount(newPost.content, newPost.platform).limit - getCharacterCount(newPost.content, newPost.platform).current} characters left
                  </span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="media">Media URL (Optional)</Label>
                <div className="flex gap-2">
                  <Input 
                    id="media"
                    value={newPost.media}
                    onChange={(e) => setNewPost({...newPost, media: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="link">Link (Optional)</Label>
                <div className="flex gap-2">
                  <Input 
                    id="link"
                    value={newPost.link}
                    onChange={(e) => setNewPost({...newPost, link: e.target.value})}
                    placeholder="https://example.com"
                  />
                  <Button variant="outline" size="icon">
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="schedule-date">Schedule Date & Time</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input 
                      id="schedule-date"
                      type="date"
                      value={format(newPost.scheduledDate, 'yyyy-MM-dd')}
                      onChange={(e) => setNewPost({...newPost, scheduledDate: new Date(e.target.value)})}
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-adsilo-text-muted" />
                  </div>
                  <div className="relative flex-1">
                    <Input 
                      type="time"
                      value={format(newPost.scheduledDate, 'HH:mm')}
                      onChange={(e) => setNewPost({...newPost, scheduledDate: new Date(`${format(newPost.scheduledDate, 'yyyy-MM-dd')}T${e.target.value}`)})}
                    />
                    <Clock className="absolute right-3 top-2.5 h-4 w-4 text-adsilo-text-muted" />
                  </div>
                </div>
              </div>
              
              <Button onClick={addPost} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Post
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Scheduled Posts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>
                Your upcoming social media posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium capitalize">{post.platform}</span>
                          <span className="text-sm text-adsilo-text-muted">
                            {format(post.scheduledDate, 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                        <p className="mb-2">{post.content}</p>
                        {post.media && (
                          <div className="flex items-center gap-1 text-sm text-adsilo-text-muted mb-1">
                            <ImageIcon className="h-4 w-4" />
                            <span>Media attached</span>
                          </div>
                        )}
                        {post.link && (
                          <div className="flex items-center gap-1 text-sm text-adsilo-text-muted">
                            <Link className="h-4 w-4" />
                            <span>{post.link}</span>
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {posts.length === 0 && (
                  <div className="text-center py-8 text-adsilo-text-muted">
                    <p>No scheduled posts yet. Create your first post using the form on the left.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaScheduler;