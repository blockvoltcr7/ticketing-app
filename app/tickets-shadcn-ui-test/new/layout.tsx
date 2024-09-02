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
        {children}
      </div>
    </NextUIProvider>
  )
}
