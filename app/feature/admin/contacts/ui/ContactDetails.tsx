import React from "react";
import { Mail, Phone, MapPin, MoreVertical, User } from "lucide-react";
import { Contact, Reminder } from "./types";
import ContactActions from "./ContactActions";

interface ContactDetailsProps {
  contact: Contact | null;
  reminder: Reminder;
  newNote: string;
  onReminderChange: (reminder: Reminder) => void;
  onNewNoteChange: (note: string) => void;
  onScheduleReminder: (contactId: string) => void;
  onUpdateStatus: (contactId: string, status: Contact["status"]) => void;
  onAddNote: (contactId: string) => void;
  onCall: (phone: string) => void;
  onEmail: (email: string) => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  reminder,
  newNote,
  onReminderChange,
  onNewNoteChange,
  onScheduleReminder,
  onUpdateStatus,
  onAddNote,
  onCall,
  onEmail,
}) => {
  if (!contact) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          Select a Contact
        </h3>
        <p className="text-slate-500 text-sm">
          Choose a contact from the list to view details and manage interactions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm xl:sticky xl:top-24">
      <div className="p-5 border-b border-slate-200">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {contact.name}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-1">
              {contact.position} at {contact.company}
            </p>
          </div>
          <button
            type="button"
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5 max-h-[calc(100vh-180px)] overflow-y-auto">
        {/* Contact Information */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-3 text-[11px] uppercase tracking-wide text-slate-500">
            Contact Information
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg">
              <Mail className="w-4 h-4 text-slate-400" />
              <a
                href={`mailto:${contact.email}`}
                className="text-sky-600 hover:underline text-xs md:text-sm break-all"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg">
              <Phone className="w-4 h-4 text-slate-400" />
              <a
                href={`tel:${contact.phone}`}
                className="text-sky-600 hover:underline text-xs md:text-sm"
              >
                {contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 text-xs md:text-sm">
                Source: {contact.source}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <ContactActions
          contact={contact}
          reminder={reminder}
          newNote={newNote}
          onReminderChange={onReminderChange}
          onNewNoteChange={onNewNoteChange}
          onScheduleReminder={onScheduleReminder}
          onUpdateStatus={onUpdateStatus}
          onAddNote={onAddNote}
          onCall={onCall}
          onEmail={onEmail}
        />
      </div>
    </div>
  );
};

export default ContactDetails;