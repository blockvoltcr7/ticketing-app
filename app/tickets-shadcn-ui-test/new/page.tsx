"use client"

import React, { useState } from 'react';
import { Input, Button, Textarea } from "@nextui-org/react";

export default function NewTicketPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = { title, description, priority, status: 'OPEN', created_at: new Date().toISOString() };

    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    });

    if (response.ok) {
      // Handle successful ticket creation (e.g., redirect or show success message)
    } else {
      // Handle error
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          fullWidth 
          label="Title" 
          placeholder="Enter ticket title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <Textarea 
          fullWidth 
          label="Description" 
          placeholder="Enter ticket description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} 
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <Button type="submit" className="w-full">Create Ticket</Button>
      </form>
    </div>
  );
}
