import { createMocks } from 'node-mocks-http'
import { POST, GET } from '@/app/api/tickets/route'

describe('/api/tickets', () => {
  it('should create a new ticket', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'New Ticket',
        description: 'This is a new ticket',
        status: 'OPEN',
        priority: 'MEDIUM',
      },
    })

    await POST(req)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toHaveProperty('id')
  })

  it('should get all tickets', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await GET(req)

    expect(res._getStatusCode()).toBe(200)
    expect(Array.isArray(JSON.parse(res._getData()))).toBeTruthy()
  })
})