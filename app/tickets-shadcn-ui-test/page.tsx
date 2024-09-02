"use client"

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

export default function TicketingPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      const response = await fetch('/api/tickets');
      const data = await response.json();
      setTickets(data);
    }

    fetchTickets();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={tickets} />
    </div>
  );
}