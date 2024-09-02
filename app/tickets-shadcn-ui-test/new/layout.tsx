"use client"

import { NextUIProvider } from "@nextui-org/react"

export default function NewTicketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create New Ticket</h1>
        {children}
      </div>
    </NextUIProvider>
  )
}
