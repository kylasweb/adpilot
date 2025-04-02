
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { PieChart, Users, Filter, Database } from "lucide-react";

const cohortFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().optional(),
  source: z.string(),
  ageRange: z.array(z.number()),
  gender: z.array(z.string()),
  location: z.string().optional(),
  interests: z.array(z.string()).optional(),
  purchaseHistory: z.boolean().optional(),
  websiteVisitors: z.boolean().optional(),
  emailSubscribers: z.boolean().optional(),
  engagementLevel: z.number().min(1).max(100).optional(),
});

type CohortFormValues = z.infer<typeof cohortFormSchema>;

interface NewCohortFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewCohortForm = ({ open, onOpenChange }: NewCohortFormProps) => {
  const form = useForm<CohortFormValues>({
    resolver: zodResolver(cohortFormSchema),
    defaultValues: {
      name: "",
      description: "",
      source: "facebook",
      ageRange: [18, 65],
      gender: ["male", "female"],
      location: "",
      interests: [],
      purchaseHistory: false,
      websiteVisitors: false,
      emailSubscribers: false,
      engagementLevel: 50,
    }
  });

  const interestOptions = [
    { id: "technology", label: "Technology" },
    { id: "fashion", label: "Fashion" },
    { id: "sports", label: "Sports" },
    { id: "food", label: "Food & Cooking" },
    { id: "travel", label: "Travel" },
    { id: "fitness", label: "Health & Fitness" },
    { id: "entertainment", label: "Entertainment" },
  ];

  const onSubmit = (data: CohortFormValues) => {
    console.log("Cohort form submitted:", data);
    toast.success("Cohort created successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Cohort</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cohort Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter cohort name" {...field} />
                      </FormControl>
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
                          placeholder="Enter cohort description" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select data source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook Data</SelectItem>
                          <SelectItem value="crm">CRM Import</SelectItem>
                          <SelectItem value="website">Website Analytics</SelectItem>
                          <SelectItem value="manual">Manual Creation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select where this cohort's data will come from
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("source") === "facebook" && (
                  <div className="border rounded-md p-4 flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <Database className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Connected to Facebook</h3>
                      <p className="text-sm text-muted-foreground">Using data from your Facebook Business Manager</p>
                    </div>
                    <Button variant="outline" className="ml-auto">Refresh Connection</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="demographics" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <FormLabel>Age Range</FormLabel>
                    <div className="pt-6 px-2">
                      <FormField
                        control={form.control}
                        name="ageRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Slider 
                                min={13} 
                                max={65} 
                                step={1} 
                                value={field.value}
                                onValueChange={field.onChange}
                              />
                            </FormControl>
                            <div className="flex justify-between mt-2 text-sm">
                              <span>{field.value[0]} years</span>
                              <span>{field.value[1]} years</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Gender</FormLabel>
                        </div>
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes("male")}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, "male"])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== "male"
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Male
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes("female")}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, "female"])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== "female"
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Female
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes("other")}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, "other"])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== "other"
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Other
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. United States, California, Global" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter countries, states, or cities
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Interests</FormLabel>
                          <FormDescription>
                            Select the interests that apply to this cohort
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {interestOptions.map((interest) => (
                            <FormField
                              key={interest.id}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={interest.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(interest.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), interest.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== interest.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {interest.label}
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
                </div>
              </TabsContent>
              
              <TabsContent value="behavior" className="space-y-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="purchaseHistory"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div>
                          <FormLabel className="font-normal">Purchase History</FormLabel>
                          <FormDescription>
                            Users who have made a purchase in the last 30 days
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="websiteVisitors"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div>
                          <FormLabel className="font-normal">Website Visitors</FormLabel>
                          <FormDescription>
                            Users who have visited your website in the last 30 days
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emailSubscribers"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div>
                          <FormLabel className="font-normal">Email Subscribers</FormLabel>
                          <FormDescription>
                            Users who are subscribed to your email list
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <FormField
                      control={form.control}
                      name="engagementLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Engagement Level</FormLabel>
                          <FormControl>
                            <div className="pt-2 px-2">
                              <Slider
                                min={1}
                                max={100}
                                step={1}
                                value={[field.value || 50]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                              <div className="flex justify-between mt-2">
                                <span className="text-xs">Low</span>
                                <span className="text-xs font-medium">{field.value}%</span>
                                <span className="text-xs">High</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Target users based on their level of engagement with your content
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="border rounded-md p-4 mt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <PieChart className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="font-medium">Estimated Audience Size</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-muted rounded-md p-3">
                      <p className="text-sm text-muted-foreground">Reach</p>
                      <p className="text-xl font-bold">2.4M</p>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <p className="text-sm text-muted-foreground">Specificity</p>
                      <p className="text-xl font-bold">Medium</p>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <p className="text-sm text-muted-foreground">Cost</p>
                      <p className="text-xl font-bold">$$</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <DialogFooter className="pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Cohort</Button>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NewCohortForm;
