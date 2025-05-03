
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, FileText, Target, Users, MessageSquare, Settings, Rocket } from "lucide-react";
import StoryObjectiveSelector from "@/components/admin/storytelling/StoryObjectiveSelector";
import PlatformSelector from "@/components/admin/storytelling/PlatformSelector";
import AudienceSelector from "@/components/admin/storytelling/AudienceSelector";
import ToneSelector from "@/components/admin/storytelling/ToneSelector";
import InteractiveElementSelector from "@/components/admin/storytelling/InteractiveElementSelector";
import StoryOutput from "@/components/admin/storytelling/StoryOutput";
import { useStoryGenerator } from "@/hooks/useStoryGenerator";

const StorytellingPage: React.FC = () => {
  // Story configuration state
  const [objective, setObjective] = useState("brand_awareness");
  const [platform, setPlatform] = useState("instagram");
  const [industry, setIndustry] = useState("retail");
  const [ageRange, setAgeRange] = useState<[number, number]>([25, 45]);
  const [language, setLanguage] = useState("english");
  const [interests, setInterests] = useState("technology, lifestyle");
  const [tone, setTone] = useState("energetic");
  const [elements, setElements] = useState<string[]>(["polls", "questions"]);
  
  // Story generation hooks
  const { generateStory, isLoading, storyData } = useStoryGenerator();
  
  const handleGenerateStory = () => {
    generateStory({
      objective,
      platform,
      industry,
      ageRange,
      language,
      interests,
      tone,
      elements,
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Storytelling Studio</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Create engaging, platform-specific stories with AI-powered narrative generation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Target className="mr-2 h-5 w-5 text-adpilot-primary" />
                Target-Oriented
              </CardTitle>
              <CardDescription>
                Generate content aligned with specific business objectives and platforms
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-adpilot-primary" />
                Audience-Focused
              </CardTitle>
              <CardDescription>
                Craft narratives tailored to your audience demographics and interests
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="mr-2 h-5 w-5 text-adpilot-primary" />
                Interactive
              </CardTitle>
              <CardDescription>
                Build engagement with platform-specific interactive elements
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column: Configuration options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Story Configuration</CardTitle>
                <CardDescription>
                  Define the parameters for your AI-generated story
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="objective" className="w-full">
                  <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                    <TabsTrigger value="objective">
                      <span className="hidden md:inline mr-2">
                        <Target className="h-4 w-4" />
                      </span>
                      Objective
                    </TabsTrigger>
                    <TabsTrigger value="platform">
                      <span className="hidden md:inline mr-2">
                        <Layers className="h-4 w-4" />
                      </span>
                      Platform
                    </TabsTrigger>
                    <TabsTrigger value="audience">
                      <span className="hidden md:inline mr-2">
                        <Users className="h-4 w-4" />
                      </span>
                      Audience
                    </TabsTrigger>
                    <TabsTrigger value="tone">
                      <span className="hidden md:inline mr-2">
                        <MessageSquare className="h-4 w-4" />
                      </span>
                      Tone
                    </TabsTrigger>
                    <TabsTrigger value="elements">
                      <span className="hidden md:inline mr-2">
                        <Settings className="h-4 w-4" />
                      </span>
                      Elements
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="objective">
                    <StoryObjectiveSelector value={objective} onChange={setObjective} />
                  </TabsContent>
                  
                  <TabsContent value="platform">
                    <PlatformSelector value={platform} onChange={setPlatform} />
                  </TabsContent>
                  
                  <TabsContent value="audience">
                    <AudienceSelector 
                      industry={industry}
                      setIndustry={setIndustry}
                      ageRange={ageRange}
                      setAgeRange={setAgeRange}
                      language={language}
                      setLanguage={setLanguage}
                      interests={interests}
                      setInterests={setInterests}
                    />
                  </TabsContent>
                  
                  <TabsContent value="tone">
                    <ToneSelector tone={tone} setTone={setTone} />
                  </TabsContent>
                  
                  <TabsContent value="elements">
                    <InteractiveElementSelector 
                      elements={elements} 
                      setElements={setElements}
                      platform={platform}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Button 
              onClick={handleGenerateStory} 
              className="w-full py-6 text-lg"
              disabled={isLoading}
            >
              <Rocket className="mr-2 h-5 w-5" />
              {isLoading ? "Generating Story..." : "Generate Story"}
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle>Saved Templates</CardTitle>
                <CardDescription>
                  Reuse your successful story configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Save your current configuration as a template for future use.
                  </p>
                  <Button variant="outline" className="mt-4">
                    Save Current Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column: Story output */}
          <div>
            <StoryOutput isLoading={isLoading} storyData={storyData} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StorytellingPage;
