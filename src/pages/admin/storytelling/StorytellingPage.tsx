
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Layers, 
  FileText, 
  Target, 
  Users, 
  MessageSquare, 
  Settings, 
  Rocket,
  Building,
  Sparkles,
  Info,
  HelpCircle,
  Save
} from "lucide-react";
import StoryObjectiveSelector from "@/components/admin/storytelling/StoryObjectiveSelector";
import PlatformSelector from "@/components/admin/storytelling/PlatformSelector";
import AudienceSelector from "@/components/admin/storytelling/AudienceSelector";
import ToneSelector from "@/components/admin/storytelling/ToneSelector";
import InteractiveElementSelector from "@/components/admin/storytelling/InteractiveElementSelector";
import StoryOutput from "@/components/admin/storytelling/StoryOutput";
import { useStoryGenerator, BrandingContext, StoryGeneratorParams } from "@/hooks/useStoryGenerator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

// Template type for saved configurations
interface StoryTemplate {
  id: string;
  name: string;
  description: string;
  params: StoryGeneratorParams;
}

const StorytellingPage: React.FC = () => {
  // Story configuration state
  const [objective, setObjective] = useState("brand_awareness");
  const [customObjective, setCustomObjective] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [industry, setIndustry] = useState("retail");
  const [ageRange, setAgeRange] = useState<[number, number]>([25, 45]);
  const [language, setLanguage] = useState("english");
  const [interests, setInterests] = useState("technology, lifestyle");
  const [tone, setTone] = useState("energetic");
  const [elements, setElements] = useState<string[]>(["polls", "questions"]);
  
  // Branding context
  const [useBrandingContext, setUseBrandingContext] = useState(false);
  const [brandingContext, setBrandingContext] = useState<BrandingContext>({
    brandName: "",
    industry: "",
    uniqueSellingPoints: [],
    targetAudience: "",
    brandValues: [],
    brandVoice: "",
    competitivePosition: ""
  });
  
  // Templates state
  const [templates, setTemplates] = useState<StoryTemplate[]>([
    {
      id: "template1",
      name: "Instagram Brand Awareness",
      description: "Perfect for building brand recognition with visual storytelling",
      params: {
        objective: "brand_awareness",
        platform: "instagram",
        industry: "retail",
        ageRange: [25, 45],
        language: "english",
        interests: "fashion, lifestyle",
        tone: "aspirational",
        elements: ["polls", "questions"]
      }
    },
    {
      id: "template2",
      name: "TikTok Product Launch",
      description: "Viral-optimized format for new product announcements",
      params: {
        objective: "product_launch",
        platform: "tiktok",
        industry: "technology",
        ageRange: [18, 34],
        language: "english",
        interests: "gadgets, innovation",
        tone: "exciting",
        elements: ["duets", "trending_audio"]
      }
    }
  ]);
  const [saveTemplateMode, setSaveTemplateMode] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
  
  // Story generation hooks
  const { generateStory, isLoading, storyData, errorMessage } = useStoryGenerator();
  
  const handleGenerateStory = () => {
    const params: StoryGeneratorParams = {
      objective,
      platform,
      industry,
      ageRange,
      language,
      interests,
      tone,
      elements,
      customObjective: customObjective.trim() !== "" ? customObjective : undefined,
      brandingContext: useBrandingContext ? brandingContext : null
    };
    
    generateStory(params);
  };
  
  const handleSaveTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error("Please provide a template name");
      return;
    }
    
    const newTemplate: StoryTemplate = {
      id: `template-${Date.now()}`,
      name: newTemplateName,
      description: newTemplateDescription || `Configuration for ${platform} ${objective} content`,
      params: {
        objective,
        platform,
        industry,
        ageRange,
        language,
        interests,
        tone,
        elements,
        customObjective: customObjective || undefined,
        brandingContext: useBrandingContext ? brandingContext : undefined
      }
    };
    
    setTemplates([...templates, newTemplate]);
    setNewTemplateName("");
    setNewTemplateDescription("");
    setSaveTemplateMode(false);
    toast.success("Template saved successfully!");
  };
  
  const loadTemplate = (template: StoryTemplate) => {
    setObjective(template.params.objective);
    setPlatform(template.params.platform);
    setIndustry(template.params.industry);
    setAgeRange(template.params.ageRange);
    setLanguage(template.params.language);
    setInterests(template.params.interests);
    setTone(template.params.tone);
    setElements(template.params.elements);
    
    // Load custom objective if available
    setCustomObjective(template.params.customObjective || "");
    
    // Load branding context if available
    if (template.params.brandingContext) {
      setBrandingContext(template.params.brandingContext);
      setUseBrandingContext(true);
    } else {
      setUseBrandingContext(false);
    }
    
    toast.info(`"${template.name}" template loaded`);
  };
  
  // Handle branding context changes
  const handleBrandingContextChange = (field: keyof BrandingContext, value: any) => {
    setBrandingContext(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Parse comma-separated string into array
  const handleArrayInput = (value: string, field: 'uniqueSellingPoints' | 'brandValues') => {
    const array = value.split(',').map(item => item.trim()).filter(item => item !== '');
    handleBrandingContextChange(field, array);
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
                  <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-4">
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
                    <TabsTrigger value="branding">
                      <span className="hidden md:inline mr-2">
                        <Building className="h-4 w-4" />
                      </span>
                      Branding
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="objective">
                    <StoryObjectiveSelector value={objective} onChange={setObjective} />
                    
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="custom-objective" className="font-medium">
                          Custom Objective
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 ml-1 inline-block text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[300px]">
                                Specify your own marketing or communications objective if it's not in the list above
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                      </div>
                      <Textarea
                        id="custom-objective"
                        placeholder="Describe your custom objective here..."
                        className="resize-none"
                        value={customObjective}
                        onChange={(e) => setCustomObjective(e.target.value)}
                      />
                      <p className="text-sm text-adpilot-text-muted">
                        If specified, this will override the selected objective above
                      </p>
                    </div>
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
                  
                  <TabsContent value="branding">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={useBrandingContext} 
                          onCheckedChange={setUseBrandingContext} 
                          id="use-branding"
                        />
                        <Label htmlFor="use-branding" className="font-medium">
                          Include Branding Context
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[300px]">
                                Adding branding context helps the AI create more personalized and brand-aligned stories
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                      </div>
                      
                      {useBrandingContext && (
                        <div className="space-y-4 mt-2">
                          <div className="space-y-2">
                            <Label htmlFor="brand-name">Brand Name</Label>
                            <Input 
                              id="brand-name" 
                              value={brandingContext.brandName}
                              onChange={(e) => handleBrandingContextChange('brandName', e.target.value)}
                              placeholder="Your brand or company name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="brand-industry">Industry</Label>
                            <Input 
                              id="brand-industry" 
                              value={brandingContext.industry}
                              onChange={(e) => handleBrandingContextChange('industry', e.target.value)}
                              placeholder="Your specific industry or niche"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="unique-points">Unique Selling Points (comma separated)</Label>
                            <Textarea 
                              id="unique-points" 
                              value={brandingContext.uniqueSellingPoints.join(', ')}
                              onChange={(e) => handleArrayInput(e.target.value, 'uniqueSellingPoints')}
                              placeholder="Quality, Innovation, Value, etc."
                              className="resize-none"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="target-audience">Target Audience</Label>
                            <Input 
                              id="target-audience" 
                              value={brandingContext.targetAudience}
                              onChange={(e) => handleBrandingContextChange('targetAudience', e.target.value)}
                              placeholder="Describe your target audience"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="brand-values">Brand Values (comma separated)</Label>
                            <Textarea 
                              id="brand-values" 
                              value={brandingContext.brandValues.join(', ')}
                              onChange={(e) => handleArrayInput(e.target.value, 'brandValues')}
                              placeholder="Authenticity, Innovation, Community, etc."
                              className="resize-none"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="brand-voice">Brand Voice</Label>
                            <Input 
                              id="brand-voice" 
                              value={brandingContext.brandVoice}
                              onChange={(e) => handleBrandingContextChange('brandVoice', e.target.value)}
                              placeholder="Professional, Friendly, Authoritative, etc."
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="competitive-position">Competitive Positioning</Label>
                            <Input 
                              id="competitive-position" 
                              value={brandingContext.competitivePosition}
                              onChange={(e) => handleBrandingContextChange('competitivePosition', e.target.value)}
                              placeholder="How you differentiate from competitors"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Button 
              onClick={handleGenerateStory} 
              className="w-full py-6 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                  Generating Story...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-5 w-5" />
                  Generate Story
                </>
              )}
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle>Saved Templates</CardTitle>
                <CardDescription>
                  Reuse your successful story configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {saveTemplateMode ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-name">Template Name</Label>
                      <Input
                        id="template-name"
                        placeholder="E.g., Instagram Brand Awareness"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-description">Description (Optional)</Label>
                      <Textarea
                        id="template-description"
                        placeholder="Brief description of when to use this template"
                        value={newTemplateDescription}
                        onChange={(e) => setNewTemplateDescription(e.target.value)}
                        className="resize-none"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveTemplate} className="flex-1">
                        <Save className="mr-2 h-4 w-4" />
                        Save Template
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setSaveTemplateMode(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {templates.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {templates.map((template) => (
                          <AccordionItem key={template.id} value={template.id}>
                            <AccordionTrigger className="text-left">
                              {template.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-adpilot-text-secondary mb-4">
                                {template.description}
                              </p>
                              <Button 
                                variant="outline" 
                                onClick={() => loadTemplate(template)}
                                className="w-full"
                              >
                                Load Template
                              </Button>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="text-center py-6">
                        <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">
                          No saved templates yet. Save your current configuration as a template for future use.
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full"
                      onClick={() => setSaveTemplateMode(true)}
                    >
                      Save Current Configuration
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right column: Story output */}
          <div>
            <StoryOutput 
              isLoading={isLoading} 
              storyData={storyData} 
              errorMessage={errorMessage} 
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StorytellingPage;
