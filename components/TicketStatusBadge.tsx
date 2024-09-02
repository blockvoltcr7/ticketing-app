import React from 'react'
import { Badge } from '@/components/ui/badge'

interface Props {
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
}

// Create a statusMap of Record<string, {label: string; color: string}>
const statusMap: Record<string, {label: string; color: string}> = {
    OPEN: {label: 'Open', color: "bg-green-400"},
    IN_PROGRESS: {label: 'In Progress', color: "bg-blue-400"},
    CLOSED: {label: 'Closed', color: "bg-red-400"},
}

const TicketStatusBadge = ({ status }: Props) => {
  const { label, color } = statusMap[status] || { label: 'Unknown', color: 'bg-gray-400' }
  return (
    <Badge className={`${color} text-white px-2 py-1 rounded`}>
      {label}
    </Badge>
  )
}

export default TicketStatusBadge