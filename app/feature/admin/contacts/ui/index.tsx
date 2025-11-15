"use client";
import React, { useState } from "react";
import { User, Download } from "lucide-react";

import { Contact, ContactFilters as ContactFiltersType, Reminder } from "./types";
import ContactCard from './ContactCard';
import ContactFilters from './ContactFilters';
import ContactDetails from './ContactDetails';
import Logo from "@/app/components/logo";

const CustomerContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Emma Johnson",
      email: "emma.johnson@finexglobal.com",
      phone: "+1 (404) 555-9821",
      company: "Finex Global",
      position: "VP of Operations",
      inquiry: "Looking for workflow automation and reporting tools",
      status: "new",
      interestLevel: "medium",
      lastContact: "2024-02-10",
      nextFollowUp: "2024-02-14",
      notes: "Requested overview deck. Evaluating vendors this quarter.",
      source: "LinkedIn Outreach"
    },
    {
      id: "2",
      name: "Carlos Rivera",
      email: "c.rivera@smartbuild.io",
      phone: "+1 (720) 555-3344",
      company: "SmartBuild IO",
      position: "Head of Product",
      inquiry: "Interested in integrating AI suggestions into product roadmap",
      status: "contacted",
      interestLevel: "high",
      lastContact: "2024-01-29",
      nextFollowUp: "2024-02-02",
      notes: "Wants API documentation. Demo scheduled.",
      source: "Referral"
    },
    {
      id: "3",
      name: "Ava Thompson",
      email: "ava.t@brightwave.com",
      phone: "+1 (312) 555-7782",
      company: "BrightWave Media",
      position: "Marketing Director",
      inquiry: "Needs AI content generation for campaigns",
      status: "qualified",
      interestLevel: "high",
      lastContact: "2024-02-05",
      nextFollowUp: "2024-02-12",
      notes: "Very excited about automation features. Budget available.",
      source: "Website Form"
    },
    {
      id: "4",
      name: "Liam Carter",
      email: "liam.carter@northpeakenergy.com",
      phone: "+1 (206) 555-4421",
      company: "NorthPeak Energy",
      position: "IT Manager",
      inquiry: "Exploring enterprise security and compliance features",
      status: "new",
      interestLevel: "low",
      lastContact: "2024-01-20",
      nextFollowUp: "2024-02-01",
      notes: "Needs internal approval before moving forward.",
      source: "Industry Conference"
    },
    {
      id: "5",
      name: "Sophia Marin",
      email: "s.marin@zenclinic.org",
      phone: "+1 (917) 555-1209",
      company: "ZenClinic Health",
      position: "Chief Innovation Officer",
      inquiry: "AI dashboard for patient analytics",
      status: "contacted",
      interestLevel: "medium",
      lastContact: "2024-02-03",
      nextFollowUp: "2024-02-09",
      notes: "Requested case studies. HIPAA compliance required.",
      source: "Email Campaign"
    },
    {
      id: "6",
      name: "Ethan Walker",
      email: "ewalker@riversidebank.com",
      phone: "+1 (513) 555-9931",
      company: "Riverside Bank",
      position: "Data Engineering Lead",
      inquiry: "AI-based data cleanup and classification tools",
      status: "qualified",
      interestLevel: "high",
      lastContact: "2024-02-11",
      nextFollowUp: "2024-02-18",
      notes: "Pilot test for Q2 planned.",
      source: "Webinar"
    },
    {
      id: "7",
      name: "Mia Patel",
      email: "mia.patel@greenpathretail.com",
      phone: "+1 (702) 555-6644",
      company: "GreenPath Retail",
      position: "E-commerce Director",
      inquiry: "AI recommendations for product personalization",
      status: "new",
      interestLevel: "medium",
      lastContact: "2024-02-08",
      nextFollowUp: "2024-02-15",
      notes: "Wants A/B testing examples.",
      source: "Facebook Lead Ad"
    },
    {
      id: "8",
      name: "Noah Bennett",
      email: "nbennett@aerotechlabs.com",
      phone: "+1 (615) 555-8734",
      company: "AeroTech Labs",
      position: "Research Director",
      inquiry: "Custom AI model training",
      status: "contacted",
      interestLevel: "high",
      lastContact: "2024-01-31",
      nextFollowUp: "2024-02-04",
      notes: "Strong technical background. Wants GPU cost estimate.",
      source: "Cold Outreach"
    },
    {
      id: "9",
      name: "Olivia Chen",
      email: "olivia.chen@edutekacademy.com",
      phone: "+1 (801) 555-3319",
      company: "EduTek Academy",
      position: "Academic Technology Lead",
      inquiry: "AI tutoring and learning analytics tools",
      status: "qualified",
      interestLevel: "medium",
      lastContact: "2024-02-06",
      nextFollowUp: "2024-02-13",
      notes: "Needs pricing for student volume tiers.",
      source: "Website Form"
    },
    {
      id: "10",
      name: "James Lee",
      email: "jlee@urbantransitco.com",
      phone: "+1 (312) 555-9090",
      company: "Urban Transit Co",
      position: "Operations Analyst",
      inquiry: "Predictive analytics for fleet performance",
      status: "contacted",
      interestLevel: "low",
      lastContact: "2024-01-28",
      nextFollowUp: "2024-02-07",
      notes: "Early research stage. Needs ROI examples.",
      source: "Trade Show"
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0] || null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [filters, setFilters] = useState<ContactFiltersType>({
    searchTerm: "",
    statusFilter: "all",
    interestFilter: "all",
  });

  const [newNote, setNewNote] = useState("");
  const [reminder, setReminder] = useState<Reminder>({
    date: "",
    time: "",
    note: "",
  });

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      contact.inquiry.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesStatus =
      filters.statusFilter === "all" || contact.status === filters.statusFilter;

    const matchesInterest =
      filters.interestFilter === "all" || contact.interestLevel === filters.interestFilter;

    return matchesSearch && matchesStatus && matchesInterest;
  });

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}?subject=Follow-up from our conversation`, "_self");
  };

  const scheduleReminder = (contactId: string) => {
    if (!reminder.date || !reminder.time) return;

    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              status: "scheduled",
              nextFollowUp: `${reminder.date}T${reminder.time}`,
              notes: `${contact.notes}\n[${new Date().toLocaleDateString()}] Reminder: ${
                reminder.note || "Follow up call"
              }`,
            }
          : contact
      )
    );

    alert(`✅ Reminder scheduled for ${reminder.date} at ${reminder.time}`);
    setReminder({ date: "", time: "", note: "" });
  };

  const updateStatus = (contactId: string, status: Contact["status"]) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId ? { ...contact, status } : contact
      )
    );
  };

  const addNote = (contactId: string) => {
    if (!newNote.trim()) return;

    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              notes: `${contact.notes}\n[${new Date().toLocaleDateString()}] ${newNote}`,
              lastContact: new Date().toISOString().split("T")[0],
            }
          : contact
      )
    );
    setNewNote("");
  };

  const getStatusColor = (status: Contact["status"]) => {
    const colors: Record<Contact["status"], string> = {
      new: "bg-sky-100 text-sky-700 border border-sky-200",
      contacted: "bg-amber-100 text-amber-700 border border-amber-200",
      interested: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      not_interested: "bg-rose-100 text-rose-700 border border-rose-200",
      scheduled: "bg-violet-100 text-violet-700 border border-violet-200",
    };
    return colors[status];
  };

  const getInterestColor = (level: Contact["interestLevel"]) => {
    const colors: Record<Contact["interestLevel"], string> = {
      high: "text-emerald-600 bg-emerald-50 border border-emerald-200",
      medium: "text-amber-600 bg-amber-50 border border-amber-200",
      low: "text-rose-600 bg-rose-50 border border-rose-200",
    };
    return colors[level];
  };

  const exportContacts = () => {
    alert("📊 Export feature would download contact data as CSV");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-sky-700">
                  {contacts.length} Active Contacts
                </span>
              </div>
            </div>

            <button
              onClick={exportContacts}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs md:text-sm bg-slate-900 text-white rounded-lg hover:bg-black transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">

        {/* Filters */}
        <ContactFilters filters={filters} onFiltersChange={setFilters} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">

          {/* Contacts List */}
          <div className="xl:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900 text-sm md:text-base">Contacts</h2>

                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {filteredContacts.length} result{filteredContacts.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    isSelected={selectedContact?.id === contact.id}
                    onSelect={(c) => {
                      setSelectedContact(c);
                      setIsDetailsOpen(true);
                    }}
                    onCall={handleCall}
                    onEmail={handleEmail}
                    getStatusColor={getStatusColor}
                    getInterestColor={getInterestColor}
                  />
                ))}

                {filteredContacts.length === 0 && (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No contacts match your filters.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/*                     CONTACT DETAILS MODAL                  */}
      {/* ========================================================= */}
      {isDetailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 relative">

            {/* Close button */}
            <button
              onClick={() => setIsDetailsOpen(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-800"
            >
              ✕
            </button>

            <ContactDetails
              contact={selectedContact}
              reminder={reminder}
              newNote={newNote}
              onReminderChange={setReminder}
              onNewNoteChange={setNewNote}
              onScheduleReminder={scheduleReminder}
              onUpdateStatus={updateStatus}
              onAddNote={addNote}
              onCall={handleCall}
              onEmail={handleEmail}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerContactsPage;
