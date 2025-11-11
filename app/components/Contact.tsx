// components/Contact.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Zap, Code, Sparkles, Server } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
            <div className="space-y-8">
              <h3 className="text-5xl font-black mb-4">Let's Build <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Together</span></h3>
              <p className="text-xl text-slate-400">Tell us about your idea — we'll propose a roadmap and timeline.</p>

              <div className="space-y-4">
                {[{ icon: <Zap className="h-5 w-5" />, text: "Fast MVP delivery (2-4 weeks)" }, { icon: <Code className="h-5 w-5" />, text: "Clean, scalable architecture" }, { icon: <Sparkles className="h-5 w-5" />, text: "AI-powered features" }, { icon: <Server className="h-5 w-5" />, text: "Production-ready APIs" }].map((it, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className="p-2 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-lg border border-violet-500/20 group-hover:border-violet-500/50 transition">{it.icon}</div>
                    <span className="text-slate-300 group-hover:text-white transition">{it.text}</span>
                  </div>
                ))}
              </div>

              <a href="mailto:hello@mobiledev.example" className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-4 rounded-xl font-bold shadow-xl shadow-violet-500/25">
                <Mail className="h-5 w-5" />
                hello@mobiledev.example
              </a>
            </div>

            <form className="space-y-6">
              {[
                { label: "Your Name", type: "text", placeholder: "Jane Doe" },
                { label: "Email", type: "email", placeholder: "you@company.com" },
                { label: "Project Type", type: "select", options: ["Mobile App", "Web Application", "API Development", "AI Integration", "Full Stack"] },
                { label: "Tell us about your project", type: "textarea", placeholder: "I need a mobile app for...", rows: 5 }
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">{field.label}</label>
                  {field.type === "select" ? (
                    <select className="w-full rounded-xl p-4 bg-slate-900/50 border border-slate-700 text-white outline-none focus:border-violet-500 transition">
                      {field.options!.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea rows={field.rows} placeholder={field.placeholder} className="w-full rounded-xl p-4 bg-slate-900/50 border border-slate-700 text-white outline-none focus:border-violet-500 transition resize-none" />
                  ) : (
                    <input type={field.type} placeholder={field.placeholder} className="w-full rounded-xl p-4 bg-slate-900/50 border border-slate-700 text-white outline-none focus:border-violet-500 transition" />
                  )}
                </div>
              ))}

              <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl font-bold shadow-xl shadow-violet-500/25">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
