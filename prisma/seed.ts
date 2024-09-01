import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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