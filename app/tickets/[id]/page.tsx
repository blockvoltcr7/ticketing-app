"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TicketStatusBadge from '@/components/TicketStatusBadge'
import { Ticket } from '@prisma/client'
import ReactMarkdown from 'react-markdown'

export default function TicketDetails({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/tickets/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setTicket(data)
        } else if (response.status === 404) {
          setError('Ticket not found')
        } else {
          setError('An error occurred while fetching the ticket')
        }
      } catch (error) {
        console.error('Failed to fetch ticket:', error)
        setError('An error occurred while fetching the ticket')
      } finally {
        setLoading(false)
      }
    }
    fetchTicket()
  }, [params.id])

  const handleEdit = () => {
    router.push(`/tickets/edit/${params.id}`)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      const response = await fetch(`/api/tickets/${params.id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        router.push('/tickets')
      } else {
        console.error('Failed to delete ticket')
      }
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!ticket) return null

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{ticket.title}</CardTitle>
        <CardDescription>Ticket ID: {ticket.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>Status:</strong> <TicketStatusBadge status={ticket.status} />
          </div>
          <div>
            <strong>Priority:</strong> {ticket.priority}
          </div>
          <div>
            <strong>Description:</strong>
            <div className="mt-2 prose prose-sm max-w-none">
              <ReactMarkdown>{ticket.description || ''}</ReactMarkdown>
            </div>
          </div>
          <div>
            <strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleEdit}>Edit Ticket</Button>
        <Button variant="destructive" onClick={handleDelete}>Delete Ticket</Button>
      </CardFooter>
    </Card>
  )
}