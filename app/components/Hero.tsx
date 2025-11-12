"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, ExternalLink, Star, Server } from "lucide-react";

export default function Hero() {
  useEffect(() => {
    window.scrollTo(window.scrollX, window.scrollY);
  }, []);

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 80, when: "beforeChildren" } },
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden text-black bg-white w-full">
      {/* layered soft gradients covering entire background */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-violet-50 via-cyan-50 to-white blur-3xl animate-blob" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-cyan-100/30 via-violet-100/20 to-transparent blur-2xl animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
        >
          {/* LEFT - copy */}
          <motion.div variants={item} className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/80 to-white/60 border border-black/5 px-4 py-2 rounded-full shadow-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 text-black shadow">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">Rapid MVPs • AI integrations • Scalable APIs</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Build the{' '}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">Future</span>
              {' '}of Mobile & Web
            </h1>

            <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-slate-700">
              We design and ship delightful, high-performance React Native apps and modern web products — from idea
              validation to production deployments. Fast, secure, and user-first.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <li className="flex items-start gap-3">
                <div className="mt-1 text-violet-500">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block">Fast Prototypes</strong>
                  <span className="text-sm text-slate-600">Validated MVPs in weeks, not months.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 text-cyan-500">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block">Robust APIs</strong>
                  <span className="text-sm text-slate-600">Secure, scalable backend & infra patterns.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 text-amber-500">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block">Integrations</strong>
                  <span className="text-sm text-slate-600">Payments, analytics, LLMs, and CI pipelines.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 text-amber-500">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block">Trusted Partners</strong>
                  <span className="text-sm text-slate-600">80+ companies, enterprise to startups.</span>
                </div>
              </li>
            </ul>

            <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-semibold px-6 py-3 rounded-lg shadow-2xl transform active:scale-95 transition-transform hover:-translate-y-1"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 border border-black/10 px-4 py-3 rounded-lg hover:bg-black/5 transition"
              >
                View Work
                <ExternalLink className="h-4 w-4" />
              </a>

              <div className="flex items-center gap-3 ml-1">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white/80 bg-gradient-to-br from-violet-400 to-cyan-400 shadow-sm" />
                  ))}
                </div>

                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-slate-600">Trusted by 80+ companies</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT - feature card */}
          <motion.div variants={item} className="relative z-20 flex justify-center w-full">
            <div className="rounded-2xl bg-white shadow-2xl p-8 border border-black/5 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold text-violet-600">Featured</div>
                  <div className="font-bold text-lg">Shipping-ready Mobile App</div>
                </div>
                <div className="text-sm text-slate-500">2-4 weeks</div>
              </div>

              <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-700">Core features</div>
                  <div className="text-sm text-slate-500">Auth, Payments, Push</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-700">Tech</div>
                  <div className="text-sm text-slate-500">React Native · Node · Prisma</div>
                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full w-3/4" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a href="#contact" className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-semibold px-4 py-2 rounded-lg shadow">
                  Talk to us
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button aria-label="Preview" className="p-2 rounded-lg border border-black/5 hover:bg-black/5 transition">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 p-2 bg-gradient-to-br from-violet-400 to-cyan-400 rounded-full shadow-lg border-2 border-white">
              <Star className="h-5 w-5 text-white" />
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
        .animate-blob { animation: blob 9s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
}
