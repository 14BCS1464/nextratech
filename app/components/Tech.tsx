"use client";
import React from "react";
import { techLogos } from "../data/services";

export default function Tech() {
  return (
    <section id="tech" className="py-28 lg:py-36 relative overflow-hidden">
      {/* Subtle blurred background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/10 to-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Cutting-Edge{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Technology
            </span>
          </h3>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We build scalable and future-ready products using the most reliable, modern, and performant technologies.
            Our tech stack ensures speed, security, and flexibility — helping you innovate faster.
          </p>
        </div>

        {/* Grid of Tech Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {techLogos.map((tech, i) => (
            <div
              key={i}
              className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/60 hover:border-violet-500/50 shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-[1.03] hover:-translate-y-2"
            >
              {/* Glowing gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="relative z-10 flex flex-col items-center text-center space-y-5">
                {/* Logo / Icon */}
                {typeof tech.logo === "string" && tech.logo.startsWith("http") ? (
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-16 h-16 object-contain rounded-xl shadow-md bg-white/5 p-2"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center text-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl shadow-inner">
                    {tech.logo || "💻"}
                  </div>
                )}

                {/* Tech Name */}
                <h4 className="text-2xl font-bold text-white">{tech.name}</h4>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
                  {tech.desc ||
                    `We use ${tech.name} to deliver modern, scalable and maintainable digital experiences.`}
                </p>

                {/* Category + Level */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {tech.category || "Development"}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-400/20 border border-violet-500/30 text-violet-300">
                    {tech.proficiency || "Proficient"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300"
          >
            Explore Our Stack
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="inline-block"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
