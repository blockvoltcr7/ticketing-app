import { Suspense } from 'react'
import prisma from '@/lib/prisma'
import DataTableSimple from './DataTableSimple'
import { UserForm } from '@/components/UserForm'

async function getUsers() {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			username: true,
			role: true,
		},
	})
	return users
}

export default async function UsersPage() {
	const users = await getUsers()

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl font-bold mb-5">User Management</h1>
			<UserForm user={undefined} /> 
			<div className="mt-10">
				<h2 className="text-xl font-semibold mb-3">User List</h2>
				<Suspense fallback={<div>Loading users...</div>}>
					<DataTableSimple users={users} />
				</Suspense>
			</div>
		</div>
	)
}