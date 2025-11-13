"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, ExternalLink, Star, Server, Code, Smartphone, Globe, Shield, Rocket, Users } from "lucide-react";

export default function Hero() {
  useEffect(() => {
    window.scrollTo(window.scrollX, window.scrollY);
  }, []);

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, when: "beforeChildren" } },
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden text-black bg-white w-full py-20">
      {/* Enhanced layered gradients with more depth */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-violet-100/60 via-fuchsia-50/40 to-cyan-50/60 blur-3xl animate-blob" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-cyan-100/50 via-violet-100/30 to-fuchsia-50/40 blur-2xl animate-blob animation-delay-2000" />
      <div aria-hidden className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-blob animation-delay-6000" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-16"
        >
          {/* Header Section */}
          <motion.div variants={item} className="text-center space-y-8 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-violet-200/50 px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-md animate-pulse">
                <Zap className="h-4 w-4" />
              </div>
              <marquee className="text-sm font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent" behavior="scroll" direction="left" scrollamount="6">
                Rapid MVPs • AI integrations • Scalable APIs
              </marquee>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Build the{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
                  Future
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 rounded-full"></span>
              </span>
              {' '}of Mobile & Web
            </h1>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-slate-600">
              We design and ship delightful, high-performance React Native apps and modern web products — from idea
              validation to production deployments. <span className="font-semibold text-slate-800">Fast, secure, and user-first.</span>
            </p>

            <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transform active:scale-95 transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/50 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-700 via-fuchsia-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 border-2 border-violet-200 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-violet-50 hover:border-violet-300 transition-all duration-300 font-semibold text-slate-800 hover:shadow-lg"
              >
                View Work
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-3 pt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-3 border-white bg-gradient-to-br from-violet-400 to-cyan-400 shadow-lg" />
                ))}
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-slate-700 font-semibold">Trusted by 80+ companies worldwide</div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl p-8 border border-violet-200/50 hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Mobile Excellence</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cross-platform React Native apps with native performance, seamless animations, and pixel-perfect UI that users love.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  iOS & Android deployment
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  Push notifications & analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  App Store optimization
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl p-8 border border-cyan-200/50 hover:shadow-2xl hover:shadow-cyan-200/50 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Modern Web Apps</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Lightning-fast web applications built with Next.js, React, and cutting-edge frameworks for optimal performance.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  SEO-optimized architecture
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  Progressive Web Apps (PWA)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  Responsive design systems
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl p-8 border border-fuchsia-200/50 hover:shadow-2xl hover:shadow-fuchsia-200/50 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">Scalable Backend</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Robust APIs and cloud infrastructure designed to scale from MVP to millions of users with zero downtime.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></div>
                  RESTful & GraphQL APIs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></div>
                  Database design & optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></div>
                  AWS/GCP cloud deployment
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl p-8 border border-violet-200/50 hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">AI Integration</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Leverage the power of LLMs, machine learning models, and AI APIs to create intelligent, next-gen experiences.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  OpenAI & Claude integration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  Custom ML model training
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  RAG & vector databases
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl p-8 border border-cyan-200/50 hover:shadow-2xl hover:shadow-cyan-200/50 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Security First</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Enterprise-grade security practices, authentication systems, and compliance standards built into every project.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  OAuth & SSO implementation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  Data encryption & GDPR
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  Security audits & testing
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl p-8 border border-fuchsia-200/50 hover:shadow-2xl hover:shadow-fuchsia-200/50 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-fuchsia-600 to-rose-600 bg-clip-text text-transparent">Rapid Deployment</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                CI/CD pipelines, automated testing, and deployment strategies that get your product to market faster.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></div>
                  GitHub Actions & CircleCI
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></div>
                  Automated testing suites
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></div>
                  Blue-green deployments
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Industries We Serve */}
          <motion.div variants={item} className="space-y-8 pt-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                Industries We've Transformed
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Trusted by leading companies across diverse sectors to build innovative digital solutions
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Healthcare', icon: '🏥' },
                { name: 'FinTech', icon: '💰' },
                { name: 'Restaurant', icon: '🍽️' },
                { name: 'Wearables', icon: '⌚' },
                { name: 'Banking', icon: '🏦' },
                { name: 'Travel', icon: '✈️' },
                { name: 'Fitness', icon: '💪' },
                { name: 'Insurance', icon: '🛡️' },
                { name: 'Real Estate', icon: '🏢' },
                { name: 'On-Demand', icon: '📦' },
                { name: 'Lending', icon: '💳' },
                { name: 'Magazine', icon: '📰' },
                { name: 'ECommerce', icon: '🛒' },
                { name: 'Payments', icon: '💳' },
                { name: 'Social Media', icon: '👍' },
                { name: 'Construction', icon: '🏗️' },
                { name: 'Entertainment', icon: '🎬' },
                { name: 'Marketing', icon: '✨' },
                { name: 'Politics', icon: '🏛️' },
                { name: 'Education', icon: '🎓' },
                { name: 'Aviation', icon: '✈️' },
                { name: 'EMobility', icon: '🚗' },
                { name: 'Events', icon: '🎉' },
                { name: 'CSR', icon: '💜' },
                { name: 'Logistics', icon: '🚚' },
                { name: 'Manufacturing', icon: '🏭' },
                { name: 'Retail', icon: '🏪' },
                { name: 'Agriculture', icon: '🌾' },
                { name: 'Energy', icon: '⚡' },
                { name: 'Gaming', icon: '🎮' },
                { name: 'Supply Chain', icon: '🏠' },
                { name: 'OTT', icon: '📺' },
                { name: 'Telecom', icon: '📡' },
              ].map((industry, index) => (
                <div 
                  key={index}
                  className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-violet-200/50 hover:border-violet-400/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {industry.icon}
                  </div>
                  <div className="text-sm font-semibold text-slate-700 text-center">
                    {industry.name}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-violet-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">80+</div>
              <div className="text-sm font-semibold text-slate-600">Happy Clients</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-cyan-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">150+</div>
              <div className="text-sm font-semibold text-slate-600">Projects Delivered</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-fuchsia-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-2">98%</div>
              <div className="text-sm font-semibold text-slate-600">Client Satisfaction</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-violet-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-2">5+</div>
              <div className="text-sm font-semibold text-slate-600">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <span className="sr-only" aria-live="polite">
        We build React Native apps, modern web products and AI features. Get started or view our work.
      </span>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(18px,-10px) scale(1.06); }
          66% { transform: translate(-10px,18px) scale(0.96); }
          100% { transform: translate(0px,0px) scale(1); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-blob { animation: blob 9s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}