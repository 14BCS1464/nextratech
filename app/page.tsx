"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Tech from "./components/Tech";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function HomePage() {
  useEffect(() => {
    // Prevent built-in smooth scrolling from conflicting with Lenis
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1.2, // easing duration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      direction: "vertical",
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Optional: listen to scroll events (example)
    // lenis.on("scroll", ({ scroll, limit }) => {
    //   // console.log("scroll", scroll, "limit", limit);
    // });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // restore previous scroll behavior
      document.documentElement.style.scrollBehavior = prevScrollBehavior || "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 text-gray-900 overflow-x-hidden relative">
      {/* Animated gradient orbs in background with cool colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top left orb - Cyan */}
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-30 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 70%)",
            animation: "float 20s ease-in-out infinite",
          }}
        />

        {/* Top right orb - Blue */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />

        {/* Middle left orb - Teal */}
        <div
          className="absolute top-1/3 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)",
            animation: "float 30s ease-in-out infinite",
          }}
        />

        {/* Bottom right orb - Sky Blue */}
        <div
          className="absolute bottom-20 -right-32 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(14, 165, 233, 0.5) 0%, transparent 70%)",
            animation: "float 22s ease-in-out infinite reverse",
          }}
        />

        {/* Center accent orb - Indigo */}
        <div
          className="absolute top-2/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
            animation: "float 18s ease-in-out infinite",
          }}
        />

        {/* Additional cool accent - Aqua */}
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)",
            animation: "float 28s ease-in-out infinite",
          }}
        />
      </div>

      {/* Subtle grid pattern overlay with cool tone */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Cool-toned radial gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(241, 245, 249, 0.3) 100%)",
        }}
      />

      <Header />

      <main className="relative pt-20 z-10">
        {/* Section divider effects with cool colors */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        <Hero />

        {/* Floating separator - Cyan */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 animate-pulse" />
            </div>
          </div>
        </div>

        <Services />

        {/* Floating separator - Blue */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-pulse" />
            </div>
          </div>
        </div>

        <Tech />

        {/* Floating separator - Teal */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-500 shadow-lg shadow-teal-500/50 animate-pulse" />
            </div>
          </div>
        </div>

        <Testimonials />

        {/* Floating separator - Sky */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-500 shadow-lg shadow-sky-500/50 animate-pulse" />
            </div>
          </div>
        </div>

        <Contact />
      </main>

      <Footer />

      {/* Global CSS animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        /* Smooth scroll behavior (Lenis manages scrolling; default is set to auto in JS) */
        html {
          /* keep this here as fallback only; we override in JS when Lenis mounts */
        }

        /* Custom scrollbar with cool colors */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #06b6d4 0%, #3b82f6 100%);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #22d3ee 0%, #60a5fa 100%);
        }
      `}</style>
    </div>
  );
}
