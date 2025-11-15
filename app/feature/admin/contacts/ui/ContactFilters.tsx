import React from "react";
import { Search, Filter, Star } from "lucide-react";
import { ContactFilters as ContactFiltersType } from "./types";

interface ContactFiltersProps {
  filters: ContactFiltersType;
  onFiltersChange: (filters: ContactFiltersType) => void;
}

const statusOptions = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "interested", label: "Interested" },
  { value: "not_interested", label: "Not Interested" },
  { value: "scheduled", label: "Scheduled" },
];

const interestOptions = [
  { value: "all", label: "All" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const ContactFilters: React.FC<ContactFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({ ...filters, searchTerm });
  };

  const handleStatusChange = (statusFilter: string) => {
    onFiltersChange({ ...filters, statusFilter });
  };

  const handleInterestChange = (interestFilter: string) => {
    onFiltersChange({ ...filters, interestFilter });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-1 min-w-[260px]">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, company or inquiry..."
                value={filters.searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500 transition"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent group-hover:border-slate-200/80 transition" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="w-4 h-4" />
            Smart filters
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
          {/* Status chips */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Status
            </span>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((opt) => {
                const isActive = filters.statusFilter === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleStatusChange(opt.value)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border transition-all ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {opt.value === "new" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    )}
                    {opt.value === "interested" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    )}
                    {opt.value === "not_interested" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    )}
                    {opt.value === "scheduled" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                    )}
                    {opt.value === "contacted" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    )}
                    {opt.value === "all" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    )}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interest chips */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Interest Level
            </span>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((opt) => {
                const isActive = filters.interestFilter === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleInterestChange(opt.value)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
                      isActive
                        ? "bg-white text-slate-900 border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {opt.value !== "all" && (
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-500" />
                    )}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFilters;