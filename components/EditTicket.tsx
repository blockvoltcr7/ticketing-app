"use client"

import { useEffect, useState } from 'react';
import { TicketForm } from './TicketForm';
import { Ticket } from '@prisma/client';

interface EditTicketProps {
  id: string;
}

export function EditTicket({ id }: EditTicketProps) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/tickets/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ticket: ${response.statusText}`);
        }
        const data = await response.json();
        setTicket(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!ticket) return <div className="text-destructive">Ticket not found</div>;

  return <TicketForm ticket={ticket} />;
}