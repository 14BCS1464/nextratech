'use client'
import React, { useState, useEffect } from "react";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: "swad-1",
      name: "Mishti Moon Bars",
      price: 149,
      desc: "Silky milk chocolate with a hint of rose and cardamom.",
      img: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80",
      badge: "Best Seller",
      category: "bars",
      color: "from-[#EFEBE9] to-[#D7B7A3]",
      rating: 4.9
    },
    {
      id: "swad-2",
      name: "Gulaav Truffles",
      price: 249,
      desc: "Dark chocolate truffles with real gulab essence.",
      img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80",
      badge: "Premium",
      category: "truffles",
      color: "from-[#3E2723] to-[#5D4037]",
      rating: 5.0
    },
    {
      id: "swad-3",
      name: "LadooPop Minis",
      price: 99,
      desc: "Bite-sized chocolaty laddoo fusion for kids and joy-lovers.",
      img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80",
      badge: "Family Favorite",
      category: "minis",
      color: "from-[#BF8B67] to-[#D7B7A3]",
      rating: 4.8
    },
    {
      id: "swad-4",
      name: "ChocoRasika Gift Box",
      price: 599,
      desc: "Curated flavors — saffron, almonds, coffee and sea salt caramel.",
      img: "https://images.unsplash.com/photo-1606312619070-d48b4cbc5b73?auto=format&fit=crop&w=800&q=80",
      badge: "Perfect Gift",
      category: "gifts",
      color: "from-[#FFF8E1] to-[#EFEBE9]",
      rating: 4.9
    },
  ];

  const categories = [
    { id: "all", name: "All Products", emoji: "🍫" },
    { id: "bars", name: "Chocolate Bars", emoji: "📦" },
    { id: "truffles", name: "Truffles", emoji: "💎" },
    { id: "minis", name: "Mini Treats", emoji: "✨" },
    { id: "gifts", name: "Gift Boxes", emoji: "🎁" }
  ];

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(product => product.category === activeTab);

  const marketplaces = [
    { 
        name: "Amazon", 
        icon: "📦", 
        color: "from-[#BF8B67] to-[#D7B7A3]", 
        url: "#",
        img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&q=80"
    },
    { 
        name: "Flipkart", 
        icon: "🛒", 
        color: "from-[#3E2723] to-[#5D4037]", 
        url: "#",
        img: "https://images.unsplash.com/photo-1563013541-5a61d76acd4c?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&q=80"
    },
    { 
        name: "Meesho", 
        icon: "💫", 
        color: "from-[#D7B7A3] to-[#BF8B67]", 
        url: "#",
        img: "https://images.unsplash.com/photo-1563013541-5a61d76acd4c?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&q=80"
    },
    { 
        name: "Blinkit", 
        icon: "⚡", 
        color: "from-[#BF8B67] to-[#3E2723]", 
        url: "#",
        img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&q=80"
    },
    { 
        name: "IndiaMart", 
        icon: "🏪", 
        color: "from-[#5D4037] to-[#3E2723]", 
        url: "#",
        img: "https://images.unsplash.com/photo-1563013541-5a61d76acd4c?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&q=80"
    },
    { 
        name: "Zepto", 
        icon: "🚀", 
        color: "from-[#3E2723] to-[#BF8B67]", 
        url: "#",
        img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.1.0&auto=format&fit=crop&w=100&q=80"
    },
  ];

  function addToCart(product) {
    setCart((c) => {
      const found = c.find((i) => i.id === product.id);
      if (found) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...product, qty: 1 }];
    });
    
    // Add confetti effect
    createConfetti();
  }

  function removeFromCart(id) {
    setCart((c) => c.filter((i) => i.id !== id));
  }

  function total() {
    return cart.reduce((s, i) => s + i.price * i.qty, 0);
  }

  function handleWhatsAppOrder() {
    const message = `Hello! I want to order from Rasoora Chocolates:\n\n${cart.map(item => `• ${item.name} x${item.qty} - ₹${item.price * item.qty}`).join('\n')}\n\nTotal: ₹${total()}\n\nPlease confirm my order.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank');
  }

  function createConfetti() {
    const colors = ['#3E2723', '#BF8B67', '#D7B7A3', '#5D4037'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: 0;
        left: ${Math.random() * 100}vw;
        opacity: 0;
        pointer-events: none;
        z-index: 1000;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      `;
      document.body.appendChild(confetti);
      
      const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: 2000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
      });
      
      animation.onfinish = () => confetti.remove();
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EFEBE9] via-[#FFF8E1] to-[#D7B7A3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#3E2723] to-[#5D4037] rounded-full animate-bounce mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🍫</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#3E2723] to-[#BF8B67] bg-clip-text text-transparent">
          Nexttratech
          </h2>
          <p className="text-[#5D4037] mt-2">Preparing something sweet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFEBE9] via-[#FFF8E1] to-[#D7B7A3] text-[#3E2723] overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes confetti {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(191, 139, 103, 0.4); }
          50% { box-shadow: 0 0 30px rgba(191, 139, 103, 0.8); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease forwards;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .cart-slide-in {
          animation: slideInRight 0.3s ease-out;
        }

        .confetti {
          animation: confetti 5s linear forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .product-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.02);
        }

        .glow-on-hover:hover {
          box-shadow: 0 0 30px rgba(191, 139, 103, 0.4);
        }

        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .category-tab {
          transition: all 0.3s ease;
        }

        .category-tab.active {
          background: linear-gradient(135deg, #3E2723, #5D4037);
          color: #FFF8E1;
          transform: scale(1.05);
        }

        .floating-action {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .floating-action:hover {
          transform: translateY(-5px) scale(1.1);
        }
      `}</style>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {showWhatsApp && (
          <div className="animate-scaleIn mb-2">
            <div className="bg-white rounded-2xl shadow-2xl p-4 mb-2 border border-[#D7B7A3]">
              <p className="text-sm font-semibold text-[#3E2723] mb-2">Order via WhatsApp</p>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-gradient-to-r from-[#BF8B67] to-[#5D4037] text-[#FFF8E1] px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 floating-action"
              >
                💬 Order Now
              </button>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setShowWhatsApp(!showWhatsApp)}
          className="w-14 h-14 bg-gradient-to-r from-[#BF8B67] to-[#5D4037] text-[#FFF8E1] rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center text-xl animate-glow floating-action"
        >
          💬
        </button>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🍫</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-float delay-200">🌹</div>
        <div className="absolute bottom-40 left-20 text-7xl opacity-10 animate-float delay-400">🎁</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-float delay-300">✨</div>
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-5 animate-float delay-500">🌰</div>
        <div className="absolute bottom-1/3 right-1/3 text-5xl opacity-5 animate-float delay-600">🥭</div>
      </div>

      {/* NAV */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrollY > 50 ? 'glass shadow-lg' : 'bg-white/80 backdrop-blur-md'} border-b border-[#D7B7A3]`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fadeInLeft">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3E2723] to-[#5D4037] flex items-center justify-center text-[#FFF8E1] font-bold shadow-lg animate-pulse-slow">
                <span className="text-shadow">RC</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#BF8B67] rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="font-extrabold text-xl bg-gradient-to-r from-[#3E2723] to-[#BF8B67] bg-clip-text text-transparent">
              Nexttratech
              </h1>
              <p className="text-xs text-[#5D4037] -mt-1">Taste the desi delight ✨</p>
            </div>
          </div>

          <nav className="flex items-center gap-6 animate-fadeInRight">
            <button
              onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
              className="text-sm px-4 py-2 rounded-full hover:bg-[#EFEBE9] transition-all hover:scale-105 font-medium text-[#3E2723] hover:text-[#BF8B67] floating-action"
            >
              Shop
            </button>
            <button
              onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
              className="text-sm px-4 py-2 rounded-full hover:bg-[#EFEBE9] transition-all hover:scale-105 font-medium text-[#3E2723] hover:text-[#BF8B67] floating-action"
            >
              About
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-[#EFEBE9] rounded-full text-[#5D4037] font-medium text-sm mb-4 animate-fadeInUp border border-[#D7B7A3]">
              🎉 Made with Love in India
            </div>
            
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight animate-fadeInUp">
              Swad that whispers{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3E2723] to-[#BF8B67] relative">
                "Meetha"
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#3E2723] to-[#BF8B67] rounded-full"></div>
              </span>
            </h2>
            
            <p className="text-[#5D4037] text-xl leading-relaxed animate-fadeInUp delay-100">
              Handcrafted chocolates inspired by Indian flavours — from rose & cardamom to saffron & ghee. 
              <span className="block mt-2 text-[#BF8B67] font-medium">Simple, natural ingredients made for everyday smiles.</span>
            </p>

            <div className="flex gap-4 animate-fadeInUp delay-200">
              <button
                onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-gradient-to-r from-[#3E2723] to-[#BF8B67] text-[#FFF8E1] rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105 glow-on-hover transform hover:-translate-y-1 flex items-center gap-2 floating-action"
              >
                🍫 Shop Chocolates
                <span className="text-lg">→</span>
              </button>

              <button
                onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border-2 border-[#D7B7A3] rounded-2xl font-semibold hover:bg-[#EFEBE9] transition-all hover:scale-105 hover:border-[#BF8B67] backdrop-blur-sm text-[#3E2723] floating-action"
              >
                Our Story 📖
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-6 animate-fadeInUp delay-300">
              {[
                { icon: "🌱", title: "Natural", desc: "100% Pure" },
                { icon: "⚡", title: "Fast", desc: "Delivery" },
                { icon: "💝", title: "Gifts", desc: "Ready" }
              ].map((feature, idx) => (
                <div key={idx} className="text-center group cursor-pointer floating-action">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg grid place-items-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl border border-[#EFEBE9]">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <div className="font-semibold text-[#3E2723]">{feature.title}</div>
                  <div className="text-sm text-[#5D4037]">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fadeInRight">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-[#D7B7A3] to-[#BF8B67] rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=60" 
                  alt="Chocolate Collection" 
                  className="rounded-2xl shadow-lg w-full h-96 object-cover"
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#EFEBE9] rounded-2xl rotate-12 animate-float border border-[#D7B7A3]"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FFF8E1] rounded-3xl -rotate-6 animate-float delay-300 border border-[#D7B7A3]"></div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="mt-28 relative">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#3E2723] to-[#BF8B67] bg-clip-text text-transparent animate-fadeInUp">
              Popular Picks ✨
            </h3>
            <p className="text-[#5D4037] text-lg max-w-2xl mx-auto animate-fadeInUp delay-100">
              Discover our handcrafted collection of Indian-inspired chocolates
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fadeInUp delay-200">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`category-tab px-6 py-3 rounded-2xl font-medium transition-all flex items-center gap-2 border ${
                  activeTab === category.id 
                    ? 'active shadow-lg' 
                    : 'bg-white text-[#3E2723] border-[#D7B7A3] hover:bg-[#EFEBE9]'
                }`}
              >
                <span>{category.emoji}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p, idx) => (
              <div
                key={p.id}
                className={`product-card bg-gradient-to-br ${p.color} rounded-3xl p-6 flex flex-col shadow-xl hover:shadow-2xl glow-on-hover animate-fadeInUp relative overflow-hidden group border border-[#EFEBE9]`}
                style={{ animationDelay: `${idx * 100}ms` }}
                onMouseEnter={() => setHoveredProduct(p.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Badge */}
                {p.badge && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#3E2723] to-[#5D4037] text-[#FFF8E1] text-xs font-bold px-3 py-1 rounded-full z-10">
                    {p.badge}
                  </div>
                )}
                
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    className="w-full h-48 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
                  
                  {/* Quick Add Button */}
                  <button
                    onClick={() => addToCart(p)}
                    className={`absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-[#BF8B67] to-[#5D4037] text-[#FFF8E1] rounded-full shadow-lg transition-all transform ${
                      hoveredProduct === p.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    } group-hover:scale-100 group-hover:opacity-100 hover:scale-110 floating-action`}
                  >
                    +
                  </button>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-[#3E2723] group-hover:text-[#BF8B67] transition-colors">{p.name}</h4>
                  <p className="text-[#5D4037] mt-2 leading-relaxed">{p.desc}</p>
                </div>
                
                {/* Price & Actions */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="font-bold text-2xl text-[#BF8B67]">₹{p.price}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelected(p)}
                      className="w-10 h-10 grid place-items-center border border-[#BF8B67] rounded-xl hover:bg-[#EFEBE9] transition-all hover:scale-110 text-[#BF8B67] floating-action"
                    >
                      👁️
                    </button>
                  
                  </div>
                </div>

            
              </div>
            ))}
          </div>
        </section>

        {/* MARKETPLACES SECTION */}
        <section className="mt-20 bg-gradient-to-br from-white to-[#EFEBE9] rounded-3xl p-8 shadow-xl animate-fadeInUp border border-[#D7B7A3]">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#3E2723] to-[#BF8B67] bg-clip-text text-transparent">
              Available on Your Favorite Platforms 🛒
            </h3>
            <p className="text-[#5D4037] mt-2">Shop from wherever you prefer</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {marketplaces.map((market, idx) => (
              <a
                key={idx}
                href={market.url}
                className={`p-4 bg-gradient-to-br ${market.color} text-[#FFF8E1] rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 animate-fadeInUp text-center group floating-action border border-[#D7B7A3]`}
                style={{ animationDelay: `${idx * 100}ms` }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{market.icon}</div>
                <div className="font-semibold text-sm">{market.name}</div>
              </a>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-20 bg-gradient-to-br from-[#EFEBE9] to-[#FFF8E1] p-12 rounded-3xl shadow-2xl animate-fadeInUp relative overflow-hidden border border-[#D7B7A3]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D7B7A3] rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#BF8B67] rounded-full translate-y-24 -translate-x-24 opacity-50"></div>
          
          <div className="relative z-10 max-w-4xl">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-[#3E2723] to-[#BF8B67] bg-clip-text text-transparent mb-6">
              Our Story 📖
            </h3>
            <div className="text-[#5D4037] text-lg leading-relaxed mb-8">
              <section className="mb-6">
                <h4 className="text-xl font-semibold mb-2">1. <span className="text-[#BF8B67]">Luxury & Premium</span></h4>
                <p>
                  Elegant, poetic, and indulgent — like Ferrero Rocher or Godiva with an Indian soul.
                  Used for: artisanal gifting, high-end packaging, boutique branding.
                </p>
                <blockquote className="mt-2 pl-4 border-l-4 border-[#D7B7A3] italic">
                  "Every Rassora creation is a symphony of pure cocoa and heritage spices — a luxurious expression of Indian craftsmanship in every bite."
                </blockquote>
              </section>

              <section className="mb-6">
                <h4 className="text-xl font-semibold mb-2">2. <span className="text-[#BF8B67]">Family & Heartfelt</span></h4>
                <p>
                  Warm, emotional, and relatable — like Amul or Cadbury Celebrations.
                  Used for: family sharing packs, festive promotions, everyday treats.
                </p>
                <blockquote className="mt-2 pl-4 border-l-4 border-[#D7B7A3] italic">
                  "Rassora is made for smiles — to bring families together through the taste of home, love, and a little sweetness."
                </blockquote>
              </section>

              <section>
                <h4 className="text-xl font-semibold mb-2">3. <span className="text-[#BF8B67]">Kids & Fun</span></h4>
                <p>
                  Playful, colorful, and energetic — like Kinder Joy or Perk.
                  Used for: kids' chocolates, fun packaging, youthful appeal.
                </p>
              </section>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Small-batch Crafted", 
                  desc: "Made with care, not machines.", 
                  emoji: "👨‍🍳",
                  color: "from-[#EFEBE9] to-[#FFF8E1]"
                },
                { 
                  title: "Real Ingredients", 
                  desc: "No artificial flavors or colours.", 
                  emoji: "🌿",
                  color: "from-[#EFEBE9] to-[#D7B7A3]"
                },
                { 
                  title: "Family-first", 
                  desc: "Designed for kids & grown-ups alike.", 
                  emoji: "❤️",
                  color: "from-[#FFF8E1] to-[#EFEBE9]"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-6 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-scaleIn backdrop-blur-sm border border-[#EFEBE9] floating-action`}
                  style={{ animationDelay: `${(idx + 3) * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h5 className="font-bold text-lg text-[#3E2723] mb-2">{item.title}</h5>
                  <p className="text-[#5D4037]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 py-12 text-[#5D4037] border-t border-[#D7B7A3] animate-fadeInUp">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg text-[#3E2723] mb-4">Rasoora Chocolates</h4>
              <p className="text-sm">Crafting sweet memories with Indian-inspired chocolates</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-[#BF8B67] transition-colors">Shop All</a>
                <a href="#" className="block hover:text-[#BF8B67] transition-colors">Gift Boxes</a>
                <a href="#" className="block hover:text-[#BF8B67] transition-colors">Custom Orders</a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-[#BF8B67] transition-colors">Contact</a>
                <a href="#" className="block hover:text-[#BF8B67] transition-colors">Shipping</a>
                <a href="#" className="block hover:text-[#BF8B67] transition-colors">Returns</a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex gap-4">
                {['📘', '📷', '🐦', '📽️'].map((icon, idx) => (
                  <button key={idx} className="w-10 h-10 bg-[#EFEBE9] rounded-full grid place-items-center hover:bg-[#D7B7A3] transition-colors hover:scale-110 floating-action border border-[#D7B7A3]">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#D7B7A3] text-center text-sm">
            © {new Date().getFullYear()} Rasoora Chocolates — All rights reserved | Made with ❤️ in India
          </div>
        </footer>
      </main>

      {/* PRODUCT MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center z-50 animate-fadeInUp p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-4xl w-full mx-auto shadow-2xl animate-scaleIn relative border border-[#D7B7A3]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full hover:bg-[#EFEBE9] transition-colors text-[#5D4037] hover:text-[#3E2723] floating-action"
            >
              ✕
            </button>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <img src={selected.img} alt={selected.name} className="w-full h-64 lg:h-80 object-cover rounded-2xl" />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#3E2723] to-[#5D4037] text-[#FFF8E1] text-sm font-bold px-3 py-1 rounded-full">
                    {selected.badge}
                  </div>
                </div>

                {/* Marketplace Buttons */}
                <div className="mt-6">
                  <h5 className="font-semibold text-[#3E2723] mb-3 text-center">Buy from:</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {marketplaces.map((market, idx) => (
                      <a
                        key={idx}
                        href={market.url}
                        className={`p-3 bg-gradient-to-r ${market.color} text-[#FFF8E1] rounded-xl text-center hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm floating-action`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{market.icon}</span>
                        <span>{market.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-3xl text-[#3E2723]">{selected.name}</h4>
                <p className="text-[#5D4037] mt-4 text-lg leading-relaxed">{selected.desc}</p>
                
                <div className="mt-8 p-4 bg-[#EFEBE9] rounded-2xl border border-[#D7B7A3]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#5D4037]">Price</div>
                      <div className="font-extrabold text-3xl text-[#BF8B67]">₹{selected.price}</div>
                    </div>
                    <div className="text-sm text-[#5D4037]">
                      ⭐⭐⭐⭐⭐ (4.8/5)
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    addToCart(selected);
                    setSelected(null);
                  }}
                  className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-[#3E2723] to-[#BF8B67] text-[#FFF8E1] rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105 glow-on-hover flex items-center justify-center gap-2 floating-action"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}