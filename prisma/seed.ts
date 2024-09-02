import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * This script is used to seed the database with dummy ticket data.
 * It first deletes all existing ticket data, then creates new tickets.
 * The new tickets are defined in the dummyTickets array.
 * Each ticket has a title, description, status, and priority.
 * The script logs a success message when the seed data is inserted.
 */
async function main() {
  // Delete existing data
  await prisma.ticket.deleteMany()

  // Create dummy tickets
  const dummyTickets = [
    {
      title: 'Bug in login page',
      description: 'Users are unable to log in',
      status: 'OPEN',
      priority: 'HIGH',
    },
    {
      title: 'Add new feature',
      description: 'Implement dark mode',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
    },
    {
      title: 'Update documentation',
      description: 'Update API documentation',
      status: 'CLOSED',
      priority: 'LOW',
    },
  ]

  for (const ticket of dummyTickets) {
    await prisma.ticket.create({
      data: ticket,
    })
  }

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })