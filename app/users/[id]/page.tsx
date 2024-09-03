import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { UserForm } from '@/components/UserForm';

interface Props {
  params: { id: string };
}

export default async function EditUser({ params }: Props) {
  const userId = parseInt(params.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      // Exclude password
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <UserForm user={user} />
    </div>
  );
}