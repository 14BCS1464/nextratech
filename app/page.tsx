"use client";
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Tech from "./components/Tech";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1B4332] to-[#4ADE80] text-slate-100 overflow-x-hidden">

      <Header />
      <main className="relative pt-20">
        <Hero />
        <Services />
        <Tech />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
