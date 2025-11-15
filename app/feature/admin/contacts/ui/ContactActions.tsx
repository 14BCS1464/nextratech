import React from "react";
import { Phone, Mail, CheckCircle, XCircle, Calendar } from "lucide-react";
import { Contact, Reminder } from "./types";

interface ContactActionsProps {
  contact: Contact;
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

const ContactActions: React.FC<ContactActionsProps> = ({
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
  return (
    <>
      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-3 text-[11px] uppercase tracking-wide text-slate-500">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onCall(contact.phone)}
            className="flex items-center justify-center gap-2 p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-sm text-xs md:text-sm"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </button>
          <button
            type="button"
            onClick={() => onEmail(contact.email)}
            className="flex items-center justify-center gap-2 p-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors shadow-sm text-xs md:text-sm"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </button>
        </div>
      </div>

      {/* Status Update */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-3 text-[11px] uppercase tracking-wide text-slate-500">
          Update Status
        </h3>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => onUpdateStatus(contact.id, "interested")}
            className="flex items-center gap-2 px-3 py-2 text-xs md:text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex-1 min-w-[120px]"
          >
            <CheckCircle className="w-4 h-4" />
            Interested
          </button>
          <button
            type="button"
            onClick={() => onUpdateStatus(contact.id, "not_interested")}
            className="flex items-center gap-2 px-3 py-2 text-xs md:text-sm bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex-1 min-w-[120px]"
          >
            <XCircle className="w-4 h-4" />
            Not Interested
          </button>
        </div>
      </div>

      {/* Schedule Reminder */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-3 text-[11px] uppercase tracking-wide text-slate-500">
          Schedule Follow-up
        </h3>
        <div className="space-y-2.5">
          <input
            type="date"
            value={reminder.date}
            onChange={(e) =>
              onReminderChange({
                ...reminder,
                date: e.target.value,
              })
            }
            className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs md:text-sm"
          />
          <input
            type="time"
            value={reminder.time}
            onChange={(e) =>
              onReminderChange({
                ...reminder,
                time: e.target.value,
              })
            }
            className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs md:text-sm"
          />
          <input
            type="text"
            placeholder="Reminder note..."
            value={reminder.note}
            onChange={(e) =>
              onReminderChange({
                ...reminder,
                note: e.target.value,
              })
            }
            className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs md:text-sm"
          />
          <button
            type="button"
            onClick={() => onScheduleReminder(contact.id)}
            className="w-full flex items-center justify-center gap-2 p-2.5 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors shadow-sm text-xs md:text-sm"
          >
            <Calendar className="w-4 h-4" />
            Set Reminder
          </button>
        </div>
      </div>

      {/* Notes */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-3 text-[11px] uppercase tracking-wide text-slate-500">
          Notes & Comments
        </h3>
        <div className="bg-slate-50 p-3 rounded-lg mb-3 max-h-40 overflow-y-auto border border-slate-100">
          <pre className="text-xs md:text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
            {contact.notes}
          </pre>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a note about this contact..."
            value={newNote}
            onChange={(e) => onNewNoteChange(e.target.value)}
            className="flex-1 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs md:text-sm"
          />
          <button
            type="button"
            onClick={() => onAddNote(contact.id)}
            className="px-4 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-sm text-xs md:text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactActions;