import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from "zod";

/**
 * This file contains API route handlers for ticket operations using Prisma ORM.
 * It includes functions to fetch all tickets (GET) and create a new ticket (POST).
 */

/**
 * GET handler: Fetches all tickets from the database
 * @returns {Promise<NextResponse>} JSON response with tickets or error
 */
export async function GET() {
  try {
    console.log('Attempting to fetch tickets with Prisma...')
    // Use Prisma's findMany method to retrieve all tickets
    // findMany returns an array of all records that match the specified criteria
    const tickets = await prisma.ticket.findMany({
      // Order the results by created_at field in descending order
      orderBy: {
        created_at: 'desc'
      }
    })
    // findMany here will return all tickets, sorted from newest to oldest

    console.log('Fetched tickets:', tickets)
    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Failed to fetch tickets with Prisma:', error)
    return NextResponse.json({ error: 'Failed to fetch tickets with Prisma', details: (error as Error).message }, { status: 500 })
  }
}

/**
 * POST handler: Creates a new ticket in the database
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the created ticket or error
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = TicketSchema.parse(body);

    const newTicket = await prisma.ticket.create({
      data: validatedData,
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid ticket data', details: error.errors }, { status: 400 });
    }
    console.error('Failed to create ticket with Prisma:', error);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}

const TicketSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});