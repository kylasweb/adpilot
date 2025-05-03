
import { useState } from "react";

// Sample story templates for different objectives and platforms
const storyTemplates: Record<string, Record<string, any>> = {
  brand_awareness: {
    instagram: {
      hook: "Visual: A stunning timelapse showing your brand logo materializing from particles in the air, followed by real customers interacting with your product in diverse settings.",
      hookText: "More than just a product—it's a lifestyle. See how [Brand] is changing the game. 👀",
      story: "The video opens with a stunning visual of particles coming together to form your brand logo. As the logo materializes, we transition to a montage of diverse customers using your product in their everyday lives. Each customer represents a different demographic, showing the universal appeal of your brand. The video highlights the key features of your product without explicitly stating them, letting the visuals tell the story. We see people enjoying the benefits, smiling, and connecting with others. The video ends with a community of users coming together, suggesting that using your product makes you part of something bigger.",
      learningPoints: [
        "Brand Recognition: The particle animation creates a memorable visual association with your logo.",
        "Universal Appeal: Diverse representation shows your product is for everyone.",
        "Lifestyle Integration: Demonstrates how your product fits seamlessly into everyday life.",
        "Community Building: Creates a sense of belonging among your customers."
      ],
      cta: "Join the [Brand] community today and experience the difference. Link in bio to discover our full range! #BrandAwareness #CommunityFirst",
      visuals: [
        "Particle animation morphing into logo (high-contrast colors against a simple background)",
        "Diverse group of 5-7 people using product in various settings (urban, home, outdoors)",
        "Close-up shots of satisfied expressions",
        "Wide shot of users coming together in a community setting",
        "Soft, aspirational background music with gradual build-up"
      ]
    }
  },
  product_launch: {
    instagram_reels: {
      hook: "Visual: A sleek black box sits mysteriously in the center of a white room. As the camera circles it, the box begins to glow and slowly open, releasing a beam of light that reveals your new product floating in mid-air.",
      hookText: "The wait is over. Meet the future of [product category]. #GameChanger",
      story: "The Reel begins with a sleek black box sitting mysteriously in a white room. As suspenseful music builds, the box begins to glow around the edges. Slowly, it opens to reveal your new product emerging in dramatic fashion, bathed in light. The camera captures the product from multiple angles, highlighting its innovative design and key features. We then see quick shots of the product in action, solving problems that competitors can't. Users express genuine amazement as they experience the product for the first time. The Reel concludes with the product name and launch date displayed prominently, followed by a stack of the boxes suggesting limited availability.",
      learningPoints: [
        "Innovation Showcase: The dramatic reveal positions your product as revolutionary.",
        "Problem-Solution Narrative: Demonstrates how your product solves existing pain points.",
        "Exclusivity: Creates a sense of limited availability to drive immediate action.",
        "Visual Impact: The contrast between the black box and white room creates a memorable visual."
      ],
      cta: "Be among the first to experience [Product Name]. Pre-orders open now—link in bio! Limited quantities available. #ProductLaunch #Innovation",
      visuals: [
        "Minimalist white room with dramatic lighting and shadows",
        "Black box with subtle brand elements etched on surface",
        "Slow-motion reveal with particle effects or light flares",
        "Multiple angle shots showing product features",
        "Quick testimonial clips from early users with surprised expressions"
      ]
    }
  },
  community_engagement: {
    tiktok: {
      hook: "Visual: Split screen showing diverse users attempting a creative challenge with your product, each adding their unique twist, building momentum with each new participant added to the grid.",
      hookText: "Everyone's doing the #[BrandName]Challenge! Think you can top these? Show us your moves! 🔥",
      story: "The TikTok opens with a split screen of diverse users preparing to take on a creative challenge using your product. Each participant adds their unique twist to the challenge, with the grid expanding to show more contributors as the video progresses. The challenge itself is simple enough that anyone can participate but leaves room for creative expression. Audio cues signal transitions between contributors, creating a rhythmic flow. Overlaid text highlights particularly clever approaches. The community aspect is emphasized through reaction shots and duet-style interactions. The video concludes with a mosaic of all participants forming your brand logo or tagline, emphasizing the community you've built.",
      learningPoints: [
        "User-Generated Content: Creates a sustainable content engine through participation.",
        "Inclusivity: Diverse representation encourages wider participation.",
        "Brand Association: Links fun, creativity, and community to your brand identity.",
        "Viral Potential: Simple but customizable format maximizes shareability."
      ],
      cta: "Show us YOUR version of the #[BrandName]Challenge! Post with our hashtag for a chance to be featured and win [prize]. The most creative entry gets [special prize]!",
      visuals: [
        "Multi-grid layout with 4-9 creators in different settings",
        "Transition effects between participants (wipes, spins, etc.)",
        "Trending audio track with recognizable beat drops for transitions",
        "Animated text callouts for standout moments",
        "Final mosaic effect bringing all participants together"
      ]
    }
  },
  education: {
    linkedin: {
      hook: "Visual: An elegant data visualization transforms from a complex, chaotic arrangement into a clear, structured infographic, revealing insights that were previously hidden in the noise.",
      hookText: "There's clarity in complexity. Our new research reveals 3 industry trends that 87% of leaders are missing. #DataInsights",
      story: "The post opens with an elegant data visualization that transforms from chaos to clarity, symbolizing the insights our research has uncovered. We then present a series of three key findings from our industry research, each supported by compelling statistics and real-world examples. Each insight is contrasted with common misconceptions, highlighting why 87% of industry leaders are missing these critical trends. The content maintains a professional tone while making complex data accessible through clear visualizations and concrete examples. Expert quotes from respected figures in your industry add credibility to the findings. The post concludes by positioning your organization as a thought leader with additional resources available for those who want to dive deeper.",
      learningPoints: [
        "Data Storytelling: Transforms complex information into accessible insights.",
        "Myth Busting: Challenges industry assumptions with evidence-based alternatives.",
        "Thought Leadership: Positions your brand as an authority in your space.",
        "Value-First Content: Provides genuinely useful information before any sales message."
      ],
      cta: "Download our complete research report to discover all 7 emerging trends and how they'll impact your strategy in 2025. Comment below with which trend surprised you most, or tag a colleague who needs to see this. #IndustryInsights #ThoughtLeadership",
      visuals: [
        "Professional data visualization with brand colors (bar charts, line graphs, etc.)",
        "Clean, minimalist slides with significant white space",
        "Professional headshots of quoted experts with credentials",
        "Branded report cover image for the downloadable content",
        "Company logo subtle but visible in corner of each slide"
      ]
    }
  }
};

