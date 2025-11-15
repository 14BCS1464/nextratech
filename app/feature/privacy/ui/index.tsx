"use client";
import React from "react";
import { ShieldCheck, Lock, Eye } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyComponent: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-blue-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl w-full bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-10 border border-gray-300"
      >
        <div className="flex flex-col items-center gap-3 mb-8">
          <ShieldCheck size={48} className="text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-center max-w-2xl">
            We value your trust & are committed to keeping your data safe.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="flex items-center gap-2 font-semibold text-xl text-gray-900 mb-2">
              <Lock size={22} className="text-blue-600" />
              Data Collection
            </h2>
            <p>
              We may collect information such as your name, contact details,
              device details & usage data to provide you a better service
              experience. We do not sell or misuse your information.
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="flex items-center gap-2 font-semibold text-xl text-gray-900 mb-2">
              <Eye size={22} className="text-blue-600" />
              Data Usage & Security
            </h2>
            <p>
              Collected data is used only to enhance and secure our services.
              We employ strict security measures and industry-standard practices
              to protect your information.
            </p>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="font-semibold text-xl text-gray-900 mb-2">
              Cookies & Tracking
            </h2>
            <p>
              Cookies help us improve performance and user experience.
              You can disable cookies in your browser settings anytime.
            </p>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="font-semibold text-xl text-gray-900 mb-2">
              Updates to This Policy
            </h2>
            <p>
              Our privacy practices may evolve with time to match industry
              standards. Updated policies will be published here.
            </p>
          </motion.div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-10">
          Last Updated: Nov 2025
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyComponent;
