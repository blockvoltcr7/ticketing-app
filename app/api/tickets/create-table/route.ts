/**
 * API Route to create the tickets table in the database.
 * 
 * This route handles the creation of the tickets table if it does not already exist.
 * The table includes the following columns:
 * - id: A unique identifier for each ticket (SERIAL PRIMARY KEY).
 * - title: The title of the ticket (VARCHAR(255), NOT NULL).
 * - description: A detailed description of the ticket (TEXT).
 * - status: The current status of the ticket (VARCHAR(20), NOT NULL).
 * - priority: The priority level of the ticket (VARCHAR(20), NOT NULL).
 * - created_at: The timestamp when the ticket was created (TIMESTAMP WITH TIME ZONE, DEFAULT CURRENT_TIMESTAMP).
 * 
 * @returns {NextResponse} A JSON response indicating the success or failure of the table creation.
 */

import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(20) NOT NULL,
        priority VARCHAR(20) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    const { rows } = await sql`SELECT to_regclass('public.tickets') as table_exists`
    const tableExists = rows[0].table_exists !== null

    if (tableExists) {
      return NextResponse.json({ message: 'Tickets table created successfully or already exists' })
    } else {
      throw new Error('Failed to create tickets table')
    }
  } catch (error) {
    console.error('Failed to create tickets table:', error)
    return NextResponse.json({ error: 'Failed to create tickets table', details: error.message }, { status: 500 })
  }
}