export function useStoryGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [storyData, setStoryData] = useState<{
    hook: string;
    hookText: string;
    story: string;
    learningPoints: string[];
    cta: string;
    visuals: string[];
  } | null>(null);

  const generateStory = async (params: {
    objective: string;
    platform: string;
    industry: string;
    ageRange: [number, number];
    language: string;
    interests: string;
    tone: string;
    elements: string[];
  }) => {
    setIsLoading(true);
    
    // In a real implementation, this would call an AI API
    // For this demo, we'll use the templates and add some randomness
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get template based on objective and platform, or fallback to defaults
      let template = storyTemplates[params.objective]?.[params.platform];
      
      if (!template) {
        // Use the first available template as fallback
        const firstObjective = Object.keys(storyTemplates)[0];
        const firstPlatform = Object.keys(storyTemplates[firstObjective])[0];
        template = storyTemplates[firstObjective][firstPlatform];
        
        // Customize it a bit based on params
        template = {
          ...template,
          hook: template.hook + ` [Customized for ${params.platform} and ${params.objective}]`,
          story: template.story + `\n\nThis content is tailored for the ${params.industry} industry, targeting audiences aged ${params.ageRange[0]}-${params.ageRange[1]} who are interested in ${params.interests}. The tone is ${params.tone}.`,
        };
      }
      
      // Add interactive elements mentions if selected
      if (params.elements.length > 0) {
        const elementsText = `\n\nThe content incorporates interactive elements like ${params.elements.join(', ')} to boost engagement.`;
        template.story += elementsText;
      }
      
      setStoryData(template);
    } catch (error) {
      console.error("Error generating story:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateStory,
    isLoading,
    storyData,
  };
}
