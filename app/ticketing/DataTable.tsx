"use client"

import { useState, useEffect } from "react"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Ticket } from "@prisma/client"
import TicketStatusBadge from "@/components/TicketStatusBadge"

interface DataTableProps {
  tickets: Ticket[]
}

const DataTableComponent = ({ tickets }: DataTableProps) => {
  const [data, setData] = useState<Ticket[]>(tickets)

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch('/api/tickets/prisma')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Failed to fetch tickets:', error)
      }
    }

    fetchTickets()
  }, [])

  const columns: ColumnDef<Ticket>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <TicketStatusBadge status={row.original.status as "OPEN" | "IN_PROGRESS" | "CLOSED"} />
    },
    { accessorKey: "priority", header: "Priority" },
    { accessorKey: "created_at", header: "Created At" },
  ]

  return <DataTable columns={columns} data={data} />
}

export default DataTableComponent