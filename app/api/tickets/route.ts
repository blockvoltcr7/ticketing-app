import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM tickets ORDER BY created_at DESC`
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch tickets:', error)
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, status, priority } = await request.json()
    const { rows } = await sql`
      INSERT INTO tickets (title, description, status, priority)
      VALUES (${title}, ${description}, ${status}, ${priority})
      RETURNING *
    `
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Failed to create ticket:', error)
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 })
  }
}