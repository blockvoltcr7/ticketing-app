"use client"

import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface User {
  id: number
  name: string
  username: string
  role: string
}

interface Props {
  users: User[]
}

export default function DataTableSimple({ users }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="cursor-pointer hover:bg-gray-100">
            <TableCell>
              <Link href={`/users/${user.id}/edit`} className="text-blue-600 hover:underline">
                {user.name}
              </Link>
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}