
import React from "react";
import { Facebook, Instagram, MessageSquare } from "lucide-react";

export const platforms = {
  facebook: {
    name: "Facebook",
    icon: <Facebook size={16} className="text-blue-600" />,
    dimensions: [
      { name: "Feed Post", width: 1200, height: 630 },
      { name: "Square Post", width: 1080, height: 1080 },
      { name: "Story", width: 1080, height: 1920 },
      { name: "Cover Photo", width: 851, height: 315 },
      { name: "Event Cover", width: 1920, height: 1080 },
      { name: "Link Image", width: 1200, height: 628 },
    ]
  },
  instagram: {
    name: "Instagram",
    icon: <Instagram size={16} className="text-pink-600" />,
    dimensions: [
      { name: "Square Post", width: 1080, height: 1080 },
      { name: "Portrait Post", width: 1080, height: 1350 },
      { name: "Story", width: 1080, height: 1920 },
      { name: "Reel Cover", width: 1080, height: 1920 },
      { name: "IGTV Cover", width: 420, height: 654 },
      { name: "Profile Picture", width: 320, height: 320 },
    ]
  },
  whatsapp: {
    name: "WhatsApp",
    icon: <MessageSquare size={16} className="text-green-600" />,
    dimensions: [
      { name: "Status", width: 1080, height: 1920 },
      { name: "Profile Picture", width: 500, height: 500 },
      { name: "Channel Banner", width: 1600, height: 800 },
    ]
  }
};

export const templates = [
  // Facebook templates
  { id: "fb-template1", name: "Product Showcase", category: "product", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["product", "showcase"] },
  { id: "fb-template2", name: "Special Offer", category: "promotion", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["offer", "promotion"] },
  { id: "fb-template3", name: "Event Announcement", category: "event", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["event"] },
  { id: "fb-template4", name: "Testimonial", category: "branding", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["testimonial"] },
  { id: "fb-template5", name: "Quote Post", category: "content", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["quote"] },
  { id: "fb-template6", name: "Company Update", category: "branding", platform: "facebook", imageUrl: "/placeholder.svg", tags: ["update", "company"] },
  
  // Instagram templates
  { id: "ig-template1", name: "Product Gallery", category: "product", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["product", "gallery"] },
  { id: "ig-template2", name: "Story Highlight", category: "content", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["story", "highlight"] },
  { id: "ig-template3", name: "Carousel Post", category: "content", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["carousel"] },
  { id: "ig-template4", name: "Fashion Showcase", category: "product", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["fashion"] },
  { id: "ig-template5", name: "Quote Card", category: "content", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["quote"] },
  { id: "ig-template6", name: "Before-After", category: "product", platform: "instagram", imageUrl: "/placeholder.svg", tags: ["comparison"] },
  
  // WhatsApp templates
  { id: "wa-template1", name: "Sale Announcement", category: "promotion", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["sale"] },
  { id: "wa-template2", name: "Product Showcase", category: "product", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["product"] },
  { id: "wa-template3", name: "Store Hours", category: "information", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["hours", "info"] },
  { id: "wa-template4", name: "Contact Card", category: "information", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["contact"] },
  { id: "wa-template5", name: "FAQ Card", category: "information", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["faq"] },
  { id: "wa-template6", name: "Location Map", category: "information", platform: "whatsapp", imageUrl: "/placeholder.svg", tags: ["location"] },
];

export const elements = [
  // Shapes
  { id: "shape-rectangle", name: "Rectangle", type: "shape", icon: <Square className="h-6 w-6" /> },
  { id: "shape-circle", name: "Circle", type: "shape", icon: <Circle className="h-6 w-6" /> },
  { id: "shape-triangle", name: "Triangle", type: "shape", icon: <Triangle className="h-6 w-6" /> },
  { id: "shape-star", name: "Star", type: "shape", icon: <Star className="h-6 w-6" /> },
  { id: "shape-heart", name: "Heart", type: "shape", icon: <Heart className="h-6 w-6" /> },
  { id: "shape-line", name: "Line", type: "shape", icon: <Minus className="h-6 w-6" /> },
  
  // Images
  { id: "image-placeholder", name: "Placeholder", type: "image", icon: <ImageIcon className="h-6 w-6" /> },
  { id: "image-frame", name: "Frame", type: "image", icon: <Square className="h-6 w-6" /> },
  { id: "image-masking", name: "Mask", type: "image", icon: <Layers className="h-6 w-6" /> },
  
  // Text
  { id: "text-heading", name: "Heading", type: "text", icon: <Type className="h-4 w-4" /> },
  { id: "text-subheading", name: "Subheading", type: "text", icon: <Type className="h-4 w-4" /> },
  { id: "text-paragraph", name: "Paragraph", type: "text", icon: <Text className="h-4 w-4" /> },
  { id: "text-caption", name: "Caption", type: "text", icon: <Text className="h-4 w-4" /> },
  { id: "text-quote", name: "Quote", type: "text", icon: <Text className="h-4 w-4" /> },
  
  // Stickers
  { id: "sticker-star", name: "Star Rating", type: "sticker", icon: <Star className="h-6 w-6" /> },
  { id: "sticker-heart", name: "Heart", type: "sticker", icon: <Heart className="h-6 w-6" /> },
  { id: "sticker-arrow", name: "Arrow", type: "sticker", icon: <ArrowRight className="h-6 w-6" /> },
  { id: "sticker-check", name: "Checkmark", type: "sticker", icon: <Check className="h-6 w-6" /> },
  { id: "sticker-plus", name: "Plus", type: "sticker", icon: <Plus className="h-6 w-6" /> },
];

// Need to import these icons for the elements
import { 
  Square, 
  Circle, 
  Triangle, 
  Star, 
  Heart, 
  Minus, 
  Type, 
  Text, 
  Layers, 
  ArrowRight, 
  Check, 
  Plus, 
  ImageIcon 
} from "lucide-react";
