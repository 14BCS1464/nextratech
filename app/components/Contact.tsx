// components/Contact.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Zap, Code, Sparkles, Server } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Parent box: plain card with shadow only */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
            {/* Left info column */}
            <div className="space-y-8 text-slate-900">
              <h3 className="text-5xl font-black mb-4">
                Let's Build{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Together
                </span>
              </h3>
              <p className="text-xl text-slate-700">
                Tell us about your idea — we'll propose a roadmap and timeline.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Zap className="h-5 w-5" />, text: "Fast MVP delivery (2-4 weeks)" },
                  { icon: <Code className="h-5 w-5" />, text: "Clean, scalable architecture" },
                  { icon: <Sparkles className="h-5 w-5" />, text: "AI-powered features" },
                  { icon: <Server className="h-5 w-5" />, text: "Production-ready APIs" },
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className="p-2 bg-slate-100 rounded-lg transition">
                      {it.icon}
                    </div>
                    <span className="text-slate-900">{it.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="mailto:hello@mobiledev.example"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-4 rounded-xl font-bold shadow-md text-white"
              >
                <Mail className="h-5 w-5" />
                hello@mobiledev.example
              </a>
            </div>

            {/* Form column */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: "Your Name", type: "text", name: "name", placeholder: "Jane Doe" },
                { label: "Email", type: "email", name: "email", placeholder: "you@company.com" },
                // Replaced "Project Type" select with Phone Number (required)
                { label: "Phone Number", type: "tel", name: "phone", placeholder: "+91 98765 43210", required: true },
                { label: "Tell us about your project", type: "textarea", name: "message", placeholder: "I need a mobile app for...", rows: 5 },
              ].map((field) => (
                <div key={String(field.label)}>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    {field.label}
                    {field.required ? <span className="ml-2 text-red-600">*</span> : null}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      rows={field.rows}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl p-4 bg-white border border-slate-200 text-slate-900 outline-none focus:border-violet-500 transition resize-none"
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={!!field.required}
                      aria-required={!!field.required}
                      // basic pattern to allow common phone characters (digits, spaces, +, -, parentheses)
                      pattern={field.type === "tel" ? "^[0-9 +()\\-]{6,20}$" : undefined}
                      className="w-full rounded-xl p-4 bg-white border border-slate-200 text-slate-900 outline-none focus:border-violet-500 transition"
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl font-bold shadow-md text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
