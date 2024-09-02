"use client"

import { useState, useEffect } from "react"
import { DataTable, DataTableColumn } from "@shadcn/ui"
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

  return (
    <DataTable data={data}>
      <DataTableColumn field="id" header="ID" />
      <DataTableColumn field="title" header="Title" />
      <DataTableColumn field="status" header="Status" cell={({ row }) => <TicketStatusBadge status={row.original.status} />} />
      <DataTableColumn field="priority" header="Priority" />
      <DataTableColumn field="created_at" header="Created At" />
    </DataTable>
  )
}

export default DataTableComponent