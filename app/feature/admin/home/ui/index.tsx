"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Briefcase,
  Mail,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import Logo from "@/app/components/logo";

const    AhdCreateDashboardPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      onClick: () => router.push("/admin-AR-SK-30121995-X9B7Q4/home"),
    },
    {
      label: "Blogs",
      icon: <FileText className="w-5 h-5" />,
      onClick: () => router.push("/admin-AR-SK-30121995-X9B7Q4/writeblogs"),
    },
    {
      label: "Jobs",
      icon: <Briefcase className="w-5 h-5" />,
      onClick: () => router.push("/admin-AR-SK-30121995-X9B7Q4/jobs"),
    },
    {
      label: "Contacts",
      icon: <Mail className="w-5 h-5" />,
      onClick: () => router.push("/admin-AR-SK-30121995-X9B7Q4/contacts"),
    },
    // {
    //   label: "Analytics",
    //   icon: <BarChart3 className="w-5 h-5" />,
    //   onClick: () => router.push("/admin/analytics"),
    // },
  ];

  const quickActions = [
    {
      title: "Add Blog",
      description: "Create new blog post",
      icon: FileText,
      onClick: () => router.push("/admin/blogs/new"),
      color: "bg-blue-500"
    },
    {
      title: "Post Job",
      description: "Create job listing",
      icon: Briefcase,
      onClick: () => router.push("/admin/jobs/new"),
      color: "bg-green-500"
    },
    {
      title: "View Contacts",
      description: "See all enquiries",
      icon: Mail,
      onClick: () => router.push("/admin/contacts"),
      color: "bg-purple-500"
    },
  ];

  const stats = [
    { label: "Total Blogs", value: "24" },
    { label: "Active Jobs", value: "8" },
    { label: "New Contacts", value: "15" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
           <Logo className="m-10" size="medium"/>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
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
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setIsDrawerOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="p-4 space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.onClick();
                        setIsDrawerOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
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
            {/* Welcome Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Admin</h1>
              <p className="text-gray-600">
                Manage your blogs, job postings, and contact enquiries from this dashboard.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    onClick={action.onClick}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
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