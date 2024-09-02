import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET handler: Fetches all tickets from the database
 * @returns {Promise<NextResponse>} JSON response with tickets or error
 */
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tickets', details: (error as Error).message }, { status: 500 });
  }
}

/**
 * POST handler: Creates a new ticket in the database
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the created ticket or error
 */
export async function POST(request: Request) {
  try {
    const { title, description, status, priority } = await request.json();
    const newTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        status,
        priority,
      },
    });
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ticket', details: (error as Error).message }, { status: 500 });
  }
}