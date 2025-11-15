"use client";
import React from "react";
import { ArrowRight, Check, ExternalLink, FileText } from "lucide-react";
import { services } from "../../../data/services";

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 relative text-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Services
            </span>
          </h3>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-black/70">
            End-to-end product delivery for startups and enterprises — from
            discovery and prototyping to production and ongoing growth. We
            combine design, mobile & web engineering, and intelligent
            integrations to ship measurable outcomes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article
              key={service.title}
              className="relative group bg-white/80 backdrop-blur-md border border-black/10 rounded-2xl p-6 lg:p-8 overflow-hidden shadow-xl hover:-translate-y-3 transition-transform duration-400"
              aria-labelledby={`service-${service.title}`}
            >
              {/* Decorative accent */}
              <div className="absolute -right-10 -top-10 w-36 h-36 rounded-2xl bg-gradient-to-br from-violet-400/10 to-cyan-400/10 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon + Title */}
              <div className="flex items-start gap-4">
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-xl shadow-md ${service.gradient}`}
                  aria-hidden
                >
                  {service.icon}
                </div>

                <div className="flex-1">
                  <h4
                    id={`service-${service.title}`}
                    className="text-lg lg:text-xl font-semibold text-black"
                  >
                    {service.title}
                  </h4>
                  <p className="mt-1 text-sm text-black/70">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Expanded description */}
              <p className="mt-6 text-sm leading-relaxed max-w-[40rem] text-black/70">
                {service.longDesc ||
                  `We deliver ${service.title.toLowerCase()} with a focus on
                reliability, developer experience, and measurable KPIs — from
                architecture and infra to observability, testing and rollout.`}
              </p>

              {/* Features / bullets */}
              <ul className="mt-6 space-y-3">
                {service.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1">
                      <Check className="h-4 w-4 text-emerald-500" />
                    </span>
                    <span className="text-sm text-black/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Tags and CTA */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-black/80">
                    Delivery: {service.delivery || "4–8 weeks"}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-black/80">
                    Engagement: {service.engagement || "Fixed / T&M"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={service.caseHref || "#"}
                    className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-md border border-black/10 hover:bg-black/5 transition"
                    aria-label={`View case study for ${service.title}`}
                  >
                    <FileText className="h-4 w-4" />
                    Case study
                  </a>

                  <a
                    href={service.ctaHref || "#contact"}
                    className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-md bg-gradient-to-r from-violet-500 to-cyan-400 text-black shadow hover:scale-[1.02] transition-transform"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* small footer note */}
              <div className="mt-4 text-xs text-black/60">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-3 w-3 text-black/60" />
                  <span>We handle integrations, QA, monitoring and deployment.</span>
                </div>
              </div>
            </article>
          ))}
        </div>

     
      </div>
    </section>
  );
}
