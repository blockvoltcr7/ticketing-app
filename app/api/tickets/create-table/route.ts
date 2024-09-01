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
    return NextResponse.json({ message: 'Tickets table created successfully' })
  } catch (error) {
    console.error('Failed to create tickets table:', error)
    return NextResponse.json({ error: 'Failed to create tickets table' }, { status: 500 })
  }
}