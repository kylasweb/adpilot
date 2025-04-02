
import React from "react";
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
import { CalendarIcon, DollarSign, Target, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const campaignFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  objective: z.string(),
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid budget" }),
  startDate: z.date(),
  endDate: z.date().optional(),
  platform: z.string(),
  audience: z.string(),
  description: z.string().optional(),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

interface NewCampaignFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewCampaignForm = ({ open, onOpenChange }: NewCampaignFormProps) => {
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      objective: "awareness",
      budget: "",
      startDate: new Date(),
      platform: "facebook",
      audience: "",
      description: ""
    }
  });

  const onSubmit = (data: CampaignFormValues) => {
    console.log("Campaign form submitted:", data);
    toast.success("Campaign created successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Campaign</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="targeting">Targeting</TabsTrigger>
            <TabsTrigger value="budget">Budget & Schedule</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="basic" className="space-y-4">
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
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="both">Facebook & Instagram</SelectItem>
                        </SelectContent>
                      </Select>
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
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select from your saved audiences or create a new one
                      </FormDescription>
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
                        Total budget for the entire campaign duration
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
              
              <DialogFooter className="pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Campaign</Button>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignForm;
