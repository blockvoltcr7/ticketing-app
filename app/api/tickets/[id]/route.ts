import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TicketSchema } from '@/ValidationSchemas/ticket';

interface Props {
  params: { id: string };
}

export async function GET(request: Request, { params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }

  return NextResponse.json(ticket);
}

export async function PATCH(request: Request, { params }: Props) {
  const body = await request.json();
  const validation = TicketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: parseInt(params.id) },
    data: { ...body },
  });

  return NextResponse.json(updatedTicket);
}