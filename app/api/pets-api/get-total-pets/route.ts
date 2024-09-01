import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`SELECT COUNT(*) as total FROM Pets`;
    const total = result.rows[0].total;
    return NextResponse.json({ total }, { status: 200 });
  } catch (error) {
    console.error('Error fetching total pets:', error);
    return NextResponse.json({ error: 'Failed to fetch total pets' }, { status: 500 });
  }
}