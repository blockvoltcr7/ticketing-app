"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TicketSchema, TicketFormData } from "@/ValidationSchemas/ticket";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Ticket } from "@prisma/client";
import { useRouter } from "next/navigation";

interface TicketFormProps {
  ticket?: Ticket;
}

export function TicketForm({ ticket }: TicketFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      title: ticket?.title || "",
      description: ticket?.description || "",
      status: (ticket?.status || "OPEN") as "OPEN" | "IN_PROGRESS" | "CLOSED",
      priority: (ticket?.priority || "MEDIUM") as "LOW" | "MEDIUM" | "HIGH",
    },
  });

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    try {
      if (ticket) {
        await axios.patch(`/api/tickets/${ticket.id}`, data);
      } else {
        await axios.post('/api/tickets', data);
      }
      // Handle successful submission (e.g., show success message, redirect)
      router.push('/tickets'); // Add this line to redirect after successful submission
    } catch (error) {
      console.error('Error submitting ticket:', error);
      // Handle error (e.g., show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ticket title" {...field} />
                </FormControl>
                <FormDescription>Provide a brief title for the ticket.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide a detailed description of the issue"
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Provide a detailed description of the issue.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" className="z-[1000]">
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the current status of the ticket.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" className="z-[1000]">
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the priority level of the ticket.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : (ticket ? 'Update Ticket' : 'Create Ticket')}
        </Button>
      </form>
    </Form>
  );
}