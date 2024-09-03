"use client"

import { UserForm } from '@/components/UserForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditUserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${params.id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit User</h1>
      {user && <UserForm user={user} />}
    </div>
  );
}