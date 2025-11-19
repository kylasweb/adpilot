'use client'

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Rocket, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  Globe,
  Sparkles,
  TrendingUp,
  Target,
  MessageSquare,
  Cpu,
  Play,
  CheckCircle
} from "lucide-react";
import * as anime from "animejs";

const EnhancedLandingPage = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      const heroTitle = heroRef.current.querySelector('.hero-title');
      const heroSubtitle = heroRef.current.querySelector('.hero-subtitle');
      const heroButtons = heroRef.current.querySelectorAll('.hero-button');
      
      if (heroTitle && heroSubtitle && heroButtons.length > 0) {
        const tl = new anime.Timeline()
          .add(heroTitle, {
            translateY: [40, 0],
            opacity: [0, 1],
            delay: 200,
            easing: 'easeOutQuad',
            duration: 800
          })
          .add(heroSubtitle, {
            translateY: [30, 0],
            opacity: [0, 1],
            delay: 100,
            easing: 'easeOutQuad',
            duration: 800
          }, '-=400')
          .add(heroButtons, {
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'spring(1, 80, 10, 0)',
            duration: 800
          }, '-=300');
        
        tl.play();
      }
    }

    // Features section animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && featuresRef.current) {
          const featureCards = featuresRef.current.querySelectorAll('.feature-card');
          
          anime.remove(featureCards as any);
          const featureTl = new anime.Timeline()
            .add(featureCards, {
              translateY: [40, 0],
              opacity: [0, 1],
              delay: anime.stagger(150),
              easing: 'easeOutQuad',
              duration: 600
            });
          
          featureTl.play();
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    // CTA section animation
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && ctaRef.current) {
          anime.remove(ctaRef.current as any);
          const ctaTl = new anime.Timeline()
            .add(ctaRef.current, {
              scale: [0.95, 1],
              opacity: [0, 1],
              duration: 800,
              easing: 'spring(1, 80, 10, 0)'
            });
          
          ctaTl.play();
          
          ctaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      observer.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  const features = [
    {
      title: "AI-Powered Analytics",
      description: "Gain deep insights into campaign performance with real-time analytics and customizable dashboards powered by artificial intelligence.",
      icon: BarChart3,
      color: "text-blue-500"
    },
    {
      title: "Advanced Audience Targeting",
      description: "Create detailed audience segments and deliver personalized content that resonates with your customers using machine learning.",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Smart Automation",
      description: "Save time with powerful automation tools that handle repetitive tasks and optimize your workflows using predictive algorithms.",
      icon: Zap,
      color: "text-yellow-500"
    },
    {
      title: "Enterprise Security",
      description: "Keep your data safe with enterprise-grade security features, encryption, and compliance certifications.",
      icon: Shield,
      color: "text-green-500"
    },
    {
      title: "Multi-Platform Management",
      description: "Manage campaigns across multiple platforms from a single, unified interface with consistent branding and messaging.",
      icon: Globe,
      color: "text-indigo-500"
    },
    {
      title: "Intelligent Insights",
      description: "Leverage artificial intelligence to uncover hidden opportunities and optimize campaign performance in real-time.",
      icon: Sparkles,
      color: "text-pink-500"
    }
  ];

  const benefits = [
    "Increase conversion rates by up to 300%",
    "Reduce campaign management time by 75%",
    "Improve ROI with AI-driven optimizations",
    "Access real-time analytics and reporting",
    "24/7 expert support and training"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-adsilo-background to-adsilo-accent/5">
      {/* Header */}
      <header className="border-b border-adsilo-border sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Rocket className="h-8 w-8 text-adsilo-primary animate-pulse" />
              <Sparkles className="h-4 w-4 text-adsilo-accent absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold text-adsilo-text-primary" style={{ fontFamily: "var(--font-display)" }}>Adsilo</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-adsilo-text-secondary hover:text-adsilo-primary transition-colors font-medium">
              Features
            </Link>
            <Link href="#benefits" className="text-adsilo-text-secondary hover:text-adsilo-primary transition-colors font-medium">
              Benefits
            </Link>
            <Link href="#testimonials" className="text-adsilo-text-secondary hover:text-adsilo-primary transition-colors font-medium">
              Testimonials
            </Link>
          </nav>
          <div className="flex space-x-3">
            <Link href="/auth/login">
              <Button variant="outline" className="font-medium">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="font-medium">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-adsilo-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-adsilo-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-adsilo-text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
            AI-Powered <span className="text-adsilo-primary">Marketing</span> Platform
          </h1>
          <p className="hero-subtitle text-xl text-adsilo-text-secondary max-w-3xl mx-auto mb-12">
            Streamline your marketing efforts with our comprehensive suite of tools designed to boost engagement, 
            optimize campaigns, and drive measurable results through artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="hero-button text-lg px-8 py-6 font-bold">
                Start Free Trial
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="hero-button text-lg px-8 py-6 font-bold">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 bg-adsilo-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-adsilo-text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Powerful <span className="text-adsilo-primary">Features</span>
            </h2>
            <p className="text-xl text-adsilo-text-secondary max-w-3xl mx-auto">
              Everything you need to create, manage, and optimize your digital marketing campaigns with the power of artificial intelligence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="feature-card border-adsilo-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`h-16 w-16 rounded-full bg-adsilo-muted flex items-center justify-center mb-4 ${feature.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-adsilo-text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Transform Your <span className="text-adsilo-primary">Marketing Results</span>
              </h2>
              <p className="text-adsilo-text-secondary text-lg mb-8">
                Our platform delivers measurable results that help you achieve your marketing goals faster and more efficiently than ever before.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-adsilo-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-adsilo-text-primary">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="px-8 py-6 font-bold">
                    Get Started Today
                  </Button>
                </Link>
                <Link href="#testimonials">
                  <Button size="lg" variant="outline" className="px-8 py-6 font-bold">
                    Read Success Stories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden border border-adsilo-border shadow-xl">
                <div className="bg-gradient-to-br from-adsilo-primary/10 to-adsilo-accent/10 p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-4">
                        <TrendingUp className="h-8 w-8 text-adsilo-primary mr-2" />
                        <span className="font-bold text-lg">Performance</span>
                      </div>
                      <div className="text-3xl font-bold text-adsilo-text-primary mb-1">324%</div>
                      <div className="text-adsilo-text-secondary">Avg. ROAS Increase</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-4">
                        <Target className="h-8 w-8 text-adsilo-primary mr-2" />
                        <span className="font-bold text-lg">Targeting</span>
                      </div>
                      <div className="text-3xl font-bold text-adsilo-text-primary mb-1">87%</div>
                      <div className="text-adsilo-text-secondary">Audience Match Rate</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-4">
                        <Zap className="h-8 w-8 text-adsilo-primary mr-2" />
                        <span className="font-bold text-lg">Efficiency</span>
                      </div>
                      <div className="text-3xl font-bold text-adsilo-text-primary mb-1">75%</div>
                      <div className="text-adsilo-text-secondary">Time Saved</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-4">
                        <MessageSquare className="h-8 w-8 text-adsilo-primary mr-2" />
                        <span className="font-bold text-lg">Engagement</span>
                      </div>
                      <div className="text-3xl font-bold text-adsilo-text-primary mb-1">2.8x</div>
                      <div className="text-adsilo-text-secondary">Higher CTR</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-adsilo-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-adsilo-accent/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-adsilo-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-adsilo-text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Trusted by <span className="text-adsilo-primary">Industry Leaders</span>
            </h2>
            <p className="text-xl text-adsilo-text-secondary max-w-2xl mx-auto">
              Join thousands of marketers who are already using Adsilo to drive better results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-adsilo-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-adsilo-primary/10 flex items-center justify-center mr-4">
                    <Cpu className="h-6 w-6 text-adsilo-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-adsilo-text-primary">TechGrowth Inc.</h4>
                    <p className="text-adsilo-text-secondary text-sm">Software Company</p>
                  </div>
                </div>
                <p className="text-adsilo-text-secondary mb-4">
                  "Adsilo has transformed our marketing approach. We've seen a 200% increase in qualified leads since implementation."
                </p>
                <div className="flex text-adsilo-warning">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-adsilo-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-adsilo-primary/10 flex items-center justify-center mr-4">
                    <Rocket className="h-6 w-6 text-adsilo-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-adsilo-text-primary">RetailMax</h4>
                    <p className="text-adsilo-text-secondary text-sm">E-commerce Retailer</p>
                  </div>
                </div>
                <p className="text-adsilo-text-secondary mb-4">
                  "The AI-powered insights have helped us optimize our campaigns in ways we never thought possible. ROI increased by 150%."
                </p>
                <div className="flex text-adsilo-warning">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-adsilo-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-adsilo-primary/10 flex items-center justify-center mr-4">
                    <Sparkles className="h-6 w-6 text-adsilo-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-adsilo-text-primary">CreativeWorks</h4>
                    <p className="text-adsilo-text-secondary text-sm">Marketing Agency</p>
                  </div>
                </div>
                <p className="text-adsilo-text-secondary mb-4">
                  "Managing multiple client campaigns has never been easier. The automation features save us 20+ hours per week."
                </p>
                <div className="flex text-adsilo-warning">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div ref={ctaRef} className="container mx-auto px-4 max-w-4xl">
          <Card className="border-adsilo-border bg-gradient-to-r from-adsilo-primary/5 to-adsilo-accent/5">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-adsilo-text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Ready to Transform Your <span className="text-adsilo-primary">Marketing</span>?
              </h2>
              <p className="text-xl text-adsilo-text-secondary max-w-2xl mx-auto mb-10">
                Join thousands of marketers who are already using Adsilo to drive better results.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="text-lg px-8 py-6 font-bold">
                    Start Your Free Trial
                    <Rocket className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 font-bold">
                    Schedule a Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-adsilo-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Rocket className="h-6 w-6 text-adsilo-primary" />
              <span className="text-xl font-bold text-adsilo-text-primary" style={{ fontFamily: "var(--font-display)" }}>Adsilo</span>
            </div>
            <div className="flex space-x-8">
              <Link href="#" className="text-adsilo-text-secondary hover:text-adsilo-primary transition-colors font-medium">
                Terms
              </Link>
              <Link href="#" className="text-adsilo-text-secondary hover:text-adsilo-primary transition-colors font-medium">
                Privacy
              </Link>
              <Link href="#" className="text-adsilo-text-secondary hover:text-adsilo-primary transition-colors font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-adsilo-text-secondary">
            © {new Date().getFullYear()} Adsilo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedLandingPage;