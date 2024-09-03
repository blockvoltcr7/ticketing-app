import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Ticket Model', () => {
  beforeEach(async () => {
    await prisma.ticket.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should create a new ticket', async () => {
    const ticketData = {
      title: 'Test Ticket',
      description: 'This is a test ticket',
      status: 'OPEN',
      priority: 'MEDIUM',
    }

    const ticket = await prisma.ticket.create({ data: ticketData })

    expect(ticket).toHaveProperty('id')
    expect(ticket.title).toBe(ticketData.title)
    expect(ticket.status).toBe(ticketData.status)
    expect(ticket.priority).toBe(ticketData.priority)
  })

  it('should assign a ticket to a user', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password123',
        role: 'TECH',
      },
    })

    const ticketData = {
      title: 'Assigned Ticket',
      description: 'This ticket is assigned to a user',
      status: 'OPEN',
      priority: 'HIGH',
      assignedToUserId: user.id,
    }

    const ticket = await prisma.ticket.create({ data: ticketData })

    expect(ticket.assignedToUserId).toBe(user.id)
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })
})