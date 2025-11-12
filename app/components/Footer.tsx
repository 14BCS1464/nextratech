"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Phone,
} from "lucide-react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 800);
  }

  return (
    <footer className="relative bg-gradient-to-t from-white to-gray-50 pt-16 pb-10 border-t border-black/10 text-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start"
        >
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-10">
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(120deg, #e2e8f0 0%, #f8fafc 100%)",
                    opacity: 0.9,
                    filter: "blur(12px)",
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                />
                <img
                  src="/images/nextratech-logo.png"
                  alt="Logo"
                  className="h-20 w-100 object-contain relative z-10"
                  style={{ background: "transparent" }}
                />
              </div>
            </div>

            <p className="text-base text-black/80 max-w-sm leading-relaxed">
              We design and ship mobile & web products — from fast MVPs to scalable systems. Trusted by startups and
              enterprises alike for reliable engineering and product-first thinking.
            </p>

            <div className="flex items-center gap-4 mt-3">
              <a
                href="https://github.com"
                aria-label="Github"
                className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-1">
            <div>
              <h4 className="text-lg font-semibold mb-3">Explore</h4>
              <ul className="space-y-2 text-base">
                <li>
                  <a href="#services" className="hover:text-violet-600 transition">Services</a>
                </li>
                <li>
                  <a href="#tech" className="hover:text-violet-600 transition">Technology</a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-violet-600 transition">Testimonials</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-violet-600 transition">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-base">
                <li>
                  <a href="/about" className="hover:text-violet-600 transition">About</a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-violet-600 transition">Careers</a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-violet-600 transition">Blog</a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-violet-600 transition">Privacy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="md:flex md:flex-col items-start md:items-end">
            <div className="w-full md:w-auto mb-4">
              <h4 className="text-lg font-semibold mb-3">Contact</h4>

              <div className="flex items-center gap-3 text-base text-black/80">
                <Mail className="w-5 h-5 text-black/70" />
                <a href="mailto:hello@nextratech.com" className="hover:underline">hello@nextratech.com</a>
              </div>
              <div className="flex items-center gap-3 text-base text-black/80 mt-2">
                <Phone className="w-5 h-5 text-black/70" />
                <a href="tel:+911234567890" className="hover:underline">+91 12345 67890</a>
              </div>
              <div className="flex items-center gap-3 text-base text-black/80 mt-2">
                <Globe className="w-5 h-5 text-black/70" />
                <span>India</span>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-80">
              <label htmlFor="newsletter" className="sr-only">Subscribe to newsletter</label>
              <div className="flex items-center gap-2">
                <input
                  id="newsletter"
                  type="email"
                  placeholder={subscribed ? "Thanks for subscribing!" : "Your email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-black/5 border border-black/10 placeholder:text-black/50 text-black focus:outline-none focus:ring-2 focus:ring-violet-400"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 text-black font-semibold shadow hover:scale-[1.03] transition-transform"
                >
                  Subscribe
                </button>
              </div>
              <div className="text-xs text-black/60 mt-2">No spam — unsubscribe anytime.</div>
            </form>
          </div>
        </motion.div>

        {/* Bottom Row */}
        <div className="mt-10 pt-6 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4 text-base text-black/70">
          <div>© {new Date().getFullYear()} Nextratech. Crafted with React & Framer Motion.</div>

          <div className="flex items-center gap-5">
            <a href="/terms" className="hover:text-violet-600 transition">Terms</a>
            <a href="/cookie" className="hover:text-violet-600 transition">Cookies</a>
            <a href="/security" className="hover:text-violet-600 transition">Security</a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed right-6 bottom-6 z-50 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-black shadow-2xl hover:scale-105 transition-transform"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
