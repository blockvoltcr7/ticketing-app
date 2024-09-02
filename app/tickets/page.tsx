"use client"

/**
 * TicketingPage Component
 * 
 * This component serves as the main interface for the ticketing system. 
 * It allows users to create new tickets, view existing tickets in a table, 
 * and manage the ticketing table's creation. The component fetches ticket 
 * data from an API and displays it using NextUI components.
 */

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
  const [prismaTickets, setPrismaTickets] = useState<Ticket[]>([])

  useEffect(() => {
    checkHealthAndFetchTickets()
  }, [])

  /**
   * Checks the health of the API and fetches the tickets if the health check passes.
   */
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

  /**
   * Creates the tickets table by calling the appropriate API endpoint.
   * Displays a message indicating the result of the operation.
   */
  async function createTicketsTable() {
    try {
      const response = await fetch('/api/tickets/create-table')
      const data = await response.json()
      if (response.ok) {
        setTableCreationMessage(data.message || "Ticketing table created successfully.")
        console.log("Table creation response:", data)
      } else {
        throw new Error(data.error || "Failed to create tickets table")
      }
    } catch (error) {
      console.error('Failed to create tickets table:', error)
      setTableCreationMessage("Failed to create tickets table: " + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  /**
   * Fetches the list of tickets from the API and updates the state.
   */
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

  /**
   * Fetches the list of tickets using Prisma and updates the state.
   */
  async function fetchTicketsWithPrisma() {
    try {
      const response = await fetch('/api/tickets/prisma')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setPrismaTickets(data)
    } catch (error) {
      console.error('Failed to fetch tickets with Prisma:', error)
    }
  }

  /**
   * Returns the color associated with the ticket status.
   * @param status - The status of the ticket.
   * @returns A string representing the color for the status.
   */
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

  /**
   * Returns the color associated with the ticket priority.
   * @param priority - The priority of the ticket.
   * @returns A string representing the color for the priority.
   */
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

  /**
   * Handles input changes for the new ticket form.
   * @param e - The change event from the input fields.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTicket(prev => ({ ...prev, [name]: value }))
  }

  /**
   * Submits the new ticket data to the API and refreshes the ticket list.
   */
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/tickets/prisma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
      });
      if (response.ok) {
        onClose();
        fetchTicketsWithPrisma();
        setNewTicket({
          title: "",
          description: "",
          status: "OPEN",
          priority: "MEDIUM"
        });
      } else {
        throw new Error('Failed to create ticket');
      }
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

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

      <Button onClick={fetchTicketsWithPrisma} color="warning" className="mb-4 ml-4">
        Fetch Tickets with Prisma
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

      <h2 className="text-2xl font-bold mt-8 mb-4">Tickets Fetched with Prisma</h2>
      <Table aria-label="Tickets table (Prisma)">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Priority</TableColumn>
          <TableColumn>Created At</TableColumn>
        </TableHeader>
        <TableBody>
          {prismaTickets.map((ticket) => (
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