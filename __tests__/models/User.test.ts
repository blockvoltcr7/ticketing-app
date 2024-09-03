import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

describe('User Model', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  it('should create a new user', async () => {
    const userData = {
      name: 'Test User',
      username: 'testuser',
      password: await hash('password123', 10),
      role: 'USER',
    }

    const user = await prisma.user.create({ data: userData })

    expect(user).toHaveProperty('id')
    expect(user.name).toBe(userData.name)
    expect(user.username).toBe(userData.username)
    expect(user.role).toBe(userData.role)
  })

  it('should not create a user with duplicate username', async () => {
    const userData = {
      name: 'Test User',
      username: 'testuser',
      password: await hash('password123', 10),
      role: 'USER',
    }

    await prisma.user.create({ data: userData })

    await expect(prisma.user.create({ data: userData })).rejects.toThrow()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })
})