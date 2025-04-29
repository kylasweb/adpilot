export type ContentType = "social" | "website" | "seo" | "branding";

export type AIModel = "deepseek-coder" | "gemini-pro" | "llama3-70b" | "mixtral-8x7b" | "claude-3-opus";

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  contentType: ContentType;
  promptGuide?: string;
}

export interface AISuggestion {
  id: string;
  name: string;
  enabled: boolean;
}

export const contentTemplates: Record<ContentType, ContentTemplate[]> = {
  social: [
    {
      id: "instagram-post",
      name: "Instagram Post",
      description: "Create engaging Instagram content with captions and hashtags",
      contentType: "social",
      promptGuide: "Include caption, hashtags, and emoji suggestions"
    },
    {
      id: "linkedin-article",
      name: "LinkedIn Article",
      description: "Professional, thought leadership content for LinkedIn",
      contentType: "social",
      promptGuide: "Include a compelling headline, professional tone, and call to action"
    },
    {
      id: "twitter-thread",
      name: "Twitter Thread",
      description: "Engaging, short-form content series for Twitter",
      contentType: "social",
      promptGuide: "Create 5-7 connected tweets with engaging hooks"
    },
    {
      id: "facebook-post",
      name: "Facebook Post",
      description: "Shareable content optimized for Facebook's algorithm",
      contentType: "social",
      promptGuide: "Include post text, optional link description, and engagement question"
    },
    {
      id: "tiktok-script",
      name: "TikTok Script",
      description: "Short, engaging script ideas for TikTok videos",
      contentType: "social",
      promptGuide: "Include script, trending sound suggestions, and hashtags"
    }
  ],
  website: [
    {
      id: "homepage-copy",
      name: "Homepage Copy",
      description: "Compelling copy for your website's main landing page",
      contentType: "website",
      promptGuide: "Include headline, subheadings, benefits, and clear CTA"
    },
    {
      id: "product-description",
      name: "Product Description",
      description: "Compelling product descriptions that drive sales",
      contentType: "website",
      promptGuide: "Include features, benefits, specifications, and purchase incentives"
    },
    {
      id: "about-us",
      name: "About Us Page",
      description: "Company storytelling that builds trust and connection",
      contentType: "website",
      promptGuide: "Include company history, mission, values, and team highlights"
    },
    {
      id: "services-page",
      name: "Services Page",
      description: "Clear, compelling overview of service offerings",
      contentType: "website",
      promptGuide: "Include service descriptions, benefits, and differentiation points"
    },
    {
      id: "landing-page",
      name: "Landing Page",
      description: "Conversion-focused page for specific campaigns",
      contentType: "website",
      promptGuide: "Include headline, problem/solution, testimonials, and strong CTA"
    }
  ],
  seo: [
    {
      id: "blog-post",
      name: "SEO Blog Post",
      description: "Keyword-optimized blog content that ranks well",
      contentType: "seo",
      promptGuide: "Include target keywords, header structure, and meta description"
    },
    {
      id: "product-page-seo",
      name: "Product Page SEO",
      description: "Optimize product pages for search visibility",
      contentType: "seo",
      promptGuide: "Include target keywords, schema markup suggestions, and title tags"
    },
    {
      id: "local-seo",
      name: "Local SEO Content",
      description: "Content optimized for local search results",
      contentType: "seo",
      promptGuide: "Include location keywords, NAP information, and local schema suggestions"
    },
    {
      id: "faq-page",
      name: "FAQ Page",
      description: "Question-based content that targets search queries",
      contentType: "seo",
      promptGuide: "Include common questions, structured answers, and schema markup suggestions"
    },
    {
      id: "category-page",
      name: "Category Page SEO",
      description: "Optimized content for e-commerce category pages",
      contentType: "seo",
      promptGuide: "Include category keywords, description content, and internal linking strategy"
    }
  ],
  branding: [
    {
      id: "brand-story",
      name: "Brand Story",
      description: "Compelling narrative about your brand's journey and values",
      contentType: "branding",
      promptGuide: "Include origin story, mission, vision, and emotional connection points"
    },
    {
      id: "brand-voice",
      name: "Brand Voice Guide",
      description: "Defined communication style and tone for consistency",
      contentType: "branding",
      promptGuide: "Include tone attributes, writing examples, and do's and don'ts"
    },
    {
      id: "value-proposition",
      name: "Value Proposition",
      description: "Clear statement of the unique value you deliver",
      contentType: "branding",
      promptGuide: "Include main benefit, target audience, and differentiation points"
    },
    {
      id: "tagline-generator",
      name: "Tagline Generator",
      description: "Memorable phrases that capture your brand essence",
      contentType: "branding",
      promptGuide: "Generate 5-7 tagline options with rationale for each"
    },
    {
      id: "brand-messaging",
      name: "Brand Messaging Framework",
      description: "Structured hierarchy of key brand messages",
      contentType: "branding",
      promptGuide: "Include positioning statement, pillars, proof points, and elevator pitch"
    }
  ]
};

// Document creator types
export type DocumentType = 'quotation' | 'proposal' | 'invoice';

export type ServiceCategory = 
  | 'digital-marketing' 
  | 'web-design' 
  | 'social-media' 
  | 'seo' 
  | 'content-creation'
  | 'branding'
  | 'other';

export interface ClientInfo {
  name: string;
  email: string;
  company?: string;
  address?: string;
  phone?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: ServiceCategory;
}

export interface DocumentDetails {
  id: string;
  type: DocumentType;
  title: string;
  date: string;
  dueDate?: string;
  clientInfo: ClientInfo;
  items: ServiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes: string;
  terms: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'paid';
}
