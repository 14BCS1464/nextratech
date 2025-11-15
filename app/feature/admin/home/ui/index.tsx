"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Briefcase,
  Mail,
  LogOut,
  TrendingUp,
  Eye,
  ArrowRight,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/logo";

const AhdCreateDashboardPage = () => {
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const handleNavClick = (label, path) => {
    setActiveNav(label);
    console.log(`Navigating to: ${path}`);
    router.push(path)
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      onClick: () => handleNavClick("Dashboard", "/admin-AR-SK-30121995-X9B7Q4/home"),
    },
    {
      label: "Blogs",
      icon: <FileText className="w-5 h-5" />,
      onClick: () => handleNavClick("Blogs", "/admin-AR-SK-30121995-X9B7Q4/writeblogs"),
    },
    {
      label: "Jobs",
      icon: <Briefcase className="w-5 h-5" />,
      onClick: () => handleNavClick("Jobs", "/admin-AR-SK-30121995-X9B7Q4/jobs"),
    },
    {
      label: "Contacts",
      icon: <Mail className="w-5 h-5" />,
      onClick: () => handleNavClick("Contacts", "/admin-AR-SK-30121995-X9B7Q4/contacts"),
    },
    {
      label: "Logout",
      icon: <LogOut className="w-5 h-5" />,
      onClick: () => {
        if (window.confirm("Are you sure you want to logout?")) {
          console.log("Logging out");
        }
      },
    }
  ];

  const quickActions = [
    {
      title: "Add Blog",
      description: "Create new blog post",
      icon: FileText,
      onClick: () => console.log("Navigate to new blog"),
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Post Job",
      description: "Create job listing",
      icon: Briefcase,
      onClick: () => console.log("Navigate to new job"),
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "View Contacts",
      description: "See all enquiries",
      icon: Mail,
      onClick: () => console.log("Navigate to contacts"),
      gradient: "from-purple-500 to-purple-600"
    },
  ];

  const stats = [
    { label: "Total Blogs", value: "24", change: "+12%", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Jobs", value: "8", change: "+3", icon: Briefcase, color: "text-green-600", bg: "bg-green-50" },
    { label: "New Contacts", value: "15", change: "+8%", icon: Mail, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient accent */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          
<Logo size="medium"></Logo>
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop with enhanced styling */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl border border-gray-200 p-3 space-y-1 shadow-sm">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeNav === item.label
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md transform scale-105"
                      : "text-gray-700 hover:bg-gray-50 hover:translate-x-1"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Mobile Drawer */}
          {isDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => setIsDrawerOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500">
                  <h2 className="text-lg font-semibold text-white">Menu</h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 rounded-md hover:bg-white/20 text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="p-3 space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.onClick();
                        setIsDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeNav === item.label
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1">
            {/* Welcome Section with gradient */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Admin 👋</h1>
                <p className="text-blue-100 text-lg">
                  Manage your blogs, job postings, and contact enquiries from this dashboard.
                </p>
              </div>
            </div>

            {/* Stats with enhanced cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions with enhanced styling */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                <Eye className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    onClick={action.onClick}
                    className="group relative flex flex-col gap-4 p-6 border-2 border-gray-200 rounded-xl hover:border-transparent hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="w-7 h-7" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors duration-300 text-lg">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                        {action.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AhdCreateDashboardPage;