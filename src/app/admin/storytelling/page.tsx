'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Loader2, Copy, Check } from "lucide-react";
import { useStoryGenerator, StoryGeneratorParams } from "@/hooks/useStoryGenerator";
import { toast } from "sonner";

const AdminStorytellingPage = () => {
  const { generateStory, isLoading, storyData, errorMessage } = useStoryGenerator();

  const [formData, setFormData] = useState<StoryGeneratorParams>({
    objective: "brand_awareness",
    platform: "instagram",
    industry: "",
    ageRange: [25, 45],
    language: "English",
    interests: "",
    tone: "professional",
    elements: [],
    customObjective: ""
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleInputChange = (field: keyof StoryGeneratorParams, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleElementToggle = (element: string) => {
    setFormData(prev => {
      const elements = prev.elements.includes(element)
        ? prev.elements.filter(e => e !== element)
        : [...prev.elements, element];
      return { ...prev, elements };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateStory(formData);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">AI Storyteller</h1>
            <p className="text-adsilo-text-secondary mt-1">
              Create engaging marketing narratives with AI.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-adsilo-border shadow-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-adsilo-primary" />
                Story Configuration
              </CardTitle>
              <CardDescription>
                Define parameters for your AI-generated story.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="objective">Campaign Objective</Label>
                  <Select
                    value={formData.objective}
                    onValueChange={(value) => handleInputChange("objective", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select objective" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                      <SelectItem value="product_launch">Product Launch</SelectItem>
                      <SelectItem value="community_engagement">Community Engagement</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="thought_leadership">Thought Leadership</SelectItem>
                      <SelectItem value="customer_retention">Customer Retention</SelectItem>
                      <SelectItem value="crisis_management">Crisis Management</SelectItem>
                      <SelectItem value="custom">Custom Objective</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.objective === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="customObjective">Custom Objective Details</Label>
                    <Textarea
                      id="customObjective"
                      placeholder="Describe your specific objective..."
                      value={formData.customObjective}
                      onChange={(e) => handleInputChange("customObjective", e.target.value)}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select
                      value={formData.platform}
                      onValueChange={(value) => handleInputChange("platform", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => handleInputChange("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Portuguese">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g. SaaS, Fashion, Healthcare"
                    value={formData.industry}
                    onChange={(e) => handleInputChange("industry", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Target Audience Age ({formData.ageRange[0]} - {formData.ageRange[1]})</Label>
                  <Slider
                    defaultValue={[25, 45]}
                    max={100}
                    step={1}
                    value={formData.ageRange}
                    onValueChange={(value) => handleInputChange("ageRange", value as [number, number])}
                    className="py-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Audience Interests</Label>
                  <Input
                    id="interests"
                    placeholder="e.g. Technology, Sustainability, Fitness"
                    value={formData.interests}
                    onChange={(e) => handleInputChange("interests", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone of Voice</Label>
                  <Select
                    value={formData.tone}
                    onValueChange={(value) => handleInputChange("tone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="empathetic">Empathetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Interactive Elements</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Polls", "Q&A", "Quizzes", "Swipe Up", "Hashtags", "Mentions"].map((element) => (
                      <div key={element} className="flex items-center space-x-2">
                        <Checkbox
                          id={`element-${element}`}
                          checked={formData.elements.includes(element)}
                          onCheckedChange={() => handleElementToggle(element)}
                        />
                        <label
                          htmlFor={`element-${element}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {element}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Story...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Story
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-adsilo-border shadow-sm h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-adsilo-primary" />
                Generated Narrative
              </CardTitle>
              <CardDescription>
                Your AI-crafted story will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {storyData ? (
                <div className="space-y-6 h-full overflow-y-auto pr-2 max-h-[600px]">
                  <div className="p-4 bg-adsilo-muted rounded-lg border border-adsilo-border">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">Hook</h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(storyData.hook, 'hook')}>
                        {copiedField === 'hook' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                    <p className="text-sm italic text-adsilo-text-secondary">{storyData.hook}</p>
                    <div className="mt-2 p-2 bg-background rounded border text-sm font-medium">
                      {storyData.hookText}
                    </div>
                  </div>

                  <div className="p-4 bg-adsilo-muted rounded-lg border border-adsilo-border">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">The Story</h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(storyData.story, 'story')}>
                        {copiedField === 'story' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{storyData.story}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-adsilo-muted rounded-lg border border-adsilo-border">
                      <h3 className="font-semibold mb-2">Visuals</h3>
                      <ul className="list-disc list-inside text-sm space-y-1 text-adsilo-text-secondary">
                        {storyData.visuals.map((visual, index) => (
                          <li key={index}>{visual}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-adsilo-muted rounded-lg border border-adsilo-border">
                      <h3 className="font-semibold mb-2">Learning Points</h3>
                      <ul className="list-disc list-inside text-sm space-y-1 text-adsilo-text-secondary">
                        {storyData.learningPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-primary">Call to Action</h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(storyData.cta, 'cta')}>
                        {copiedField === 'cta' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                    <p className="text-sm font-medium">{storyData.cta}</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-adsilo-text-muted">
                  <div className="bg-adsilo-muted p-4 rounded-full mb-4">
                    <Sparkles className="h-8 w-8 text-adsilo-text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Ready to Generate</h3>
                  <p className="max-w-xs">
                    Configure your story parameters on the left and click "Generate Story" to see the magic happen.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default AdminStorytellingPage;