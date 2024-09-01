import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, owner } = await request.json();
    
    // Validate input
    if (!name || !owner) {
      return NextResponse.json({ error: 'Name and owner are required' }, { status: 400 });
    }

    // Create new pet
    const result = await sql`
      INSERT INTO Pets (Name, Owner)
      VALUES (${name}, ${owner})
      RETURNING *
    `;

    return NextResponse.json({ pet: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error adding pet:', error);
    return NextResponse.json({ error: 'Failed to add pet' }, { status: 500 });
  }
}