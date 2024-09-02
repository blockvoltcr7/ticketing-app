"use client"

import { TicketForm } from '@/components/TicketForm';

export default function NewTicketPage() {
  return (
    <div className="container mx-auto p-4 pb-32 max-w-3xl"> {/* Added max-width */}
      <h1 className="text-2xl font-bold mb-6">Create New Ticket</h1>
      <TicketForm />
    </div>
  );
}
