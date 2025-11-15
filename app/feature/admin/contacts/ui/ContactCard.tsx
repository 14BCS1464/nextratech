import React from "react";
import { Phone, Mail, Star, Clock, Briefcase, Building } from "lucide-react";
import { Contact } from "./types";

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (contact: Contact) => void;
  onCall: (phone: string) => void;
  onEmail: (email: string) => void;
  getStatusColor: (status: Contact["status"]) => string;
  getInterestColor: (level: Contact["interestLevel"]) => string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  isSelected,
  onSelect,
  onCall,
  onEmail,
  getStatusColor,
  getInterestColor,
}) => {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`p-4 md:p-5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-sky-50/80 border-l-4 border-l-sky-500"
          : "bg-white hover:bg-slate-50 border-l-4 border-l-transparent"
      }`}
      onClick={() => onSelect(contact)}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white font-semibold text-sm">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-900 text-sm md:text-base truncate">
                {contact.name}
              </h3>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] md:text-[11px] font-medium capitalize ${getStatusColor(
                  contact.status
                )}`}
              >
                {contact.status.replace("_", " ")}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-600 mb-2">
              <Briefcase className="w-3 h-3" />
              <span className="truncate max-w-[120px] md:max-w-[160px]">
                {contact.position}
              </span>
              <span className="hidden sm:inline">•</span>
              <Building className="w-3 h-3 hidden sm:inline" />
              <span className="truncate hidden sm:inline max-w-[200px]">
                {contact.company}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 line-clamp-2 mb-3">
              {contact.inquiry}
            </p>
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] md:text-xs font-medium ${getInterestColor(
                    contact.interestLevel
                  )}`}
                >
                  <Star className="w-3 h-3" />
                  {contact.interestLevel} interest
                </span>
                {contact.nextFollowUp && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] md:text-xs bg-violet-50 text-violet-700 rounded-full border border-violet-200">
                    <Clock className="w-3 h-3" />
                    {new Date(contact.nextFollowUp).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="text-right text-[11px] md:text-xs text-slate-500">
                <p>Last contact: {contact.lastContact}</p>
                <p className="mt-0.5 text-slate-400">Source: {contact.source}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCall(contact.phone);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
        >
          <Phone className="w-3 h-3" />
          Call
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEmail(contact.email);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-sm"
        >
          <Mail className="w-3 h-3" />
          Email
        </button>
      </div>
    </div>
  );
};

export default ContactCard;