"use client";
import React, { useState } from "react";
import {
  Play,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Video,
  Menu,
  X,
  FileVideo,
  Target,
  Award,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function FlowEditLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: Clock,
      title: "Fast Turnaround",
      description:
        "Get your edited videos back in 24-48 hours. Professional quality without the wait.",
    },
    {
      icon: Users,
      title: "Expert Editors",
      description:
        "Work with experienced video editors who understand your brand.",
    },
    {
      icon: Target,
      title: "Brand Consistency",
      description:
        "Save your style preferences and apply them across all projects.",
    },
    {
      icon: Workflow,
      title: "Simple Workflow",
      description:
        "Upload, request, receive. No complicated processes or contracts.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$299",
      period: "/month",
      description: "For content creators",
      features: [
        "5 videos per month",
        "48 hour delivery",
        "Standard editing",
        "Email support",
        "Cloud integration",
      ],
    },
    {
      name: "Professional",
      price: "$599",
      period: "/month",
      description: "For businesses",
      features: [
        "15 videos per month",
        "24 hour delivery",
        "Advanced editing",
        "Priority support",
        "Brand templates",
        "Dedicated editor",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$1,299",
      period: "/month",
      description: "For agencies",
      features: [
        "Unlimited videos",
        "12 hour delivery",
        "Premium editing",
        "24/7 support",
        "Multiple brands",
        "Editor team",
        "API access",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Content Creator",
      content:
        "FlowEdit saves me hours every week. The quality is consistently excellent and turnaround is fast.",
      rating: 5,
    },
    {
      name: "Martha Chen",
      role: "Marketing Director",
      content:
        "Finally found a reliable editing service. Our social content has never looked better.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "YouTuber",
      content:
        "I can focus on creating content while FlowEdit handles all the editing. Game changer.",
      rating: 5,
    },
  ];

  const handleSubmit = () => {
    if (email) {
      alert(`Thanks for your interest! We'll contact you at ${email}`);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-accent">
                FlowEdit
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-accent/70 hover:text-accent transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-accent/70 hover:text-accent transition-colors font-medium"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-accent/70 hover:text-accent transition-colors font-medium"
              >
                Testimonials
              </a>
              <a
                href="/dashboard"
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition"
              >
                Get Started
              </a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent/5"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-accent" />
              ) : (
                <Menu className="w-6 h-6 text-accent" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-accent/10">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block text-accent/70 hover:text-accent transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-accent/70 hover:text-accent transition-colors font-medium"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="block text-accent/70 hover:text-accent transition-colors font-medium"
              >
                Testimonials
              </a>

              <a
                href="/dashboard"
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-gradient-to-b from-tertiary/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent leading-tight">
                Professional Video Editing, Delivered Fast
              </h2>
              <p className="text-lg md:text-xl text-accent/70 leading-relaxed">
                Submit your raw footage and receive professionally edited videos
                in 24-48 hours. No subscriptions to expensive software, no
                learning curve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
                  <Link href="/dashboard">Go to Dashboard</Link>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-accent/20 text-accent hover:bg-accent/5 text-lg px-8 py-6"
                >
                  <Play className="mr-2 w-5 h-5" />
                  See Examples
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4 border-t border-accent/10">
                <div>
                  <p className="text-2xl font-bold text-accent">1,200+</p>
                  <p className="text-sm text-accent/60">Projects Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">24-48h</p>
                  <p className="text-sm text-accent/60">Average Delivery</p>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="text-2xl font-bold text-accent">4.9</span>
                  </div>
                  <p className="text-sm text-accent/60">Customer Rating</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-accent/10">
                <Image
                  src="https://images.pexels.com/photos/10122032/pexels-photo-10122032.jpeg"
                  alt="Video preview"
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-linear-to-br from-secondary/30 to-tertiary/50" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>

              <div className="hidden lg:block absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-accent/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileVideo className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-accent/60">Latest Project</p>
                    <p className="font-bold text-accent">Delivered in 36h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-4">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-accent/70 max-w-2xl mx-auto">
              A streamlined process designed for creators and businesses
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-accent/10"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-accent mb-3">
                  {feature.title}
                </h3>
                <p className="text-accent/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-tertiary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-4">
              Pricing Plans
            </h2>
            <p className="text-lg md:text-xl text-accent/70 max-w-2xl mx-auto">
              Choose a plan that fits your needs. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${
                  plan.popular
                    ? "border-primary shadow-xl scale-105"
                    : "border-accent/10 hover:border-primary/30 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-accent mb-2">
                  {plan.name}
                </h3>
                <p className="text-accent/60 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-accent">
                    {plan.price}
                  </span>
                  <span className="text-accent/60">{plan.period}</span>
                </div>
                <Button
                  className={`w-full py-6 rounded-xl text-base font-semibold ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-white hover:bg-accent/5 text-accent border-2 border-accent/20"
                  }`}
                >
                  Get Started
                </Button>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-accent/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg md:text-xl text-accent/70">
              Real feedback from real creators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-accent/10 hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-accent/80 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                    <div className="w-full h-full rounded-full  overflow-hidden">
                      <Image
                        src="https://images.pexels.com/photos/3341999/pexels-photo-3341999.jpeg"
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-accent">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-accent/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join over 1,200 creators using FlowEdit for their video projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 bg-white text-accent border-0 focus:ring-2 focus:ring-white"
            />
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-white h-14 px-8 whitespace-nowrap font-semibold"
            >
              Get Started
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-accent mb-4">Product</h4>
              <ul className="space-y-3 text-accent/60">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-accent mb-4">Company</h4>
              <ul className="space-y-3 text-accent/60">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-accent mb-4">Support</h4>
              <ul className="space-y-3 text-accent/60">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-accent mb-4">Legal</h4>
              <ul className="space-y-3 text-accent/60">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Licenses
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-accent/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-2xl font-bold text-accent">FlowEdit</p>
            <p className="text-accent/60 text-sm">
              © 2025 FlowEdit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
