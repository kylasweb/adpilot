
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
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { ImageIcon, VideoIcon, Layers, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const creativeFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  type: z.string(),
  size: z.string(),
  campaign: z.string().optional(),
  description: z.string().optional(),
  tags: z.string().optional()
});

type CreativeFormValues = z.infer<typeof creativeFormSchema>;

interface NewCreativeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewCreativeForm = ({ open, onOpenChange }: NewCreativeFormProps) => {
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");

  const form = useForm<CreativeFormValues>({
    resolver: zodResolver(creativeFormSchema),
    defaultValues: {
      title: "",
      type: "image",
      size: "1200x628",
      campaign: "",
      description: "",
      tags: ""
    }
  });

  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = (data: CreativeFormValues) => {
    // Include tags in the submission
    const formData = {
      ...data,
      tags
    };
    
    console.log("Creative form submitted:", formData);
    toast.success("Creative added successfully!");
    onOpenChange(false);
  };

  const creativeTypes = [
    { value: "image", label: "Image", icon: ImageIcon },
    { value: "video", label: "Video", icon: VideoIcon },
    { value: "carousel", label: "Carousel", icon: Layers }
  ];

  const sizesForType = {
    image: ["1200x628", "1080x1080", "1200x1200", "1080x1920"],
    video: ["1080x1080", "1080x1920", "1280x720", "1920x1080"],
    carousel: ["1080x1080", "1200x628"]
  };

  const sizes = sizesForType[form.watch("type") as keyof typeof sizesForType] || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Creative</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creative Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title for your creative" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creative Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {creativeTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              <type.icon className="mr-2 h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="campaign"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign (Optional)</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="summer-sale">Summer Sale 2023</SelectItem>
                      <SelectItem value="product-launch">Product Launch</SelectItem>
                      <SelectItem value="holiday">Holiday Promotion</SelectItem>
                      <SelectItem value="brand-awareness">Brand Awareness Q3</SelectItem>
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
                      placeholder="Enter a description for your creative" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    #{tag}
                    <button
                      type="button"
                      className="ml-1 hover:text-red-500"
                      onClick={() => removeTag(tag)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a tag"
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <PlusCircle className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500">Upload your creative asset</p>
                <p className="text-xs text-gray-400">Drag and drop or click to upload</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Select File
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Creative</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCreativeForm;
