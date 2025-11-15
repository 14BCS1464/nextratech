export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    inquiry: string;
    status: 'new' | 'contacted' | 'interested' | 'not_interested' | 'scheduled';
    interestLevel: 'high' | 'medium' | 'low';
    lastContact: string;
    nextFollowUp?: string;
    notes: string;
    source: string;
  }
  
  export interface ContactFilters {
    searchTerm: string;
    statusFilter: string;
    interestFilter: string;
  }
  
  export interface Reminder {
    date: string;
    time: string;
    note: string;
  }