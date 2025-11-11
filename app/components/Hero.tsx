"use client";
import React, { useEffect } from "react";
import { Zap, ArrowRight, ExternalLink, Star,  Server } from "lucide-react";

export default function Hero() {
  useEffect(() => {
    // keep scroll position stable when this mounts (optional)
    window.scrollTo(window.scrollX, window.scrollY);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle animated background shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 w-80 h-80 rounded-3xl bg-gradient-to-br from-violet-200/30 to-cyan-200/20 blur-3xl animate-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-28 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-200/20 to-violet-200/10 blur-2xl animate-blob animation-delay-2000"
      />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-3 bg-white/6 backdrop-blur-sm border border-white/6 px-4 py-2 rounded-full cursor-pointer group">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 text-white shadow-md">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-slate-100/90">
                Rapid MVPs • AI integrations • Scalable APIs
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
              Build the{" "}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Future
              </span>{" "}
              of Mobile & Web
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed">
              We design and ship delightful, high-performance React Native apps and modern web products.
              From idea validation to production-grade deployments — our team accelerates your roadmap with
              user-first design, robust engineering, and AI-powered features that scale.
            </p>

            {/* Expanded detailed bullet points */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl text-slate-300">
              <li className="flex items-start gap-3">
                <div className="mt-1">
                  {/* <LightningBolt className="h-5 w-5 text-violet-300" /> */}
                </div>
                <div>
                  <strong className="block text-slate-100">Fast Prototypes</strong>
                  <span className="text-sm">Validated MVPs in weeks, not months.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1">
                  <Server className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <strong className="block text-slate-100">Robust APIs</strong>
                  <span className="text-sm">Secure, scalable backend & infra patterns.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1">
                  <ExternalLink className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <strong className="block text-slate-100">Integrations</strong>
                  <span className="text-sm">Payments, analytics, LLMs, and CI pipelines.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1">
                  <Star className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <strong className="block text-slate-100">Trusted Partners</strong>
                  <span className="text-sm">80+ companies, enterprise to startups.</span>
                </div>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-semibold px-5 py-3 rounded-lg shadow-lg hover:translate-y-[-2px] transition-transform"
                aria-label="Get started - contact us"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 rounded-lg text-white/90 hover:bg-white/5 transition"
                aria-label="View our work"
              >
                View Work
                <ExternalLink className="h-4 w-4" />
              </a>

              <div className="flex items-center gap-3 ml-1">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white/10 bg-gradient-to-br from-violet-500 to-cyan-500 shadow-sm"
                      aria-hidden
                    />
                  ))}
                </div>

                <div className="text-sm text-slate-300">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div>Trusted by 80+ companies</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Illustration / card */}
          <div className="relative z-10">
            <div className="w-full max-w-md mx-auto lg:ml-auto bg-white/5 border border-white/6 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/90 font-medium">Featured</div>
                  <div className="mt-2 text-lg font-semibold text-white">React Native + LLM Chatbot</div>
                  <p className="mt-2 text-sm text-slate-300">
                    A real-world client shipped an in-app assistant that reduced support load by 42% while increasing
                    retention through contextual guidance.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-violet-400 to-cyan-400 flex items-center justify-center text-white shadow-md">
                    <Zap className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="text-sm text-slate-300">
                  <div className="font-semibold text-white">Delivery</div>
                  <div className="text-xs">MVP in 4–6 weeks</div>
                </div>

                <div className="text-sm text-slate-300">
                  <div className="font-semibold text-white">Scale</div>
                  <div className="text-xs">Serverless + CI</div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white/6 border border-white/8 text-white/90" href="#case">
                  See case study
                </a>
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-violet-500 to-cyan-400 text-white" href="#demo">
                  Live demo
                </a>
              </div>
            </div>

            {/* small floating decorative card */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br from-violet-500/15 to-cyan-500/15 rounded-2xl border border-violet-500/20 backdrop-blur-sm" />
          </div>
        </div>
      </div>

      {/* Accessibility: hidden decorative aria-live summarizing value */}
      <span className="sr-only" aria-live="polite">
        We build React Native apps, modern web products and AI features. Get started or view our work.
      </span>

      {/* small CSS-in-JS for blob animation if your Tailwind doesn't include it */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(20px, -10px) scale(1.05);
          }
          66% {
            transform: translate(-10px, 20px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
