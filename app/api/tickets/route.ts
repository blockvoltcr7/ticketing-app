import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

async function checkTableExists() {
  const { rows } = await sql`SELECT to_regclass('public.tickets') as table_exists`
  return rows[0].table_exists !== null
}

export async function GET() {
  try {
    if (!(await checkTableExists())) {
      return NextResponse.json({ error: 'Tickets table does not exist' }, { status: 404 })
    }
    const { rows } = await sql`SELECT * FROM tickets ORDER BY created_at DESC`
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch tickets:', error)
    return NextResponse.json({ error: 'Failed to fetch tickets', details: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!(await checkTableExists())) {
      return NextResponse.json({ error: 'Tickets table does not exist' }, { status: 404 })
    }
    const { title, description, status, priority } = await request.json()
    const { rows } = await sql`
      INSERT INTO tickets (title, description, status, priority)
      VALUES (${title}, ${description}, ${status}, ${priority})
      RETURNING *
    `
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Failed to create ticket:', error)
    return NextResponse.json({ error: 'Failed to create ticket', details: error.message }, { status: 500 })
  }
}