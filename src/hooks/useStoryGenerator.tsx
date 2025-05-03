
import { useState } from "react";
import { toast } from "sonner";
import { getApiKey, isProviderEnabled } from "@/services/apiKeyManager";

// Extended story templates with more options
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
    },
    tiktok: {
      hook: "Visual: Your logo appears as neon lights that turn on one by one, revealing your brand name at the center of a dark screen, before exploding into a montage of people using your product.",
      hookText: "Everyone's talking about it. Here's why. #[BrandName] 🔥",
      story: "The TikTok starts with a black screen where your logo appears in neon lights, turning on section by section to build anticipation. Once fully lit, the logo pulses to the beat of a trending sound before exploding into colorful particles that transition into quick cuts of diverse people using your product in unexpected ways. Each person shows a genuine reaction of surprise or delight, emphasizing the 'wow factor.' The video uses the popular transition effect where users point to different areas of the screen, revealing new product features with each point. The final frame shows all users in a split-screen grid, using the product in unison with your logo superimposed in the center.",
      learningPoints: [
        "Instant Recognition: The neon effect creates a memorable first impression of your brand.",
        "Pattern Interrupt: The unexpected ways people use your product grabs attention.",
        "Trend Utilization: Leveraging popular TikTok transition effects increases shareability.",
        "Community Validation: Multiple users demonstrating the product builds social proof."
      ],
      cta: "Don't believe the hype? Try it yourself. 👆 Link in bio for 15% off your first purchase. #[BrandName]Challenge",
      visuals: [
        "Neon logo animation with flickering effect and electrical sounds",
        "3-5 diverse users with exaggerated surprised reactions",
        "Quick-cut transitions timed to beat drops in trending audio",
        "Split-screen finale with synchronized movements",
        "Text overlay highlighting key features with emoji accents"
      ]
    },
    linkedin: {
      hook: "Visual: A professionally animated data visualization shows your industry's growth curve, then zooms out to reveal your brand logo at the inflection point where growth accelerates dramatically.",
      hookText: "The market is evolving. [Brand] is leading the transformation. Here's how we're reshaping [industry].",
      story: "The video begins with a clean, professional data visualization showing market trends in your industry. As the animation progresses, we see a clear inflection point where growth accelerates dramatically. The camera pulls back to reveal that this inflection point coincides with your brand's entry into the market. The visualization transforms into a series of elegant business infographics that highlight key metrics and success stories. Professional testimonials from industry leaders appear as pull quotes alongside their professional headshots. The video maintains a sophisticated aesthetic throughout, using your brand colors in a subtle, professional way. It concludes with a concise value proposition statement and your logo.",
      learningPoints: [
        "Data Storytelling: Using visualizations to demonstrate your market impact adds credibility.",
        "Professional Authority: Industry expert testimonials establish thought leadership.",
        "Problem-Solution Framework: Clearly positioning your brand as the solution to market challenges.",
        "Visual Branding: Subtle incorporation of brand colors maintains professional tone while building recognition."
      ],
      cta: "Download our complete industry report to see how [Brand] is driving transformation in [industry]. Connect with our team to discuss how these insights can benefit your organization.",
      visuals: [
        "Clean data visualization with professional color scheme and subtle animations",
        "Split-screen comparisons of before/after metrics with clear typography",
        "Professional headshots of testimonial sources with credentials",
        "Minimalist transition effects that maintain corporate feel",
        "Subtle brand color palette throughout with increased prominence in conclusion"
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
    },
    youtube_shorts: {
      hook: "Visual: A countdown timer in your brand colors ticks down from 10 to 0 with increasing speed, intercut with extreme close-ups of your product's most innovative features, before revealing the full product at 0.",
      hookText: "10 seconds to see what's about to change everything in [industry]. Watch until the end.",
      story: "The video opens with a dramatic countdown timer in your brand colors. Between each number, we see extreme close-up shots of your product's most innovative features—so close that viewers can't quite tell what they're looking at, building curiosity. The pace quickens as we approach zero, with the music intensifying. At zero, there's a moment of silence and darkness, before the full product is revealed in a dramatic lighting setup that emphasizes its design. The video then demonstrates the product's key feature in a way that visually communicates its 'wow factor' in just a few seconds. We see a side-by-side comparison showing how much better/faster/easier your product makes a common task compared to existing solutions. The video ends with the product name, tagline, and launch date, followed by a brief availability teaser.",
      learningPoints: [
        "Anticipation Building: The countdown format creates suspense and encourages viewers to watch until the end.",
        "Mystery Element: Extreme close-ups tease the product without revealing it fully, driving curiosity.",
        "Visual Comparison: Side-by-side demonstration clearly communicates the product's advantage.",
        "Time Sensitivity: Launch date and limited availability messaging creates urgency."
      ],
      cta: "Available [date]. Click the link in description to be notified the moment it drops. First 500 orders get [special bonus]. #ComingSoon",
      visuals: [
        "Animated countdown with dynamic transitions between numbers",
        "Macro lens shots of product details with shallow depth of field",
        "Dramatic reveal with lighting that accentuates product silhouette",
        "Split-screen comparison demonstration with visible time/effort savings",
        "Fast-paced editing synchronized with energetic background music"
      ]
    },
    facebook: {
      hook: "Visual: A series of customer pain points shown as brief vignettes—people struggling with an everyday problem—each marked with a red 'X', followed by someone using your new product with ease, marked with a green checkmark.",
      hookText: "We've all been there. But not anymore. Introducing [Product Name]—launching this week.",
      story: "The video opens with a relatable scenario: someone struggling with a common problem your product solves. We see their frustration clearly as text callouts highlight the specific pain points. A red 'X' appears, transitioning us to another similar scenario with a different person, creating a pattern of shared problems. After establishing these pain points, we transition to a solution segment where your product is introduced. We see the same scenarios replayed, but this time with people using your product, each marked with a green checkmark as the problems are solved effortlessly. Text overlays highlight key features and benefits as we see the product in action from multiple angles. The mood shifts from frustration to satisfaction, reinforced by the changing music. The video includes quick testimonial snippets from beta testers with their names and professions displayed to add credibility. It concludes with product pricing, launch date, and a special launch offer.",
      learningPoints: [
        "Problem Agitation: Highlighting pain points before solutions creates emotional investment.",
        "Visual Contrast: The red X vs. green checkmark creates a clear before/after visual language.",
        "Social Proof: Beta tester testimonials add credibility and real-world validation.",
        "Value Proposition: Clear pricing alongside demonstrated benefits establishes value."
      ],
      cta: "Say goodbye to [problem] forever. Pre-order now at the special launch price of [price]—offer ends at midnight on [date]. Tag someone who needs this!",
      visuals: [
        "Relatable problem scenarios filmed in everyday settings",
        "Red X and green checkmark graphic overlays with animation",
        "Close-up shots of product being used with feature callouts",
        "Split screen before/after comparisons",
        "Testimonial clips with name/profession text overlay"
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
    },
    instagram_stories: {
      hook: "Visual: A 'Behind the Scenes' style opening where someone is setting up your product, then turning to the camera to say 'Want to see something cool?' before demonstrating an unexpected use or hack.",
      hookText: "Our community discovers the BEST hacks! Check out what @user found out about [Product]! #CommunityTip",
      story: "The Story opens with a casual, authentic 'behind the scenes' aesthetic where a real customer is setting up your product. They turn to the camera with an excited expression and say 'Want to see something cool?' This creates an intimate, friend-sharing-a-secret feeling. They proceed to demonstrate an unexpected use case or hack for your product that delivers additional value. The demonstration is quick but clear, with text overlays highlighting key steps. After showing the hack, we cut to reactions from other community members trying it themselves, emphasizing the community aspect. The Story includes a question sticker asking 'What's YOUR favorite way to use [Product]?' to drive engagement. It concludes with a swipe-up invitation to see more community tips and tricks on your website or to join your community platform.",
      learningPoints: [
        "Authenticity: The casual, unscripted feeling builds trust and relatability.",
        "Value Addition: Showing unexpected uses increases perceived product value.",
        "Community Wisdom: Positioning tips as coming from users rather than the brand increases credibility.",
        "Engagement Driver: The question sticker creates immediate interaction opportunities."
      ],
      cta: "Got your own [Product] hack? Share it with #[BrandName]Hack for a chance to be featured! Swipe up to see our community's top 10 favorite uses!",
      visuals: [
        "Authentic, slightly imperfect footage with natural lighting",
        "Close-up of the 'aha moment' when the hack is demonstrated",
        "Text overlay with step numbers or key points in brand colors",
        "Multiple user reactions showing surprise or appreciation",
        "Interactive elements (question sticker, poll, etc.)"
      ]
    },
    facebook_groups: {
      hook: "Visual: A time-lapse montage showing your community growing from a few members to thousands, visualized as an expanding network of connected dots, with real member profile pictures appearing throughout the animation.",
      hookText: "From 10 members to 10,000 in one year. See how our community of [product/interest] enthusiasts is changing lives.",
      story: "The video begins with a time-lapse visualization showing your community growing from a small group to a thriving network, represented by an expanding web of connected dots. As the network grows, we transition to a series of authentic community moments: screenshots of particularly helpful conversations, celebratory milestones shared by members, virtual events with high attendance, and real success stories attributable to community support. These are presented as a warm montage with soft transitions between each highlight. Community moderators and key contributors are spotlighted with their names and a brief quote about what the community means to them. The video highlights specific ways the community adds value: knowledge sharing, emotional support, collaboration opportunities, or whatever is most relevant to your specific group. It concludes with an invitation to join and statistics about the community's positive impact.",
      learningPoints: [
        "Growth Narrative: Visualizing the community's expansion demonstrates social proof and momentum.",
        "Value Showcase: Highlighting specific benefits of membership answers the 'what's in it for me?' question.",
        "Recognition: Spotlighting contributors strengthens their commitment and shows the human side.",
        "Impact Metrics: Specific statistics about the community's achievements build credibility."
      ],
      cta: "Join over 10,000 [interest/profession] enthusiasts just like you. Our members report [specific benefit] within just 30 days of joining. What are you waiting for? Click 'Join Group' now!",
      visuals: [
        "Animated network visualization with brand color scheme",
        "Authentic screenshots of valuable community interactions (with privacy considered)",
        "Smiling photos of community moderators and active members",
        "Text overlays with impressive community statistics and milestones",
        "Warm color grading with soft transitions between segments"
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
    },
    youtube: {
      hook: "Visual: A common industry problem is demonstrated in a relatable way, followed by a concise question appearing on screen: 'What if there's a better approach?'",
      hookText: "Most [professionals] make this crucial mistake. Here's what to do instead.",
      story: "The video opens by showing a common industry problem or mistake in a visually engaging way. After establishing the problem, the host introduces themselves with a brief credential statement that establishes their expertise. The instructional content is then broken down into clearly numbered steps or concepts, with on-screen text reinforcing key points. Complex ideas are explained using simple analogies and visual metaphors. The video uses a mix of talking head shots, screen captures, animations, and real-world demonstrations as appropriate for the subject matter. Throughout the video, practical examples show the concepts being applied to real situations. The educational content takes up 90% of the video, with only a brief mention of your product or service at the end, positioned as a resource for implementing the knowledge shared.",
      learningPoints: [
        "Problem-Solution Structure: Opening with a common pain point creates immediate relevance.",
        "Credential Establishment: Briefly stating qualifications builds trust without being boastful.",
        "Micro-Learning: Breaking content into clear steps makes information digestible and actionable.",
        "Value-First Approach: Providing substantial educational content before any promotional message builds goodwill."
      ],
      cta: "Put these insights into practice with our free worksheet, available at [URL]. If you found this helpful, subscribe for weekly tutorials and hit the notification bell so you never miss our latest content.",
      visuals: [
        "Professional talking head shots with clean, uncluttered background",
        "Animated text overlays highlighting key points and steps",
        "Screen recordings for software-related demonstrations",
        "Split-screen comparisons of correct vs. incorrect approaches",
        "Simple animated diagrams explaining complex concepts"
      ]
    },
    instagram_carousel: {
      hook: "Visual: The first slide shows a surprising statistic or myth about your industry, designed to challenge assumptions, with an attention-grabbing headline.",
      hookText: "Swipe to discover 5 [industry] myths that could be costing you [time/money/opportunity]. #3 surprised even our experts.",
      story: "The carousel begins with a bold, graphically striking first slide featuring a surprising statistic or common misconception about your industry. Each subsequent slide tackles one myth or misconception, following a consistent format: the myth stated clearly at the top, followed by the reality, and supported by a concise explanation with data or expert insight. The design is highly visual with minimal text, using infographics, charts, or illustrations to communicate complex ideas simply. The color scheme and design elements remain consistent throughout, with each slide numbered for easy reference. The carousel maintains an educational tone rather than a sales pitch, positioning your brand as a trusted information source. The final slide summarizes the key learnings and includes your brand's positioning statement and call to action.",
      learningPoints: [
        "Pattern Interrupt: Starting with a surprising fact challenges assumptions and drives interest.",
        "Chunking Content: Breaking information into single, focused slides improves comprehension.",
        "Visual Learning: Using graphics rather than text blocks accommodates visual learners.",
        "Authority Building: Citing research or data positions your brand as knowledgeable and trustworthy."
      ],
      cta: "Save this post for reference! Follow us for more industry insights every Tuesday, or click the link in our bio for our complete guide to [topic]. Tag a colleague who needs to see this!",
      visuals: [
        "Bold typography with key statistics highlighted in brand colors",
        "Simple, branded infographics that explain concepts visually",
        "Consistent layout with clear numbering system across slides",
        "Data visualizations (charts, graphs) to support key points",
        "Final slide with brand logo and clear next step"
      ]
    }
  },
  thought_leadership: {
    linkedin: {
      hook: "Visual: A time-lapse video showing the evolution of your industry, culminating in a question mark that transforms into your company logo.",
      hookText: "While others discuss where we've been, we're focused on where we're heading. Here's our vision for the future of [industry].",
      story: "The post opens with a professionally produced time-lapse showing the evolution of your industry, highlighting key milestones before ending with a question mark that morphs into your company logo—symbolizing your role in defining what comes next. The main content presents a forward-thinking perspective on your industry, structured around 3-5 bold predictions for the future. Each prediction is supported by emerging data trends, technological developments, or shifting consumer behaviors that early indicators suggest will become significant. For each prediction, you provide actionable insights about how professionals can prepare now for these coming changes. The content balances visionary thinking with practical application, positioning your brand as both innovative and grounded. Expert commentary from your leadership team adds credibility to the perspectives shared. The post concludes by inviting thoughtful discussion rather than presenting your views as the only possible future.",
      learningPoints: [
        "Future Positioning: Associating your brand with forward thinking rather than past accomplishments.",
        "Balanced Perspective: Combining ambitious vision with practical application demonstrates leadership.",
        "Conversation Starter: Inviting discussion rather than declaring absolute truths encourages engagement.",
        "Trend Connection: Linking predictions to observable early indicators builds credibility."
      ],
      cta: "What's your take on these predictions? Share your thoughts in the comments, and download our complete Future of [Industry] Report for a deeper analysis of these trends and actionable strategies to stay ahead of the curve.",
      visuals: [
        "Professional timeline visualization of industry evolution",
        "Data visualizations showing emerging trend indicators",
        "Professional headshots of quoted leadership team members",
        "Clean, future-focused aesthetic with subtle brand elements",
        "Visual representations of predicted future developments"
      ]
    },
    podcast: {
      hook: "Audio: A surprising industry statistic or contrarian viewpoint read in an authoritative voice, followed by 'But what if everything we believe about [topic] is about to change?'",
      hookText: "Is [common industry practice] obsolete? Join us as we explore the paradigm shift happening in [industry].",
      story: "The podcast episode opens with a surprising statistic or contrarian viewpoint about the industry, immediately challenging listeners' assumptions. The host introduces themselves and establishes their credibility through brief mention of relevant experience or insights they've previously shared that proved accurate. The main content is structured as a journey through a new way of thinking about a common industry challenge or approach. Complex ideas are explained through relatable metaphors and real-world examples. If the podcast includes a guest, the conversation flows as a natural dialogue rather than a scripted interview, with genuine moments of discovery and thoughtful pauses. The content balances big-picture thinking with practical takeaways that listeners can apply immediately. Throughout the episode, connections are drawn between this new perspective and broader industry or societal trends. The episode concludes with forward-looking statements that leave listeners contemplating the implications of these ideas for their own work.",
      learningPoints: [
        "Pattern Disruption: Starting with a challenge to conventional wisdom creates immediate intellectual engagement.",
        "Metaphor Utilization: Complex concepts become accessible through carefully chosen analogies.",
        "Dialogue Format: Natural conversation creates more engaging listening than scripted monologue.",
        "Practical Philosophy: Balancing high-level thinking with actionable insights serves both strategic and practical needs."
      ],
      cta: "If you enjoyed this episode, subscribe to [Podcast Name] wherever you get your podcasts. Visit [URL] for show notes including all resources mentioned and a special toolkit we've created to help you implement these ideas.",
      visuals: [
        "Professional podcast cover art featuring host and/or brand elements",
        "Episode-specific graphic with key quote for social sharing",
        "Show notes document with timestamp-linked key points",
        "Resource list with linked references mentioned in episode",
        "Audiogram with animated waveform for key 60-second highlight"
      ]
    },
    email_newsletter: {
      hook: "Visual: A minimalist header image showing a fork in the road, with one path labeled 'Convention' and a less-traveled path labeled 'Innovation,' with your brand colors subtly incorporated.",
      hookText: "While most [industry professionals] look left, the real opportunity is to the right. Here's what we're seeing that others aren't.",
      story: "The email opens with a personal note from a leader in your organization, sharing an observation about an emerging trend or shifting dynamic in your industry that isn't getting enough attention. The main content presents a concise analysis of this emerging trend, structured in scannable sections with clear headings. Each section follows a consistent pattern: the conventional wisdom, why it's becoming outdated, and the new approach pioneered by forward-thinkers (implicitly including your organization). The content incorporates both data points and narrative elements, using stories to illustrate the real-world impact of these changes. Throughout the email, the tone remains conversational yet authoritative, avoiding both overly technical language and simplified platitudes. The perspective offered feels exclusive—insights that the reader wouldn't get from general business publications. The email concludes with practical considerations about how this trend might affect the reader's organization and subtle positioning of how your organization can help navigate these changes.",
      learningPoints: [
        "Insider Perspective: Positioning content as insights that aren't widely recognized creates perceived value.",
        "Conventional Wisdom Challenge: Contrasting old and new approaches creates clear differentiation.",
        "Scannable Structure: Using clear sections with headers accommodates busy professionals' reading habits.",
        "Subtle Positioning: Demonstrating thought leadership first, with only implied product/service relevance."
      ],
      cta: "Forward this email to a colleague who's been discussing [related topic]. For a deeper analysis, including our proprietary research data, join our upcoming webinar [Title] on [Date]. Spaces limited—reserve yours now.",
      visuals: [
        "Minimalist header image with conceptual illustration",
        "Clean, single-column layout with ample white space",
        "One or two simple data visualizations (charts or infographics)",
        "Professional photo of the author/thought leader",
        "Branded but subtle call-to-action button"
      ]
    }
  },
  customer_retention: {
    email: {
      hook: "Visual: A personalized graphic showing the customer's journey with your brand, visualized as a timeline with key milestones highlighted.",
      hookText: "[Customer Name], we're celebrating [X time] together! Here's what we've accomplished...",
      story: "The email opens with a personalized greeting and a warm acknowledgment of the customer's loyalty milestone. A visually engaging timeline shows their journey with your brand, highlighting specific interactions and achievements: their first purchase, significant milestones, and the cumulative value they've received (time saved, results achieved, etc.). The content balances appreciation for their past loyalty with excitement about future possibilities. Specific data about their usage or results with your product/service demonstrates the tangible value of the relationship. A section titled 'Just For You' introduces a special loyalty reward or exclusive offer that feels genuinely valuable rather than transactional. The tone is celebratory and grateful, making the customer feel valued as an individual rather than just another account. The email concludes with a forward-looking statement about continuing the journey together, positioning future engagement as a natural continuation of a mutually beneficial relationship.",
      learningPoints: [
        "Milestone Recognition: Celebrating specific time periods creates natural engagement opportunities.",
        "Value Demonstration: Quantifying the benefits they've received reinforces the relationship value.",
        "Personalization: Specific references to their history creates an authentic connection.",
        "Forward Momentum: Balancing appreciation for past loyalty with excitement about future engagement."
      ],
      cta: "As a thank you for your loyalty, we've added [specific reward] to your account. Log in now to access this exclusive benefit, plus see what's new for our valued [loyalty tier] members.",
      visuals: [
        "Personalized timeline graphic with brand color scheme",
        "Data visualization showing their specific results or usage",
        "Custom badge or icon representing their loyalty milestone",
        "Product image showcasing their reward or exclusive offer",
        "Warm, celebratory imagery that evokes positive emotions"
      ]
    },
    instagram_stories: {
      hook: "Visual: A countdown sticker showing '5 ways our customers are winning' followed by user-generated content showcasing real customer success stories.",
      hookText: "You're not just customers, you're our community. Here's how [Customer 1], [Customer 2], and others are crushing it with [Product/Service]! ❤️",
      story: "The Story series begins with an animated countdown sticker announcing '5 Ways Our Customers Are Winning.' Each subsequent slide features authentic user-generated content from a different customer, showing their success with your product or service. Each customer highlight includes their first name, how long they've been with your brand, and a brief caption about their specific achievement. The content feels authentic rather than overly polished, emphasizing real results over marketing perfection. Between customer highlights, you include engagement elements like polls asking 'Which success story inspired you most?' or question stickers inviting viewers to share their own achievements. The stories maintain a celebratory, community-focused tone throughout, positioning these customers as part of a special group rather than isolated users. The final slide thanks all customers and invites viewers to be featured in the next success story roundup.",
      learningPoints: [
        "Social Proof: Showcasing real customer success creates powerful peer validation.",
        "Community Building: Highlighting multiple users creates a sense of belonging to something larger.",
        "Recognition Power: Featuring customers publicly acknowledges their achievements and strengthens loyalty.",
        "Content Generation: Creating a path for features encourages more user-generated content."
      ],
      cta: "Using [Product] in a cool way? Share your story with #[BrandName]Win for a chance to be featured next week! Swipe up to see the full success stories from today's highlights.",
      visuals: [
        "Authentic user-generated content with minimal editing",
        "Consistent branding elements framing each customer highlight",
        "Interactive stickers (polls, questions, sliders) between slides",
        "Text overlay with key achievement metrics or quotes",
        "Final slide with clear instructions for submission"
      ]
    },
    facebook: {
      hook: "Visual: A split screen comparing a customer's 'before' situation (showing frustration or challenge) with their 'after' situation using your product/service (showing success and satisfaction).",
      hookText: "[Customer Name]'s journey from [pain point] to [success outcome] inspired us all. Here's their story, in their own words...",
      story: "The video opens with a compelling before/after split screen showing a customer's transformation journey with your product or service. The customer then appears on screen to tell their story in their own words, creating an authentic testimonial that doesn't feel scripted or overproduced. The narrative follows a clear story arc: their situation before finding your solution, how they discovered you, their initial experience, and the meaningful results they've achieved over time. Throughout the video, key metrics or achievements are highlighted with subtle text overlays, quantifying the value they've received. The customer shares specific features or aspects of your service that have been most valuable to them, providing natural product education within the testimonial. The tone is conversational and authentic, prioritizing genuine emotion over marketing polish. The video concludes with the customer sharing their plans for continued use of your product/service, naturally highlighting future value without feeling promotional.",
      learningPoints: [
        "Transformation Narrative: The before/after structure creates a compelling story arc.",
        "Authentic Testimony: Using the customer's own words creates credibility that branded content can't achieve.",
        "Natural Product Education: Having customers highlight valuable features provides organic product insight.",
        "Relationship Continuity: Emphasizing ongoing value rather than one-time satisfaction encourages retention."
      ],
      cta: "We're honored to be part of [Customer]'s journey. What's your story with [Brand]? Share in the comments for a chance to be featured in our next customer spotlight (and receive [incentive]).",
      visuals: [
        "Professional but authentic interview footage of the customer",
        "Before/after split screen demonstrating visible transformation",
        "B-roll footage showing the customer using your product",
        "Animated text overlays highlighting key achievements",
        "Warm color grading that creates an emotionally positive tone"
      ]
    }
  },
  crisis_management: {
    email: {
      hook: "Visual: A simple, professional header with your logo and a straightforward subject line that addresses the issue directly without sensationalism.",
      hookText: "Important update regarding [specific issue] – Our commitment to you",
      story: "The email begins with a clear, direct acknowledgment of the issue or crisis, demonstrating awareness without minimizing its importance. The opening paragraph comes directly from a senior leader (CEO or relevant executive), taking ownership of the situation and setting a tone of transparency and responsibility. The main content is structured in simple, scannable sections: what happened, who was affected, what actions you're taking immediately, your plan for preventing similar issues in the future, and how customers can get support if needed. The language is straightforward and jargon-free, prioritizing clarity over corporate speak or legal hedging. The tone strikes a careful balance between appropriate concern and confident leadership, avoiding both panic and dismissiveness. Throughout the communication, the focus remains on customers and other affected stakeholders rather than on protecting the company's image. The email concludes with specific follow-up information, including when stakeholders can expect the next update and direct contact information for questions.",
      learningPoints: [
        "Direct Acknowledgment: Addressing the issue clearly demonstrates respect for stakeholders' concerns.",
        "Leadership Visibility: Communication from senior leadership shows appropriate prioritization.",
        "Action Orientation: Focusing on concrete steps rather than just apologies builds confidence.",
        "Stakeholder Centricity: Prioritizing affected parties' needs over corporate image builds trust."
      ],
      cta: "If you have been directly affected by this issue, please contact our dedicated support team at [email/phone] or click here to access our [specific resources created for this situation]. We will provide another update by [specific time/date].",
      visuals: [
        "Minimal, professional header without distracting imagery",
        "Professional photo of the communicating executive",
        "Simple timeline or process graphic showing resolution steps",
        "Clear contact information prominently displayed",
        "Branded but subdued footer without promotional content"
      ]
    },
    twitter_thread: {
      hook: "Visual: Your brand logo with a simple 'Important Update' text overlay, maintaining brand colors but with a serious, subdued aesthetic.",
      hookText: "We're aware of [issue] affecting [scope of impact]. Our team is actively working on a resolution. We'll share updates in this thread as we have them. (1/5)",
      story: "The thread opens with a clear acknowledgment of the issue, indicating that you're aware and actively working on it. Each subsequent tweet provides a specific update or piece of information, maintaining brevity while ensuring all critical details are covered. The sequence follows a logical flow: acknowledgment of the problem, scope of impact, immediate actions being taken, timeline for resolution (even if approximate), and how affected users can access support. The language is direct and free of corporate jargon or attempts to downplay the severity of the situation. When appropriate, one tweet in the thread includes a direct statement from leadership, adding accountability and a human element to the communication. The tone remains calm and informative rather than defensive or overly apologetic. The final tweet in the sequence clearly indicates next steps and when users can expect additional updates, ensuring closure while maintaining communication lines.",
      learningPoints: [
        "Immediate Presence: Responding quickly on public channels demonstrates attentiveness and transparency.",
        "Structured Information: Breaking updates into a logical sequence manages information flow.",
        "Direct Communication: Using plain language rather than corporate speak builds trust.",
        "Consistent Updates: Maintaining a single thread creates a clear timeline of the response."
      ],
      cta: "If you're experiencing this issue, please DM us your account details for personalized support. We'll post our next update within [timeframe]. Follow this thread for the latest information.",
      visuals: [
        "Brand logo with simple 'Update' text overlay for first tweet",
        "Simple graphic showing scope of impact (if appropriate)",
        "Screenshot of temporary solution or workaround (if applicable)",
        "Contact information formatted for easy reading",
        "Final tweet with clear timeline for next communication"
      ]
    },
    video_statement: {
      hook: "Visual: A senior leader from your organization seated in a professional but not overly corporate setting, with appropriate serious expression.",
      hookText: "A message from [CEO/Leader Name] regarding the recent [issue]",
      story: "The video opens with a senior leader directly addressing the audience without music or elaborate introduction, immediately establishing the serious nature of the communication. The spokesperson begins by clearly acknowledging the issue and its impact on customers, employees, or other stakeholders, showing genuine concern without reading from a script. The main content follows a clear structure: a factual explanation of what occurred (without technical jargon), a sincere acknowledgment of how it has affected people, specific actions being taken to resolve the immediate issue, and steps being implemented to prevent recurrence. The leader takes clear ownership of the situation without deflecting blame, using phrases like 'we made a mistake' rather than passive language like 'mistakes were made.' The tone is appropriately serious but not alarmist, conveying both concern and competent leadership. The human element is emphasized throughout, focusing on people affected rather than corporate or technical considerations. The video concludes with a direct commitment from the leader, specific information about next steps, and a genuine expression of determination to rebuild trust.",
      learningPoints: [
        "Leadership Visibility: Having a senior leader deliver the message demonstrates appropriate prioritization.",
        "Scripted but Natural: Preparing key points while avoiding robotic delivery balances clarity with authenticity.",
        "Active Voice Accountability: Using active rather than passive voice in acknowledging errors shows responsibility.",
        "Forward Resolution: Balancing acknowledgment of the problem with confidence in the solution."
      ],
      cta: "We've established a dedicated response website at [URL] where you'll find continuous updates, FAQs, and support resources. Our customer service team is available 24/7 at [phone number] to assist anyone affected by this situation.",
      visuals: [
        "Senior leader in professional but not ostentatious setting",
        "Direct eye contact with camera throughout most of the video",
        "Simple lower-third graphics for key points or action items",
        "Appropriate serious expression matching the gravity of the situation",
        "Contact information and resources clearly displayed at conclusion"
      ]
    }
  },
  custom: {
    default: {
      hook: "Create a custom hook for your brand story",
      hookText: "Add a custom hook text to capture attention",
      story: "This is where your custom brand story will appear after generation, tailored to your specific needs and context.",
      learningPoints: [
        "Customized learning point 1",
        "Customized learning point 2",
        "Customized learning point 3",
        "Customized learning point 4"
      ],
      cta: "Your custom call to action will appear here",
      visuals: [
        "Custom visual element 1",
        "Custom visual element 2",
        "Custom visual element 3",
        "Custom visual element 4",
        "Custom visual element 5"
      ]
    }
  }
};

export interface BrandingContext {
  brandName: string;
  industry: string;
  uniqueSellingPoints: string[];
  targetAudience: string;
  brandValues: string[];
  brandVoice: string;
  competitivePosition: string;
}

export interface StoryGeneratorParams {
  objective: string;
  platform: string;
  industry: string;
  ageRange: [number, number];
  language: string;
  interests: string;
  tone: string;
  elements: string[];
  customObjective?: string;
  brandingContext?: BrandingContext | null;
}

export interface StoryData {
  hook: string;
  hookText: string;
  story: string;
  learningPoints: string[];
  cta: string;
  visuals: string[];
}

export function useStoryGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const generateStory = async (params: StoryGeneratorParams) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // First attempt to use OpenAI API if available
      const openaiKey = getApiKey("openai");
      
      if (openaiKey && isProviderEnabled("openai")) {
        try {
          const aiGeneratedStory = await generateWithOpenAI(params, openaiKey);
          setStoryData(aiGeneratedStory);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error("OpenAI generation failed, falling back to templates:", error);
          // Fall through to template-based generation
        }
      }
      
      // If OpenAI fails or isn't available, try OpenRouter
      const openrouterKey = getApiKey("openrouter");
      
      if (openrouterKey && isProviderEnabled("openrouter")) {
        try {
          const aiGeneratedStory = await generateWithOpenRouter(params, openrouterKey);
          setStoryData(aiGeneratedStory);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error("OpenRouter generation failed, falling back to templates:", error);
          // Fall through to template-based generation
        }
      }
      
      // Finally, fall back to template-based generation
      await generateFromTemplates(params);
    } catch (error) {
      console.error("Error generating story:", error);
      setErrorMessage("Failed to generate story. Please try again or check API Management.");
      toast.error("Story generation failed. Please check API Management.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateWithOpenAI = async (params: StoryGeneratorParams, apiKey: string): Promise<StoryData> => {
    const { objective, platform, industry, ageRange, language, interests, tone, elements, customObjective, brandingContext } = params;
    
    const objectiveToUse = customObjective && customObjective.trim() !== "" ? customObjective : objective;

    // Prepare prompt for OpenAI
    const prompt = `
      Generate an engaging, detailed story for a ${objectiveToUse} campaign on ${platform}.
      
      Details:
      - Industry: ${industry}
      - Target Audience: Age ${ageRange[0]}-${ageRange[1]}, interested in ${interests}
      - Language: ${language}
      - Tone: ${tone}
      - Interactive Elements: ${elements.join(', ')}
      ${brandingContext ? `
      - Brand Name: ${brandingContext.brandName}
      - Unique Selling Points: ${brandingContext.uniqueSellingPoints.join(', ')}
      - Brand Values: ${brandingContext.brandValues.join(', ')}
      - Brand Voice: ${brandingContext.brandVoice}
      - Competitive Position: ${brandingContext.competitivePosition}
      ` : ''}

      Format your response as a JSON object with the following structure:
      {
        "hook": "Visual description for the opening hook",
        "hookText": "Attention-grabbing opening text",
        "story": "Detailed narrative for the content",
        "learningPoints": ["Key takeaway 1", "Key takeaway 2", "Key takeaway 3", "Key takeaway 4"],
        "cta": "Compelling call to action",
        "visuals": ["Visual element 1", "Visual element 2", "Visual element 3", "Visual element 4", "Visual element 5"]
      }
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a digital marketing storytelling expert who creates engaging, platform-specific narratives."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Error generating story with OpenAI");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      // Find the JSON object in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonContent = jsonMatch[0];
        const storyData = JSON.parse(jsonContent);
        return storyData;
      } else {
        throw new Error("Could not parse JSON response");
      }
    } catch (error) {
      console.error("Error parsing JSON from OpenAI:", error);
      throw error;
    }
  };

  const generateWithOpenRouter = async (params: StoryGeneratorParams, apiKey: string): Promise<StoryData> => {
    const { objective, platform, industry, ageRange, language, interests, tone, elements, customObjective, brandingContext } = params;
    
    const objectiveToUse = customObjective && customObjective.trim() !== "" ? customObjective : objective;

    // Prepare prompt for OpenRouter
    const prompt = `
      Generate an engaging, detailed story for a ${objectiveToUse} campaign on ${platform}.
      
      Details:
      - Industry: ${industry}
      - Target Audience: Age ${ageRange[0]}-${ageRange[1]}, interested in ${interests}
      - Language: ${language}
      - Tone: ${tone}
      - Interactive Elements: ${elements.join(', ')}
      ${brandingContext ? `
      - Brand Name: ${brandingContext.brandName}
      - Unique Selling Points: ${brandingContext.uniqueSellingPoints.join(', ')}
      - Brand Values: ${brandingContext.brandValues.join(', ')}
      - Brand Voice: ${brandingContext.brandVoice}
      - Competitive Position: ${brandingContext.competitivePosition}
      ` : ''}

      Format your response as a JSON object with the following structure:
      {
        "hook": "Visual description for the opening hook",
        "hookText": "Attention-grabbing opening text",
        "story": "Detailed narrative for the content",
        "learningPoints": ["Key takeaway 1", "Key takeaway 2", "Key takeaway 3", "Key takeaway 4"],
        "cta": "Compelling call to action",
        "visuals": ["Visual element 1", "Visual element 2", "Visual element 3", "Visual element 4", "Visual element 5"]
      }
    `;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "AI Storyteller"
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-opus:beta",
          messages: [
            {
              role: "system",
              content: "You are a digital marketing storytelling expert who creates engaging, platform-specific narratives."
            },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2048
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API error response:", errorData);
        throw new Error(errorData.error?.message || "Error generating content with OpenRouter");
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the JSON response
      try {
        // Find the JSON object in the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonContent = jsonMatch[0];
          const storyData = JSON.parse(jsonContent);
          return storyData;
        } else {
          throw new Error("Could not parse JSON response");
        }
      } catch (error) {
        console.error("Error parsing JSON from OpenRouter:", error);
        throw error;
      }
    } catch (error) {
      console.error("OpenRouter API error:", error);
      throw error;
    }
  };
  
  // Fallback method using templates
  const generateFromTemplates = async (params: StoryGeneratorParams) => {
    const { objective, platform, industry, ageRange, language, interests, tone, elements, customObjective, brandingContext } = params;
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get template based on objective and platform
      let template;
      
      // Use custom objective if provided, otherwise use selected objective
      const objectiveToUse = customObjective && customObjective.trim() !== "" ? "custom" : objective;
      
      if (objectiveToUse === "custom") {
        template = storyTemplates.custom.default;
      } else {
        template = storyTemplates[objectiveToUse]?.[platform];
        
        // If no exact match for platform, try to find any template for this objective
        if (!template && storyTemplates[objectiveToUse]) {
          const firstAvailablePlatform = Object.keys(storyTemplates[objectiveToUse])[0];
          template = storyTemplates[objectiveToUse][firstAvailablePlatform];
        }
        
        // If still no template, use the first available one as fallback
        if (!template) {
          const firstObjective = Object.keys(storyTemplates)[0];
          const firstPlatform = Object.keys(storyTemplates[firstObjective])[0];
          template = storyTemplates[firstObjective][firstPlatform];
        }
      }
      
      // Create a customized version of the template
      let customizedTemplate = {
        ...template,
      };
      
      // If we have branding context, customize the template further
      if (brandingContext) {
        const brandName = brandingContext.brandName;
        
        customizedTemplate = {
          ...customizedTemplate,
          hookText: customizedTemplate.hookText.replace(/\[Brand\]/g, brandName).replace(/\[BrandName\]/g, brandName),
          story: customizedTemplate.story.replace(/\[Brand\]/g, brandName).replace(/\[BrandName\]/g, brandName),
          cta: customizedTemplate.cta.replace(/\[Brand\]/g, brandName).replace(/\[BrandName\]/g, brandName),
        };
      }
      
      // Add customization for industry, audience, etc.
      customizedTemplate.story += `\n\nThis content is tailored for the ${industry} industry, targeting audiences aged ${ageRange[0]}-${ageRange[1]} who are interested in ${interests}. The tone is ${tone}.`;
      
      // Add interactive elements mentions if selected
      if (elements.length > 0) {
        const elementsText = `\n\nThe content incorporates interactive elements like ${elements.join(', ')} to boost engagement.`;
        customizedTemplate.story += elementsText;
      }
      
      // For custom objectives, add the objective to the story
      if (objectiveToUse === "custom" && customObjective) {
        customizedTemplate.story = `This story is designed to achieve the following objective: ${customObjective}.\n\n` + customizedTemplate.story;
      }
      
      setStoryData(customizedTemplate);
    } catch (error) {
      console.error("Error generating story from templates:", error);
      setErrorMessage("Failed to generate story from templates.");
      toast.error("Story generation failed. Please try again.");
    }
  };

  return {
    generateStory,
    isLoading,
    storyData,
    errorMessage
  };
}
