"use client"

import { useState, useEffect } from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Badge, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Textarea, Select, SelectItem } from "@nextui-org/react"

type Ticket = {
  id: number
  title: string
  description: string
  status: "OPEN" | "IN_PROGRESS" | "CLOSED"
  priority: "LOW" | "MEDIUM" | "HIGH"
  created_at: string
}

export default function TicketingPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    status: "OPEN",
    priority: "MEDIUM"
  })
  const [tableCreationMessage, setTableCreationMessage] = useState("")

  useEffect(() => {
    checkHealthAndFetchTickets()
  }, [])

  async function checkHealthAndFetchTickets() {
    try {
      const healthResponse = await fetch('/api/health')
      if (healthResponse.ok) {
        console.log('Health check passed')
        await fetchTickets()
      } else {
        console.error('Health check failed')
      }
    } catch (error) {
      console.error('Error during health check:', error)
    }
  }

  async function createTicketsTable() {
    try {
      const response = await fetch('/api/tickets/create-table')
      const data = await response.json()
      setTableCreationMessage(data.message || "Ticketing table already exists.")
    } catch (error) {
      console.error('Failed to create tickets table:', error)
      setTableCreationMessage("Failed to create tickets table.")
    }
  }

  async function fetchTickets() {
    try {
      const response = await fetch('/api/tickets')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setTickets(data)
    } catch (error) {
      console.error('Failed to fetch tickets:', error)
    }
  }

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "OPEN":
        return "success"
      case "IN_PROGRESS":
        return "warning"
      case "CLOSED":
        return "danger"
    }
  }

  const getPriorityColor = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "LOW":
        return "default"
      case "MEDIUM":
        return "warning"
      case "HIGH":
        return "danger"
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTicket(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
      })
      if (response.ok) {
        onClose()
        fetchTickets()
        setNewTicket({
          title: "",
          description: "",
          status: "OPEN",
          priority: "MEDIUM"
        })
      }
    } catch (error) {
      console.error('Failed to create ticket:', error)
    }
  }

  return (
    <div>
      <Button onClick={createTicketsTable} color="primary" className="mb-4 mr-4">
        Create Tickets Table
      </Button>
      {tableCreationMessage && <p className="mb-4">{tableCreationMessage}</p>}

      <Button onClick={onOpen} color="success" className="mb-4 mr-4">
        Create New Ticket
      </Button>

      <Button onClick={fetchTickets} color="secondary" className="mb-4">
        Fetch Tickets
      </Button>

      <Table aria-label="Tickets table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Priority</TableColumn>
          <TableColumn>Created At</TableColumn>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.id}</TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>
                <Chip color={getStatusColor(ticket.status)} variant="flat">
                  {ticket.status}
                </Chip>
              </TableCell>
              <TableCell>
                <Badge color={getPriorityColor(ticket.priority)} variant="flat">
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Create New Ticket</ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              name="title"
              value={newTicket.title}
              onChange={handleInputChange}
            />
            <Textarea
              label="Description"
              name="description"
              value={newTicket.description}
              onChange={handleInputChange}
            />
            <Select
              label="Status"
              name="status"
              value={newTicket.status}
              onChange={handleInputChange}
            >
              <SelectItem key="OPEN" value="OPEN">Open</SelectItem>
              <SelectItem key="IN_PROGRESS" value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem key="CLOSED" value="CLOSED">Closed</SelectItem>
            </Select>
            <Select
              label="Priority"
              name="priority"
              value={newTicket.priority}
              onChange={handleInputChange}
            >
              <SelectItem key="LOW" value="LOW">Low</SelectItem>
              <SelectItem key="MEDIUM" value="MEDIUM">Medium</SelectItem>
              <SelectItem key="HIGH" value="HIGH">High</SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}