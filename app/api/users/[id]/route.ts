import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { userUpdateSchema } from '@/validation/schema/users';
import { hash } from 'bcryptjs'; // Add this import at the top
import { z } from 'zod'; // Add this import at the top

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    // Validate the input
    const validatedData = userUpdateSchema.parse(body);

    // Prepare update data
    const updateData: any = { ...validatedData };

    // Handle password update
    if (updateData.password) {
      updateData.password = await hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Remove the password from the response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}