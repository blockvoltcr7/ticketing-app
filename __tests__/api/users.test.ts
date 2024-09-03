import { createMocks } from 'node-mocks-http'
import { POST, GET } from '@/app/api/users/route'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

jest.mock('@/lib/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
  },
}))

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedpassword'),
}))

describe('/api/users', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should create a new user with hashed password', async () => {
    const mockUser = {
      id: 1,
      name: 'New User',
      username: 'newuser',
      password: 'hashedpassword',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    ;(prisma.user.create as jest.Mock).mockResolvedValue(mockUser)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'New User',
        username: 'newuser',
        password: 'password123',
        role: 'USER',
      },
    })

    await POST(req)

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        password: 'hashedpassword',
      }),
    })

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: 'New User',
      username: 'newuser',
      role: 'USER',
    }))
    expect(JSON.parse(res._getData())).not.toHaveProperty('password')
  })

  it('should return 409 if username already exists', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, username: 'existinguser' })

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'New User',
        username: 'existinguser',
        password: 'password123',
        role: 'USER',
      },
    })

    await POST(req)

    expect(res._getStatusCode()).toBe(409)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Username already exists' })
  })

  it('should return 400 for invalid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'New User',
        username: 'nu', // Too short
        password: 'pass', // Too short
        role: 'INVALID_ROLE',
      },
    })

    await POST(req)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toHaveProperty('error', 'Invalid input')
    expect(JSON.parse(res._getData())).toHaveProperty('details')
  })

  it('should return 400 for missing required fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'New User',
        // Missing username and password
      },
    })

    await POST(req)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toHaveProperty('error', 'Invalid input')
    expect(JSON.parse(res._getData())).toHaveProperty('details')
  })

  it('should get all users', async () => {
    const mockUsers = [
      { id: 1, name: 'User 1', username: 'user1', role: 'USER' },
      { id: 2, name: 'User 2', username: 'user2', role: 'TECH' },
    ]

    ;(prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)

    const { req, res } = createMocks({
      method: 'GET',
    })

    await GET(req)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockUsers)
  })
})