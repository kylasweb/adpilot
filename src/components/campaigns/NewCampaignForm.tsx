
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { CalendarIcon, DollarSign, Target, Users, Clock, Image, Facebook, Instagram, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

const campaignFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  objective: z.string(),
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid budget" }),
  budgetType: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  platform: z.string(),
  audience: z.string(),
  description: z.string().optional(),
  creatives: z.array(z.string()).optional(),
  optimizationGoal: z.string(),
  bidStrategy: z.string(),
  schedule: z.object({
    useSchedule: z.boolean().default(false),
    days: z.array(z.string()).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
  tracking: z.object({
    pixelId: z.string().optional(),
    conversionEvent: z.string().optional(),
    trackConversions: z.boolean().default(true),
  }),
  adAccount: z.string().optional(),
  placements: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

interface NewCampaignFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewCampaignForm = ({ open, onOpenChange }: NewCampaignFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedCreatives, setSelectedCreatives] = useState<string[]>([]);

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      objective: "awareness",
      budget: "",
      budgetType: "lifetime",
      startDate: new Date(),
      platform: "facebook",
      audience: "",
      description: "",
      optimizationGoal: "reach",
      bidStrategy: "lowest_cost",
      schedule: {
        useSchedule: false,
        days: [],
        startTime: "09:00",
        endTime: "17:00",
      },
      tracking: {
        trackConversions: true,
        pixelId: "",
        conversionEvent: "purchase",
      },
      adAccount: "",
      placements: ["feed", "stories"],
      keywords: [],
    }
  });

  const onSubmit = (data: CampaignFormValues) => {
    console.log("Campaign form submitted:", data);
    toast.success("Campaign created successfully!");
    onOpenChange(false);
  };

  const handleCreativeSelect = (creativeId: string) => {
    setSelectedCreatives(prev => 
      prev.includes(creativeId) 
        ? prev.filter(id => id !== creativeId) 
        : [...prev, creativeId]
    );
    
    form.setValue("creatives", 
      selectedCreatives.includes(creativeId) 
        ? selectedCreatives.filter(id => id !== creativeId) 
        : [...selectedCreatives, creativeId]
    );
  };

  const adAccounts = [
    { id: "acc_123", name: "Main Business Account" },
    { id: "acc_456", name: "Brand Marketing" },
    { id: "acc_789", name: "Product Promotions" },
  ];

  const weekdays = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ];

  const conversionEvents = [
    { id: "purchase", label: "Purchase" },
    { id: "add_to_cart", label: "Add to Cart" },
    { id: "view_content", label: "View Content" },
    { id: "lead", label: "Lead" },
    { id: "complete_registration", label: "Registration" },
  ];

  const mockCreatives = [
    { id: "creative_1", name: "Summer Sale Banner", type: "image", platform: "facebook" },
    { id: "creative_2", name: "Product Showcase", type: "image", platform: "instagram" },
    { id: "creative_3", name: "Limited Time Offer", type: "video", platform: "facebook" },
  ];

  const placementOptions = [
    { id: "feed", label: "News Feed" },
    { id: "stories", label: "Stories" },
    { id: "reels", label: "Reels" },
    { id: "marketplace", label: "Marketplace" },
    { id: "search", label: "Search Results" },
    { id: "messenger", label: "Messenger" },
  ];

  // Next tab handler
  const handleNextTab = () => {
    switch (activeTab) {
      case "basic":
        setActiveTab("targeting");
        break;
      case "targeting":
        setActiveTab("budget");
        break;
      case "budget":
        setActiveTab("creatives");
        break;
      case "creatives":
        setActiveTab("schedule");
        break;
      case "schedule":
        setActiveTab("tracking");
        break;
      case "tracking":
        // Submit the form
        form.handleSubmit(onSubmit)();
        break;
      default:
        break;
    }
  };

  // Previous tab handler
  const handlePrevTab = () => {
    switch (activeTab) {
      case "targeting":
        setActiveTab("basic");
        break;
      case "budget":
        setActiveTab("targeting");
        break;
      case "creatives":
        setActiveTab("budget");
        break;
      case "schedule":
        setActiveTab("creatives");
        break;
      case "tracking":
        setActiveTab("schedule");
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Advanced Campaign Configurator</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-6 mb-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="targeting">Targeting</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
                <TabsTrigger value="creatives">Creatives</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="tracking">Tracking</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="adAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Account</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ad account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {adAccounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose which ad account to use for this campaign
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter campaign name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="objective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Objective</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select objective" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="awareness">Brand Awareness</SelectItem>
                          <SelectItem value="traffic">Traffic</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="leads">Lead Generation</SelectItem>
                          <SelectItem value="conversions">Conversions</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="app_installs">App Installs</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This determines how your campaign will be optimized
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="facebook">
                            <div className="flex items-center gap-2">
                              <Facebook size={16} className="text-blue-600" />
                              <span>Facebook</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="instagram">
                            <div className="flex items-center gap-2">
                              <Instagram size={16} className="text-pink-600" />
                              <span>Instagram</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="both">
                            <div className="flex items-center gap-2">
                              <Globe size={16} className="text-purple-600" />
                              <span>Facebook & Instagram</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="placements"
                  render={() => (
                    <FormItem>
                      <div className="mb-2">
                        <FormLabel>Ad Placements</FormLabel>
                        <FormDescription>
                          Select where your ads will appear
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {placementOptions.map((placement) => (
                          <FormField
                            key={placement.id}
                            control={form.control}
                            name="placements"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={placement.id}
                                  className="flex items-center space-x-2"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(placement.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), placement.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== placement.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {placement.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter campaign description" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="targeting" className="space-y-4">
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new-customers">New Customers</SelectItem>
                          <SelectItem value="repeat-buyers">Repeat Buyers</SelectItem>
                          <SelectItem value="high-value">High Value Users</SelectItem>
                          <SelectItem value="custom">Custom Audience</SelectItem>
                          <SelectItem value="lookalike">Lookalike Audience</SelectItem>
                          <SelectItem value="interest-based">Interest-Based Audience</SelectItem>
                          <SelectItem value="behavior-based">Behavior-Based Audience</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select from your saved audiences or create a new one
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="optimizationGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Optimization Goal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select optimization goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="reach">Reach</SelectItem>
                          <SelectItem value="impressions">Impressions</SelectItem>
                          <SelectItem value="link_clicks">Link Clicks</SelectItem>
                          <SelectItem value="landing_page_views">Landing Page Views</SelectItem>
                          <SelectItem value="conversions">Conversions</SelectItem>
                          <SelectItem value="app_installs">App Installs</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How will the delivery system optimize your ads
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bidStrategy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bid Strategy</FormLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="lowest_cost" />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Lowest Cost</FormLabel>
                            <FormDescription>
                              Get the most results at the lowest cost (recommended)
                            </FormDescription>
                          </div>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cost_cap" />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Cost Cap</FormLabel>
                            <FormDescription>
                              Control your cost per optimization event
                            </FormDescription>
                          </div>
                        </FormItem>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border rounded-md p-4 space-y-4">
                  <h3 className="text-sm font-medium">Audience Insights</h3>
                  {form.watch("audience") && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-md p-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Users size={16} />
                          <span>Estimated Reach</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">1.2M - 3.4M</p>
                      </div>
                      <div className="bg-muted rounded-md p-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Target size={16} />
                          <span>Targeting Score</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">8/10</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="budget" className="space-y-4">
                <FormField
                  control={form.control}
                  name="budgetType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Type</FormLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="daily" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Daily Budget
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="lifetime" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Lifetime Budget
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                      <FormDescription>
                        Choose how you want your budget to be spent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Budget</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="0.00" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        {form.watch("budgetType") === "daily" 
                          ? "Amount to spend each day of the campaign" 
                          : "Total budget for the entire campaign duration"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date (Optional)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <= form.watch("startDate") || date < new Date()
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Leave empty for ongoing campaigns
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Budget Allocation</h3>
                  <div className="bg-muted rounded-md p-3">
                    <div className="flex justify-between text-sm">
                      <span>Daily Budget (Est.)</span>
                      <span className="font-medium">$10.71/day</span>
                    </div>
                    <div className="w-full bg-adpilot-muted h-2 rounded-full mt-2">
                      <div className="bg-adpilot-primary h-full rounded-full w-1/3"></div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="creatives" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Select Creatives</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => {}}>
                    <Image className="mr-2 h-4 w-4" />
                    Create New
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {mockCreatives.map((creative) => (
                    <div 
                      key={creative.id}
                      className={cn(
                        "border rounded-md p-4 cursor-pointer",
                        selectedCreatives.includes(creative.id) && "border-primary bg-primary/5"
                      )}
                      onClick={() => handleCreativeSelect(creative.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{creative.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{creative.type}</span>
                            {creative.platform === "facebook" && <Facebook size={12} className="text-blue-600" />}
                            {creative.platform === "instagram" && <Instagram size={12} className="text-pink-600" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-6">
                  <h3 className="text-sm font-medium mb-3">Creative Recommendations</h3>
                  <div className="bg-muted rounded-md p-3">
                    <p className="text-sm">Based on your campaign objective and audience, we recommend creating square (1:1) images with minimal text for optimal performance.</p>
                    <Button type="button" variant="link" size="sm" className="mt-2 p-0" onClick={() => {}}>
                      Learn more about creative best practices
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <FormField
                  control={form.control}
                  name="schedule.useSchedule"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel className="font-normal">Use Ad Scheduling</FormLabel>
                        <FormDescription>
                          Run your ads only during specific days and times
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch("schedule.useSchedule") && (
                  <>
                    <FormField
                      control={form.control}
                      name="schedule.days"
                      render={() => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel>Days of Week</FormLabel>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {weekdays.map((day) => (
                              <FormField
                                key={day.id}
                                control={form.control}
                                name="schedule.days"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={day.id}
                                      className="flex items-center space-x-2"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(day.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), day.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== day.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {day.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="schedule.startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="time" className="pl-8" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="schedule.endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="time" className="pl-8" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                <div className="border rounded-md p-4 mt-2">
                  <h3 className="text-sm font-medium mb-2">Time Zone</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ad scheduling will use the time zone:</span>
                    <span className="font-medium">Advertiser's Time Zone (UTC-8)</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tracking" className="space-y-4">
                <FormField
                  control={form.control}
                  name="tracking.trackConversions"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel className="font-normal">Track Conversions</FormLabel>
                        <FormDescription>
                          Track actions on your website after people see your ad
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch("tracking.trackConversions") && (
                  <>
                    <FormField
                      control={form.control}
                      name="tracking.pixelId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pixel ID</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 1234567890" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your Facebook Pixel ID to track conversions
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tracking.conversionEvent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conversion Event</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {conversionEvents.map((event) => (
                                <SelectItem key={event.id} value={event.id}>
                                  {event.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <div className="border rounded-md p-4 mt-2">
                  <h3 className="text-sm font-medium mb-2">Attribution Settings</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Attribution Window:</span>
                    <span className="font-medium">7-day click, 1-day view</span>
                  </div>
                  <div className="mt-4">
                    <FormLabel className="text-sm mb-2 inline-block">Attribution Model</FormLabel>
                    <RadioGroup
                      defaultValue="last_click"
                      className="grid grid-cols-1 gap-2"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="last_click" />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">
                          Last Click
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="last_touch" />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">
                          Last Touch
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="pt-4 border-t flex items-center justify-between">
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                
                {activeTab !== "basic" && (
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handlePrevTab}
                  >
                    Previous
                  </Button>
                )}
              </div>
              
              {activeTab === "tracking" ? (
                <Button type="submit">Create Campaign</Button>
              ) : (
                <Button type="button" onClick={handleNextTab}>
                  Next
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignForm;
