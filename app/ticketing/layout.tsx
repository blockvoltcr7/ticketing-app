"use client"

import { NextUIProvider } from "@nextui-org/react"

export default function TicketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Ticketing System</h1>
        {children}
      </div>
    </NextUIProvider>
  )
}