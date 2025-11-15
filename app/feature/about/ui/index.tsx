"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutUsComponent: React.FC = () => {
  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "15+", label: "Team Members" },
    { number: "5", label: "Countries Served" }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology solutions",
      icon: "💡"
    },
    {
      title: "Excellence",
      description: "Delivering premium quality in every project we undertake",
      icon: "⭐"
    },
    {
      title: "Collaboration",
      description: "Working together to achieve extraordinary results",
      icon: "🤝"
    },
    {
      title: "Impact",
      description: "Creating solutions that make a real difference",
      icon: "🎯"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-16 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          About Our Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Crafting digital excellence and transforming ideas into impactful reality
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Main Content with Larger Image */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Text Content - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Founded one year ago with a bold vision to revolutionize digital experiences, 
                we've quickly emerged as a trusted partner for innovative technology solutions. 
                Our journey began with a simple belief: technology should be beautiful, intuitive, 
                and profoundly impactful.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                In just 12 months, we've delivered over 50 projects spanning web applications, 
                mobile platforms, and enterprise solutions, consistently exceeding expectations 
                and pushing creative boundaries.
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                We specialize in <span className="font-semibold text-blue-600">Artificial Intelligence</span>, 
                <span className="font-semibold text-purple-600"> Cloud Engineering</span>, 
                <span className="font-semibold text-green-600"> Automation</span>, and 
                <span className="font-semibold text-orange-600"> Product Innovation</span>, 
                creating solutions that are not just functional, but transformative.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Large Image Section - 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-3xl h-full min-h-[600px] flex items-center justify-center overflow-hidden">
              {/* Main Image Content */}
              <div className="text-white text-center p-8 z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="text-8xl mb-6"
                >
                  🚀
                </motion.div>
                <h3 className="text-4xl font-bold mb-4">Innovation in Motion</h3>
                <p className="text-blue-100 text-lg">
                  Building the future with cutting-edge technology and creative solutions
                </p>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-300 rounded-full blur-xl"></div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl"
            >
              <div className="text-3xl">💫</div>
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                x: [0, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl"
            >
              <div className="text-3xl">✨</div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-1/4 -right-8 bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-2xl"
            >
              <div className="text-2xl">⭐</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center group hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-lg">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leadership Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-200 mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Meet Our Leadership
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Founder */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-10 shadow-2xl border border-blue-200 hover:shadow-3xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-28 h-28 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                  >
                    AR
                  </motion.div>
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    Abhishek Rai
                  </h3>
                  <p className="text-blue-600 font-semibold text-lg mb-6">Founder & CEO</p>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    Visionary leader with extensive experience in scaling technology-driven 
                    solutions that create meaningful impact. Abhishek drives innovation, 
                    product strategy, and futuristic thinking while fostering a culture 
                    of excellence and continuous improvement.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      Strategic Vision
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      Innovation
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      Leadership
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Co-Founder */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-10 shadow-2xl border border-purple-200 hover:shadow-3xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-28 h-28 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                  >
                    SK
                  </motion.div>
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    Sunil Kumar
                  </h3>
                  <p className="text-purple-600 font-semibold text-lg mb-6">Co-Founder & CTO</p>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    Strategic problem-solver and technology enthusiast with a passion 
                    for engineering excellence. Sunil focuses on product development, 
                    technical architecture, and delivering world-class digital experiences 
                    that exceed client expectations.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                      Engineering
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                      Development
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                      Architecture
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with cutting-edge technology and innovative solutions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-100"
            >
              Get In Touch Today
            </motion.button>
          </div>
          
          <p className="text-2xl leading-relaxed text-gray-700 mt-12 mb-8 max-w-4xl mx-auto">
            Together, we're building a future where technology feels magical — 
            and every great idea transforms into a living reality. ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsComponent;