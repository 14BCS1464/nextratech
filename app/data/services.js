// data/services.tsx
"use client";
import React from "react";
import { Phone, Code, Cpu, Sparkles, Server, Mail } from "lucide-react";

export const services = [
  {
    title: "React Native Apps",
    desc: "Cross-platform native apps with best performance, OTA updates, and native modules.",
    icon: <Phone className="h-6 w-6 text-white" />,
    gradient: "from-violet-500 to-purple-600",
    features: ["Expo/CLI", "Native Modules", "OTA Updates", "App Store Deployment"]
  },
  {
    title: "React / Next.js Web",
    desc: "Fast, SEO-friendly PWAs and responsive web dashboards built with React and Next.js.",
    icon: <Code className="h-6 w-6 text-white" />,
    gradient: "from-cyan-500 to-blue-600",
    features: ["SSR/SSG", "PWA", "SEO Optimized", "TypeScript"]
  },
  {
    title: "AI Integrations",
    desc: "Smart features — chatbots, recommendation systems, on-device ML inference and prompts.",
    icon: <Sparkles className="h-6 w-6 text-white" />,
    gradient: "from-amber-500 to-orange-600",
    features: ["OpenAI API", "Custom Models", "Real-time AI", "ML Pipelines"]
  },
  {
    title: "Mobile Web & PWA",
    desc: "Progressive Web Apps, service workers, offline support and fast launch experience.",
    icon: <Cpu className="h-6 w-6 text-white" />,
    gradient: "from-emerald-500 to-teal-600",
    features: ["Offline Support", "Push Notifications", "Fast Loading", "Mobile First"]
  },
  {
    title: "APIs & Backend",
    desc: "Beautiful, versioned REST/GraphQL APIs, serverless functions and scalable infra.",
    icon: <Server className="h-6 w-6 text-white" />,
    gradient: "from-pink-500 to-rose-600",
    features: ["REST/GraphQL", "Serverless", "Real-time", "Microservices"]
  },
  {
    title: "Consulting & Design",
    desc: "Product thinking, UX audits, and performance tuning for mobile-first experiences.",
    icon: <Mail className="h-6 w-6 text-white" />,
    gradient: "from-indigo-500 to-purple-600",
    features: ["UX Audit", "Performance", "Architecture", "Code Review"]
  },
];

// data/tech.ts
export const techLogos = [
  {
    name: "React",
    logo: "⚛️",
    desc: "Component-driven UI for web and mobile with reusable building blocks.",
    category: "Frontend",
    proficiency: "Expert",
  },
  {
    name: "React Native",
    logo: "📱",
    desc: "Cross-platform native mobile apps from a single codebase.",
    category: "Mobile",
    proficiency: "Expert",
  },
  {
    name: "Next.js",
    logo: "⤴️",
    desc: "Server-side rendering and static site generation framework.",
    category: "Full Stack",
    proficiency: "Proficient",
  },
  {
    name: "Node.js",
    logo: "🟢",
    desc: "Event-driven backend for scalable, real-time applications.",
    category: "Backend",
    proficiency: "Expert",
  },
  {
    name: "TypeScript",
    logo: "🟦",
    desc: "Type-safe JavaScript to improve reliability and developer experience.",
    category: "Language",
    proficiency: "Expert",
  },
  {
    name: "AWS",
    logo: "☁️",
    desc: "Cloud computing and serverless architecture for scalable apps.",
    category: "Cloud",
    proficiency: "Proficient",
  },
  {
    name: "PostgreSQL",
    logo: "🐘",
    desc: "Powerful relational database with high performance and reliability.",
    category: "Database",
    proficiency: "Proficient",
  },
  {
    name: "Docker",
    logo: "🐳",
    desc: "Containerization platform to simplify app deployment and scaling.",
    category: "DevOps",
    proficiency: "Proficient",
  },
];



export const testimonials = [
  { name: "Sarah Chen", role: "CEO at TechStart", content: "Nextratech delivered our MVP in just 3 weeks. The app performance is exceptional and user feedback has been overwhelmingly positive.", avatar: "SC" },
  { name: "Marcus Johnson", role: "Product Lead at ScaleUp", content: "Their expertise in React Native and AI integration helped us build a sophisticated product that outperforms competitors.", avatar: "MJ" },
  { name: "Elena Rodriguez", role: "CTO at InnovateCo", content: "Clean code, great communication, and on-time delivery. Will definitely work with them again for our next project.", avatar: "ER" }
];
