import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const result = await query('SELECT NOW()');
    return NextResponse.json({ time: result.rows[0].now });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch time' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
      const { name, owner } = await request.json();
      const pet = await prisma.pet.create({
        data: { name, owner },
      });
      return NextResponse.json({ pet }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to add pet' }, { status: 500 });
    }
  }