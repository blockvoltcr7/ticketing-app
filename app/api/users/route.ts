import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { userSchema } from '@/validation/schema/users';
import { z } from 'zod';

// Define a schema for user creation
const UserCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['ADMIN', 'TECH', 'USER']).default('USER'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the input
    const validatedData = userSchema.parse(body);

    // Hash the password
    validatedData.password = await hash(validatedData.password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: validatedData,
    });

    // Remove the password from the response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// Optionally, you can also implement a GET method to fetch users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// New PUT method for updating users
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Validate the input
    const validatedData = userUpdateSchema.parse(updateData);

    // If password is provided, hash it
    if (validatedData.password) {
      validatedData.password = await hash(validatedData.password, 10);
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: validatedData,
    });

    // Remove the password from the response
    const { password: _, ...userWithoutPassword } = updatedUser;

    // Return the updated user
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}