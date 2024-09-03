import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET handler: Fetches all tickets from the database
 * @returns {Promise<NextResponse>} JSON response with tickets or error
 */
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        assignedToUser: {
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
          },
        },
      },
    });
    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

/**
 * POST handler: Creates a new ticket in the database
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the created ticket or error
 */
export async function POST(request: Request) {
  try {
    const { title, description, status, priority, assignedToUserId } = await request.json();
    const newTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        status,
        priority,
        assignedToUserId: assignedToUserId ? parseInt(assignedToUserId) : null,
      },
    });
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error('Failed to create ticket:', error);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}