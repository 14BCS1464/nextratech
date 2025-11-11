// components/Testimonials.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials as sampleTestimonials } from "../data/services";

export default function Testimonials() {
  const testimonials = sampleTestimonials && sampleTestimonials.length ? sampleTestimonials : [
    { name: "Asha Patel", role: "CTO — Finovate", company: "Finovate", avatar: "AP", rating: 5, content: "They shipped our mobile app in record time — quality, communication and speed were top-notch." },
    { name: "Rahul Mehta", role: "Product Lead — Shoply", company: "Shoply", avatar: "RM", rating: 5, content: "Their engineering team helped us scale from 10k to 200k daily users with near-zero downtime." },
    { name: "Maya Singh", role: "Head of Growth — LearnUp", company: "LearnUp", avatar: "MS", rating: 4, content: "Great product sense and backend skills. The LLM feature increased engagement by 36%." },
  ];

  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<number | null>(null);
  const autoplayMs = 6000;
  const progressRef = useRef<HTMLDivElement | null>(null);
  const dragConfidenceThreshold = 100; // px

  // autoplay
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = window.setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, autoplayMs);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, testimonials.length]);

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
        setIsPlaying(false);
      } else if (e.key === "ArrowRight") {
        setActive((p) => (p + 1) % testimonials.length);
        setIsPlaying(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [testimonials.length]);

  // reset progress bar (animate width)
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    // restart css animation by toggling a class
    el.style.transition = "none";
    el.style.width = "0%";
    // allow style to apply, then animate
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `width ${autoplayMs}ms linear`;
        el.style.width = isPlaying ? "100%" : "0%";
      });
    });
  }, [active, isPlaying]);

  // drag handler for swipe gestures
  function handleDragEnd(event: any, info: any) {
    const offset = info.offset.x;
    if (offset > dragConfidenceThreshold) {
      // swipe right -> previous
      setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
      setIsPlaying(false);
    } else if (offset < -dragConfidenceThreshold) {
      // swipe left -> next
      setActive((p) => (p + 1) % testimonials.length);
      setIsPlaying(false);
    }
  }

  if (!testimonials.length) {
    return null;
  }

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      {/* decorative blobs */}
      <div aria-hidden className="absolute -left-40 -top-40 w-[420px] h-[420px] bg-gradient-to-br from-violet-400/10 to-cyan-300/8 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute right-[-120px] bottom-[-120px] w-[360px] h-[360px] bg-gradient-to-br from-cyan-400/6 to-violet-300/6 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
            Client <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Testimonials</span>
          </h3>
          <p className="text-slate-400">Don't just take our word for it — these companies trusted us to build and scale their products.</p>
        </div>

        <div className="relative">
          {/* controls */}
          <div className="absolute -top-6 left-6 flex items-center gap-3 z-20">
            <button
              onClick={() => { setActive((p) => (p - 1 + testimonials.length) % testimonials.length); setIsPlaying(false); }}
              aria-label="Previous testimonial"
              className="p-2 rounded-lg bg-white/6 hover:bg-white/8 border border-white/6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsPlaying((s) => !s)}
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
              className="p-2 rounded-lg bg-white/6 hover:bg-white/8 border border-white/6 flex items-center"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>

            <button
              onClick={() => { setActive((p) => (p + 1) % testimonials.length); setIsPlaying(false); }}
              aria-label="Next testimonial"
              className="p-2 rounded-lg bg-white/6 hover:bg-white/8 border border-white/6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Animated testimonial card (draggable) */}
          <div className="overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 120, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -120, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="relative"
              >
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  dragElastic={0.2}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-3xl p-10 shadow-2xl"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Quote */}
                    <div className="flex-1">
                      <motion.blockquote
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-3xl text-slate-100 italic leading-relaxed mb-6"
                      >
                        “{testimonials[active].content}”
                      </motion.blockquote>

                      <div className="flex items-center gap-4">
                        {/* avatar */}
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {testimonials[active].avatar || testimonials[active].name?.split(" ").map((n: string) => n[0]).slice(0,2).join("")}
                        </div>

                        {/* author */}
                        <div>
                          <div className="font-semibold text-lg text-white">{testimonials[active].name}</div>
                          <div className="text-sm text-slate-400">{testimonials[active].role} • {testimonials[active].company}</div>
                          {/* stars */}
                          <div className="flex items-center gap-1 mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < (testimonials[active].rating || 5) ? "fill-amber-400 text-amber-400" : "text-slate-600"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* right column: highlight + CTA */}
                    <div className="w-full md:w-64 flex-shrink-0 flex flex-col items-stretch gap-4">
                      <div className="bg-white/4 border border-white/6 rounded-2xl p-4">
                        <div className="text-sm text-slate-200 font-semibold">Outcome</div>
                        <div className="text-xs text-slate-300 mt-2">
                          {testimonials[active].outcome || "Faster release cycles, higher engagement, and reliable infra."}
                        </div>
                      </div>

                      <a
                        href="#case"
                        className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 text-black font-semibold"
                        onClick={() => setIsPlaying(false)}
                      >
                        Read case study
                      </a>
                    </div>
                  </div>

                  {/* progress bar */}
                  <div className="mt-6 h-2 bg-white/6 rounded-full overflow-hidden">
                    <div ref={progressRef} className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 w-0" />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* clickable avatars / dots */}
          
        </div>

       
      </div>
    </section>
  );
}
